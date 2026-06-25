import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, MapPin, Sparkles, Clock, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import {
  GOALS,
  GYMS,
  PROTEINS,
  BASES,
  VEGGIES,
  SAUCES,
  DIETS,
  CALORIE_LEVELS,
  pickRecommendation,
  timeSlots,
  type Goal,
} from "@/lib/orvyn-data";
import { useOrvyn } from "@/lib/orvyn-store";
import { MEAL_IMAGE, MEDIA } from "@/lib/orvyn-media";

export const Route = createFileRoute("/order")({
  validateSearch: (s: Record<string, unknown>) => ({
    goal: typeof s.goal === "string" ? (s.goal as Goal) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Commander — ORVYN" },
      {
        name: "description",
        content:
          "Compose ton repas : salle, objectif, recommandation ORVYN, personnalisation et heure de retrait.",
      },
    ],
  }),
  component: OrderFlow,
});

const STEPS = ["Salle", "Objectif", "Repas", "Heure"] as const;

function OrderFlow() {
  const { gym, setGym, goal, setGoal, pickupTime, setPickup, add } = useOrvyn();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [protein, setProtein] = useState<string>("");
  const [base, setBase] = useState<string>("");
  const [veg, setVeg] = useState<string[]>([]);
  const [sauce, setSauce] = useState<string>("");
  const [level, setLevel] = useState<(typeof CALORIE_LEVELS)[number]["id"]>("balanced");
  const [diets, setDiets] = useState<string[]>([]);

  useEffect(() => {
    if (search.goal && !goal) setGoal(search.goal);
  }, [search.goal, goal, setGoal]);

  const reco = useMemo(() => (goal ? pickRecommendation(goal) : null), [goal]);

  useEffect(() => {
    if (!reco) return;
    setProtein((p) => p || reco.protein.split(" ")[0]);
    setBase((b) => b || (BASES.find((x) => reco.base.includes(x.split(" ")[0])) ?? BASES[0]));
    setVeg((v) => (v.length ? v : VEGGIES.slice(0, 2)));
    setSauce((s) => s || (SAUCES.find((x) => reco.sauce.includes(x.split(" ")[0])) ?? SAUCES[0]));
  }, [reco]);

  const mult = CALORIE_LEVELS.find((l) => l.id === level)?.mult ?? 1;
  const macros = reco
    ? {
        kcal: Math.round(reco.macros.kcal * mult),
        protein: Math.round(reco.macros.protein * mult),
        carbs: Math.round(reco.macros.carbs * mult),
        fat: Math.round(reco.macros.fat * mult),
      }
    : null;

  const slots = timeSlots();
  const ready = gym && goal && reco && pickupTime;

  const addToCart = () => {
    if (!gym) return toast.error("Sélectionne une salle d'abord");
    if (!goal || !reco) return toast.error("Choisis ton objectif");
    if (!pickupTime) return toast.error("Choisis une heure de retrait");
    add({
      id: `${reco.id}-${level}-${Date.now()}`,
      name: `${reco.name} · ${level}`,
      details: `${protein} • ${base} • ${veg.join(", ")} • ${sauce}`,
      price: 14.9,
      credits: 1.25,
      macros: macros ?? undefined,
    });
    toast.success("Ajouté au panier", {
      description: `Retrait à ${pickupTime} — ${gym.brand} ${gym.name}`,
    });
    navigate({ to: "/cart" });
  };

  const currentStep = gym ? (goal ? (reco ? (pickupTime ? 4 : 3) : 3) : 2) : 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6">
        <Stepper current={currentStep} steps={["Salle", "Objectif", "Repas", "Heure"]} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <Section number="01" title="Sélectionne ta salle" completed={!!gym}>
              <div className="grid gap-3 sm:grid-cols-2">
                {GYMS.map((g) => {
                  const sel = gym?.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGym(g)}
                      className={`group rounded-xl border bg-surface p-4 text-left transition-all duration-150 ${
                        sel
                          ? "border-brand bg-brand/5 shadow-lg shadow-brand/10"
                          : "border-border hover:border-brand/40 hover:glow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {g.brand}
                          </div>
                          <div className="font-bold">{g.name}</div>
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="size-3" /> {g.address}
                          </div>
                        </div>
                        {sel && <Check className="size-4 text-brand animate-in" />}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                        <span>{g.hours}</span>
                        <span className="text-brand">Prêt en {g.prepMinutes} min</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section
              number="02"
              title="Quel est ton objectif ?"
              badge="Obligatoire"
              completed={!!goal}
            >
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {GOALS.map((g, i) => {
                  const sel = goal === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`rounded-xl border p-4 text-left transition-all duration-150 ${
                        sel
                          ? "border-brand bg-brand/5 text-foreground shadow-lg shadow-brand/10"
                          : "border-border bg-surface hover:border-brand/40 hover:glow-sm"
                      }`}
                    >
                      <div
                        className={`font-mono text-xs ${sel ? "text-brand" : "text-muted-foreground"}`}
                      >
                        0{i + 1}
                      </div>
                      <div className="mt-6 text-sm font-bold leading-tight">{g.label}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-brand">
                        {g.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
              {goal && (
                <p className="mt-4 text-sm text-muted-foreground animate-in">
                  <Sparkles className="mr-1 inline size-3 text-brand" />
                  {GOALS.find((g) => g.id === goal)?.desc}
                </p>
              )}
            </Section>

            {reco && macros && (
              <Section
                number="03"
                title="Recommandation ORVYN"
                badge="Calibrée pour toi"
                completed={!!reco}
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-150 hover:glow-sm">
                  <div className="grid md:grid-cols-[1fr_1.2fr]">
                    <div className="relative scanline aspect-[4/3] overflow-hidden md:aspect-auto">
                      <img
                        src={MEAL_IMAGE[reco.id] ?? MEDIA.bowl1}
                        alt={reco.name}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="size-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-brand p-4 text-brand-foreground shadow-2xl">
                        <div className="grid grid-cols-4 gap-3 text-center">
                          {[
                            ["kcal", macros.kcal],
                            ["Prot", `${macros.protein}g`],
                            ["Gluc", `${macros.carbs}g`],
                            ["Lip", `${macros.fat}g`],
                          ].map(([l, v]) => (
                            <div key={String(l)}>
                              <div className="text-lg font-black">{v}</div>
                              <div className="text-[9px] font-bold uppercase tracking-widest opacity-70">
                                {l}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="inline-flex items-center gap-1 rounded bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                        Recommandé
                      </div>
                      <h3 className="mt-3 text-2xl font-black tracking-tight">{reco.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{reco.tagline}</p>

                      <div className="mt-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Niveau calorique
                        </p>
                        <div className="mt-2 inline-flex rounded-full bg-background p-1 ring-1 ring-border">
                          {CALORIE_LEVELS.map((l) => (
                            <button
                              key={l.id}
                              onClick={() => setLevel(l.id)}
                              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-150 ${
                                level === l.id
                                  ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {l.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Custom
                        label="Protéine"
                        value={protein}
                        onChange={setProtein}
                        options={PROTEINS}
                      />
                      <Custom label="Base" value={base} onChange={setBase} options={BASES} />
                      <MultiPicker
                        label="Légumes"
                        values={veg}
                        onChange={setVeg}
                        options={VEGGIES}
                      />
                      <Custom label="Sauce" value={sauce} onChange={setSauce} options={SAUCES} />

                      <div className="mt-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Filtres alimentaires
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {DIETS.map((d) => {
                            const on = diets.includes(d);
                            return (
                              <button
                                key={d}
                                onClick={() =>
                                  setDiets((cur) => (on ? cur.filter((x) => x !== d) : [...cur, d]))
                                }
                                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-150 ${
                                  on
                                    ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            )}

            <Section
              number="04"
              title="Heure de retrait"
              badge="11h30 — 22h00"
              completed={!!pickupTime}
            >
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9">
                {slots.map((s) => {
                  const sel = pickupTime === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setPickup(s)}
                      className={`rounded-lg border px-2 py-2.5 text-sm font-bold transition-all duration-150 ${
                        sel
                          ? "border-brand bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                          : "border-border bg-surface hover:border-brand/40 hover:glow-sm"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {pickupTime && (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground animate-in">
                  <Clock className="size-3.5 text-brand" />
                  Votre commande sera prête à{" "}
                  <span className="font-bold text-foreground">{pickupTime}</span>.
                </p>
              )}
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-surface p-6 transition-all duration-150 hover:glow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Récapitulatif
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <Row k="Salle" v={gym ? `${gym.brand} — ${gym.name}` : "—"} />
                <Row k="Objectif" v={goal ? GOALS.find((g) => g.id === goal)?.label : "—"} />
                <Row k="Repas" v={reco?.name ?? "—"} />
                <Row k="Niveau" v={level} />
                <Row k="Retrait" v={pickupTime ?? "—"} />
              </div>
              {macros && (
                <div className="mt-5 grid grid-cols-4 gap-2 rounded-xl bg-background p-3 text-center">
                  {[
                    ["kcal", macros.kcal],
                    ["P", `${macros.protein}g`],
                    ["G", `${macros.carbs}g`],
                    ["L", `${macros.fat}g`],
                  ].map(([l, v]) => (
                    <div key={String(l)}>
                      <div className="text-sm font-black">{v}</div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Total
                  </div>
                  <div className="text-3xl font-black">14,90 €</div>
                  <div className="text-xs text-muted-foreground">ou 1,25 crédit</div>
                </div>
              </div>
              <button
                onClick={addToCart}
                disabled={!ready}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-black uppercase tracking-wider text-brand-foreground transition-all duration-150 hover:glow disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag className="size-4" /> Ajouter au panier{" "}
                <ChevronRight className="size-4" />
              </button>
              <Link
                to="/menu"
                className="mt-3 block text-center text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
              >
                ← Voir tout le menu
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Section({
  number,
  title,
  badge,
  completed,
  children,
}: {
  number: string;
  title: string;
  badge?: string;
  completed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="animate-in">
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
              completed
                ? "bg-brand text-brand-foreground"
                : "bg-surface text-muted-foreground ring-1 ring-border"
            }`}
          >
            {completed ? <Check className="size-4" /> : number}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
              Étape {number}
            </p>
            <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          </div>
        </div>
        {badge && (
          <span className="rounded-full bg-surface px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground ring-1 ring-border">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Stepper({ current, steps }: { current: number; steps: readonly string[] }) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s} className="flex flex-1 items-center gap-1">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                done
                  ? "bg-brand text-brand-foreground"
                  : active
                    ? "bg-brand/10 text-brand ring-1 ring-brand/30"
                    : "bg-surface text-muted-foreground ring-1 ring-border"
              }`}
            >
              {done ? <Check className="size-3" /> : i + 1}
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`ml-1 h-px flex-1 transition-all duration-200 ${done ? "bg-brand/50" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-2 last:border-b-0">
      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      <span className="text-right text-sm font-medium">{v || "—"}</span>
    </div>
  );
}

function Custom({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="mt-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const sel = value === o;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-150 ${
                sel
                  ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                  : "border border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MultiPicker({
  label,
  values,
  onChange,
  options,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  options: string[];
}) {
  return (
    <div className="mt-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const sel = values.includes(o);
          return (
            <button
              key={o}
              onClick={() => onChange(sel ? values.filter((x) => x !== o) : [...values, o])}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-150 ${
                sel
                  ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                  : "border border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
