"use client";

import { useState } from "react";

const initialItems = [
  { id: 1, label: "Shruti ur so hot!", crossed: false },
  { id: 2, label: '"My roommates!" when Vedika and Ananya are taking pics', crossed: false },
  { id: 3, label: "Orders LIIT and tries to get everyone to take a sip to split the bill", crossed: false },
  { id: 4, label: "Is hectic about smoking up", crossed: false },
  { id: 5, label: "Tells some obscure charcuterie board story", crossed: false },
  { id: 6, label: 'Picks something weird asl to go on the walls and says “I will put this on my walls!”', crossed: false },
  { id: 7, label: '“I’m so high” in orgasmic voice', crossed: false },
  { id: 8, label: 'Bullies Samriddha in some lowkey “horrible woman” kinda way', crossed: false },
  { id: 9, label: "Brags about Sahil’s money", crossed: false },
  { id: 10, label: "Tries to make others partake in specific plans she is interested in even though they are not", crossed: false },
  { id: 11, label: "Takes the most comfortable bed without any consideration for anyone else’s concerns", crossed: false },
  { id: 12, label: "Does not contribute in crushing at all", crossed: false },
  { id: 13, label: '"Can I have the first puff?"', crossed: false },
  { id: 14, label: "Interrupts someone else while they are talking with some obscure shit for attention", crossed: false },
  { id: 15, label: "Comes up with complex games played in US colleges like assassin", crossed: false },
  { id: 16, label: "I cant wait to move to the US", crossed: false },
  { id: 17, label: "Talks with ALL FOUR LIMBS", crossed: false },
  { id: 18, label: "Not helping with ANY cooking or cleaning or ANYTHING AT ALLLLLLL !!!!", crossed: false },
  { id: 19, label: "Tries to make everyone play some game which most people dont wanna play", crossed: false },
  { id: 20, label: "Tries to make a hectic schedule about our day", crossed: false },
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
      <div className="w-full max-w-7xl rounded-3xl bg-white shadow-xl p-6 border border-pink-100">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Munnar Bingo
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Tap an item to cross it out
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {items.map((item) => (
  <button
    key={item.id}
    onClick={() => toggleItem(item.id)}
    className={`rounded-2xl border p-4 text-sm font-semibold text-left transition ${
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