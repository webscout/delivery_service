import React, { useMemo, PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { parseDistanceMap } from "lib";
import { TownDistancesMap } from "lib/types";

const defaultValue = {
  distanceMap: parseDistanceMap("AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1"),
  setDistanceMap: (graph: TownDistancesMap) => {},
};

export const TownDistancesMapContext = createContext(defaultValue);

export const TownDistancesMapStorage = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const [distanceMap, setDistanceMap] = useState(defaultValue.distanceMap);

  const contextValue = useMemo(
    () => ({
      distanceMap,
      setDistanceMap,
    }),
    [distanceMap, setDistanceMap]
  );

  return (
    <TownDistancesMapContext.Provider value={contextValue}>
      {children}
    </TownDistancesMapContext.Provider>
  );
};
