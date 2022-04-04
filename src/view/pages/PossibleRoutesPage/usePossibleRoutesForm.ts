import { ChangeEvent, useContext, useState } from "react";
import { TownDistancesMapContext } from "view/components/TownDistancesMapStorage";
import { calculatePossibleRoutesCount } from "lib";

const townRegexp = /^[A-Z]$/;
const numberRegexp = /^[0-9]+$/;

export const usePossibleRoutesForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    maximumStops: "",
    maxDeliveryCost: "",
    canGoTwiceSameRoute: false,
  });

  const handleChange =
    (fieldName: keyof typeof formData) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [fieldName]:
          target.getAttribute("type") === "checkbox"
            ? target.checked
            : target.value,
      });
    };

  const [routesCount, setRoutesCount] = useState<null | number>(null);
  const [error, setError] = useState("");

  const { distanceMap } = useContext(TownDistancesMapContext);

  const handleCalculate = () => {
    const { from, to, canGoTwiceSameRoute, maximumStops, maxDeliveryCost } =
      formData;

    if (!from.match(townRegexp)) {
      setError("Invalid from!");
      return;
    }

    if (!to.match(townRegexp)) {
      setError("Invalid to!");
      return;
    }

    if (maximumStops && !maximumStops.match(numberRegexp)) {
      setError("Invalid maximum stops!");
      return;
    }

    if (maxDeliveryCost && !maxDeliveryCost.match(numberRegexp)) {
      setError("Invalid delivery cost!");
      return;
    }

    if (canGoTwiceSameRoute && !maxDeliveryCost && !maximumStops) {
      setError(
        "If can go the same route twice then you need to set delivery cost or maximum stops (to avoid infinite loop)"
      );
      return;
    }

    const count = calculatePossibleRoutesCount(distanceMap, from, to, {
      canGoTwiceSameRoute,
      maximumStops: maximumStops ? Number(maximumStops) : undefined,
      maxDeliveryCost: maxDeliveryCost ? Number(maxDeliveryCost) : undefined,
    });

    setRoutesCount(count);
    setError(null);
  };

  return { formData, error, handleChange, handleCalculate, routesCount };
};
