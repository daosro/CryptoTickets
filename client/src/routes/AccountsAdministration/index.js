import React, { Suspense } from "react";
import Spinner from "../../components/Spinner";

const AccountsAdministration = React.lazy(() =>
  import("./AccountsAdministration")
);

const AccountsAdministrationRoute = () => (
  <Suspense fallback={<Spinner />}>
    <AccountsAdministration />
  </Suspense>
);

export default AccountsAdministrationRoute;
