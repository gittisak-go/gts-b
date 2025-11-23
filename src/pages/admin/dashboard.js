import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { uploadDocument } from '@/utils/chatService';
import { availableLocalModels } from '@/utils/localLLMService';

const AdminDashboard = () => {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [modelProvider, setModelProvider] = useState('openai');
  const [modelName, setModelName] = useState('gpt-3.5-turbo');
  const [isSaved, setIsSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
    } else {
      // Load saved settings
      const savedKey = localStorage.getItem('chat_api_key');
      const savedProvider = localStorage.getItem('chat_provider');
      const savedModel = localStorage.getItem('chat_model');
      if (savedKey) setApiKey(savedKey);
      if (savedProvider) setModelProvider(savedProvider);
      if (savedModel) setModelName(savedModel);
    }
  }, [router]);

  // Reset model name when provider changes to local if not already a local model
  useEffect(() => {
    if (modelProvider === 'local') {
      const isCurrentModelLocal = availableLocalModels.some(m => m.id === modelName);
      if (!isCurrentModelLocal) {
        setModelName(availableLocalModels[0].id);
      }
    }
  }, [modelProvider]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('chat_api_key', apiKey);
    localStorage.setItem('chat_provider', modelProvider);
    localStorage.setItem('chat_model', modelName);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Uploading...');

    try {
      await uploadDocument(file);
      setUploadStatus('Upload Successful!');
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - GTS Portfolio</title>
      </Head>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Chatbot Settings</h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Knowledge Base Upload</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4 flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, TXT up to 10MB</p>
                {uploadStatus && (
                  <p className={`mt-2 text-sm font-medium ${uploadStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Model Configuration</h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model Provider</label>
                  <select
                    value={modelProvider}
                    onChange={(e) => setModelProvider(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic (Claude)</option>
                    <option value="google">Google (Gemini)</option>
                    <option value="local">Local / Custom API</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Model Name</label>
                  {modelProvider === 'local' ? (
                    <div className="space-y-2">
                      <select
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                      >
                        {availableLocalModels.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-gray-500">
                        {availableLocalModels.find(m => m.id === modelName)?.description}
                      </p>
                      <p className="text-xs text-amber-600">
                        Note: First run will download ~2GB of data. Requires WebGPU compatible browser (Chrome/Edge).
                      </p>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      placeholder="e.g., gpt-4, claude-3-opus"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                </div>

                {modelProvider !== 'local' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">API Key</label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      API Key will be stored locally in your browser for this demo. In production, use server-side environment variables.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-end">
                  {isSaved && (
                    <span className="mr-4 text-green-600 font-medium animate-pulse">
                      Settings Saved!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Configuration
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Social Login Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      G
                    </div>
                    <span className="font-medium text-gray-900">Google Login</span>
                  </div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active (Supabase)
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      L
                    </div>
                    <span className="font-medium text-gray-900">LINE Login</span>
                  </div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active (Supabase)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
