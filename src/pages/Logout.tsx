import DefaultLayout from "@/layouts/default";
import { tokenLib } from "@/libs/localStorageDb";
import { Button } from "@heroui/react";
import React from "react";

function Logout() {
  const logout_handler = () => {
    tokenLib.removeToken();
    window.location.href = "/";
  };
  return (
    <DefaultLayout pageTitle="Logout">
      <div>
        <Button onClick={logout_handler}>Logout</Button>
      </div>
    </DefaultLayout>
  );
}

export default Logout;
