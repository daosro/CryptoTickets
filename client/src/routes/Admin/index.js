import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const Admin = React.lazy(() => import("./Admin"));

const AdminRoute = () => (
  <Suspense fallback={<Spinner />}>
    <Admin />
  </Suspense>
);

export default AdminRoute;
