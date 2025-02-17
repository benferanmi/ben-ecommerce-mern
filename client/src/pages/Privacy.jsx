import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <header className="text-center space-y-4">

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-gray-600">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </header>
                    <div className="prose prose-gray max-w-none space-y-8">
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Introduction
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Information We Collect
                            </h2>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-gray-400 rounded-full"></span>
                                    <span className="ml-4">Personal identification information (Name, email address, phone number)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-gray-400 rounded-full"></span>
                                    <span className="ml-4">Usage data and analytics</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-gray-400 rounded-full"></span>
                                    <span className="ml-4">Cookies and tracking technologies</span>
                                </li>
                            </ul>
                        </section>
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                How We Use Your Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We use the information we collect in various ways, including:
                            </p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-gray-400 rounded-full"></span>
                                    <span className="ml-4">Provide, operate, and maintain our website</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-gray-400 rounded-full"></span>
                                    <span className="ml-4">Improve, personalize, and expand our website</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-gray-400 rounded-full"></span>
                                    <span className="ml-4">Understand and analyze how you use our website</span>
                                </li>
                            </ul>
                        </section>
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Contact Us
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4">
                                <a href="mailto:privacy@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    privacy@example.com
                                </a>
                            </div>
                        </section>
                    </div>
                    <div className="text-center pt-8">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                ></path>
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
export default PrivacyPolicy;