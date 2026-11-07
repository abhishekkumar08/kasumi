import { ShieldCheck } from "lucide-react";

/**
 * Split-screen auth layout — a branded panel beside the form.
 *
 * This is the pattern every serious money product uses (Mercury, Ramp, Wise)
 * for one reason: a form floating alone in whitespace carries no signal, while
 * a panel that states what the product is and who it is for does the
 * trust-building the form cannot. The panel stays dark in both themes on
 * purpose — it is the brand surface, not a content surface, so it should not
 * invert underneath the user.
 *
 * All user-visible copy arrives as props so strings stay at the call site.
 *
 * @param {Parameters<typeof import("../index").AuthShell>[0]} props
 */
export function AuthShell({
  appName,
  tagline,
  highlights,
  icon: Icon,
  logo,
  assurance,
  children,
}) {
  return (
    <main className="material-canvas flex min-h-screen">
      {/* Brand panel — hidden on small screens, where the form is the whole job.
          The `dark` class scopes the dark token values to this panel, so it
          stays dark whichever theme the rest of the page is in. */}
      <aside className="dark relative hidden w-[44%] max-w-xl flex-col justify-between overflow-hidden material-canvas p-12 lg:flex">
        {/* One deliberate accent glow. Static: a moving gradient behind a login
            form reads as a landing page, not a bank. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-pill bg-success-emphasis/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-pill bg-info-emphasis/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          {logo}
          {!logo && Icon && (
            <span className="flex h-9 w-9 items-center justify-center rounded-control bg-success-emphasis/15 ring-1 ring-success-emphasis/30">
              <Icon className="h-5 w-5 text-success-fg" aria-hidden />
            </span>
          )}
          <span className="text-label font-semibold tracking-tight text-fg">
            {appName}
          </span>
        </div>

        <div className="relative">
          <h2 className="max-w-sm text-headline text-fg">{tagline}</h2>
          {highlights?.length > 0 && (
            <ul className="mt-8 space-y-4">
              {highlights.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 shrink-0 rounded-pill bg-success-fg"
                  />
                  <div>
                    <p className="text-label text-fg">{item.label}</p>
                    <p className="text-body text-fg-muted">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {assurance && (
          <p className="relative flex items-center gap-2 text-caption text-fg-muted">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            {assurance}
          </p>
        )}
      </aside>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </main>
  );
}
