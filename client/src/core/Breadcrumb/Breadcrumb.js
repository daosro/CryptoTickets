import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

import useStyles from "./Breadcrumb.style";

const matchRouteDefinitions = (definitions, location) => {
  const crumbs = [];

  definitions.forEach((definition, index) => {
    const match = matchPath(
      { path: definition.path, end: false },
      location.pathname
    );
    if (match) {
      crumbs.push({ ...match, title: definition.title });
    }
  });

  return crumbs;
};

const useActiveRoutePaths = (routes) => {
  const location = useLocation();
  const activeRoutePaths = matchRouteDefinitions(routes, location);
  return activeRoutePaths;
};

const Breadcrumbs = ({ routes }) => {
  const classes = useStyles();
  const activeRoutePaths = useActiveRoutePaths(routes);

  return (
    <div className={classes.root}>
      {activeRoutePaths.map((active, index, { length }) => (
        <span key={index}>
          {index === 0 ? "" : " > "}
          {index !== length - 1 ? (
            <Link to={active?.pathname}>{active?.title}</Link>
          ) : (
            <span>{active?.title}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
