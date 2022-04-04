import React, { useContext, useState } from "react";
import { parseDistanceMap, stringifyDistancesMap } from "lib";
import { TownDistancesMapContext } from "view/components/TownDistancesMapStorage";

import * as styles from "./styles.module.css";

export const RouteGraphPage = () => {
  const { distanceMap, setDistanceMap } = useContext(TownDistancesMapContext);

  const [error, setError] = useState<string | null>(null);

  const [distanceMapText, setDistanceMapText] = useState(() =>
    stringifyDistancesMap(distanceMap)
  );

  const handleSetDistanceMap = () => {
    try {
      setDistanceMap(parseDistanceMap(distanceMapText));
      setError(null);
    } catch (e) {
      setError("Parsing error");
    }
  };

  return (
    <div>
      <label>
        Current distance map:
        <input
          type="text"
          value={distanceMapText}
          onChange={(event) => setDistanceMapText(event.target.value)}
          className={styles.input}
        />
      </label>

      <input
        type="button"
        value="Set distance map"
        onClick={handleSetDistanceMap}
        className={styles.submitButton}
      />

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
