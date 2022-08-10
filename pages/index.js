import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Typography } from "@web3uikit/core";
import { useSession } from "next-auth/react";
import LoginBtn from "../app/components/loginBtn/loginBtn";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    session && status === "authenticated" && router.push("./user");
  }, [session, status]);

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        {!session ? (
          <LoginBtn />
        ) : (
          <Typography variant="caption14">Loading...</Typography>
        )}
      </div>
    </div>
  );
}
