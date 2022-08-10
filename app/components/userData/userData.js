import React from "react";
import styles from "../../../styles/User.module.css";
import { Typography } from "@web3uikit/core";
import { useSession } from "next-auth/react";

export default function UserData() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className={styles.data}>
        <div className={styles.dataCell}>
          <Typography variant="subtitle2">Account:</Typography>
          <div className={styles.address}>
            {/* account address */}
            <Typography copyable variant="body16">
              {session?.user.address}
            </Typography>
          </div>
        </div>
        {/* <div className={styles.dataCell}>
          <Typography variant="subtitle2">chainId:</Typography>
          <Typography variant="body16">{`${session?.user.chainId}`}</Typography>
        </div> */}
      </div>
    );
  }
}
