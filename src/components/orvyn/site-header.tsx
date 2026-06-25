import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { useOrvyn, cartTotals } from "@/lib/orvyn-store";
import { useState, useEffect } from "react";

const NAV = [
  { to: "/order", label: "Commander" },
  { to: "/menu", label: "Menu" },
  { to: "/gyms", label: "Salles" },
  { to: "/subscriptions", label: "Abonnements" },
  { to: "/dashboard", label: "Mon espace" },
];

export function SiteHeader() {
  const { cart, credits } = useOrvyn();
  const t = cartTotals(cart);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="group flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground transition-all duration-300 group-hover:glow-sm">
              <Sparkles className="size-4" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tighter">ORVYN</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative transition-colors hover:text-foreground ${
                    active ? "text-foreground" : ""
                  }`}
                >
                  {n.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden flex-col items-end leading-tight sm:flex">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Crédits
            </span>
            <span className="text-sm font-black text-brand transition-all duration-300 hover:glow-sm">
              {credits.toFixed(1)}
            </span>
          </div>
          <Link
            to="/order"
            className="group hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-foreground transition-all duration-300 hover:glow lg:inline-flex"
          >
            Commander
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/cart"
            className="group relative flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-sm font-semibold ring-1 ring-border transition-all duration-300 hover:bg-surface-2 hover:ring-brand/30"
          >
            <ShoppingBag className="size-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Panier</span>
            {t.items > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-brand text-[10px] font-black text-brand-foreground transition-all duration-300 animate-in">
                {t.items}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex size-9 items-center justify-center rounded-lg bg-surface ring-1 ring-border md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-in border-t border-border/60 bg-background px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <Link
              to="/order"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand py-3 text-xs font-black uppercase tracking-widest text-brand-foreground"
            >
              Commander <ArrowRight className="size-3.5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground">
                <Sparkles className="size-4" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tighter">ORVYN</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Plateforme de nutrition sportive intelligente. Commande ton repas, récupère-le
              directement dans ta salle.
            </p>
            <p className="mt-6 text-xl font-black tracking-tight">
              « Choisis ton objectif. <span className="text-brand">ORVYN</span> construit ton repas.
              »
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Plateforme
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/order" className="transition-colors hover:text-brand">
                  Commander
                </Link>
              </li>
              <li>
                <Link to="/menu" className="transition-colors hover:text-brand">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/gyms" className="transition-colors hover:text-brand">
                  Salles partenaires
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="transition-colors hover:text-brand">
                  Abonnements
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Compte
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-brand">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link to="/auth" className="transition-colors hover:text-brand">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} ORVYN — Performance Nutrition</span>
          <span className="uppercase tracking-widest">Engineered for athletes</span>
        </div>
      </div>
    </footer>
  );
}
