"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Direction = "up" | "down" | "left" | "right";

type Cell = {
    id: string;
    value: number;
    mergedFrom?: string[];
    isNew?: boolean; // Track if this tile was just added
};

type Position = { row: number; col: number };

const GRID_SIZE = 4;

// Sprite sheet configuration
const SPRITE_SHEET = "/assets/2048/tiles.png";
const GLOW_SHEET = "/assets/2048/glow.png";
const SPRITE_SIZE = 96; // Size of each tile in the sprite sheet
const SPRITES_PER_ROW = 4; // 4 tiles per row in your sprite sheet

// Tile value to sprite position mapping
const TILE_SPRITES: Record<number, { row: number; col: number }> = {
    2: { row: 0, col: 0 },      // Top-left: 2
    4: { row: 0, col: 1 },      // Top: 4
    8: { row: 0, col: 2 },      // Top: 8
    16: { row: 0, col: 3 },     // Top-right: 16
    32: { row: 1, col: 0 },     // Second row: 32
    64: { row: 1, col: 1 },     // Second row: 64
    128: { row: 1, col: 2 },    // Second row: 128
    256: { row: 1, col: 3 },    // Second row: 256
    512: { row: 2, col: 0 },    // Third row: 512
    1024: { row: 2, col: 1 },  // Third row: 1024
    2048: { row: 2, col: 2 },  // Third row: 2048
    4096: { row: 2, col: 3 },  // Third row: 4096
    8192: { row: 3, col: 0 },  // Bottom row: 8192
};

// Glow effect to sprite position mapping for variant glow system
const GLOW_SPRITES: Record<number, { row: number; col: number }> = {
    2: { row: 0, col: 0 },      // Glow for tile 2
    4: { row: 0, col: 1 },      // Glow for tile 4
    8: { row: 0, col: 2 },      // Glow for tile 8
    16: { row: 0, col: 3 },     // Glow for tile 16
    32: { row: 1, col: 0 },     // Glow for tile 32
    64: { row: 1, col: 1 },     // Glow for tile 64
    128: { row: 1, col: 2 },    // Glow for tile 128
    256: { row: 1, col: 3 },    // Glow for tile 256
    512: { row: 2, col: 0 },    // Glow for tile 512
    1024: { row: 2, col: 1 },  // Glow for tile 1024
    2048: { row: 2, col: 2 },  // Glow for tile 2048
    4096: { row: 2, col: 3 },  // Glow for tile 4096
    8192: { row: 3, col: 0 },  // Glow for tile 8192
};

function generateId() {
    return Math.random().toString(36).slice(2, 10);
}

function createEmptyGrid(): (Cell | null)[][] {
    return Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => null));
}

function getEmptyPositions(grid: (Cell | null)[][]): Position[] {
    const positions: Position[] = [];
    for (let row = 0; row < GRID_SIZE; row += 1) {
        for (let col = 0; col < GRID_SIZE; col += 1) {
            if (!grid[row][col]) positions.push({ row, col });
        }
    }
    return positions;
}

function addRandomTile(grid: (Cell | null)[][]): { grid: (Cell | null)[][]; added: boolean } {
    const empty = getEmptyPositions(grid);
    if (empty.length === 0) return { grid, added: false };
    const { row, col } = empty[Math.floor(Math.random() * empty.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    const copy = grid.map((r) => r.slice());
    copy[row][col] = { id: generateId(), value, isNew: true }; // Mark as new
    return { grid: copy, added: true };
}

function rotateGrid(grid: (Cell | null)[][]): (Cell | null)[][] {
    // Rotate 90 deg clockwise
    const result = createEmptyGrid();
    for (let r = 0; r < GRID_SIZE; r += 1) {
        for (let c = 0; c < GRID_SIZE; c += 1) {
            result[c][GRID_SIZE - 1 - r] = grid[r][c];
        }
    }
    return result;
}

function slideAndMergeRow(row: (Cell | null)[]): { row: (Cell | null)[]; scoreGain: number } {
    const tiles = row.filter(Boolean) as Cell[];
    const merged: Cell[] = [];
    let scoreGain = 0;
    for (let i = 0; i < tiles.length; i += 1) {
        const current = tiles[i];
        const next = tiles[i + 1];
        if (next && current.value === next.value) {
            const newValue = current.value * 2;
            scoreGain += newValue;
            merged.push({ id: generateId(), value: newValue, mergedFrom: [current.id, next.id], isNew: false }); // Explicitly set isNew: false
            i += 1; // skip next
        } else {
            // Preserve existing tile but ensure isNew is false
            merged.push({ ...current, isNew: false });
        }
    }
    while (merged.length < GRID_SIZE) {
        merged.push(null as unknown as Cell);
    }
    return { row: merged as unknown as (Cell | null)[], scoreGain };
}

function move(grid: (Cell | null)[][], direction: Direction): { grid: (Cell | null)[][]; moved: boolean; scoreGain: number } {
    let working = grid.map((r) => r.slice());
    let rotations = 0;
    if (direction === "up") rotations = 3;
    if (direction === "right") rotations = 2;
    if (direction === "down") rotations = 1;
    for (let i = 0; i < rotations; i += 1) working = rotateGrid(working);

    let moved = false;
    let scoreGain = 0;
    const newRows: (Cell | null)[][] = [];
    for (const row of working) {
        const compacted = row.filter(Boolean) as Cell[];
        const padded = [...compacted, ...Array(GRID_SIZE - compacted.length).fill(null)];
        const { row: mergedRow, scoreGain: gain } = slideAndMergeRow(padded as (Cell | null)[]);
        scoreGain += gain;
        if (!arraysEqual(row, mergedRow)) moved = true;
        newRows.push(mergedRow);
    }

    let unrotate = (r: (Cell | null)[][]) => r;
    if (rotations === 1) unrotate = (r) => rotateGrid(rotateGrid(rotateGrid(r)));
    if (rotations === 2) unrotate = (r) => rotateGrid(rotateGrid(r));
    if (rotations === 3) unrotate = (r) => rotateGrid(r);
    const restored = unrotate(newRows);

    return { grid: restored, moved, scoreGain };
}

function arraysEqual(a: (Cell | null)[], b: (Cell | null)[]) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
        const ca = a[i];
        const cb = b[i];
        if (!ca && !cb) continue;
        if (!ca || !cb) return false;
        if (ca.value !== cb.value) return false;
    }
    return true;
}

function canMove(grid: (Cell | null)[][]): boolean {
    if (getEmptyPositions(grid).length > 0) return true;
    // check adjacent equal tiles
    for (let r = 0; r < GRID_SIZE; r += 1) {
        for (let c = 0; c < GRID_SIZE; c += 1) {
            const t = grid[r][c];
            const right = c + 1 < GRID_SIZE ? grid[r][c + 1] : null;
            const down = r + 1 < GRID_SIZE ? grid[r + 1][c] : null;
            if ((t && right && t.value === right.value) || (t && down && t.value === down.value)) return true;
        }
    }
    return false;
}

// Component for rendering individual tiles from sprite sheet
function TileSprite({ value, isNew, className }: { value: number; isNew?: boolean; className?: string }) {
    const spritePos = TILE_SPRITES[value];

    if (!spritePos) {
        // Hide number tiles option - return empty div instead of showing numbers
        return (
            <div className={`w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 ${className || ''}`} />
        );
    }

    const backgroundPosition = `-${spritePos.col * SPRITE_SIZE}px -${spritePos.row * SPRITE_SIZE}px`;

    // Choose which sprite sheet to use based on whether tile is new
    const spriteSheet = isNew ? GLOW_SHEET : SPRITE_SHEET;

    return (
        <div
            className={`w-full h-full ${className || ''}`}
            style={{
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition,
                backgroundSize: `${SPRITES_PER_ROW * SPRITE_SIZE}px ${SPRITES_PER_ROW * SPRITE_SIZE}px`,
                backgroundRepeat: 'no-repeat'
            }}
        />
    );
}

export default function Game2048Page() {
    const [grid, setGrid] = useState<(Cell | null)[][]>(createEmptyGrid);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState<number>(0);
    const [bestPlayerName, setBestPlayerName] = useState<string>("");
    const [isMounted, setIsMounted] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [newBestScore, setNewBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Initialize game after mount to avoid hydration mismatch
    useEffect(() => {
        setIsMounted(true);
        const savedBest = window.localStorage.getItem("best-2048");
        const savedName = window.localStorage.getItem("best-2048-name");
        if (savedBest) {
            setBest(Number(savedBest));
        }
        if (savedName) {
            setBestPlayerName(savedName);
        }

        // Initialize grid with tiles after mount
        let g = createEmptyGrid();
        g = addRandomTile(g).grid;
        g = addRandomTile(g).grid;
        setGrid(g);
    }, []);

    useEffect(() => {
        if (!canMove(grid)) {
            setGameOver(true);
            // Update best score when game ends
            if (score > best) {
                setBest(score);
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("best-2048", String(score));
                }
                // Show name input popup for new best score
                if (!showNameInput) {
                    setNewBestScore(score);
                    setShowNameInput(true);
                }
            }
        }
    }, [grid, score, best, showNameInput]);

    const handleKey = (e: KeyboardEvent) => {
        if (gameOver) return;
        const map: Record<string, Direction> = {
            ArrowUp: "up",
            ArrowDown: "down",
            ArrowLeft: "left",
            ArrowRight: "right",
            w: "up",
            s: "down",
            a: "left",
            d: "right",
        };
        const dir = map[e.key];
        if (!dir) return;
        e.preventDefault();

        const { grid: g, moved, scoreGain } = move(grid, dir);
        if (moved) {
            const withNew = addRandomTile(g).grid;
            setGrid(withNew);
            if (scoreGain > 0) setScore((s) => s + scoreGain);
        }
    };

    useEffect(() => {
        const listener = (ev: KeyboardEvent) => handleKey(ev);
        window.addEventListener("keydown", listener, { passive: false });
        return () => window.removeEventListener("keydown", listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grid, gameOver]);

    const handleSaveName = (name: string) => {
        const trimmedName = name.trim() || "Anonymous";
        setBestPlayerName(trimmedName);
        setBest(newBestScore);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("best-2048", String(newBestScore));
            window.localStorage.setItem("best-2048-name", trimmedName);
        }
        setShowNameInput(false);
    };

    const reset = () => {
        let g = createEmptyGrid();
        g = addRandomTile(g).grid;
        g = addRandomTile(g).grid;

        // Keep only the second tile as new
        let firstTileFound = false;
        g = g.map(row =>
            row.map(cell => {
                if (cell && cell.isNew && !firstTileFound) {
                    firstTileFound = true;
                    return { ...cell, isNew: false };
                }
                return cell;
            })
        );

        setGrid(g);
        setScore(0);
        setGameOver(false);
    };

    const maxTile = useMemo(() => {
        let m = 0;
        for (const row of grid) for (const cell of row) if (cell) m = Math.max(m, cell.value);
        return m;
    }, [grid]);

    return (
        <div className="w-full flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 gap-4 sm:gap-6">
            {/* Navigation */}
            <div className="w-full max-w-md flex items-center justify-center gap-3 sm:gap-4 px-2">
                <Link href="/" className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-500/40 font-medium text-sm sm:text-base transition-all duration-300">
                    Home
                </Link>
                <Link href="/games" className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-500/40 font-medium text-sm sm:text-base transition-all duration-300">
                    All Games
                </Link>
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3 sm:gap-4 px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 dark:text-neutral-50 drop-shadow-sm">2048</h1>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-center shadow-lg min-w-[75px] sm:min-w-[90px] flex-1 sm:flex-none">
                        <div className="text-[10px] sm:text-xs md:text-sm uppercase text-neutral-950 dark:text-neutral-50 font-extrabold tracking-wider mb-1 sm:mb-1.5">Score</div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-neutral-50 leading-tight">
                            {isMounted ? score.toLocaleString() : "0"}
                        </div>
                    </div>
                    <div className="rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-center shadow-lg min-w-[75px] sm:min-w-[90px] flex-1 sm:flex-none">
                        <div className="text-[10px] sm:text-xs md:text-sm uppercase text-neutral-950 dark:text-neutral-50 font-extrabold tracking-wider mb-1 sm:mb-1.5">Best</div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-neutral-50 leading-tight">
                            {isMounted ? best.toLocaleString() : "0"}
                        </div>
                        {isMounted && bestPlayerName && (
                            <div className="text-[10px] sm:text-xs md:text-sm text-neutral-950 dark:text-neutral-50 mt-1.5 sm:mt-2 font-extrabold truncate max-w-[70px] sm:max-w-[80px] mx-auto">{bestPlayerName}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Game Board */}
            <div
                className="grid grid-cols-4 gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-md touch-pan-y select-none relative w-full max-w-sm sm:max-w-md"
                style={{
                    backgroundImage: 'url(/assets/2048/background.png)',
                    backgroundSize: '120%',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '280px',
                    aspectRatio: '1'
                }}
            >
                {grid.map((row, rIdx) => (
                    <div key={`r-${rIdx}`} className="contents">
                        {row.map((cell, cIdx) => (
                            <div
                                key={`c-${rIdx}-${cIdx}`}
                                className="w-full h-full min-w-0 rounded-md flex items-center justify-center select-none relative overflow-hidden"
                                style={{
                                    backgroundColor: cell ? 'transparent' : 'transparent',
                                    aspectRatio: '1'
                                }}
                            >
                                {cell ? (
                                    <TileSprite value={cell.value} isNew={cell.isNew} />
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 sm:gap-3 items-center flex-wrap justify-center px-2">
                <button
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm sm:text-base font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
                    onClick={reset}
                >
                    New Game
                </button>
                {gameOver && (
                    <span className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-red-100 dark:bg-red-900/40 border-2 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 text-sm sm:text-base font-bold shadow-lg text-center">
                        Game over! Max: {maxTile.toLocaleString()}
                    </span>
                )}
            </div>

            <Controls onMove={(d) => {
                const { grid: g, moved, scoreGain } = move(grid, d);
                if (moved) {
                    // Add new tile (this will be the only one with isNew: true)
                    const withNew = addRandomTile(g).grid;

                    setGrid(withNew);
                    if (scoreGain > 0) setScore((s) => s + scoreGain);
                }
            }} />

            <p className="text-base sm:text-lg md:text-xl text-neutral-950 dark:text-neutral-50 font-bold text-center max-w-md leading-relaxed px-4">
                Use arrow keys, WASD, or buttons to move. Combine tiles to reach 2048.
            </p>

            {/* Name Input Modal */}
            {showNameInput && (
                <NameInputModal
                    score={newBestScore}
                    onSave={handleSaveName}
                />
            )}
        </div>
    );
}

type ControlsProps = { onMove: (d: Direction) => void };
function Controls({ onMove }: ControlsProps) {
    return (
        <div className="sm:hidden grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs mx-auto">
            <div />
            <button
                className="rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-3 sm:px-5 sm:py-4 text-neutral-900 dark:text-neutral-100 font-extrabold text-xl sm:text-2xl transition-colors shadow-lg active:scale-95 touch-manipulation"
                onClick={() => onMove("up")}
                aria-label="Move up"
            >
                ↑
            </button>
            <div />
            <button
                className="rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-3 sm:px-5 sm:py-4 text-neutral-900 dark:text-neutral-100 font-extrabold text-xl sm:text-2xl transition-colors shadow-lg active:scale-95 touch-manipulation"
                onClick={() => onMove("left")}
                aria-label="Move left"
            >
                ←
            </button>
            <button
                className="rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-3 sm:px-5 sm:py-4 text-neutral-900 dark:text-neutral-100 font-extrabold text-xl sm:text-2xl transition-colors shadow-lg active:scale-95 touch-manipulation"
                onClick={() => onMove("down")}
                aria-label="Move down"
            >
                ↓
            </button>
            <button
                className="rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-3 sm:px-5 sm:py-4 text-neutral-900 dark:text-neutral-100 font-extrabold text-xl sm:text-2xl transition-colors shadow-lg active:scale-95 touch-manipulation"
                onClick={() => onMove("right")}
                aria-label="Move right"
            >
                →
            </button>
        </div>
    );
}

type NameInputModalProps = { score: number; onSave: (name: string) => void };
function NameInputModal({ score, onSave }: NameInputModalProps) {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 max-w-md w-full shadow-2xl border-2 border-neutral-300 dark:border-neutral-600 mx-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 text-neutral-900 dark:text-white">New Best Score!</h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-200 mb-4 sm:mb-6 font-semibold leading-relaxed">
                    Congratulations! You achieved a score of <span className="font-extrabold text-neutral-900 dark:text-white text-xl sm:text-2xl">{score.toLocaleString()}</span>
                </p>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 sm:mb-3 text-sm sm:text-base md:text-lg font-bold text-neutral-900 dark:text-white">
                        Enter your name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent mb-4 sm:mb-5 text-base sm:text-lg font-medium"
                        autoFocus
                        maxLength={20}
                    />
                    <div className="flex gap-2 sm:gap-3">
                        <button
                            type="submit"
                            className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => onSave("")}
                            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold text-sm sm:text-base hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors shadow-lg"
                        >
                            Skip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


