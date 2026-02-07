"use client";

import { useEffect, useState, useCallback } from "react";

const COLUMNS = 5;
const MAX_ROWS = 12;
const STARTING_VALUES = [2, 4, 8, 16, 32];

type Cell = number | null;

function createEmptyBoard(): Cell[][] {
    return Array.from({ length: MAX_ROWS }, () => Array.from({ length: COLUMNS }, () => null));
}

function getRandomValue(): number {
    const values = [2, 2, 2, 4, 4, 8];
    return values[Math.floor(Math.random() * values.length)];
}

function findTopEmptyRow(board: Cell[][], col: number): number | null {
    for (let row = MAX_ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            return row;
        }
    }
    return null;
}

function mergeTiles(board: Cell[][], col: number, startRow: number, value: number): { board: Cell[][]; scoreGain: number } {
    const newBoard = board.map((r) => r.slice());
    let currentRow = startRow;
    let currentValue = value;
    let scoreGain = 0;

    // Check if we can merge with the tile above
    while (currentRow > 0 && newBoard[currentRow - 1][col] === currentValue) {
        const mergedValue = currentValue * 2;
        scoreGain += mergedValue;
        newBoard[currentRow - 1][col] = mergedValue;
        newBoard[currentRow][col] = null;
        currentValue = mergedValue;
        currentRow = currentRow - 1;
    }

    // If no merge happened, place the tile at startRow
    if (currentRow === startRow && newBoard[startRow][col] === null) {
        newBoard[startRow][col] = currentValue;
    }

    return { board: newBoard, scoreGain };
}

function isGameOver(board: Cell[][]): boolean {
    for (let col = 0; col < COLUMNS; col++) {
        if (board[0][col] === null) {
            return false;
        }
    }
    return true;
}

export default function NumberTilesPage() {
    const [board, setBoard] = useState<Cell[][]>(() => {
        const b = createEmptyBoard();
        // Add starting tiles at the top
        for (let col = 0; col < COLUMNS; col++) {
            b[0][col] = STARTING_VALUES[col];
        }
        return b;
    });
    const [currentBlock, setCurrentBlock] = useState<number>(() => getRandomValue());
    const [nextBlock, setNextBlock] = useState<number>(() => getRandomValue());
    const [score, setScore] = useState(0);
    const [best, setBest] = useState<number>(0);
    const [gameOver, setGameOver] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedBest = window.localStorage.getItem("best-number-tiles");
        if (savedBest) {
            setBest(Number(savedBest));
        }
    }, []);

    const shootBlock = useCallback((col: number) => {
        if (gameOver) return;

        const topRow = findTopEmptyRow(board, col);
        if (topRow === null) {
            // Column is full, check if game is over
            if (isGameOver(board)) {
                setGameOver(true);
                if (score > best) {
                    setBest(score);
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem("best-number-tiles", String(score));
                    }
                }
            }
            return;
        }

        const { board: newBoard, scoreGain } = mergeTiles(board, col, topRow, currentBlock);
        setBoard(newBoard);
        setScore((s) => s + scoreGain);
        setCurrentBlock(nextBlock);
        setNextBlock(getRandomValue());

        // Check if game is over after placing block
        if (isGameOver(newBoard)) {
            setGameOver(true);
            if (score + scoreGain > best) {
                setBest(score + scoreGain);
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("best-number-tiles", String(score + scoreGain));
                }
            }
        }
    }, [board, currentBlock, nextBlock, gameOver, score, best]);

    const reset = () => {
        const b = createEmptyBoard();
        for (let col = 0; col < COLUMNS; col++) {
            b[0][col] = STARTING_VALUES[col];
        }
        setBoard(b);
        setCurrentBlock(getRandomValue());
        setNextBlock(getRandomValue());
        setScore(0);
        setGameOver(false);
    };

    const getTileColor = (value: number): string => {
        const colors: Record<number, string> = {
            2: "#ec4899", // pink
            4: "#06b6d4", // cyan
            8: "#3b82f6", // blue
            16: "#8b5cf6", // purple
            32: "#f97316", // orange
            64: "#10b981", // green
            128: "#f59e0b", // amber
            256: "#ef4444", // red
            512: "#6366f1", // indigo
            1024: "#14b8a6", // teal
            2048: "#f43f5e", // rose
        };
        return colors[value] || "#6b7280";
    };

    return (
        <div className="w-full flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 gap-4 sm:gap-6">
            <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3 sm:gap-4 px-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-neutral-50">Number Tiles</h1>
                <div className="flex gap-2 sm:gap-3">
                    <div className="rounded-lg bg-neutral-200 dark:bg-neutral-800 px-3 sm:px-4 py-2 text-center">
                        <div className="text-xs uppercase text-neutral-600 dark:text-neutral-400">Score</div>
                        <div className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-neutral-50">
                            {isMounted ? score.toLocaleString() : "0"}
                        </div>
                    </div>
                    <div className="rounded-lg bg-neutral-200 dark:bg-neutral-800 px-3 sm:px-4 py-2 text-center">
                        <div className="text-xs uppercase text-neutral-600 dark:text-neutral-400">Best</div>
                        <div className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-neutral-50">
                            {isMounted ? best.toLocaleString() : "0"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Board */}
            <div className="w-full max-w-2xl">
                <div
                    className="relative rounded-lg overflow-hidden"
                    style={{
                        background: "linear-gradient(to bottom, #a5b4fc, #6366f1)",
                        minHeight: "400px",
                    }}
                >
                    {/* Board Columns */}
                    <div className="grid grid-cols-5 gap-1 p-2 pb-20">
                        {Array.from({ length: MAX_ROWS }).map((_, rowIdx) => (
                            <div key={`row-${rowIdx}`} className="contents">
                                {Array.from({ length: COLUMNS }).map((_, colIdx) => {
                                    const value = board[rowIdx][colIdx];
                                    return (
                                        <div
                                            key={`cell-${rowIdx}-${colIdx}`}
                                            className="aspect-square rounded-md flex items-center justify-center font-bold text-white text-sm sm:text-base md:text-lg relative overflow-hidden"
                                            style={{
                                                backgroundColor: value ? getTileColor(value) : "rgba(255, 255, 255, 0.1)",
                                                minHeight: "40px",
                                            }}
                                        >
                                            {value && (
                                                <span className="drop-shadow-lg">{value}</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Shooter Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-purple-600 to-purple-500 flex flex-col items-center gap-3">
                        <div className="text-white text-xs font-semibold mb-1">Shoot Here</div>
                        <div className="flex gap-2 items-center">
                            {Array.from({ length: COLUMNS }).map((_, colIdx) => {
                                const topRow = findTopEmptyRow(board, colIdx);
                                const canShoot = topRow !== null && !gameOver;
                                return (
                                    <button
                                        key={`shoot-${colIdx}`}
                                        onClick={() => shootBlock(colIdx)}
                                        disabled={!canShoot}
                                        className="flex-1 aspect-square rounded-md flex items-center justify-center font-bold text-white text-sm sm:text-base transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                                        style={{
                                            backgroundColor: canShoot ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                                            border: canShoot ? "2px solid rgba(255, 255, 255, 0.5)" : "2px solid rgba(255, 255, 255, 0.2)",
                                        }}
                                        aria-label={`Shoot to column ${colIdx + 1}`}
                                    >
                                        {colIdx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex flex-col items-center gap-1">
                                <div className="text-white text-xs font-semibold">Current</div>
                                <div
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-md flex items-center justify-center font-bold text-white text-xl sm:text-2xl shadow-lg border-2 border-white"
                                    style={{ backgroundColor: getTileColor(currentBlock) }}
                                >
                                    {currentBlock}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="text-white text-xs font-semibold">Next</div>
                                <div
                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center font-bold text-white text-lg sm:text-xl shadow-lg border-2 border-white opacity-80"
                                    style={{ backgroundColor: getTileColor(nextBlock) }}
                                >
                                    {nextBlock}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center flex-wrap justify-center">
                <button
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm sm:text-base font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    onClick={reset}
                >
                    New Game
                </button>
                {gameOver && (
                    <span className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-red-100 dark:bg-red-900/40 border-2 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 text-sm sm:text-base font-bold text-center">
                        Game Over!
                    </span>
                )}
            </div>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-center max-w-md px-4">
                Click on a column number to shoot the current block. Matching numbers will merge!
            </p>
        </div>
    );
}
