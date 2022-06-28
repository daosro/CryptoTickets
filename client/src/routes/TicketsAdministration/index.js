import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const TicketsAdministration = React.lazy(() =>
  import("./TicketsAdministration")
);

const TicketsAdministrationRoute = () => (
  <Suspense fallback={<Spinner />}>
    <TicketsAdministration />
  </Suspense>
);

export default TicketsAdministrationRoute;
