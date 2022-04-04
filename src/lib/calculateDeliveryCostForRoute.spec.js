import { calculateDeliveryCostForRoute } from "./calculateDeliveryCostForRoute";
import { parseDistanceMap } from "./townDistances";

const getDistanceMap = () =>
  parseDistanceMap("AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1");

describe("Calculate delivery cost for exact specific route", () => {
  it("Check A-B-E delivery cost", () => {
    expect(
      calculateDeliveryCostForRoute(getDistanceMap(), ["A", "B", "E"])
    ).toBe(4);
  });

  it("Check A-D delivery cost", () => {
    expect(calculateDeliveryCostForRoute(getDistanceMap(), ["A", "D"])).toBe(
      10
    );
  });

  it("Check E-A-C-F delivery cost", () => {
    expect(
      calculateDeliveryCostForRoute(getDistanceMap(), ["E", "A", "C", "F"])
    ).toBe(8);
  });

  it("Check A-D-F delivery cost", () => {
    expect(
      calculateDeliveryCostForRoute(getDistanceMap(), ["A", "D", "F"])
    ).toBe(null);
  });
});
