const ONES = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const belowHundred = (n) =>
  n < 20
    ? ONES[n]
    : `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${ONES[n % 10]}` : ""}`;

const belowThousand = (n) =>
  [
    n >= 100 && `${ONES[Math.floor(n / 100)]} hundred`,
    n % 100 && belowHundred(n % 100),
  ]
    .filter(Boolean)
    .join(" ");

/** A whole number in the Indian system: crore, lakh, thousand, hundred. */
function wholeInWords(n) {
  if (n === 0) return "zero";
  const parts = [];
  const crore = Math.floor(n / 1e7);
  if (crore) parts.push(`${wholeInWords(crore)} crore`);
  const lakh = Math.floor((n % 1e7) / 1e5);
  if (lakh) parts.push(`${belowHundred(lakh)} lakh`);
  const thousand = Math.floor((n % 1e5) / 1e3);
  if (thousand) parts.push(`${belowHundred(thousand)} thousand`);
  if (n % 1e3) parts.push(belowThousand(n % 1e3));
  return parts.join(" ");
}

/**
 * An amount of rupees in words, the Indian way: 241097 → "Two lakh
 * forty-one thousand ninety-seven rupees", 12.5 → "Twelve rupees and fifty
 * paise". The sign is dropped (the figure beside it shows it).
 */
export function amountInWords(value) {
  const paiseTotal = Math.round(Math.abs(Number(value) || 0) * 100);
  const rupees = Math.floor(paiseTotal / 100);
  const paise = paiseTotal % 100;
  const words = [
    (rupees || !paise) &&
      `${wholeInWords(rupees)} ${rupees === 1 ? "rupee" : "rupees"}`,
    paise && `${belowHundred(paise)} paise`,
  ]
    .filter(Boolean)
    .join(" and ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
