import React, { useContext, useEffect, useState } from "react";
import * as ethers from "ethers";
import { Toast } from "antd-mobile";
import { isBorrower } from "@/contract/function/AccessProxyFunc";
import { filter } from "@/untiles";
import { ConnectButton } from "./style";
import { MyContext } from "@/untiles/context";
import { getAllParameter } from "@/contract/function/ParameterFunc";

function Connect() {
  const AddressData = useContext(MyContext);
  const issueFlagData = useContext(MyContext);
  const paraData = useContext(MyContext);
  //   const [AddressData, issueFlagData, paraData] = useContext(MyContext);
  const [chains_, setChains] = useState("");
  const supportedChainIds = ["0x61", "0x38"];

  let provider: ethers.ethers.providers.Web3Provider;
  if (typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } else {
    Toast.show("Connect failed: Please install wallet first.");
  }

  function handleChainChanged(chainId: any) {
    if (supportedChainIds.includes(chainId)) {
      setChains(chainId);
    } else {
      Toast.show("This chain hasn't been supported yet.");
    }
  }
  // 获取chainId (ethers)
  function getChain() {
    provider
      .getNetwork()
      .then((result: { chainId: any }) => {
        const a = result.chainId;
        // 将十进制结果转换为十六进制字符串
        const result_ = "0x" + a.toString(16);
        handleChainChanged(result_);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // 检测用户是否锁定了账户
  function handleAccountsChanged(accounts: any) {
    if (accounts?.length === 0) {
      AddressData.setAddress("");
      setChains("");
    } else {
      // 检测账户切换后更新账户地址
      AddressData.setAddress(accounts[0]);
      getChain();
      identifyBorrower(accounts[0]);
      // 去除window.localStorage后无影响
      const userAdress = window.localStorage.getItem("userAddress");
      if (!accounts[0]) return;
      if (!userAdress) {
        window.localStorage.setItem("userAddress", accounts[0]);
      } else {
        if (userAdress !== accounts[0]) {
          window.localStorage.setItem("userAddress", accounts[0]);
          window.location.reload();
        }
      }
    }
  }
  // 获取账户地址 (ethers)
  function getAccount() {
    new Promise((reject) => {
      provider
        .send("eth_requestAccounts", [])
        .then(handleAccountsChanged)
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      getAccount();
    }
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", (result: any) => {
        handleChainChanged(result);
      });
      return () => {
        window.ethereum.removeListener("chainChanged", getChain);
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  const getParameter = async () => {
    try {
      const res = await getAllParameter();
      paraData.setParameterData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (AddressData.address.length === 0) return;
    getParameter();
  }, [AddressData.address]);

  // identify user
  const identifyBorrower = async (AccountAddress: string) => {
    try {
      const res = await isBorrower(AccountAddress);
      issueFlagData.setIssueFlag(res);
    } catch (error) {
      issueFlagData.setIssueFlag(false);
    }
  };

  return (
    <ConnectButton onClick={getAccount}>
      {AddressData.address === "" ? "Connect" : filter(AddressData.address)}
    </ConnectButton>
  );
}
export default React.memo(Connect);
