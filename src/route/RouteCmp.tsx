

import React from "react";
import { Route, Routes } from "react-router-dom";

function RouteCmp() {
  return (
    <Routes>
     <Route element={'Hi'} path="/" />
    </Routes>
  );
}

export default RouteCmp;
