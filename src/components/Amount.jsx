import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../utils/cn.js";
import { amountInWords } from "../utils/amountInWords.js";

const formats = new Map();
const formatter = (locale, currency, decimals) => {
  const key = `${locale}|${currency}|${decimals}`;
  if (!formats.has(key))
    formats.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    );
  return formats.get(key);
};

/**
 * Money, formatted once for the whole suite: tabular figures, two decimals
 * (`decimals={0}` for a headline total), the currency's own symbol. `tone="auto"` colours money in (positive) as
 * success and money out as error; `sign="always"` prefixes + / −;
 * `trendIcon` adds an up/down arrow so colour isn't the only signal.
 * `caption` is a muted line under the figure (the amount in words, say),
 * right-aligned as amounts are in a list.
 *
 * @param {Parameters<typeof import("../index").Amount>[0]} props
 */
export function Amount({
  value,
  currency = "INR",
  locale = "en-IN",
  sign = "none",
  tone = "neutral",
  trendIcon = false,
  caption,
  words = false,
  decimals = 2,
  className,
}) {
  const number = Number(value) || 0;
  const text = formatter(locale, currency, decimals).format(Math.abs(number));
  const prefix =
    sign === "always"
      ? number < 0
        ? "−"
        : "+"
      : number < 0 && sign === "auto"
        ? "−"
        : "";
  const Trend = number < 0 ? TrendingDown : TrendingUp;
  const figure = (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap font-semibold tabular-nums",
        tone === "auto"
          ? number < 0
            ? "text-error-fg"
            : "text-success-fg"
          : "text-fg",
        className
      )}
    >
      {trendIcon && <Trend aria-hidden="true" className="h-4 w-4 shrink-0" />}
      {prefix}
      {text}
    </span>
  );
  // A headline figure with the amount spelled out under it, read from the
  // start like the tile it sits in. Rounded as the figure is.
  if (words)
    return (
      <span className="flex flex-col items-start gap-0.5 text-left">
        {figure}
        <span
          aria-hidden="true"
          className="text-caption font-normal text-fg-muted"
          data-amount-words
        >
          {amountInWords(
            decimals === 0 ? Math.round(Math.abs(number)) : number
          )}
        </span>
      </span>
    );
  if (!caption) return figure;
  return (
    <span className="inline-flex flex-col items-end gap-0.5 text-right">
      {figure}
      <span className="max-w-[11rem] text-caption text-fg-muted sm:max-w-xs">
        {caption}
      </span>
    </span>
  );
}
