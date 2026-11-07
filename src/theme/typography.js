// Type roles: [size, line height, weight, letter spacing]. Its own module so
// cn() can read the role names without pulling in every colour token.
export const typography = {
  display: ["2.25rem", "2.75rem", "600", "-0.02em"],
  headline: ["1.75rem", "2.25rem", "600", "-0.02em"],
  "title-lg": ["1.375rem", "1.75rem", "600", "-0.01em"],
  title: ["1.125rem", "1.625rem", "600", "-0.01em"],
  "body-lg": ["1rem", "1.5rem", "400", "0"],
  body: ["0.875rem", "1.25rem", "400", "0"],
  label: ["0.875rem", "1.25rem", "500", "0"],
  caption: ["0.75rem", "1rem", "400", "0"],
};
