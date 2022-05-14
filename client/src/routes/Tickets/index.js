import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const Tickets = React.lazy(() => import("./Tickets"));

const TicketsRoute = () => (
  <Suspense fallback={<Spinner />}>
    <Tickets />
  </Suspense>
);

export default TicketsRoute;
