import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, CreditCard, Coins, Check, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import { useOrvyn, cartTotals } from "@/lib/orvyn-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Panier — ORVYN" },
      { name: "description", content: "Récapitulatif de ta commande ORVYN avant paiement." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const store = useOrvyn();
  const { cart, remove, gym, pickupTime, credits, clear, goal } = store;
  const t = cartTotals(cart);
  const [mode, setMode] = useState<"card" | "credits">("card");
  const navigate = useNavigate();

  const enoughCredits = credits >= t.credits;

  const checkout = () => {
    if (cart.length === 0) return;
    if (mode === "credits" && !enoughCredits) {
      return toast.error("Crédits insuffisants");
    }
    if (mode === "credits") store.useCredits(t.credits);
    clear();
    toast.success("Commande confirmée ✓", {
      description: `Retrait à ${pickupTime ?? "—"} chez ${gym?.brand ?? "—"}`,
    });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">Étape finale</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Ton panier</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="animate-in rounded-2xl border border-dashed border-border bg-surface/40 p-16 text-center">
                <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-4 text-lg font-bold">Ton panier est vide.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore le menu et ajoute tes repas, shakes ou snacks.
                </p>
                <Link
                  to="/menu"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-foreground transition-all duration-150 hover:glow"
                >
                  Explorer le menu{" "}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ) : (
              cart.map((l, i) => (
                <div
                  key={l.id}
                  className="animate-in flex items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-150 hover:border-brand/30 hover:glow-sm"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex-1">
                    <h3 className="font-bold">{l.name}</h3>
                    {l.details && <p className="mt-1 text-xs text-muted-foreground">{l.details}</p>}
                    {l.macros && (
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-brand">
                        {l.macros.kcal} kcal · {l.macros.protein}g prot · {l.macros.carbs}g gluc ·{" "}
                        {l.macros.fat}g lip
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Qté {l.qty} · {l.credits} crédit{l.credits > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-lg font-black">{(l.price * l.qty).toFixed(2)} €</span>
                    <button
                      onClick={() => remove(l.id)}
                      className="rounded-lg p-2 text-muted-foreground transition-all duration-150 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <div className="animate-in rounded-2xl border border-border bg-surface p-5 transition-all duration-150 hover:glow-sm">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Salle
                    </div>
                    <div className="mt-1 font-bold">{gym ? `${gym.brand} ${gym.name}` : "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Objectif
                    </div>
                    <div className="mt-1 font-bold capitalize">{goal ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Retrait
                    </div>
                    <div className="mt-1 font-bold text-brand">{pickupTime ?? "—"}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="animate-in rounded-2xl border border-border bg-surface p-6 transition-all duration-150 hover:glow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Récapitulatif
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    {t.items} article{t.items > 1 ? "s" : ""}
                  </span>
                  <span className="font-bold">{t.price.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Crédits requis</span>
                  <span>{t.credits.toFixed(2)}</span>
                </div>
              </div>
              {t.kcal > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2 rounded-xl bg-background p-3 text-center">
                  {[
                    ["kcal", t.kcal],
                    ["P", `${t.protein}g`],
                    ["G", `${t.carbs}g`],
                    ["L", `${t.fat}g`],
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

              <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Mode de paiement
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode("card")}
                  className={`flex items-center gap-2 rounded-lg border p-3 text-xs font-bold transition-all duration-150 ${
                    mode === "card"
                      ? "border-brand bg-brand/5 shadow-lg shadow-brand/10"
                      : "border-border bg-background hover:border-brand/40"
                  }`}
                >
                  <CreditCard className="size-4" /> Carte
                </button>
                <button
                  onClick={() => setMode("credits")}
                  disabled={!enoughCredits}
                  className={`flex items-center gap-2 rounded-lg border p-3 text-xs font-bold transition-all duration-150 disabled:opacity-40 ${
                    mode === "credits"
                      ? "border-brand bg-brand/5 shadow-lg shadow-brand/10"
                      : "border-border bg-background hover:border-brand/40"
                  }`}
                >
                  <Coins className="size-4" /> {credits.toFixed(1)} crédits
                </button>
              </div>
              {!enoughCredits && (
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Tu as {credits.toFixed(1)} crédits — il en faut {t.credits.toFixed(2)}.
                </p>
              )}

              <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  À payer
                </span>
                <span className="text-3xl font-black">
                  {mode === "credits"
                    ? `${t.credits.toFixed(2)} crédits`
                    : `${t.price.toFixed(2)} €`}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={cart.length === 0}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-black uppercase tracking-wider text-brand-foreground transition-all duration-150 hover:glow disabled:opacity-40"
              >
                <Check className="size-4" /> Confirmer la commande
              </button>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">
                Paiement sécurisé via Stripe.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
