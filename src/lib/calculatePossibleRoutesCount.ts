import { Town, TownDistancesMap } from "./types";

interface GetPossibleRoutesOptions {
  canGoTwiceSameRoute?: boolean;
  maximumStops?: number;
  maxDeliveryCost?: number;
  prohibitedPaths?: [Town, Town][];
}

export const calculatePossibleRoutesCount = (
  townDistancesMap: TownDistancesMap,
  from: Town,
  to: Town,
  options: GetPossibleRoutesOptions = {}
) => {
  let possibleRoutes = 0;

  const possiblePathsMap = townDistancesMap[from] || {};

  Object.entries(possiblePathsMap).forEach(([possibleDestination, cost]) => {
    let nextOptions = {
      ...options,
      maximumStops:
        typeof options.maximumStops === "number"
          ? options.maximumStops - 1
          : undefined,
      maxDeliveryCost:
        typeof options.maxDeliveryCost === "number"
          ? options.maxDeliveryCost - cost
          : undefined,
      prohibitedPaths: !options.canGoTwiceSameRoute
        ? [
            ...(options.prohibitedPaths || []),
            [from, possibleDestination] as [Town, Town],
          ]
        : options.prohibitedPaths,
    };

    const hasProhibitedPath = options.prohibitedPaths?.some(
      ([prohibitedFrom, prohibitedTo]) =>
        prohibitedFrom === from && prohibitedTo === possibleDestination
    );

    if (
      nextOptions.maximumStops < 0 ||
      nextOptions.maxDeliveryCost < 0 ||
      hasProhibitedPath
    ) {
      return;
    }

    if (possibleDestination === to) {
      possibleRoutes++;
      if (!options.canGoTwiceSameRoute) {
        return;
      }
    }

    possibleRoutes += calculatePossibleRoutesCount(
      townDistancesMap,
      possibleDestination,
      to,
      nextOptions
    );
  });

  return possibleRoutes;
};
