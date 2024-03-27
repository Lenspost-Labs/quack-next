// README : This file contains the CustomLoginBtn - That triggers the login flow along with solana wallet's functions

import { useEffect, useState } from "react";
import { utilConsoleOnlyDev } from "@/app/utils/functions/utilConsoleOnlyDev";
import useSolWallet from "@/app/hooks/useSolWallet";
import { apiLoginStep1, apiLoginStep2 } from "@/app/server";

import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { QuackIconLogout } from "@/app/globals/icons/MainIcons";

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
              <ModalHeader className="pb-0">Login to Quack</ModalHeader>
              <ModalBody className="p-4 pt-0">
                <Accordion
                  defaultExpandedKeys={["1"]}
                  motionProps={{
                    variants: {
                      enter: {
                        y: 0,
                        opacity: 1,
                        height: "auto",
                        transition: {
                          height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            duration: 1,
                          },
                          opacity: {
                            easings: "ease",
                            duration: 1,
                          },
                        },
                      },
                      exit: {
                        y: -10,
                        opacity: 0,
                        height: 0,
                        transition: {
                          height: {
                            easings: "ease",
                            duration: 0.25,
                          },
                          opacity: {
                            easings: "ease",
                            duration: 0.3,
                          },
                        },
                      },
                    },
                  }}
                >
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="Select Wallet"
                    subtitle="Please select your preferred Solana wallet to Login"
                  >
                    <ul className="flex flex-col gap-2">
                      {solWallets
                        .filter((item) => item.readyState === "Installed")
                        .map((wallet: any, index: number) => (
                          <li key={index}>
                            <div className="flex items-center justify-between w-full gap-2">
                              <div
                                onClick={() => {
                                  fnSelectAndLogin(wallet?.adapter?.name);
                                }}
                                className="p-2 w-full rounded-md flex items-center align-middle justify-between gap-4 bg-gray-50 cursor-pointer hover:bg-slate-200"
                              >
                                <div className="flex gap-2 items-center align-middle">
                                  <img
                                    className="w-6 h-6"
                                    src={wallet.adapter.icon}
                                  />
                                  <div className="text-lg">
                                    {wallet.adapter.name}
                                  </div>
                                </div>

                                <div className="text-xs m-2">
                                  {wallet.adapter.connected
                                    ? "Connected - Click to Sign"
                                    : "Click to connect"}
                                </div>
                              </div>
                              {solConnected && (
                                <Tooltip content="Disconnect" placement="right">
                                  <div
                                    onClick={() => fnTriggerDisconnectWallet()}
                                    className=" hover:bg-slate-200 rounded-full p-2 cursor-pointer"
                                  >
                                    {" "}
                                    <QuackIconLogout width={22} height={22} />
                                  </div>
                                </Tooltip>
                              )}
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
                  </AccordionItem>

                  <AccordionItem disabled key="2" title="Registration">
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <Spinner />
                        <div className="text-sm">We're Logging you in</div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-slate-600">
                          Farcaster requires a registration fee for account
                          activation. Upon registration, you will be prompted to
                          make a payment for your account.
                        </div>
                      </div>
                    </div>
                  </AccordionItem>

                  <AccordionItem key="3" title="Account Setup" subtitle="">
                    <div className="flex flex-col gap-4">
                      <div className="text-sm text-slate-600">
                        We've created your account, you can now setup your
                        profile and start Quacking
                      </div>

                      <div className="flex flex-col gap-2">
                        <Input placeholder="Email" />
                        <Input placeholder="Username" />
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomLoginBtn;
