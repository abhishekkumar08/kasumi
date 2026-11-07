/** Label + description beside a checkbox, radio or switch. */
/** @param {{ label?: import("react").ReactNode, description?: import("react").ReactNode, labelId?: string, descriptionId?: string }} props */
export function ChoiceText({ label, description, labelId, descriptionId }) {
  if (!label && !description) return null;
  return (
    <span className="min-w-0">
      {label && (
        <span id={labelId} className="block text-label text-fg">
          {label}
        </span>
      )}
      {description && (
        <span id={descriptionId} className="block text-caption text-fg-muted">
          {description}
        </span>
      )}
    </span>
  );
}
