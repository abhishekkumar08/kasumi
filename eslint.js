// Flat-config block that keeps apps on @kasumi/ui: a raw interactive element
// lints as an error naming the component to use. Exceptions match
// scripts/ds-adoption.mjs — hidden inputs and spread-only inputs have no
// visible DS equivalent.
const REPLACEMENTS = {
  button: "Button or IconButton",
  select: "Select",
  textarea: "Textarea",
  table: "Table",
  dialog: "Modal",
  details: "Disclosure",
};

const restricted = [
  ...Object.entries(REPLACEMENTS).map(([tag, component]) => ({
    selector: `JSXOpeningElement[name.name="${tag}"]`,
    message: `Use ${component} from @kasumi/ui instead of a raw <${tag}>.`,
  })),
  {
    selector:
      'JSXOpeningElement[name.name="input"]:not(:has(JSXAttribute[name.name="type"][value.value=/^(hidden|file)$/])):not(:has(JSXSpreadAttribute))',
    message:
      "Use Input, Checkbox, Radio or Switch from @kasumi/ui instead of a raw <input>.",
  },
  {
    selector:
      'JSXOpeningElement[name.name="input"]:has(JSXAttribute[name.name="type"][value.value="file"])',
    message: "Use FileDropzone from @kasumi/ui instead of a raw file <input>.",
  },
];

export const designSystemGuard = {
  files: ["src/**/*.{js,jsx,ts,tsx}"],
  // The gallery renders raw elements on purpose, to compare against.
  ignores: ["src/**/designSystem/**"],
  rules: {
    "no-restricted-syntax": ["error", ...restricted],
  },
};
