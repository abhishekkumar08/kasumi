"use client";

import { useState } from "react";
import { UserCheck } from "lucide-react";
import { Alert } from "./Alert.jsx";
import { Button } from "./Button.jsx";

/**
 * Shown when someone opens the sign-in page while a session is already active.
 *
 * Every app used to redirect straight to the dashboard from a `useEffect`, so
 * the form never rendered and there was no way to reach it. That looks like the
 * login being ignored: you type different credentials, nothing happens, and you
 * are still on the previous account. It is worse than cosmetic on a phone, where
 * the sidebar holding the logout control is hidden entirely — the cached account
 * becomes the only one reachable.
 *
 * So state the situation and offer both real choices: keep this session, or drop
 * it and sign in as somebody else.
 *
 * @param {Parameters<typeof import("../index").AlreadySignedIn>[0]} props
 */
export function AlreadySignedIn({
  user,
  onContinue,
  onSignOut,
  continueLabel = "Continue",
}) {
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const signOut = async () => {
    setSigningOut(true);
    setError("");
    try {
      await onSignOut();
    } catch (signOutError) {
      setError(
        signOutError?.message || "Could not sign out. Please try again."
      );
      setSigningOut(false);
    }
  };

  const name = user?.displayName || user?.email || "your account";

  return (
    <div className="px-6 py-section text-center">
      <div className="flex justify-center mb-4">
        <UserCheck className="h-12 w-12 text-success-fg" aria-hidden />
      </div>
      <h2 className="mb-2 text-title text-fg">You are already signed in</h2>
      <p className="mx-auto mb-6 max-w-sm text-body text-fg-muted">
        This device is signed in as <strong>{name}</strong>. To use a different
        account, sign out first.
      </p>
      {error && <Alert className="mb-4">{error}</Alert>}
      {/* `Button`, not the app-local `.btn` classes: those resolve differently
          in each app, which is why this panel used to render a green gradient
          in one app and a flat grey in the next. */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button type="button" onClick={onContinue} disabled={signingOut}>
          {continueLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={signOut}
          disabled={signingOut}
        >
          {signingOut ? "Signing out…" : "Use a different account"}
        </Button>
      </div>
    </div>
  );
}
