import assert from "node:assert/strict";
import { amountInWords } from "./amountInWords.js";

assert.equal(amountInWords(0), "Zero rupees");
assert.equal(amountInWords(1), "One rupee");
assert.equal(
  amountInWords(241097),
  "Two lakh forty-one thousand ninety-seven rupees"
);
assert.equal(
  amountInWords(1229847),
  "Twelve lakh twenty-nine thousand eight hundred forty-seven rupees"
);
assert.equal(
  amountInWords(23416.73),
  "Twenty-three thousand four hundred sixteen rupees and seventy-three paise"
);
assert.equal(amountInWords(0.5), "Fifty paise");
assert.equal(amountInWords(-1500), "One thousand five hundred rupees");
assert.equal(amountInWords(125000000), "Twelve crore fifty lakh rupees");
assert.equal(amountInWords(10000000000), "One thousand crore rupees");
console.log("amountInWords ok");
