import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const Rewards = React.lazy(() => import("./Rewards"));

const RewardsRoute = () => (
  <Suspense fallback={<Spinner />}>
    <Rewards />
  </Suspense>
);

export default RewardsRoute;
