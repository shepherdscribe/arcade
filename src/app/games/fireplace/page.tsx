import Link from "next/link";

export default function FireplaceLandingPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Subtle animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8 px-2">
                            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Fireplace for Abba&apos;s Sons and Daughters
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-purple-200 font-medium italic mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                            A visual novel that allows you to encounter God in different realms
                        </p>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                            Journey through immersive realms where divine encounters await. Experience the presence of God through interactive storytelling and meaningful choices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-12 sm:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 px-2">
                            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Experience Divine Encounters
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                            <div className="text-4xl sm:text-5xl mb-4">🌌</div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">Multiple Realms</h3>
                            <p className="text-slate-300 font-medium leading-relaxed">
                                Explore different spiritual realms, each offering unique encounters with the divine.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                            <div className="text-4xl sm:text-5xl mb-4">📖</div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">Interactive Storytelling</h3>
                            <p className="text-slate-300 font-medium leading-relaxed">
                                Make meaningful choices that shape your journey and deepen your spiritual experience.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                            <div className="text-4xl sm:text-5xl mb-4">✨</div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">Divine Presence</h3>
                            <p className="text-slate-300 font-medium leading-relaxed">
                                Experience the presence of God through beautifully crafted narratives and moments of reflection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative z-10 py-12 sm:py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-500/30 shadow-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 px-2">
                            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Begin Your Journey
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                            Step into the Fireplace and discover what God has prepared for you in these sacred realms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 w-full sm:w-auto">
                                Coming Soon
                            </button>
                            <Link href="/" className="bg-slate-700/50 text-slate-300 px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-slate-700/70 hover:text-white transition-all border border-slate-600/50 w-full sm:w-auto text-center">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
