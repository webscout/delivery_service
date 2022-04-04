import React, { useContext, useState } from "react";
import { calculateDeliveryCostForRoute, stringifyDistancesMap } from "lib";
import { TownDistancesMapContext } from "view/components/TownDistancesMapStorage";

import * as styles from "./styles.module.css";

export const DeliveryCostPage = () => {
  const [route, setRoute] = useState("");
  const [cost, setCost] = useState(null);
  const [error, setError] = useState("");
  const { distanceMap } = useContext(TownDistancesMapContext);

  const handleCalculate = () => {
    const parsedRoute = route.split("-").map((routePart) => routePart.trim());

    const isValid = parsedRoute.every((routePart) => /^[A-Z]$/.test(routePart));

    if (!isValid) {
      setError(route ? "Route is not valid" : "Route is empty");
      return;
    }

    const cost = calculateDeliveryCostForRoute(distanceMap, parsedRoute);

    setCost(cost);
    setError(cost === null ? "No such route" : null);
  };

  return (
    <div>
      <div className={styles.distanceMap}>
        Distance map: {stringifyDistancesMap(distanceMap)}
      </div>
      <label>
        Enter delivery route:
        <input
          type="text"
          value={route}
          onChange={(event) => setRoute(event.target.value)}
          className={styles.routeInput}
        />
        {error && <div className={styles.error}>{error}</div>}
      </label>
      <div className={styles.example}>(for example: A-B-E)</div>
      <input
        type="button"
        value="Calculate cost"
        onClick={handleCalculate}
        className={styles.submitButton}
      />
      {cost !== null && !error && (
        <div className={styles.result}>
          Calculated cost: <b>{cost}</b>
        </div>
      )}
    </div>
  );
};
