import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Clock, Search, Check, ChevronRight, Dumbbell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/orvyn/site-header";
import { GYMS } from "@/lib/orvyn-data";
import { useOrvyn } from "@/lib/orvyn-store";
import { MEDIA } from "@/lib/orvyn-media";

export const Route = createFileRoute("/gyms")({
  head: () => ({
    meta: [
      { title: "Salles partenaires ORVYN — Trouve ton point de retrait" },
      {
        name: "description",
        content:
          "Découvre les salles de sport partenaires ORVYN. Récupère ton repas directement après ta séance.",
      },
    ],
  }),
  component: GymsPage,
});

function GymsPage() {
  const { gym, setGym } = useOrvyn();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const list = GYMS.filter(
    (g) =>
      !q ||
      g.name.toLowerCase().includes(q.toLowerCase()) ||
      g.brand.toLowerCase().includes(q.toLowerCase()) ||
      g.address.toLowerCase().includes(q.toLowerCase()),
  );

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
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Étape 01 — Sélection
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
            Trouve ta salle ORVYN
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Choisis ton point de retrait. Les horaires ORVYN et le temps moyen de préparation
            s'affichent pour chaque salle.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 ring-1 ring-border transition-all duration-300 focus-within:border-brand/50 animate-in">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une salle, une ville, une enseigne…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {list.length === 0 ? (
          <div className="mt-10 animate-in rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center">
            <Dumbbell className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-lg font-bold">
              Aucune salle partenaire disponible dans votre secteur.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Essaie une autre recherche, on étend notre réseau chaque semaine.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((g, i) => {
              const selected = gym?.id === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setGym(g);
                    toast.success(`${g.brand} ${g.name} sélectionnée`);
                    navigate({ to: "/order" });
                  }}
                  className={`group rounded-2xl border bg-surface p-6 text-left transition-all duration-300 animate-in ${
                    selected
                      ? "border-brand bg-brand/5 shadow-lg shadow-brand/10"
                      : "border-border hover:border-brand/40 hover:glow-sm"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="grid size-12 place-items-center rounded-xl bg-background font-black italic text-muted-foreground ring-1 ring-border">
                      {g.brand
                        .split(" ")
                        .map((s) => s[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand">
                      Prêt en {g.prepMinutes} min
                    </span>
                  </div>
                  <div className="mt-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {g.brand}
                  </div>
                  <div className="mt-1 text-lg font-bold">{g.name}</div>
                  <div className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-3.5 shrink-0" />
                    <span>{g.address}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] uppercase tracking-widest">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="size-3" /> {g.hours}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 transition-all duration-300 ${
                        selected ? "text-brand" : "text-foreground group-hover:gap-2"
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="size-3" /> Sélectionnée
                        </>
                      ) : (
                        <>
                          <span>Sélectionner</span> <ChevronRight className="size-3" />
                        </>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
