import React from "React";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { DeliveryCostPage } from "view/pages/DeliveryCostPage";
import { PossibleRoutesPage } from "view/pages/PossibleRoutesPage";
import { RouteGraphPage } from "view/pages/RouteGraphPage";
import { TownDistancesMapStorage } from "view/components/TownDistancesMapStorage";

import * as styles from "./styles.module.css";

export const App = () => (
  <TownDistancesMapStorage>
    <BrowserRouter>
      <div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.menuItem}>
            Route graph
          </Link>
          <Link to="/cost" className={styles.menuItem}>
            Delivery cost
          </Link>
          <Link to="/possibleRoutes" className={styles.menuItem}>
            Possible routes
          </Link>
        </nav>
        <Routes>
          <Route index element={<RouteGraphPage />} />
          <Route path="/cost" element={<DeliveryCostPage />} />
          <Route path="possibleRoutes" element={<PossibleRoutesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </TownDistancesMapStorage>
);
