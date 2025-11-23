import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Gittisak Wannakeeree</title>
      </Head>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <div className="prose prose-blue text-gray-600 max-w-none">
              <p className="text-sm text-gray-500 mb-6">Last updated: November 23, 2025</p>
              
              <p>
                Gittisak Wannakeeree ("we", "our", or "us") operates this portfolio website (the "Service"). 
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Types of Data Collected</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                  <ul className="list-circle pl-5 mt-2">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Profile picture</li>
                    <li>Cookies and Usage Data</li>
                  </ul>
                </li>
                <li><strong>Third-Party Social Login Data:</strong> We allow you to create an account and log in to use the Service through the following Third-party Social Media Services:
                  <ul className="list-circle pl-5 mt-2">
                    <li><strong>Google:</strong> We access your Google Profile information (Name, Email, Profile Picture) to authenticate you.</li>
                    <li><strong>LINE:</strong> We access your LINE Profile information (Display Name, User ID, Picture URL, Status Message) to authenticate you.</li>
                    <li><strong>Facebook:</strong> We access your Facebook Profile information (Name, Email, Picture) to authenticate you.</li>
                    <li><strong>Twitter (X):</strong> We access your Twitter Profile information (Name, Username, Profile Picture) to authenticate you.</li>
                    <li><strong>TikTok:</strong> We access your TikTok Profile information (Name, Username, Profile Picture) to authenticate you.</li>
                  </ul>
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Use of Data</h2>
              <p>Gittisak Wannakeeree uses the collected data for various purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service (e.g., AI Chat) when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. Data Retention</h2>
              <p>
                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. 
                We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Service Providers</h2>
              <p>
                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, 
                to perform Service-related services or to assist us in analyzing how our Service is used.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Supabase:</strong> Used for authentication and database storage.</li>
                <li><strong>Google Gemini API / OpenAI API:</strong> Used to process chat messages. Your chat content is sent to these providers to generate responses.</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Your Data Protection Rights</h2>
              <p>
                You have the right to access, update or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section. 
                If you are unable to perform these actions yourself, please contact us to assist you.
              </p>
              <p className="mt-2">
                <strong>For LINE Users:</strong> You can revoke the Service's access to your LINE account at any time via the LINE app settings (Connected Apps).
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>By email: gittisak.go@gmail.com</li>
                <li>Website: <a href="https://gittisak-go.github.io/gts-b" className="text-blue-600 hover:underline">https://gittisak-go.github.io/gts-b</a></li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
