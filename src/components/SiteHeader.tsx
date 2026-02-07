"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className="relative z-40 w-full border-b border-purple-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-transparent backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="h-14 sm:h-16 flex items-center justify-between">
                    <Link href="/" className="group relative">
                        <span className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-300 group-hover:via-violet-300 group-hover:to-indigo-300">
                            Crownwell Games
                        </span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <nav className="flex items-center gap-1 sm:gap-2">
                        <Link
                            href="/"
                            className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${pathname === "/"
                                ? "text-white bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            <span className="relative z-10">Home</span>
                            {pathname === "/" && (
                                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-sm"></span>
                            )}
                        </Link>
                        <Link
                            href="/games"
                            className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${pathname === "/games"
                                ? "text-white bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            <span className="relative z-10">Games</span>
                            {pathname === "/games" && (
                                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-sm"></span>
                            )}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}


