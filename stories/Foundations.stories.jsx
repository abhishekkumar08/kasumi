import { color, fontFamily, typography } from "../src/index.js";

export default { title: "Foundations/Tokens" };

export const ColourRoles = {
  render: () => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(color.roles).map(([name, use]) => (
        <div key={name} className="flex items-center gap-3">
          <span
            className="h-10 w-10 shrink-0 rounded-control border border-line"
            style={{ backgroundColor: `rgb(var(--mw-${name}) / var(--mw-${name}-alpha, 1))` }}
          />
          <div className="min-w-0">
            <p className="font-mono text-caption text-fg">{name}</p>
            <p className="truncate text-caption text-fg-muted">{use}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TypeScale = {
  render: () => (
    <div className="space-y-3">
      {Object.entries(typography).map(([name, [size, line, weight]]) => (
        <div key={name} className="flex items-baseline gap-6">
          <span className="w-40 shrink-0 font-mono text-caption text-fg-muted">
            {name} · {size}/{line} · {weight}
          </span>
          <span className={`text-${name} text-fg`}>Spent ₹12,480 this month</span>
        </div>
      ))}
    </div>
  ),
};

export const FontFamilies = {
  render: () => (
    <div className="space-y-3">
      {Object.entries(fontFamily).map(([name, stack]) => (
        <div key={name} className="flex items-baseline gap-6">
          <span className="w-40 shrink-0 font-mono text-caption text-fg-muted">{name}</span>
          <span className={`font-${name} text-body-lg text-fg`}>{stack[0]}: const total = 12480;</span>
        </div>
      ))}
    </div>
  ),
};

export const CodePalette = {
  name: "Code syntax palette",
  render: () => (
    <div className="space-y-2 rounded-card border border-line bg-surface-subtle p-4 font-mono text-body">
      {Object.keys(color.roles)
        .filter((role) => role.startsWith("code-"))
        .map((role) => (
          <p key={role} className={`text-${role}`}>
            {role}
          </p>
        ))}
    </div>
  ),
};
