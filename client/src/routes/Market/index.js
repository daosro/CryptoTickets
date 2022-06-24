import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const Market = React.lazy(() => import("./Market"));

const MarketRoute = () => (
  <Suspense fallback={<Spinner />}>
    <Market />
  </Suspense>
);

export default MarketRoute;
