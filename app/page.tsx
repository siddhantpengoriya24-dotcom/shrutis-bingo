"use client";

import { useState } from "react";

const initialItems = [
  { id: 1, label: "A", crossed: false },
  { id: 2, label: "B", crossed: false },
];

export default function Home() {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, crossed: !item.crossed } : item
      )
    );
  };

  const resetBoard = () => {
    setItems((current) =>
      current.map((item) => ({ ...item, crossed: false }))
    );
  };

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8 border border-pink-100">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Shruti&apos;s Bingo
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Tap an item to cross it out
        </p>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`rounded-2xl border p-8 text-xl font-semibold transition ${
                item.crossed
                  ? "bg-pink-200 text-gray-500 line-through border-pink-300"
                  : "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-150"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={resetBoard}
          className="mt-8 w-full rounded-2xl bg-pink-600 text-white py-3 font-medium hover:bg-pink-700 transition"
        >
          Reset
        </button>
      </div>
    </main>
  );
}