// unit tests powered by vitest
// run with npm run vitest
import { expect, expectTypeOf, test } from "vitest";
import {
  DUMMY_IDEA_DATA,
  formatDateForDisplay,
  dateXMinutesAgo,
} from "./src/helpers.js";

test("TRUTHY EXAMPLE", () => {
  expect(1 + 2).toBe(3);
});

/* =============================================================== */
/* =========================== HELPERS ============================ */
test("DUMMY_IDEA_DATA variable contains 3 tips", () => {
  expect(DUMMY_IDEA_DATA.length).toBe(3);
});

test("formatDateForDisplay function", () => {
  expect(formatDateForDisplay("2024-12-26T14:45:00")).toBe(
    "26 December 2024 | 02:45 pm"
  );
  expect(formatDateForDisplay("2024-07-01T00:15:00")).toBe(
    "1 July 2024 | 00:15 am"
  ); // note that in-browser, this would be 12:15 am
  expect(formatDateForDisplay("2024-01-01T23:59:59")).toBe(
    "1 January 2024 | 11:59 pm"
  );
  expect(formatDateForDisplay("")).toBe(""); // Empty string should return an empty string
});

test("dateXMinutesAgo function", () => {
  expect(dateXMinutesAgo(0).toString()).toBe(new Date().toString());
  expect(dateXMinutesAgo(-5).toString()).not.toBe(new Date().toString()); // a time 5 minutes ago should not be the same as the current time
});
