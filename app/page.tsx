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

type FireworkParticle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
};

type Firework = {
  id: number;
  x: number;
  y: number;
  particles: FireworkParticle[];
};

const colors = [
  "#ec4899",
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
  "#eab308",
  "#22c55e",
];

function createFirework(id: number): Firework {
  const x = 20 + Math.random() * 60;
  const y = 20 + Math.random() * 40;
  const particleCount = 18;

  const particles: FireworkParticle[] = Array.from({ length: particleCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / particleCount;
    const velocity = 60 + Math.random() * 50;

    return {
      id: id * 100 + index,
      x,
      y,
      dx: Math.cos(angle) * velocity,
      dy: Math.sin(angle) * velocity,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 4,
    };
  });

  return { id, x, y, particles };
}

export default function Home() {
  const [items, setItems] = useState(initialItems);
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  const triggerFireworks = () => {
    const newFirework = createFirework(Date.now());

    setFireworks((current) => [...current, newFirework]);

    setTimeout(() => {
      setFireworks((current) =>
        current.filter((firework) => firework.id !== newFirework.id)
      );
    }, 900);
  };

  const toggleItem = (id: number) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id === id) {
          const willBeCrossed = !item.crossed;
          if (willBeCrossed) {
            triggerFireworks();
          }
          return { ...item, crossed: willBeCrossed };
        }
        return item;
      })
    );
  };

  const resetBoard = () => {
    setItems((current) =>
      current.map((item) => ({ ...item, crossed: false }))
    );
    setFireworks([]);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 flex items-center justify-center p-6 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {fireworks.map((firework) => (
          <div key={firework.id}>
            {firework.particles.map((particle) => (
              <span
                key={particle.id}
                className="absolute rounded-full animate-[firework_900ms_ease-out_forwards]"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 12px ${particle.color}`,
                  ["--dx" as string]: `${particle.dx}px`,
                  ["--dy" as string]: `${particle.dy}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="w-full max-w-7xl rounded-3xl bg-white/85 backdrop-blur-md shadow-2xl p-6 border border-pink-100">
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
              className={`rounded-2xl border p-4 text-sm font-semibold text-left transition duration-200 ${
                item.crossed
                  ? "bg-pink-200 text-gray-500 line-through border-pink-300 scale-[0.98]"
                  : "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-150 hover:scale-[1.02]"
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

      <style jsx>{`
        @keyframes firework {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}