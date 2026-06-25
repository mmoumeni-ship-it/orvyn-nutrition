import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Activity,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Dumbbell,
  Salad,
  Flame,
  Star,
  Check,
  ChefHat,
  Calculator,
  Package,
  Bike,
  Users,
  Trophy,
  Leaf,
  Heart,
  ChevronRight,
  Quote,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import { GOALS, GYMS, MEALS, SHAKES, SNACKS, SUBS } from "@/lib/orvyn-data";
import heroImg from "@/assets/orvyn-hero.jpg";
import bowl1 from "@/assets/orvyn-bowl-1.jpg";
import bowl2 from "@/assets/orvyn-bowl-2.jpg";
import bowl3 from "@/assets/orvyn-bowl-3.jpg";
import shake1 from "@/assets/orvyn-shake-1.jpg";
import shake2 from "@/assets/orvyn-shake-2.jpg";
import snacksImg from "@/assets/orvyn-snacks.jpg";
import prepVideo from "@/assets/orvyn-prep.mp4.asset.json";

const BOWL_IMAGES: Record<string, string> = {
  "power-chicken": bowl1,
  "beef-performance": bowl3,
  "salmon-recovery": bowl2,
  "veggie-protein": bowl1,
};

const SHAKE_IMAGES = [shake1, shake2, shake1, shake2];

const TESTIMONIALS = [
  {
    name: "Léa M.",
    role: "Crossfit · Fitness Park Melun",
    quote:
      "Mon repas est prêt à la minute près quand je sors de séance. Macros nickel, goût incroyable.",
    rating: 5,
  },
  {
    name: "Karim B.",
    role: "Powerlifting · Basic-Fit Évry",
    quote:
      "J'ai pris 4 kg de masse propre en 3 mois. ORVYN a remplacé toute ma meal prep du dimanche.",
    rating: 5,
  },
  {
    name: "Sophie R.",
    role: "Hyrox · Neoness Paris",
    quote: "Le Salmon Recovery après mes longues séances, c'est devenu un rituel. Zéro friction.",
    rating: 5,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORVYN — Choisis ton objectif. ORVYN construit ton repas." },
      {
        name: "description",
        content:
          "Plateforme de nutrition sportive intelligente. Commande un repas adapté à tes objectifs et récupère-le dans ta salle de sport.",
      },
      { property: "og:title", content: "ORVYN — Nutrition sportive intelligente" },
      {
        property: "og:description",
        content:
          "Repas calibrés à tes macros, prêts dans ta salle. Choisis ton objectif. ORVYN construit ton repas.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <img
          src={heroImg}
          alt="Repas ORVYN prêt à récupérer après une séance de sport"
          width={1536}
          height={1024}
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_0%,oklch(0.13_0_0_/0.92)_34%,oklch(0.13_0_0_/0.6)_66%,oklch(0.13_0_0_/0.4)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-6 py-16 md:py-20">
          <div className="max-w-3xl animate-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/35 bg-background/55 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Repas calibrés · retrait en salle · prêts en moins de 12 min
            </div>
            <h1 className="mt-5 text-6xl font-black uppercase leading-[0.82] tracking-tighter md:text-8xl lg:text-9xl animate-in animate-in-delay-1">
              <span className="text-gradient">ORVYN</span>
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl animate-in animate-in-delay-2">
              La nutrition sportive qui t'attend à la sortie de ta séance.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-foreground/75 md:text-lg animate-in animate-in-delay-3">
              Choisis ta salle, ton objectif et ton créneau. ORVYN compose un bowl, un shake ou un
              snack ajusté à tes macros, puis le prépare pour l'heure que tu choisis.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-in animate-in-delay-4">
              <Link
                to="/order"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-black uppercase tracking-wider text-brand-foreground shadow-2xl shadow-brand/20 transition-all duration-150 hover:glow hover:scale-[1.02]"
              >
                Commander maintenant
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/50 px-7 py-4 text-sm font-bold uppercase tracking-wider text-foreground backdrop-blur transition-all duration-150 hover:bg-surface hover:border-brand/40"
              >
                Voir le menu
              </Link>
            </div>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 backdrop-blur animate-in animate-in-delay-5 md:grid-cols-4">
            {[
              { k: "4", l: "Salles partenaires", i: MapPin },
              { k: "5", l: "Objectifs nutrition", i: Activity },
              { k: "11h30-22h", l: "Créneaux retrait", i: Clock },
              { k: "< 12 min", l: "Préparation", i: Zap },
            ].map((s) => (
              <div
                key={s.l}
                className="flex min-h-24 items-start gap-3 bg-background/70 p-4 transition-colors hover:bg-background/90"
              >
                <s.i className="mt-1 size-4 shrink-0 text-brand" />
                <div>
                  <div className="text-2xl font-black tracking-tight">{s.k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-foreground/60">
                    {s.l}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats marquee */}
      <section className="relative overflow-hidden border-y border-border/60 bg-surface/60 py-6">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[
            "2 400+ commandes livrées",
            "4,9/5 satisfaction",
            "Protéines premium",
            "0 additifs · 0 conservateurs",
            "Prêt en moins de 12 min",
            "Recommandé par 15 coaches",
            "2 400+ commandes livrées",
            "4,9/5 satisfaction",
            "Protéines premium",
            "0 additifs · 0 conservateurs",
            "Prêt en moins de 12 min",
            "Recommandé par 15 coaches",
          ].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Video — preparation reel */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
            <div className="animate-in">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Dans nos cuisines
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                Frais, calibré, scellé.
                <br />
                Remis dans ta salle.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                Chaque repas est préparé à la commande, calibré au gramme près, scellé dans un
                emballage premium et déposé dans ta salle au créneau choisi.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { i: ChefHat, t: "Cuisson minute des protéines" },
                  { i: Salad, t: "Assemblage du bowl par un chef" },
                  { i: Calculator, t: "Macros calculées par notre IA" },
                  { i: Package, t: "Emballage scellé premium" },
                  { i: Bike, t: "Remise en main propre dans ta salle" },
                ].map((s, i) => (
                  <div
                    key={s.t}
                    className="flex items-center gap-3 text-sm animate-in animate-in-delay-1"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="grid size-9 place-items-center rounded-xl bg-brand/15 text-brand transition-all duration-150 hover:bg-brand/25">
                      <s.i className="size-4" />
                    </div>
                    <span className="font-medium">{s.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative perspective-1000 animate-in animate-in-delay-2">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-border transition-all duration-200 hover:glow">
                <video
                  src={prepVideo.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={bowl1}
                  className="aspect-video w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brand/10" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand backdrop-blur">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand" /> Live kitchen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden border-t border-border/60 bg-surface/30">
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6 animate-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Comment ça marche
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                Quatre étapes. Aucun compromis.
              </h2>
            </div>
            <Link
              to="/order"
              className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand transition-all hover:gap-3 md:inline-flex"
            >
              Démarrer{" "}
              <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              {
                i: MapPin,
                n: "01",
                t: "Choisis ta salle",
                d: "Sélectionne ton point de retrait parmi nos 4 salles partenaires.",
              },
              {
                i: Dumbbell,
                n: "02",
                t: "Définis ton objectif",
                d: "Masse, sèche, récupération ou équilibre — ORVYN s'adapte.",
              },
              {
                i: Salad,
                n: "03",
                t: "Reçois ta reco",
                d: "Un repas calibré à tes macros, personnalisable à volonté.",
              },
              {
                i: Flame,
                n: "04",
                t: "Récupère & performe",
                d: "Prêt à l'heure que tu choisis, directement dans ta salle.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="group perspective-1000 animate-in animate-in-delay-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="rounded-2xl border border-border bg-surface p-6 transition-all duration-150 hover:border-brand/40 hover:glow-sm">
                  <div className="flex items-center justify-between">
                    <s.i className="size-5 text-brand" />
                    <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals + Signature bowls */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6 animate-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Bowls Signature
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                La performance, version chef.
              </h2>
            </div>
            <Link
              to="/menu"
              className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand transition-all hover:gap-3 md:inline-flex"
            >
              Tout le menu{" "}
              <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 animate-in animate-in-delay-1">
            {GOALS.map((g) => (
              <Link
                key={g.id}
                to="/order"
                className="rounded-full border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground transition-all duration-150 hover:border-brand/50 hover:text-brand hover:bg-brand/5"
              >
                {g.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {MEALS.filter((m) => m.category === "signature").map((m, i) => (
              <div
                key={m.id}
                className="group perspective-1000 animate-in animate-in-delay-2"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-200 hover:border-brand/40 hover:glow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={BOWL_IMAGES[m.id] ?? bowl1}
                      alt={m.name}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="size-full object-cover transition-all duration-200 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand backdrop-blur">
                      {m.macros.kcal} kcal
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold">{m.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.tagline}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                      {[
                        ["P", `${m.macros.protein}g`],
                        ["G", `${m.macros.carbs}g`],
                        ["L", `${m.macros.fat}g`],
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
                      <span className="text-base font-black">{m.price.toFixed(2)} €</span>
                      <Link
                        to="/order"
                        className="rounded-full bg-brand px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-foreground transition-all duration-150 hover:glow-sm"
                      >
                        Commander
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 animate-in">
            <StartOrderCTA
              label="Construis ton bowl à ton objectif"
              sub="On commence par ta salle, puis ton objectif nutritionnel."
            />
          </div>
        </div>
      </section>

      {/* Shakes ORVYN */}
      <section className="relative overflow-hidden border-t border-border/60 bg-surface/30">
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="order-2 md:order-1 animate-in">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Shakes ORVYN</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                25g de protéines.
                <br />
                Zéro compromis.
              </h2>
              <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
                Whey isolat premium, recettes signature, prêts à boire. Récupère ton shake avec ton
                repas ou en stand-alone après ta séance.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SHAKES.map((s, i) => (
                  <div
                    key={s.id}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-all duration-150 hover:border-brand/40 hover:glow-sm"
                  >
                    <img
                      src={SHAKE_IMAGES[i % SHAKE_IMAGES.length]}
                      alt={s.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="size-14 rounded-lg object-cover transition-transform duration-150 group-hover:scale-105"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{s.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {s.macros.protein}g prot · {s.macros.kcal} kcal
                      </div>
                    </div>
                    <div className="text-sm font-black">{s.price.toFixed(2)} €</div>
                  </div>
                ))}
              </div>
              <Link
                to="/menu"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-xs font-black uppercase tracking-widest transition-all duration-150 hover:bg-surface-2 hover:border-brand/40"
              >
                Voir tous les shakes{" "}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="order-1 grid grid-cols-2 gap-3 md:order-2 animate-in animate-in-delay-1">
              <img
                src={shake1}
                alt="Shake protéiné chocolat ORVYN"
                width={1024}
                height={1536}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-border transition-all duration-200 hover:glow-sm"
              />
              <img
                src={shake2}
                alt="Smoothie protéiné fruits rouges"
                width={1024}
                height={1536}
                loading="lazy"
                className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-border transition-all duration-200 hover:glow-sm"
              />
            </div>
          </div>
          <div className="mt-10 animate-in animate-in-delay-2">
            <StartOrderCTA
              label="Ajoute ton shake à un repas calibré"
              sub="Choisis ta salle puis ton objectif, le shake se glisse au panier."
            />
          </div>
        </div>
      </section>

      {/* Snacks */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="animate-in">
              <img
                src={snacksImg}
                alt="Snacks healthy ORVYN"
                width={1536}
                height={1024}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-3xl object-cover ring-1 ring-border transition-all duration-200 hover:glow"
              />
            </div>
            <div className="animate-in animate-in-delay-1">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Snacks healthy
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                L'en-cas qui ne triche pas.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                Energy balls, brownies protéinés, cookies, bowls fruits rouges. Recettes
                saisonnières, sans bullshit, à glisser dans ta commande.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {SNACKS.slice(0, 6).map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-border bg-background p-4 transition-all duration-150 hover:border-brand/40 hover:glow-sm"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand">
                      {s.season === "permanent"
                        ? "Toute l'année"
                        : s.season === "ete"
                          ? "Été"
                          : "Hiver"}
                    </div>
                    <div className="mt-1 text-sm font-bold">{s.name}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{s.macros.protein}g prot</span>
                      <span className="font-black">{s.price.toFixed(2)} €</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="relative overflow-hidden border-t border-border/60 bg-surface/30">
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6 animate-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Abonnements</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                Mange mieux. Économise plus.
              </h2>
            </div>
            <Link
              to="/subscriptions"
              className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand transition-all hover:gap-3 md:inline-flex"
            >
              Voir tout{" "}
              <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SUBS.map((sub, i) => (
              <div
                key={sub.id}
                className={`relative flex flex-col rounded-2xl border p-6 animate-in animate-in-delay-1 transition-all duration-150 hover:glow-sm ${
                  sub.popular ? "border-brand bg-brand/5 scale-[1.02]" : "border-border bg-surface"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {sub.popular && (
                  <div className="absolute -top-3 left-6 rounded-full bg-brand px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-foreground shadow-lg">
                    Le + choisi
                  </div>
                )}
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {sub.name}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight">{sub.price}€</span>
                  <span className="text-xs text-muted-foreground">/ mois</span>
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-widest text-brand">
                  {sub.credits} crédits · économie {sub.save}€
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {sub.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/subscriptions"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-black uppercase tracking-widest transition-all duration-150 ${
                    sub.popular
                      ? "bg-brand text-brand-foreground hover:glow"
                      : "border border-border bg-background hover:border-brand/40"
                  }`}
                >
                  Choisir {sub.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 animate-in">
            <StartOrderCTA
              label="Pas encore prêt à t'abonner ? Lance une commande"
              sub="Choisis ta salle et ton objectif — l'abonnement peut attendre."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="text-center animate-in">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Ils performent avec ORVYN
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
              4,9 <span className="text-brand">/</span> 5 — sur 2 400 commandes.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="group relative flex flex-col rounded-2xl border border-border bg-background p-6 animate-in animate-in-delay-1 transition-all duration-200 hover:border-brand/30 hover:glow-sm"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Quote className="absolute right-6 top-6 size-8 text-brand/10" />
                <div className="flex gap-0.5 text-brand">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gyms */}
      <section className="relative overflow-hidden border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6 animate-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Salles partenaires
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                On est déjà dans ta salle.
              </h2>
            </div>
            <Link
              to="/gyms"
              className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand transition-all hover:gap-3 md:inline-flex"
            >
              Toutes les salles{" "}
              <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GYMS.map((g, i) => (
              <div
                key={g.id}
                className="group rounded-2xl border border-border bg-surface p-5 animate-in animate-in-delay-1 transition-all duration-150 hover:border-brand/40 hover:glow-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="grid size-10 place-items-center rounded-xl bg-background font-black italic text-muted-foreground">
                    {g.brand
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <span className="rounded-full bg-brand/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-brand">
                    {g.prepMinutes} min
                  </span>
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {g.brand}
                </div>
                <div className="mt-1 text-base font-bold">{g.name}</div>
                <div className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" />
                  <span>{g.address}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] uppercase tracking-widest">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-3" /> {g.hours}
                  </span>
                  <Link to="/order" className="text-brand transition-all hover:gap-2">
                    Choisir →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <img
          src={bowl2}
          alt=""
          width={1280}
          height={1280}
          aria-hidden
          className="absolute inset-0 -z-10 size-full object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="animate-in">
            <div className="mx-auto inline-flex rounded-full bg-brand/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand">
              Prêt à performer ?
            </div>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-black uppercase tracking-tighter md:text-7xl">
              Ton prochain repas <span className="text-gradient">arrive</span> avec toi.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              Pas d'attente. Pas d'à-peu-près. Une nutrition calibrée pour ta séance, prête à
              l'heure que tu choisis.
            </p>
            <Link
              to="/order"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-black uppercase tracking-wider text-brand-foreground transition-all duration-150 hover:glow hover:scale-[1.02]"
            >
              Démarrer ma commande{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function StartOrderCTA({
  label = "Choisis ta salle & ton objectif",
  sub = "Démarre ta commande en moins de 30 secondes.",
}: {
  label?: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/10 to-brand/5 p-6 md:flex-row md:items-center transition-all duration-150 hover:glow-sm">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-brand">
          Étape 1 · Salle &nbsp;·&nbsp; Étape 2 · Objectif
        </div>
        <div className="mt-1 text-lg font-black tracking-tight md:text-xl">{label}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
      </div>
      <Link
        to="/order"
        className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-foreground transition-all duration-150 hover:glow hover:scale-[1.02]"
      >
        Démarrer ma commande
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
