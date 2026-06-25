import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Coins,
  Heart,
  Settings,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Dumbbell,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import { useOrvyn } from "@/lib/orvyn-store";
import { GOALS, MEALS } from "@/lib/orvyn-data";
import { MEAL_IMAGE } from "@/lib/orvyn-media";
import bowlFallback from "@/assets/orvyn-bowl-1.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mon espace — ORVYN" },
      { name: "description", content: "Tes commandes, crédits, abonnement et repas favoris." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { credits, gym, goal } = useOrvyn();
  const currentGoal = GOALS.find((g) => g.id === goal);
  const favs = MEALS.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-6 animate-in">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Mon espace</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Salut, Athlète.</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {gym ? `Ta salle : ${gym.brand} ${gym.name}` : "Aucune salle sélectionnée — "}
              {!gym && (
                <Link to="/gyms" className="text-brand transition-colors hover:underline">
                  choisir une salle
                </Link>
              )}
            </p>
          </div>
          <Link
            to="/order"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-black uppercase tracking-wider text-brand-foreground transition-all duration-150 hover:glow"
          >
            <Sparkles className="size-4" /> Nouvelle commande
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4 animate-in animate-in-delay-1">
          <Stat
            icon={Coins}
            label="Crédits restants"
            value={credits.toFixed(1)}
            hint="Rechargés le 1er du mois"
          />
          <Stat
            icon={Target}
            label="Objectif actuel"
            value={currentGoal?.label ?? "—"}
            hint={currentGoal?.tag ?? "Définir"}
          />
          <Stat icon={TrendingUp} label="Commandes" value="12" hint="Sur les 30 derniers jours" />
          <Stat icon={Heart} label="Repas favoris" value={String(favs.length)} hint="Sauvegardés" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 animate-in animate-in-delay-2">
          <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2 transition-all duration-150 hover:glow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">Dernières commandes</h2>
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                Démo
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  d: "Aujourd'hui · 13:15",
                  m: "Power Chicken Bowl",
                  g: "Fitness Park Carré Sénart",
                  p: "1 crédit",
                },
                { d: "Hier · 19:45", m: "Salmon Recovery Bowl", g: "Basic-Fit Évry", p: "12,90 €" },
                {
                  d: "Lun · 12:30",
                  m: "Veggie Protein Bowl + Shake Matcha",
                  g: "Neoness Paris",
                  p: "1,5 crédit",
                },
              ].map((o, i) => (
                <div
                  key={o.d}
                  className="flex items-center justify-between rounded-xl bg-background p-4 transition-all duration-150 hover:bg-surface-2"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {o.d}
                    </div>
                    <div className="mt-0.5 font-bold">{o.m}</div>
                    <div className="text-xs text-muted-foreground">{o.g}</div>
                  </div>
                  <span className="text-sm font-black text-brand">{o.p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/10 via-brand/5 to-surface p-6 transition-all duration-150 hover:glow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
                Recommandation ORVYN
              </p>
            </div>
            <h3 className="mt-3 text-xl font-black">Power Chicken Bowl</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Aligné avec ton objectif {currentGoal?.label ?? "Équilibre"}.
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2 rounded-xl bg-background/60 p-3 text-center">
              {[
                ["kcal", 742],
                ["P", "52g"],
                ["G", "78g"],
                ["L", "14g"],
              ].map(([l, v]) => (
                <div key={String(l)}>
                  <div className="text-sm font-black">{v}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/order"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-black uppercase tracking-wider text-brand-foreground transition-all duration-150 hover:glow"
            >
              Commander maintenant
            </Link>
          </div>
        </div>

        <div className="mt-10 animate-in animate-in-delay-3">
          <h2 className="text-lg font-black">Mes favoris</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {favs.map((m, i) => (
              <div
                key={m.id}
                className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-150 hover:border-brand/40 hover:glow-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border">
                  <img
                    src={MEAL_IMAGE[m.id] ?? bowlFallback}
                    alt={m.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="size-full object-cover transition-all duration-200 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-bold">{m.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.macros.kcal} kcal · {m.macros.protein}g prot
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 animate-in animate-in-delay-4">
          <Link
            to="/order"
            className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-all duration-150 hover:border-brand/40 hover:glow-sm"
          >
            <Settings className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Paramètres du compte — disponibles une fois Lovable Cloud activé.
            </p>
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Coins;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 transition-all duration-150 hover:border-brand/40 hover:glow-sm">
      <div className="flex items-center justify-between">
        <Icon className="size-4 text-brand" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {hint}
        </span>
      </div>
      <div className="mt-6 text-2xl font-black">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
