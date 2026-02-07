import Link from "next/link";

export default function GamesIndexPage() {
    const games = [
        {
            slug: "2048",
            title: "2048",
            description: "Slide and merge tiles to reach 2048.",
            href: "/games/2048",
        },
        {
            slug: "fireplace",
            title: "Fireplace for Abba's Sons and Daughters",
            description: "A visual novel that allows you to encounter God in different realms.",
            href: "/games/fireplace",
        },
        // Number Tiles hidden for now
        // {
        //     slug: "number-tiles",
        //     title: "Number Tiles",
        //     description: "Slide tiles to order 1–15.",
        //     href: "/games/number-tiles",
        // },
    ];

    return (
        <div className="mx-auto max-w-5xl px-4 py-6">
            <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 dark:text-neutral-50 mb-1 sm:mb-2">Games</h1>
                    <p className="text-base sm:text-lg md:text-xl text-neutral-950 dark:text-neutral-100 font-bold">Pick a game to start playing.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {games.map((g) => (
                    <Link key={g.slug} href={g.href} className="group rounded-lg sm:rounded-xl border-2 border-black/[.1] dark:border-white/[.15] bg-white dark:bg-neutral-900 p-4 sm:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-neutral-50">{g.title}</h2>
                            <span className="opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition text-xl sm:text-2xl font-bold text-neutral-950 dark:text-neutral-50">→</span>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg text-neutral-950 dark:text-neutral-100 mt-1 sm:mt-2 font-bold leading-relaxed">{g.description}</p>
                    </Link>
                ))}
            </div>
        </div>
        </div>
    );
}


