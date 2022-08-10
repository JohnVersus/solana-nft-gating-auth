import React from "react";
import { Button } from "@web3uikit/core";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <Button text="Logout" theme="outline" onClick={() => signOut()}></Button>
  );
}
