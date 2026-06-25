import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { OrvynProvider } from "../lib/orvyn-store";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center animate-in">
        <div className="text-8xl font-black text-brand">404</div>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que tu cherches n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-black uppercase tracking-wider text-brand-foreground transition-all duration-300 hover:glow"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/order"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:border-brand/40"
          >
            Commander
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center animate-in">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-destructive/10">
          <span className="text-2xl">⚠</span>
        </div>
        <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          Cette page ne s'est pas chargée
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Tu peux réessayer ou retourner à l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-black uppercase tracking-wider text-brand-foreground transition-all duration-300 hover:glow"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:border-brand/40"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ORVYN — Choisis ton objectif. ORVYN construit ton repas." },
      {
        name: "description",
        content:
          "Plateforme de nutrition sportive intelligente. Commande un repas adapté à tes objectifs et récupère-le dans ta salle de sport.",
      },
      { name: "author", content: "ORVYN" },
      { property: "og:title", content: "ORVYN — Choisis ton objectif. ORVYN construit ton repas." },
      {
        property: "og:description",
        content:
          "Plateforme de nutrition sportive intelligente. Commande un repas adapté à tes objectifs et récupère-le dans ta salle de sport.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@orvyn" },
      {
        name: "twitter:title",
        content: "ORVYN — Choisis ton objectif. ORVYN construit ton repas.",
      },
      {
        name: "twitter:description",
        content:
          "Plateforme de nutrition sportive intelligente. Commande un repas adapté à tes objectifs et récupère-le dans ta salle de sport.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/910416bc-b9d7-4686-95f2-2d9440534054/id-preview-7b6f4762--e6cfe7a7-77e2-444e-80ee-10e6bb45f19a.lovable.app-1782297879299.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/910416bc-b9d7-4686-95f2-2d9440534054/id-preview-7b6f4762--e6cfe7a7-77e2-444e-80ee-10e6bb45f19a.lovable.app-1782297879299.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" } as never,
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <OrvynProvider>
        <Outlet />
        <Toaster theme="dark" position="top-center" richColors closeButton />
      </OrvynProvider>
    </QueryClientProvider>
  );
}
