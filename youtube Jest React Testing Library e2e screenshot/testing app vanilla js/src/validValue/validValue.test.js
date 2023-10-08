const validateValue = require("./validValue");

test("validateValue", () => {
  expect(validateValue(-1)).toBe(false);
  expect(validateValue(101)).toBe(false);
  expect(validateValue(0)).toBe(true);
  expect(validateValue(100)).toBe(true);
});
