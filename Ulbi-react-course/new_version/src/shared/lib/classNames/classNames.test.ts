import { classNames } from "shared/lib/classNames/classNames";

describe("classNames", () => {
  test.skip("with only first param", () => {
    expect(classNames("someClass")).toBe("someClass");
  });
  test.skip("with additional class", () => {
    expect(classNames("someClass", {}, ["class1", "class2"])).toBe(
      "someClass class1 class2"
    );
  });
  test.skip("with mods", () => {
    expect(
      classNames("someClass", { hovered: true, scrollable: true }, [
        "class1",
        "class2",
      ])
    ).toBe("someClass class1 class2 hovered scrollable");
  });
  test.skip("with mods false", () => {
    expect(
      classNames("someClass", { hovered: true, scrollable: false }, [
        "class1",
        "class2",
      ])
    ).toBe("someClass class1 class2 hovered");
  });
  test.skip("with mods undefined false", () => {
    expect(
      classNames("someClass", { hovered: undefined, scrollable: false }, [
        "class1",
        "class2",
      ])
    ).toBe("someClass class1 class2");
  });
});
