import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const Home = React.lazy(() => import("./Home"));

const HomeRoute = () => (
  <Suspense fallback={<Spinner />}>
    <Home />
  </Suspense>
);

export default HomeRoute;
