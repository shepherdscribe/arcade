import Link from "next/link";

export default function Home() {
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
                WELCOME TO<br />CROWNWELL GAMES
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 font-medium italic mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              &quot;It is the glory of God to conceal a matter; to search out a matter is the glory of kings.&quot;
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              A collection of custom games including 2048 and visual novels.
              <span className="text-purple-300 font-semibold block mt-2">
                No signup required, just pure gaming fun!
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link href="/games" className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  START PLAYING
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 px-2">
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                FEATURED GAMES
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 font-medium max-w-2xl mx-auto px-4">
              Our most popular games that players love
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 2048 Game Card */}
            <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/40 transform transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-purple-600/80 to-indigo-600/80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                <div className="text-6xl relative z-10">🧩</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">2048</h3>
                <p className="text-base md:text-lg text-slate-300 mb-4 font-medium leading-relaxed">Custom 2048 game. Combine tiles to reach 2048 and beyond!</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm md:text-base text-slate-400 font-medium">
                    <span>Strategy</span>
                    <span>•</span>
                    <span>Puzzle</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <span className="text-lg">⭐</span>
                    <span className="text-white font-bold text-base">4.8</span>
                  </div>
                </div>
                <Link href="/games/2048" className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/20">
                  PLAY NOW
                </Link>
              </div>
            </div>

            {/* Fireplace Visual Novel Card */}
            <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/40 transform transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-violet-600/80 to-purple-600/80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent"></div>
                <div className="text-6xl relative z-10">🔥</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Fireplace</h3>
                <p className="text-base md:text-lg text-slate-300 mb-4 font-medium leading-relaxed">A visual novel that allows you to encounter God in different realms.</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm md:text-base text-slate-400 font-medium">
                    <span>Visual Novel</span>
                    <span>•</span>
                    <span>Spiritual</span>
                  </div>
                  <div className="flex items-center gap-1 text-violet-400">
                    <span className="text-lg">✨</span>
                    <span className="text-white font-bold text-base">New</span>
                  </div>
                </div>
                <Link href="/games/fireplace" className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/20">
                  EXPLORE
                </Link>
              </div>
            </div>

            {/* Number Tiles Game Card - Hidden for now */}
            {/* <div className="group bg-white dark:bg-neutral-100 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/25 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <div className="text-6xl">🔢</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-3">Number Tiles</h3>
                <p className="text-base md:text-lg text-slate-900 mb-4 font-semibold leading-relaxed">Fast-paced number matching. How fast can you clear the board?</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm md:text-base text-slate-950 font-bold">
                    <span>⚡ Fast-paced</span>
                    <span>🔢 Numbers</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-700">
                    <span className="text-lg">⭐</span>
                    <span className="text-slate-950 font-extrabold text-base">4.6</span>
                  </div>
                </div>
                <Link href="/games/number-tiles" className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                  PLAY NOW
                </Link>
              </div>
            </div> */}

            {/* Coming Soon Game Card */}
            <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/40 transform transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-violet-600/80 to-purple-600/80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent"></div>
                <div className="text-6xl relative z-10">🚀</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">More Games</h3>
                <p className="text-base md:text-lg text-slate-300 mb-4 font-medium leading-relaxed">Visual novels and more games coming soon. Stay tuned!</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm md:text-base text-slate-400 font-medium">
                    <span>Coming Soon</span>
                    <span>•</span>
                    <span>Hot</span>
                  </div>
                  <div className="flex items-center gap-1 text-violet-400">
                    <span className="text-lg">🆕</span>
                    <span className="text-white font-bold text-base">NEW</span>
                  </div>
                </div>
                <div className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-slate-400 text-center py-3 rounded-lg font-semibold cursor-not-allowed border border-slate-600">
                  COMING SOON
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-500/30 shadow-xl">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-medium leading-relaxed px-4">
              Gaming is originally a creative process and expression in the Kingdom of God.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-500/30 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                READY TO PLAY?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Explore custom games and interactive experiences.
              <span className="block mt-2 text-purple-300">No downloads, no signups - just pure gaming fun!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/games" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 w-full sm:w-auto">
                BROWSE ALL GAMES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-sm border-t border-purple-500/20 py-6 sm:py-8 px-4 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              CROWNWELL GAMES
            </h3>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-medium mb-3 sm:mb-4 px-4">
            A collection of custom games and interactive experiences. Play anywhere, anytime!
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base md:text-lg text-slate-400 font-medium px-4">
            <Link href="/privacy" className="hover:text-purple-400 transition-colors underline-offset-4 hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors underline-offset-4 hover:underline">Terms</Link>
            <Link href="/contact" className="hover:text-purple-400 transition-colors underline-offset-4 hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
