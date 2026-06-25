import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Search, Sparkles, ChevronRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import { MEALS, SHAKES, SNACKS } from "@/lib/orvyn-data";
import { useOrvyn } from "@/lib/orvyn-store";
import { MEDIA, MEAL_IMAGE, SHAKE_IMAGE, SNACK_IMAGE } from "@/lib/orvyn-media";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu ORVYN — Bowls, Shakes, Snacks" },
      {
        name: "description",
        content: "Explore les Bowls Signature, le Plat de la Semaine, les Shakes et Snacks ORVYN.",
      },
    ],
  }),
  component: MenuPage,
});

type Tab = "bowls" | "week" | "shakes" | "snacks";

function MenuPage() {
  const [tab, setTab] = useState<Tab>("bowls");
  const [search, setSearch] = useState("");
  const { add } = useOrvyn();

  const filtered = (() => {
    let items: {
      id: string;
      name: string;
      desc: string;
      image: string;
      macros: string;
      price: number;
      badge?: string;
      credits: number;
      kcal: number;
      protein: number;
      carbs: number;
      fat: number;
      onAdd: () => void;
    }[] = [];
    if (tab === "bowls") {
      items = MEALS.filter((m) => m.category === "signature").map((m) => ({
        id: m.id,
        name: m.name,
        desc: m.tagline,
        image: MEAL_IMAGE[m.id] ?? MEDIA.bowl1,
        macros: `${m.macros.kcal} kcal · ${m.macros.protein}g prot`,
        price: m.price,
        credits: m.credits,
        kcal: m.macros.kcal,
        protein: m.macros.protein,
        carbs: m.macros.carbs,
        fat: m.macros.fat,
        onAdd: () => {
          add({
            id: `${m.id}-${Date.now()}`,
            name: m.name,
            price: m.price,
            credits: m.credits,
            macros: m.macros,
          });
          toast.success(`${m.name} ajouté`);
        },
      }));
    } else if (tab === "week") {
      items = MEALS.filter((m) => m.category === "week").map((m) => ({
        id: m.id,
        name: m.name,
        desc: m.tagline,
        image: MEAL_IMAGE[m.id] ?? MEDIA.bowl3,
        macros: `${m.macros.kcal} kcal · ${m.macros.protein}g prot`,
        price: m.price,
        badge: "Plat de la semaine",
        credits: m.credits,
        kcal: m.macros.kcal,
        protein: m.macros.protein,
        carbs: m.macros.carbs,
        fat: m.macros.fat,
        onAdd: () => {
          add({
            id: `${m.id}-${Date.now()}`,
            name: m.name,
            price: m.price,
            credits: m.credits,
            macros: m.macros,
          });
          toast.success(`${m.name} ajouté`);
        },
      }));
    } else if (tab === "shakes") {
      items = SHAKES.map((s) => ({
        id: s.id,
        name: s.name,
        desc: `${s.macros.protein}g de protéines, format 350 ml`,
        image: SHAKE_IMAGE[s.id] ?? MEDIA.shake1,
        macros: `${s.macros.kcal} kcal · 0,5 crédit`,
        price: s.price,
        credits: s.credits,
        kcal: s.macros.kcal,
        protein: s.macros.protein,
        carbs: s.macros.carbs,
        fat: s.macros.fat,
        onAdd: () => {
          add({
            id: `${s.id}-${Date.now()}`,
            name: s.name,
            price: s.price,
            credits: s.credits,
            macros: s.macros,
          });
          toast.success(`${s.name} ajouté`);
        },
      }));
    } else {
      items = SNACKS.map((s) => ({
        id: s.id,
        name: s.name,
        desc: `Snack ${s.macros.protein}g protéines`,
        image: SNACK_IMAGE[s.id] ?? MEDIA.snacks,
        macros: `${s.macros.kcal} kcal · 0,5 crédit`,
        price: s.price,
        badge: s.season === "permanent" ? "Permanent" : s.season === "ete" ? "Été" : "Hiver",
        credits: s.credits,
        kcal: s.macros.kcal,
        protein: s.macros.protein,
        carbs: s.macros.carbs,
        fat: s.macros.fat,
        onAdd: () => {
          add({
            id: `${s.id}-${Date.now()}`,
            name: s.name,
            price: s.price,
            credits: s.credits,
            macros: s.macros,
          });
          toast.success(`${s.name} ajouté`);
        },
      }));
    }
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(
      (i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q),
    );
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="relative overflow-hidden border-b border-border/60">
        <img
          src={MEDIA.hero}
          alt=""
          aria-hidden
          width={1600}
          height={1280}
          className="absolute inset-0 -z-10 size-full object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Menu ORVYN</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
            Bowls, Shakes & Snacks
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Calibrés à tes macros, préparés à la commande, retirés dans ta salle.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-in">
          <div className="inline-flex rounded-full bg-surface p-1 ring-1 ring-border">
            {(
              [
                ["bowls", "Bowls Signature"],
                ["week", "Plat de la Semaine"],
                ["shakes", "Shakes"],
                ["snacks", "Snacks"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  tab === id
                    ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 ring-1 ring-border transition-all duration-300 focus-within:border-brand/50">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans le menu…"
              className="w-full min-w-[200px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center animate-in">
            <p className="text-lg font-bold">Aucun résultat</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Essaie un autre terme de recherche.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <div
                key={m.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:border-brand/40 hover:glow-sm animate-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {m.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-foreground shadow-lg">
                      {m.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-brand">
                    {m.macros}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                    {[
                      ["P", `${m.protein}g`],
                      ["G", `${m.carbs}g`],
                      ["L", `${m.fat}g`],
                    ].map(([l, v]) => (
                      <div key={String(l)}>
                        <div className="text-sm font-black">{v}</div>
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                          {l}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-black">{m.price.toFixed(2)} €</span>
                    <button
                      onClick={m.onAdd}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-xs font-black uppercase tracking-widest text-brand-foreground transition-all duration-300 hover:glow-sm"
                    >
                      <Plus className="size-3" /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
