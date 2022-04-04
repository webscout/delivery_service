import React, { useContext } from "react";
import { stringifyDistancesMap } from "lib";

import { TownDistancesMapContext } from "view/components/TownDistancesMapStorage";

import * as styles from "./styles.module.css";
import { usePossibleRoutesForm } from "./usePossibleRoutesForm";

export const PossibleRoutesPage = () => {
  const { distanceMap } = useContext(TownDistancesMapContext);
  const { formData, error, handleChange, handleCalculate, routesCount } =
    usePossibleRoutesForm();

  return (
    <div>
      <div className={styles.distanceMap}>
        Distance map: {stringifyDistancesMap(distanceMap)}
      </div>

      <div className={styles.row}>
        <label className={styles.label}>From (town):</label>
        <input
          type="text"
          maxLength={1}
          value={formData.from}
          onChange={handleChange("from")}
          className={styles.townInput}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>To (town):</label>
        <input
          type="text"
          maxLength={1}
          value={formData.to}
          onChange={handleChange("to")}
          className={styles.townInput}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>Max. stops:</label>
        <input
          type="text"
          value={formData.maximumStops}
          onChange={handleChange("maximumStops")}
          className={styles.input}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>Max. delivery cost:</label>
        <input
          type="text"
          value={formData.maxDeliveryCost}
          onChange={handleChange("maxDeliveryCost")}
          className={styles.input}
        />
      </div>

      <div className={styles.row}>
        <label>
          Can go the same route twice
          <input
            type="checkbox"
            checked={formData.canGoTwiceSameRoute}
            onChange={handleChange("canGoTwiceSameRoute")}
            className={styles.input}
          />
        </label>
      </div>

      <input
        type="button"
        value="Calculate routes count"
        onClick={handleCalculate}
        className={styles.submitButton}
      />

      {error && <div className={styles.error}>{error}</div>}

      {!error && routesCount !== null && (
        <div className={styles.resultText}>
          Possible routes count: <b>{routesCount}</b>
        </div>
      )}
    </div>
  );
};
