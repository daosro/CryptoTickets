import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const UserArea = React.lazy(() => import("./UserArea"));

const UserAreaRoute = () => (
  <Suspense fallback={<Spinner />}>
    <UserArea />
  </Suspense>
);

export default UserAreaRoute;
