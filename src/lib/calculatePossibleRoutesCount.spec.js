import { parseDistanceMap } from "./townDistances";
import { calculatePossibleRoutesCount } from "./calculatePossibleRoutesCount";

const getDistanceMap = () =>
  parseDistanceMap("AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1");

describe("Calculate the number of possible delivery routes", () => {
  it("With maximumStops and without using the same route twice in a delivery route", () => {
    expect(
      calculatePossibleRoutesCount(getDistanceMap(), "E", "D", {
        canGoTwiceSameRoute: false,
        maximumStops: 4,
      })
    ).toBe(4);
  });

  it("Only without using the same route twice in a delivery route", () => {
    expect(
      calculatePossibleRoutesCount(getDistanceMap(), "E", "E", {
        canGoTwiceSameRoute: false,
      })
    ).toBe(5);
  });

  it("With the same route twice in a delivery route and maxDeliveryCost", () => {
    expect(
      calculatePossibleRoutesCount(getDistanceMap(), "E", "E", {
        canGoTwiceSameRoute: true,
        maxDeliveryCost: 19,
      })
    ).toBe(29);
  });
});
