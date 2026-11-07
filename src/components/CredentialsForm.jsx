"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Alert } from "./Alert.jsx";
import { Button } from "./Button.jsx";
import { fieldClasses } from "./classes.js";

const FIELD = fieldClasses(false);
const LABEL = "mb-2 block text-label text-fg";

/**
 * The sign-in / sign-up form, shared by every app in the suite.
 *
 * Previously each app carried its own copy of this markup, which is how six
 * logins ended up with six different field styles, three different password
 * toggles, and two places where the "passwords must match" rule was enforced.
 * The form owns its own field state so a call site only supplies copy and the
 * auth calls — nothing here needs lifting.
 *
 * `onGoogle` is optional: omit it and the divider and button disappear.
 *
 * @param {Parameters<typeof import("../index").CredentialsForm>[0]} props
 */
export function CredentialsForm({
  copy,
  busy,
  error,
  onSubmit,
  onGoogle = null,
  requireConfirm = true,
}) {
  const [signupMode, setSignupMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  /* The caller owns `error` and cannot be told to drop it from in here, so
     switching between sign-in and sign-up hides it until the next submit.
     Otherwise "Invalid email or password" from a failed sign-in sits on top of
     the sign-up form, accusing you of something you have not done yet. */
  const [staleError, setStaleError] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setLocalError("");
    setStaleError(false);

    if (signupMode) {
      if (requireConfirm && password !== confirmPassword) {
        setLocalError(copy.PASSWORD_MISMATCH);
        return;
      }
      if (password.length < 8) {
        setLocalError(copy.PASSWORD_TOO_SHORT);
        return;
      }
    }

    onSubmit({ email, password, displayName }, { signupMode });
  };

  const toggleMode = () => {
    setSignupMode((current) => !current);
    setLocalError("");
    setStaleError(true);
  };

  const shown = localError || (staleError ? "" : error);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-headline text-fg">
          {signupMode ? copy.SIGNUP_TITLE : copy.SIGNIN_TITLE}
        </h1>
        <p className="mt-2 text-body text-fg-muted">
          {signupMode ? copy.SIGNUP_SUBTITLE : copy.SIGNIN_SUBTITLE}
        </p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        {shown && <Alert>{shown}</Alert>}

        {signupMode && (
          <div>
            <label className={LABEL} htmlFor="display-name">
              {copy.NAME_LABEL}
            </label>
            <input
              id="display-name"
              className={FIELD}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>
        )}

        <div>
          <label className={LABEL} htmlFor="email">
            {copy.EMAIL_LABEL}
          </label>
          <input
            id="email"
            type="email"
            className={FIELD}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="password">
            {copy.PASSWORD_LABEL}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`${FIELD} pr-11`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={signupMode ? "new-password" : "current-password"}
              required
            />
            <button
              type="button"
              aria-label={
                showPassword ? copy.HIDE_PASSWORD : copy.SHOW_PASSWORD
              }
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-control text-fg-muted transition-colors duration-fast hover:text-fg focus-ring"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden />
              ) : (
                <Eye className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
          {signupMode && (
            <p className="mt-2 text-caption text-fg-muted">
              {copy.PASSWORD_HINT}
            </p>
          )}
        </div>

        {signupMode && requireConfirm && (
          <div>
            <label className={LABEL} htmlFor="confirm-password">
              {copy.CONFIRM_LABEL}
            </label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              className={FIELD}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        )}

        <Button type="submit" size="lg" disabled={busy} className="w-full">
          {busy
            ? copy.BUSY
            : signupMode
              ? copy.SIGNUP_ACTION
              : copy.SIGNIN_ACTION}
        </Button>
      </form>

      {onGoogle && (
        <>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-caption text-fg-muted">{copy.OR}</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onGoogle}
            disabled={busy}
            className="w-full"
          >
            {copy.GOOGLE}
          </Button>
        </>
      )}

      <p className="mt-8 text-center text-body text-fg-muted">
        {signupMode ? copy.HAS_ACCOUNT : copy.NO_ACCOUNT}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="rounded-control font-semibold text-fg underline underline-offset-4 focus-ring"
        >
          {signupMode ? copy.SIGNIN_ACTION : copy.SIGNUP_ACTION}
        </button>
      </p>
    </>
  );
}
