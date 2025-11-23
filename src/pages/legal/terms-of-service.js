import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Gittisak Wannakeeree</title>
      </Head>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <div className="prose prose-blue text-gray-600 max-w-none">
              <p className="text-sm text-gray-500 mb-6">Last updated: November 23, 2025</p>
              
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Gittisak Wannakeeree portfolio website (the "Service") operated by Gittisak Wannakeeree ("us", "we", or "our").
              </p>
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p className="font-semibold">
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. AI Chat Usage</h2>
              <p>
                Our Service includes an AI Chat feature powered by third-party Large Language Models (LLMs) or local models. By using this feature, you agree to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You will not use the AI Chat to generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                <li>You acknowledge that the AI may generate incorrect or misleading information ("hallucinations") and should not be relied upon for professional advice (medical, legal, financial, etc.).</li>
                <li>We reserve the right to monitor and terminate your access to the AI Chat if you violate these usage guidelines.</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Gittisak Wannakeeree and its licensors. The Service is protected by copyright, trademark, and other laws of both Thailand and foreign countries.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Links To Other Web Sites</h2>
              <p>
                Our Service may contain links to third-party web sites or services that are not owned or controlled by Gittisak Wannakeeree.
              </p>
              <p>
                Gittisak Wannakeeree has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Gittisak Wannakeeree shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Termination</h2>
              <p>
                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall Gittisak Wannakeeree, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfService;
