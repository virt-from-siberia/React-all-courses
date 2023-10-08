const square = require("./square");

describe("square", () => {
  let mockValue;
  // Перед каждым запуском
  beforeEach(() => {
    mockValue = Math.random();
    // Например  ДОБАВИТЬ В БД
  });

  beforeAll(() => {
    // Один раз перед всеми тестами
  });

  test("square", () => {
    const spyMathPow = jest.spyOn(Math, "pow");
    square(2);
    expect(spyMathPow).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {});
});
