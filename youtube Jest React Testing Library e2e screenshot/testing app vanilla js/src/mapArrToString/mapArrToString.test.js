const mapArrToString = require("./mapArrToString");

describe("mapArrToString", () => {
  test("correct value", () => {
    expect(mapArrToString([1, 2, 3])).toEqual(["1", "2", "3"]);
  });
  test("incorrect value", () => {
    expect(mapArrToString([1, 2, 3, null, undefined, "asdad"])).toEqual([
      "1",
      "2",
      "3",
    ]);
  });
  test("not equal", () => {
    expect(mapArrToString([1, 22, 4])).not.toEqual([4, 0, 7]);
  });
});
