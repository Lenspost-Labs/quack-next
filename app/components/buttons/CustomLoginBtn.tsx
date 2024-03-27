import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { utilConsoleOnlyDev } from "@/app/utils/functions/utilConsoleOnlyDev";
import useSolWallet from "@/app/hooks/useSolWallet";
import { apiLoginStep1, apiLoginStep2 } from "@/app/server";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import TestModal from "../modals/test";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { cookies } from "next/headers";

const CustomLoginBtn = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [compMounted, setCompMounted] = useState(true);

  const {
    fnTriggerSignature,
    fnCheckWalletConnection,
    fnTriggerConnectWallet,
    fnTriggerDisconnectWallet,
    solPublicKey,
    solSelect,
    solConnected,
    solWallets,
  } = useSolWallet();
  const signatureMessage =
    "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.";

  const fnTriggerLoginFlow = async () => {
    fnCheckWalletConnection();
    const sigBase58 = await fnTriggerSignature(signatureMessage);
    const resApi1 = await apiLoginStep1({
      message: signatureMessage,
      signature: `${sigBase58}`.toString(),
      solana_address: `${solPublicKey}`.toString(),
    });

    if (resApi1) {
      utilConsoleOnlyDev(resApi1);
      localStorage.setItem("jwtToken", resApi1.jwt);
      // cookies().set("jwtToken", resApi1.jwt, { path: "/" });

      // No FID found - New User
      if (resApi1?.fid === null || resApi1?.fid === "") {
        utilConsoleOnlyDev("New User");

        const resApi2 = await apiLoginStep2();

        if (resApi2) {
          utilConsoleOnlyDev(resApi2);
        } else {
          utilConsoleOnlyDev("Error in apiLoginStep2");
          utilConsoleOnlyDev(resApi2);
        }
      }

      // FID found
      if (resApi1?.fid !== null || resApi1?.fid === "") {
        utilConsoleOnlyDev("FID found");
      }
    } else {
      utilConsoleOnlyDev("Error in apiLoginStep1");
      utilConsoleOnlyDev(resApi1);
    }

    utilConsoleOnlyDev(resApi1);
  };

  const fnSelectAndLogin = async (walletName: any) => {
    console.log("walletName", walletName);
    try {
      if (!walletName) {
        throw new Error("Wallet name is not provided");
      }
      setCompMounted(false);
      await solSelect(walletName);
      await fnTriggerConnectWallet();
    } catch (error) {
      console.error("Error selecting and logging in:", error);
    }
  };

  useEffect(() => {
    if (solConnected && !compMounted) {
      fnTriggerLoginFlow();
    }
  }, [solConnected]);

  return (
    <>
      <Button onPress={onOpen}>Login</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="p-4 pb-0">Login to Quack</ModalHeader>
              <ModalBody className="p-4 mt-0">
                <div className="text-sm text-slate-500 py-2">
                  {" "}
                  Select your preferred Solana wallet
                </div>
                <ul className="flex flex-col gap-2">
                  {solWallets
                    .filter((item) => item.readyState === "Installed")
                    .map((wallet: any, index: number) => (
                      <li key={index}>
                        <div
                          onClick={() => {
                            fnSelectAndLogin(wallet?.adapter?.name);
                          }}
                          className="p-2 rounded-md flex items-center align-middle justify-between gap-4 bg-gray-50 cursor-pointer hover:bg-slate-200"
                        >
                          <div className="flex gap-2 items-center align-middle">
                            <img
                              className="w-6 h-6"
                              src={wallet.adapter.icon}
                            />
                            <div className="text-lg">{wallet.adapter.name}</div>
                          </div>

                          <div className="text-xs m-2">
                            {wallet.adapter.connected
                              ? "Connected - Click to Sign"
                              : "Click to connect"}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                {solWallets.filter(
                  (item) => item.readyState === "NotDetected"
                ) &&
                  solWallets.length === 0 && (
                    <div>
                      No wallets detected, please install a solana wallet on
                      your browser to start quacking.
                    </div>
                  )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomLoginBtn;
