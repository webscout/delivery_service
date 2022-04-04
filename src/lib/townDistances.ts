import { TownDistancesMap } from "./types";

const distanceRegexp = /^([A-Z])([A-Z])([0-9]+)$/;

export const parseDistanceMap = (distancesString: string): TownDistancesMap => {
  const distanceMap: TownDistancesMap = Object.create(null);

  distancesString.split(",").forEach((distance) => {
    const trimmedDistance = distance.trim();

    const parsedDistance = trimmedDistance.match(distanceRegexp);

    if (!parsedDistance) {
      throw new Error("Wrong town distances string!");
    }

    if (!distanceMap[parsedDistance[1]]) {
      distanceMap[parsedDistance[1]] = Object.create(null);
    }

    distanceMap[parsedDistance[1]][parsedDistance[2]] = Number(
      parsedDistance[3]
    );
  });

  return distanceMap;
};

export const stringifyDistancesMap = (distanceMap: TownDistancesMap) => {
  let stingifiedDistances: string[] = [];

  Object.entries(distanceMap).map(([from, distances]) => {
    Object.entries(distances).map(([to, cost]) => {
      stingifiedDistances.push(`${from}${to}${cost}`);
    });
  });

  return stingifiedDistances.join(",");
};
