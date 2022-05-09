import { useContext, useEffect, useState } from "react";
import * as ethers from "ethers";
import { Toast } from "antd-mobile";
import { isBorrower } from "@/contract/function/AccessProxyFunc";
import { MyContext } from "@/untiles/context";
import { getAllParameter } from "@/contract/function/ParameterFunc";
import openNotification from "@/components/Notification/Notification";
import { fotmatErrorMsg } from "@/untiles";
import { h5GetError } from "@/untiles/error";

function useWallet() {
  const Context = useContext(MyContext);
  const [chains_, setChains] = useState("");
  const [chainsFlag, setChainFlag] = useState(false);
  const supportedChainIds = ["0x61", "0x38"];

  const errorFunction = (error) => {
    switch (process.env.platform) {
      case "h5":
        Toast.show(fotmatErrorMsg(h5GetError(error)));
        break;
      case "pc":
        openNotification(
          [1, 1],
          fotmatErrorMsg(error.data?.message ?? error.message ?? error)
        );
        break;
    }
  };

  let provider: ethers.ethers.providers.Web3Provider;
  if (typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } else {
    errorFunction("Connect failed: Please install wallet first.");
  }

  function handleChainChanged(chainId: any) {
    if (supportedChainIds.includes(chainId)) {
      setChains(chainId);
      setChainFlag(true);
    } else {
      errorFunction("This chain hasn't been supported yet.");
      setChainFlag(false);
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
        errorFunction(error);
      });
  }

  // 检测用户是否锁定了账户
  function handleAccountsChanged(accounts: any) {
    if (accounts?.length === 0) {
      Context.setAddress("");
      setChains("");
    } else {
      // 检测账户切换后更新账户地址
      Context.setAddress(accounts[0]);
      getChain();
      identifyBorrower(accounts[0]);
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
    provider
      .send("eth_requestAccounts", [])
      .then(handleAccountsChanged)
      .catch((error: any) => {
        errorFunction(error);
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
      Context.setParameterData(res);
    } catch (error) {
      errorFunction(error);
    }
  };
  useEffect(() => {
    if (Context.address.length === 0 || !chainsFlag) return;
    getParameter();
  }, [Context.address]);

  // identify user
  const identifyBorrower = async (AccountAddress: string) => {
    try {
      const res = await isBorrower(AccountAddress);
      Context.setIssueFlag(res);
    } catch (error) {
      Context.setIssueFlag(false);
      errorFunction(error);
    }
  };
  return [Context.address, getAccount];
}
export default useWallet;
