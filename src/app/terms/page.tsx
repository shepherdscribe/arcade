import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-block mb-8 text-purple-400 hover:text-purple-300 transition-colors"
                >
                    ← Back to Home
                </Link>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Terms of Service
                </h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-neutral-300 mb-4">
                        Please read our terms of service. This page is currently under construction.
                    </p>
                    <p className="text-base text-neutral-400">
                        We are working on our terms of service and will update this page soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
