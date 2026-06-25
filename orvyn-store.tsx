import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { GYMS, type Gym, type Goal, type Macros } from "./orvyn-data";

export type CartLine = {
  id: string;
  name: string;
  details?: string;
  price: number;
  credits: number;
  qty: number;
  macros?: Macros;
};

type State = {
  gym: Gym | null;
  goal: Goal | null;
  pickupTime: string | null;
  cart: CartLine[];
  credits: number;
  setGym: (g: Gym | null) => void;
  setGoal: (g: Goal | null) => void;
  setPickup: (t: string | null) => void;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  clear: () => void;
  useCredits: (n: number) => void;
  addCredits: (n: number) => void;
};

const Ctx = createContext<State | null>(null);

const KEY = "orvyn:v1";

export function OrvynProvider({ children }: { children: ReactNode }) {
  const [gym, setGym] = useState<Gym | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [pickupTime, setPickup] = useState<string | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [credits, setCredits] = useState<number>(12.5);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (!raw) return;
      const v = JSON.parse(raw);
      if (v.gymId) setGym(GYMS.find((g) => g.id === v.gymId) ?? null);
      if (v.goal) setGoal(v.goal);
      if (v.pickupTime) setPickup(v.pickupTime);
      if (Array.isArray(v.cart)) setCart(v.cart);
      if (typeof v.credits === "number") setCredits(v.credits);
    } catch {
      /* ignore corrupt localStorage */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      KEY,
      JSON.stringify({ gymId: gym?.id ?? null, goal, pickupTime, cart, credits }),
    );
  }, [gym, goal, pickupTime, cart, credits]);

  const value = useMemo<State>(
    () => ({
      gym,
      goal,
      pickupTime,
      cart,
      credits,
      setGym,
      setGoal,
      setPickup,
      add: (line) =>
        setCart((c) => {
          const existing = c.find((l) => l.id === line.id);
          if (existing)
            return c.map((l) => (l.id === line.id ? { ...l, qty: l.qty + (line.qty ?? 1) } : l));
          return [...c, { ...line, qty: line.qty ?? 1 }];
        }),
      remove: (id) => setCart((c) => c.filter((l) => l.id !== id)),
      clear: () => setCart([]),
      useCredits: (n) => setCredits((c) => Math.max(0, c - n)),
      addCredits: (n) => setCredits((c) => c + n),
    }),
    [gym, goal, pickupTime, cart, credits],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrvyn() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrvyn must be used inside <OrvynProvider>");
  return v;
}

export function cartTotals(cart: CartLine[]) {
  return cart.reduce(
    (acc, l) => ({
      price: acc.price + l.price * l.qty,
      credits: acc.credits + l.credits * l.qty,
      kcal: acc.kcal + (l.macros?.kcal ?? 0) * l.qty,
      protein: acc.protein + (l.macros?.protein ?? 0) * l.qty,
      carbs: acc.carbs + (l.macros?.carbs ?? 0) * l.qty,
      fat: acc.fat + (l.macros?.fat ?? 0) * l.qty,
      items: acc.items + l.qty,
    }),
    { price: 0, credits: 0, kcal: 0, protein: 0, carbs: 0, fat: 0, items: 0 },
  );
}
