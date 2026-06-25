import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { SiteHeader } from "@/components/orvyn/site-header";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — ORVYN" },
      { name: "description", content: "Connecte-toi à ton espace ORVYN." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto grid max-w-md gap-8 px-6 py-20">
        <div className="text-center animate-in">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand/10">
            <Sparkles className="size-6 text-brand" />
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight">
            {mode === "signin" ? "Connexion" : "Créer un compte"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accède à tes crédits, commandes et favoris.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("Authentification désactivée", {
              description: "Active Lovable Cloud pour activer l'auth réelle.",
            });
            navigate({ to: "/dashboard" });
          }}
          className="animate-in animate-in-delay-1 space-y-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-150 hover:glow-sm"
        >
          {mode === "signup" && (
            <div className="group relative">
              <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full rounded-xl border border-border bg-background px-11 py-3.5 text-sm outline-none transition-all duration-150 focus:border-brand/50 focus:shadow-lg focus:shadow-brand/5"
                placeholder="Prénom"
              />
            </div>
          )}
          <div className="group relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              required
              className="w-full rounded-xl border border-border bg-background px-11 py-3.5 text-sm outline-none transition-all duration-150 focus:border-brand/50 focus:shadow-lg focus:shadow-brand/5"
              placeholder="Email"
            />
          </div>
          <div className="group relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              required
              className="w-full rounded-xl border border-border bg-background px-11 py-3.5 text-sm outline-none transition-all duration-150 focus:border-brand/50 focus:shadow-lg focus:shadow-brand/5"
              placeholder="Mot de passe"
            />
          </div>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-black uppercase tracking-wider text-brand-foreground transition-all duration-150 hover:glow">
            {mode === "signin" ? "Se connecter" : "Créer mon compte"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="block w-full text-center text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
          >
            {mode === "signin"
              ? "Pas encore de compte ? Créer un compte"
              : "Déjà inscrit ? Se connecter"}
          </button>
        </form>

        <Link
          to="/"
          className="group animate-in animate-in-delay-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
        >
          <span className="inline-flex items-center gap-1">
            <ArrowLeft className="size-3" /> Retour à l'accueil
          </span>
        </Link>
      </div>
    </div>
  );
}
