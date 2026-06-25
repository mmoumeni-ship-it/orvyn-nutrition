import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Check, Sparkles, ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import { SUBS } from "@/lib/orvyn-data";
import { useOrvyn } from "@/lib/orvyn-store";
import { MEDIA } from "@/lib/orvyn-media";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Abonnements ORVYN — Start, Pro, Elite" },
      {
        name: "description",
        content: "Trois formules pour fueler ta performance. Économise jusqu'à 38% par repas.",
      },
    ],
  }),
  component: SubsPage,
});

function SubsPage() {
  const navigate = useNavigate();
  const { addCredits } = useOrvyn();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="relative overflow-hidden border-b border-border/60">
        <video
          src={MEDIA.prepVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={MEDIA.bowl2}
          className="absolute inset-0 -z-10 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Abonnements ORVYN
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
            Moins de friction. Plus de performance.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tes crédits sont rechargés chaque mois. Utilisables sur tous les bowls, shakes et
            snacks. Sans engagement.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { i: Zap, t: "Crédits mensuels", d: "Rechargés automatiquement chaque mois" },
            {
              i: TrendingUp,
              t: "Économies progressives",
              d: "Jusqu'à 38% d'économie vs achat unitaire",
            },
            { i: Shield, t: "Sans engagement", d: "Arrête quand tu veux, pas de frais cachés" },
          ].map((feat, i) => (
            <div
              key={feat.t}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 animate-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feat.i className="size-5 shrink-0 text-brand" />
              <div>
                <div className="text-sm font-bold">{feat.t}</div>
                <div className="text-xs text-muted-foreground">{feat.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SUBS.map((s, i) => (
            <div
              key={s.id}
              className={`relative flex flex-col rounded-3xl border p-8 animate-in transition-all duration-200 hover:glow-sm ${
                s.popular
                  ? "border-brand bg-surface ring-2 ring-brand/30 scale-[1.02]"
                  : "border-border bg-surface"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {s.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-foreground shadow-lg">
                  Plus populaire
                </span>
              )}
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.name}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight">{s.price}€</span>
                <span className="text-sm text-muted-foreground">/ mois</span>
              </div>
              <p className="mt-1 text-xs font-bold text-brand">
                {s.credits} crédits — Économie {s.save}€ vs achat à l'unité
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {s.perks.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <Check className="size-4 shrink-0 text-brand" /> {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  addCredits(s.credits);
                  toast.success(`Plan ${s.name} activé`, {
                    description: `+${s.credits} crédits ajoutés. Démarre ta commande maintenant.`,
                  });
                  navigate({ to: "/order" });
                }}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-black uppercase tracking-widest transition-all duration-150 ${
                  s.popular
                    ? "bg-brand text-brand-foreground hover:glow"
                    : "border border-border bg-background hover:bg-surface-2 hover:border-brand/40"
                }`}
              >
                Choisir {s.name} <ArrowRight className="size-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 animate-in rounded-3xl border border-border bg-surface p-8 transition-all duration-150 hover:glow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-brand" />
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Achat à l'unité
            </p>
          </div>
          <h3 className="mt-2 text-2xl font-black tracking-tight">
            Sans engagement, sans abonnement.
          </h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-5">
            {[
              ["Bowl Signature", "12,90 €", "1 crédit"],
              ["Plat de la semaine", "13,90 €", "1 crédit"],
              ["Bowl Personnalisé", "14,90 €", "1,25 crédit"],
              ["Shake ORVYN", "4,90 €", "0,5 crédit"],
              ["Snack ORVYN", "3,90 €", "0,5 crédit"],
            ].map(([n, p, c]) => (
              <div key={n} className="bg-background p-5 transition-colors hover:bg-surface-2">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {n}
                </div>
                <div className="mt-2 text-xl font-black">{p}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-brand">{c}</div>
              </div>
            ))}
          </div>
          <Link
            to="/order"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-foreground transition-all duration-150 hover:glow"
          >
            Démarrer ma commande à l'unité{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
