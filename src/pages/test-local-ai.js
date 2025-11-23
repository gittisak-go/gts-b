import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { availableLocalModels, initLocalLLM, generateLocalResponse } from '@/utils/localLLMService';

const TestLocalAI = () => {
  const [webGPUSupport, setWebGPUSupport] = useState(null);
  const [selectedModel, setSelectedModel] = useState(availableLocalModels[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [testResult, setTestResult] = useState('');
  const [error, setError] = useState('');
  const [cacheInfo, setCacheInfo] = useState(null);

  // ตรวจสอบ WebGPU Support
  useEffect(() => {
    const checkWebGPU = async () => {
      if ('gpu' in navigator) {
        try {
          const adapter = await navigator.gpu.requestAdapter();
          if (adapter) {
            setWebGPUSupport(true);
            // Get adapter info
            const info = await adapter.requestAdapterInfo();
            console.log('GPU Adapter:', info);
          } else {
            setWebGPUSupport(false);
          }
        } catch (err) {
          setWebGPUSupport(false);
          console.error('WebGPU Error:', err);
        }
      } else {
        setWebGPUSupport(false);
      }
    };

    checkWebGPU();
    checkCacheInfo();
  }, []);

  // ตรวจสอบ IndexedDB Cache
  const checkCacheInfo = async () => {
    if ('indexedDB' in window) {
      try {
        const estimate = await navigator.storage.estimate();
        setCacheInfo({
          usage: (estimate.usage / (1024 * 1024)).toFixed(2) + ' MB',
          quota: (estimate.quota / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
          percentage: ((estimate.usage / estimate.quota) * 100).toFixed(2) + '%'
        });
      } catch (err) {
        console.error('Storage API Error:', err);
      }
    }
  };

  // ทดสอบโมเดล
  const testModel = async () => {
    setIsLoading(true);
    setProgress('');
    setTestResult('');
    setError('');

    try {
      // Initialize Model
      await initLocalLLM(selectedModel, (report) => {
        setProgress(report.text);
      });

      setProgress('✅ Model loaded successfully! Generating response...');

      // Test generation
      const testPrompt = [
        { role: 'user', content: 'สวัสดีครับ คุณเป็นใคร?' }
      ];

      const response = await generateLocalResponse(testPrompt);
      setTestResult(response);
      setProgress('✅ Test completed!');

      // อัพเดท Cache Info หลังดาวน์โหลด
      await checkCacheInfo();
    } catch (err) {
      setError(err.message || 'Unknown error occurred');
      console.error('Test Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ล้าง Cache
  const clearCache = async () => {
    if (confirm('ต้องการลบโมเดล AI ที่ดาวน์โหลดไว้ทั้งหมด?')) {
      try {
        const databases = await indexedDB.databases();
        for (const db of databases) {
          if (db.name.includes('mlc') || db.name.includes('webllm')) {
            indexedDB.deleteDatabase(db.name);
          }
        }
        
        // Clear Cache Storage
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(name => caches.delete(name))
          );
        }

        alert('✅ Cache ถูกลบเรียบร้อยแล้ว! กรุณารีเฟรชหน้านี้');
        window.location.reload();
      } catch (err) {
        alert('❌ ไม่สามารถลบ Cache ได้: ' + err.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Local AI Test - GTS Alpha</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🧪 Local AI Test Lab
          </h1>

          {/* WebGPU Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🔍 System Requirements
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">WebGPU Support:</span>
                <span className={`font-bold ${webGPUSupport ? 'text-green-600' : 'text-red-600'}`}>
                  {webGPUSupport === null ? '⏳ Checking...' : webGPUSupport ? '✅ Supported' : '❌ Not Supported'}
                </span>
              </div>
              {webGPUSupport === false && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 text-sm text-red-700 dark:text-red-400">
                  ⚠️ WebGPU ไม่รองรับในเบราว์เซอร์นี้ กรุณาใช้ Chrome 113+ หรือ Edge 113+
                </div>
              )}
            </div>
          </div>

          {/* Cache Info */}
          {cacheInfo && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  💾 Browser Storage (IndexedDB)
                </h2>
                <button
                  onClick={clearCache}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  🗑️ Clear Cache
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Used</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{cacheInfo.usage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{cacheInfo.quota}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Usage</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{cacheInfo.percentage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Model Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🤖 Select Model to Test
            </h2>
            <div className="space-y-3">
              {availableLocalModels.map((model) => (
                <label
                  key={model.id}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedModel === model.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value={model.id}
                    checked={selectedModel === model.id}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 dark:text-white">{model.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{model.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Test Button */}
          <div className="text-center mb-6">
            <button
              onClick={testModel}
              disabled={isLoading || !webGPUSupport}
              className={`px-8 py-4 text-lg font-bold rounded-lg transition-colors ${
                isLoading || !webGPUSupport
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? '⏳ Loading...' : '🚀 Test Model'}
            </button>
          </div>

          {/* Progress */}
          {progress && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-300 whitespace-pre-wrap">{progress}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 dark:text-red-300">❌ {error}</p>
            </div>
          )}

          {/* Result */}
          {testResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 dark:text-green-300 mb-2">
                ✅ Test Result:
              </h3>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{testResult}</p>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-300 mb-2">
              ℹ️ สิ่งที่จะเกิดขึ้นเมื่อกด Test:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
              <li>โมเดลจะถูกดาวน์โหลดจาก Hugging Face (ครั้งแรกเท่านั้น)</li>
              <li>เก็บไว้ใน IndexedDB ของเบราว์เซอร์ (ไม่ต้องดาวน์โหลดซ้ำครั้งถัดไป)</li>
              <li>ประมวลผลด้วย WebGPU (ใช้ GPU ของเครื่องคุณ)</li>
              <li>ข้อมูลไม่ออกจากเครื่อง - ทำงานใน Browser 100%</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestLocalAI;
