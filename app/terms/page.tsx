import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
              ← Back to Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using OC Exchange ("the Platform"), you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                OC Exchange is a cryptocurrency trading platform that allows users to buy, sell, and trade digital
                assets. We provide:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Cryptocurrency trading services</li>
                <li>Digital wallet functionality</li>
                <li>Market data and analysis tools</li>
                <li>Account management features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">To use our services, you must:</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Complete identity verification (KYC) when required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Trading Rules</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All trading activities are subject to our trading rules and market conditions. Users acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Cryptocurrency trading involves significant risk</li>
                <li>Prices are volatile and can change rapidly</li>
                <li>Past performance does not guarantee future results</li>
                <li>You are responsible for your trading decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Fees and Charges</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We charge fees for various services including trading, deposits, and withdrawals. Current fee schedules
                are available on our platform and may be updated from time to time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement industry-standard security measures, but users are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Keeping login credentials secure</li>
                <li>Enabling two-factor authentication</li>
                <li>Reporting suspicious activities immediately</li>
                <li>Using secure internet connections</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Prohibited Activities</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Users are prohibited from:</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Money laundering or terrorist financing</li>
                <li>Market manipulation or fraud</li>
                <li>Using the platform for illegal activities</li>
                <li>Attempting to hack or disrupt our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                OC Exchange shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes
                and continued use constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: legal@ocexchange.com
                  <br />
                  Address: 123 Crypto Street, Digital City, DC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
