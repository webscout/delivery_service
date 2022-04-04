import { parseDistanceMap, stringifyDistancesMap } from "./townDistances";

describe("Get distance map from string", () => {
  it("Of size one", () => {
    expect(parseDistanceMap("AB1")).toMatchObject({
      A: {
        B: 1,
      },
    });
  });

  it("Of size two", () => {
    expect(parseDistanceMap("AB1,BC2,AD3")).toMatchObject({
      A: {
        B: 1,
        D: 3,
      },
      B: {
        C: 2,
      },
    });
  });

  it("With spaces", () => {
    expect(parseDistanceMap(" AB1, BC2 ")).toMatchObject({
      A: {
        B: 1,
      },
      B: {
        C: 2,
      },
    });
  });

  it("Empty", () => {
    expect(() => parseDistanceMap("")).toThrowError();
  });

  it("Bad route description", () => {
    expect(() => parseDistanceMap("AB1,AAA")).toThrowError();
  });
});

describe("Stringify distances", () => {
  it("Of size one", () => {
    expect(
      stringifyDistancesMap({
        A: { B: 1 },
      })
    ).toBe("AB1");
  });

  it("Of size many", () => {
    expect(
      stringifyDistancesMap({
        A: { B: 1 },
        B: { C: 2, D: 3 },
      })
    ).toBe("AB1,BC2,BD3");
  });
});
