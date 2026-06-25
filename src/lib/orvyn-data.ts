export type Goal = "prise-de-masse" | "seche" | "perte-de-poids" | "recuperation" | "equilibre";

export const GOALS: { id: Goal; label: string; tag: string; desc: string }[] = [
  {
    id: "prise-de-masse",
    label: "Prise de masse",
    tag: "Bulk",
    desc: "Calories denses, glucides complexes, protéines élevées.",
  },
  {
    id: "seche",
    label: "Sèche",
    tag: "Cut",
    desc: "Déficit contrôlé, protéines hautes, légumes verts.",
  },
  {
    id: "perte-de-poids",
    label: "Perte de poids",
    tag: "Lean",
    desc: "Léger, satiété maximale, faible densité calorique.",
  },
  {
    id: "recuperation",
    label: "Récupération",
    tag: "Recover",
    desc: "Anti-inflammatoire, oméga-3, glucides à IG modéré.",
  },
  {
    id: "equilibre",
    label: "Équilibre alimentaire",
    tag: "Balanced",
    desc: "Macros équilibrés, ration sportif standard.",
  },
];

export type Gym = {
  id: string;
  brand: string;
  name: string;
  address: string;
  hours: string;
  prepMinutes: number;
};

export const GYMS: Gym[] = [
  {
    id: "fp-carre-senart",
    brand: "Fitness Park",
    name: "Carré Sénart",
    address: "3 Allée de la Mixité, 77127 Lieusaint",
    hours: "06:00 — 23:00",
    prepMinutes: 12,
  },
  {
    id: "bf-evry",
    brand: "Basic-Fit",
    name: "Évry Centre",
    address: "Boulevard de l'Europe, 91000 Évry",
    hours: "24h / 24",
    prepMinutes: 8,
  },
  {
    id: "fp-melun",
    brand: "Fitness Park",
    name: "Melun",
    address: "612 Rue du Pont, 77000 Melun",
    hours: "06:00 — 23:00",
    prepMinutes: 10,
  },
  {
    id: "neoness-paris",
    brand: "Neoness",
    name: "Paris Maubeuge",
    address: "15 Rue de Maubeuge, 75009 Paris",
    hours: "07:00 — 22:00",
    prepMinutes: 9,
  },
];

export type Macros = { kcal: number; protein: number; carbs: number; fat: number };

export type Meal = {
  id: string;
  name: string;
  category: "signature" | "week" | "build";
  tagline: string;
  bestFor: Goal[];
  protein: string;
  base: string;
  veg: string;
  sauce: string;
  macros: Macros;
  price: number;
  credits: number;
  diet: string[];
  image?: string;
};

export const MEALS: Meal[] = [
  {
    id: "power-chicken",
    name: "Power Chicken Bowl",
    category: "signature",
    tagline: "Notre best-seller. Protéines lentes, énergie longue.",
    bestFor: ["prise-de-masse", "equilibre"],
    protein: "Poulet grillé double portion",
    base: "Riz complet & patate douce",
    veg: "Brocoli vapeur, haricots verts",
    sauce: "Yaourt citron",
    macros: { kcal: 742, protein: 52, carbs: 78, fat: 14 },
    price: 12.9,
    credits: 1,
    diet: ["Halal", "Sans lactose"],
  },
  {
    id: "beef-performance",
    name: "Beef Performance Bowl",
    category: "signature",
    tagline: "Bœuf maturé, fer et créatine naturelle.",
    bestFor: ["prise-de-masse"],
    protein: "Bœuf maturé sauté",
    base: "Quinoa & riz basmati",
    veg: "Poivrons, courgettes",
    sauce: "Soja légère",
    macros: { kcal: 820, protein: 54, carbs: 72, fat: 22 },
    price: 12.9,
    credits: 1,
    diet: ["Halal"],
  },
  {
    id: "salmon-recovery",
    name: "Salmon Recovery Bowl",
    category: "signature",
    tagline: "Saumon riche en oméga-3, parfait post-séance.",
    bestFor: ["recuperation", "equilibre"],
    protein: "Saumon rôti basse température",
    base: "Riz basmati & lentilles",
    veg: "Brocoli, carottes, concombre",
    sauce: "Tahini",
    macros: { kcal: 690, protein: 44, carbs: 58, fat: 24 },
    price: 12.9,
    credits: 1,
    diet: ["Sans gluten", "Sans lactose"],
  },
  {
    id: "veggie-protein",
    name: "Veggie Protein Bowl",
    category: "signature",
    tagline: "Falafel + tofu, profil végétal complet.",
    bestFor: ["seche", "equilibre"],
    protein: "Falafel protéiné & tofu grillé",
    base: "Quinoa & lentilles",
    veg: "Courgettes, poivrons, concombre",
    sauce: "Tahini",
    macros: { kcal: 610, protein: 38, carbs: 64, fat: 18 },
    price: 12.9,
    credits: 1,
    diet: ["Vegan", "Végétarien", "Sans lactose"],
  },
  {
    id: "weekly-thai-chicken",
    name: "Thai Coco Chicken",
    category: "week",
    tagline: "Plat de la semaine — disponible jusqu'à dimanche.",
    bestFor: ["equilibre"],
    protein: "Poulet sauté wok",
    base: "Riz basmati",
    veg: "Carottes, poivrons, brocoli",
    sauce: "Coco-curry léger",
    macros: { kcal: 720, protein: 46, carbs: 70, fat: 18 },
    price: 13.9,
    credits: 1,
    diet: ["Halal", "Sans gluten"],
  },
];

export const PROTEINS = ["Poulet", "Dinde", "Bœuf", "Saumon", "Œufs", "Tofu", "Falafel protéiné"];
export const BASES = [
  "Riz complet",
  "Riz basmati",
  "Quinoa",
  "Patate douce",
  "Lentilles",
  "Salade",
];
export const VEGGIES = [
  "Brocoli",
  "Courgettes",
  "Haricots verts",
  "Poivrons",
  "Carottes",
  "Concombre",
];
export const SAUCES = ["Yaourt citron", "Tahini", "Soja légère", "Spicy", "Sans sauce"];
export const DIETS = ["Halal", "Végétarien", "Vegan", "Sans lactose", "Sans gluten", "Épicé"];
export const CALORIE_LEVELS = [
  { id: "light", label: "Light", mult: 0.8 },
  { id: "balanced", label: "Balanced", mult: 1 },
  { id: "performance", label: "Performance", mult: 1.25 },
] as const;

export type Shake = { id: string; name: string; macros: Macros; price: number; credits: number };
export const SHAKES: Shake[] = [
  {
    id: "whey-vanille",
    name: "Whey Vanille",
    macros: { kcal: 180, protein: 28, carbs: 8, fat: 3 },
    price: 4.9,
    credits: 0.5,
  },
  {
    id: "whey-choco",
    name: "Whey Chocolat",
    macros: { kcal: 185, protein: 28, carbs: 9, fat: 3 },
    price: 4.9,
    credits: 0.5,
  },
  {
    id: "matcha-signature",
    name: "Matcha Protein Signature",
    macros: { kcal: 210, protein: 24, carbs: 16, fat: 5 },
    price: 4.9,
    credits: 0.5,
  },
  {
    id: "cafe-boost",
    name: "Café Protein Boost",
    macros: { kcal: 195, protein: 26, carbs: 10, fat: 4 },
    price: 4.9,
    credits: 0.5,
  },
];

export type Snack = {
  id: string;
  name: string;
  season: "permanent" | "ete" | "hiver";
  price: number;
  credits: number;
  macros: Macros;
};
export const SNACKS: Snack[] = [
  {
    id: "energy-balls",
    name: "Energy Balls",
    season: "permanent",
    price: 3.9,
    credits: 0.5,
    macros: { kcal: 220, protein: 9, carbs: 22, fat: 10 },
  },
  {
    id: "brownie-prot",
    name: "Brownie Protéiné",
    season: "permanent",
    price: 3.9,
    credits: 0.5,
    macros: { kcal: 245, protein: 14, carbs: 24, fat: 9 },
  },
  {
    id: "fruits-rouges",
    name: "Bowl Fruits Rouges Protéiné",
    season: "ete",
    price: 3.9,
    credits: 0.5,
    macros: { kcal: 190, protein: 18, carbs: 22, fat: 3 },
  },
  {
    id: "yaourt-grec",
    name: "Yaourt Grec Protéiné",
    season: "ete",
    price: 3.9,
    credits: 0.5,
    macros: { kcal: 170, protein: 20, carbs: 14, fat: 3 },
  },
  {
    id: "cookie-prot",
    name: "Cookie Protéiné",
    season: "hiver",
    price: 3.9,
    credits: 0.5,
    macros: { kcal: 250, protein: 15, carbs: 26, fat: 9 },
  },
  {
    id: "banana-bread",
    name: "Banana Bread Protéiné",
    season: "hiver",
    price: 3.9,
    credits: 0.5,
    macros: { kcal: 260, protein: 16, carbs: 28, fat: 8 },
  },
];

export type Sub = {
  id: string;
  name: string;
  price: number;
  credits: number;
  perks: string[];
  save: number;
  popular?: boolean;
};
export const SUBS: Sub[] = [
  {
    id: "start",
    name: "Start",
    price: 49,
    credits: 5,
    perks: ["Sans engagement", "5 crédits / mois", "Retrait prioritaire"],
    save: 14,
  },
  {
    id: "pro",
    name: "Pro",
    price: 129,
    credits: 15,
    perks: ["15 crédits / mois", "1 shake offert / semaine", "Économie 33%"],
    save: 64,
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 239,
    credits: 30,
    perks: [
      "30 crédits / mois",
      "2 shakes offerts / semaine",
      "Accès prioritaire nouveautés",
      "Économie 38%",
    ],
    save: 148,
  },
];

export function pickRecommendation(goal: Goal): Meal {
  return MEALS.find((m) => m.category === "signature" && m.bestFor.includes(goal)) ?? MEALS[0];
}

export function timeSlots(): string[] {
  const out: string[] = [];
  for (let h = 11; h <= 22; h++) {
    for (const m of [0, 15, 30, 45]) {
      if (h === 11 && m < 30) continue;
      if (h === 22 && m > 0) break;
      out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return out;
}
