import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const Subscriber = React.lazy(() => import("./Subscriber"));

const SubscriberRoute = () => (
  <Suspense fallback={<Spinner />}>
    <Subscriber />
  </Suspense>
);

export default SubscriberRoute;
