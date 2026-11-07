import { cn } from "../utils/cn.js";

// Styles for markup Kasumi doesn't render itself: rendered markdown, CMS HTML.
// Headings scroll-margin past a sticky top bar when reached by #anchor.
const proseClasses = [
  "max-w-prose text-body-lg text-fg",
  "[&>*+*]:mt-4",
  "[&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-title-lg",
  "[&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-title",
  "[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:decoration-2",
  "[&_strong]:font-semibold",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li+li]:mt-1 [&_li::marker]:text-fg-muted",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-line-strong [&_blockquote]:pl-4 [&_blockquote]:text-fg-muted",
  "[&_hr]:my-8 [&_hr]:border-line",
  "[&_:not(pre)>code]:rounded-[0.25rem] [&_:not(pre)>code]:bg-surface-muted [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.85em]",
].join(" ");

/**
 * Long-form reading: articles, explanations, rendered markdown. Kasumi
 * components (CodeBlock, Alert as a callout, Figure) can sit inside it.
 *
 * @param {Parameters<typeof import("../index").Prose>[0]} props
 */
export function Prose({ children, as: Tag = "div", className }) {
  return <Tag className={cn(proseClasses, className)}>{children}</Tag>;
}

/**
 * An image, diagram or chart with a caption under it.
 *
 * @param {Parameters<typeof import("../index").Figure>[0]} props
 */
export function Figure({ children, caption, className }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-card border border-line">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-caption text-fg-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
