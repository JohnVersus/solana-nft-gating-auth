import React, { useEffect } from "react";
import styles from "../styles/User.module.css";
import { Typography } from "@web3uikit/core";
import { useRouter } from "next/router";
import Image from "next/image";
import allAccess from "../public/allAccess.jpeg";
import { getSession } from "next-auth/react";
import UserData from "../app/components/userData/userData";
import LogoutBtn from "../app/components/logoutBtn/logoutBtn";
import SecretBtn from "../app/components/secretBtn/secretBtn";
import axios from "axios";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let isAutorized = false;
  if (session) {
    const options = {
      network: "devnet",
      address: session.user.address,
    };
    const result = await axios.post(
      "http://localhost:8000/api/solanaAPI/getNFTs",
      options,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(result);
    if (result.data.length > 0) {
      for (let item of result.data) {
        if (item.mint === process.env.NFT_SECRET) {
          isAutorized = true;
        }
      }
    }
  }

  return {
    props: { userSession: session, isAutorized: isAutorized },
  };
}

export default function Home({ userSession, isAutorized }) {
  const router = useRouter();

  useEffect(() => {
    !userSession ? router.push("/") : console.log(userSession);
  }, [userSession]);

  if (userSession) {
    return (
      <div className={styles.body}>
        <div className={styles.card}>
          <UserData />
          <div className={styles.accessCard}>
            {/* Code to access card on authorization */}
            {isAutorized ? (
              <Image
                src={allAccess}
                alt={"Authorized"}
                height={"150px"}
                width={"100px"}
              />
            ) : (
              <Typography color={"red"} variant="caption14">
                No Authorized Access
              </Typography>
            )}
          </div>
          <div className={styles.buttonsRow}>
            <LogoutBtn />
            {/* Code to secret button */}
            {isAutorized && <SecretBtn />}
          </div>
        </div>
      </div>
    );
  }
}
