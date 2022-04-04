import { Town, TownDistancesMap } from "./types";

/**
 * Calculate delivery cost for exact specific route
 * @param townDistancesMap
 * @param route
 * @return cost - If there are no such route - return null
 */
export const calculateDeliveryCostForRoute = (
  townDistancesMap: TownDistancesMap,
  route: Town[]
): number | null => {
  if (route.length < 2) {
    return null;
  }

  let cost = 0;

  let prevTown = route[0];

  for (let i = 1; i < route.length; i++) {
    let town = route[i];

    if (typeof townDistancesMap[prevTown]?.[town] !== "number") {
      return null;
    }

    cost += townDistancesMap[prevTown][town];
    prevTown = town;
  }

  return cost;
};
