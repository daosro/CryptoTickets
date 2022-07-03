import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const MatchsAdministration = React.lazy(() => import("./MatchsAdministration"));

const MatchsAdministrationRoute = () => (
  <Suspense fallback={<Spinner />}>
    <MatchsAdministration />
  </Suspense>
);

export default MatchsAdministrationRoute;
