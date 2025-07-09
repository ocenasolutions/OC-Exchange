import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
              ← Back to Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, make
                transactions, or contact us for support.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Government-issued identification for KYC verification</li>
                <li>Financial information for payment processing</li>
                <li>Transaction history and trading data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Provide and maintain our trading services</li>
                <li>Process transactions and manage your account</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Prevent fraud and enhance security</li>
                <li>Improve our services and user experience</li>
                <li>Communicate with you about your account and our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement comprehensive security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Multi-factor authentication requirements</li>
                <li>Regular security audits and monitoring</li>
                <li>Secure data centers with physical access controls</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Access and review your personal data</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Object to certain processing activities</li>
                <li>Data portability for certain information</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies and similar technologies to enhance your experience and analyze usage patterns. You can
                control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. International Transfers</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We retain your information for as long as necessary to provide our services and comply with legal
                obligations. Specific retention periods vary based on the type of information and applicable
                regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new policy on our platform and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: privacy@ocexchange.com
                  <br />
                  Address: 123 Crypto Street, Digital City, DC 12345
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
