import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const RewardsAdministration = React.lazy(() =>
  import("./RewardsAdministration")
);

const RewardsAdministrationRoute = () => (
  <Suspense fallback={<Spinner />}>
    <RewardsAdministration />
  </Suspense>
);

export default RewardsAdministrationRoute;
