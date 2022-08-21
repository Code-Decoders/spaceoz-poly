import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "../styles/Sidebar.module.css";
import BigNumber from "big-number/big-number";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const { pathname } = useRouter();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActive(0);
        break;
      case "/portfolio":
        setActive(1);
        break;
      case "/playground":
        setActive(2);
    }
  }, [pathname]);

  const { Moralis, isInitialized, web3, enableWeb3 } = useMoralis();

  async function getBalance() {
    console.log("getBalance");
    var user = await Moralis.User.currentAsync();
    var token = await Moralis.Web3API.account.getNativeBalance({
      address: user.get("ethAddress"),
      chain: "0x13881",
    });
    setBalance((token.balance / 10 ** 18).toFixed(2));
  }

  useEffect(() => {
    if (isInitialized) {
      getBalance();
      setTimeout(async () => {
        getBalance();
      }, 5000);
      switchNetworkMumbai();
    }
  }, [isInitialized]);

  const switchNetworkMumbai = async () => {
    const web3 = await enableWeb3();

    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await web3.currentProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                rpcUrls: ["https://rpc-mumbai.matic.today"],
                nativeCurrency: {
                  name: "Matic",
                  symbol: "Matic",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  };

  return (
    <div style={{ flex: 0.18 }} className={styles["sidebar-container"]}>
      <div className={styles["logo-text"]}>SpaceOz</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flex: 1,
          alignItems: "flex-end",
          gap: "1.5rem 0",
        }}
      >
        <Link href={"/"}>
          <div
            className={
              styles["sidebar-button"] +
              (active == 0 ? ` ${styles["active"]}` : "")
            }
          >
            <img src="/icons/Menu.svg" width={20} />
            <div style={{ flex: 1 }}>Inventory</div>
            <div className={styles["sidebar-block"]} />
          </div>
        </Link>
        {/* <Link href={'portfolio'}>
          <div className={styles['sidebar-button'] + (active == 1 ? ` ${styles['active']}` : "")}>
            <img src="/icons/Star.svg" width={20} />
            <div style={{ flex: 1 }}>Portfolio</div>
            <div className={styles['sidebar-block']} />
          </div>
        </Link> */}
        <Link href={"playground"}>
          <div
            className={
              styles["sidebar-button"] +
              (active == 2 ? ` ${styles["active"]}` : "")
            }
          >
            <img src="/icons/Game.svg" width={20} />
            <div style={{ flex: 1 }}>Playground</div>
            <div className={styles["sidebar-block"]} />
          </div>
        </Link>
      </div>
      <div className={styles["sidebar-balance-container"]}>
        <div style={{ fontSize: "20px" }}>Balance</div>
        <div>{balance} MATIC</div>
        <div>1023 SPZ</div>
      </div>
    </div>
  );
};

export default Sidebar;
