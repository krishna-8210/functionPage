import { siteConfig } from "@/config/site";
import IndexPage from "@/pages";
import DocsPage from "@/pages/docs";
import NotFound from "@/pages/NotFound";
import React from "react";
import { Route, Routes } from "react-router-dom";

function RouteCmp() {
  return (
    <Routes>
      {siteConfig.navMenuItems.map((item: any) => {
        return item.cmp ? (
          <Route
            key={item.href}
            element={<item.cmp.component />}
            path={item.href}
          />
        ) : (
          <Route
            key={item.href}
            element={<NotFound/>}
            path={item.href}
          />
        );
      })}
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
    </Routes>
  );
}

export default RouteCmp;
