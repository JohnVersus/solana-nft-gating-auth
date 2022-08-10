import React from "react";
import { Button } from "@web3uikit/core";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  const authenticate = async () => {
    const provider = window.phantom?.solana;
    const resp = await provider.connect();
    const address = resp.publicKey.toString();
    const chain = "devnet";
    const account = {
      address: address,
      chain: chain,
      network: "solana",
    };
    const message = "Sign to provide access to app";
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    const signature = window.btoa(
      String.fromCharCode.apply(null, signedMessage.signature)
    );
    try {
      await signIn("credentials", {
        address,
        chain,
        message,
        signature,
        redirect: false,
      });
      push("/");
    } catch (e) {
      return;
    }
  };

  return (
    <Button
      text="Login"
      theme="primary"
      onClick={() => {
        authenticate();
      }}
    />
  );
}
