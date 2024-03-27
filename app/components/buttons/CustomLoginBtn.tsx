// README : This file contains the CustomLoginBtn - That triggers the login flow along with solana wallet functions

import { useEffect, useRef, useState } from "react";
import { utilConsoleOnlyDev } from "@/app/utils/functions/utilConsoleOnlyDev";
import useSolWallet from "@/app/hooks/useSolWallet";
import {
  apiCheckUsernameAvailable,
  apiGetSuggestedUsernames,
  apiLoginStep1,
  apiLoginStep2,
  apiLoginStep3,
} from "@/app/server";
import type { Selection } from "@nextui-org/react";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { QuackIconCopy, QuackIconLogout } from "@/app/globals/icons/MainIcons";
import { toast } from "sonner";
import Image from "next/image";
import { utilCopytoClip } from "@/app/utils/functions/utilCopytoClip";

const CustomLoginBtn = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [compMounted, setCompMounted] = useState(true);
  const [modalMessage, setModalMessage] = useState(
    "Farcaster requires a registration fee for account activation. Upon registration, you will be prompted to make a payment for your account"
  );

  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);

  const [onboardValidation, setOnboardValidation] = useState({
    username: false,
    email: false,
  });
  const [showOnboardValidation, setShowOnboardValidation] =
    useState<boolean>(false);

  const {
    fnTriggerSignature,
    fnCheckWalletConnection,
    fnSignAndSendTx,
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
    toast.loading("Waiting for Signature");
    fnCheckWalletConnection();
    const sigBase58 = await fnTriggerSignature(signatureMessage);

    toast.dismiss();
    toast.success("Signature Verified");

    toast.loading("Checking account status");
    const resApi1 = await apiLoginStep1({
      message: signatureMessage,
      signature: `${sigBase58}`.toString(),
      solana_address: `${solPublicKey}`.toString(),
    });

    if (resApi1) {
      utilConsoleOnlyDev(resApi1);
      localStorage.setItem("jwtToken", resApi1.jwt);

      // No FID found - New User
      if (resApi1?.fid === "") {
        utilConsoleOnlyDev("New User");

        setSelectedKeys(new Set(["2"]));

        toast.dismiss();
        toast.success("Hey, New User. Welcome to Quack");

        const resApi2 = await apiLoginStep2();

        if (resApi2) {
          utilConsoleOnlyDev(`apiLoginStep2`);
          utilConsoleOnlyDev(resApi2);
          const tx = resApi2?.tx;

          // Trigger the Payment Flow :
          toast.loading("Waiting for transaction confirmation");

          const txSignature = await fnSignAndSendTx(tx);
          utilConsoleOnlyDev(`txSignature is`);
          utilConsoleOnlyDev(txSignature as string);

          if (txSignature === null) {
            utilConsoleOnlyDev("Error in fnSignAndSendTx");

            toast.dismiss();
            toast.error("Error in Processing the Transaction");
            setModalMessage(
              "Error in Processing the Transaction, Please try after sometime"
            );
            return;
          }

          toast.dismiss();
          toast.success("Transaction Successful");

          toast.loading("Verifying Transaction signature");
          setModalMessage(
            "Verifying Transaction and Creating your account on chain"
          );
          const resApi3 = await apiLoginStep3({
            txSig: txSignature as string,
          });

          utilConsoleOnlyDev(`apiLoginStep3`);
          utilConsoleOnlyDev(resApi3);

          if (resApi3) {
            toast.dismiss();
            toast.success("Transaction Successful");

            utilConsoleOnlyDev("resApi3");
            utilConsoleOnlyDev(resApi3);

            if (resApi3?.status === true) {
              localStorage.setItem("localFid", resApi3?.fid);

              toast.dismiss();
              toast.success("Login Successful");
              // setSelectedKeys(new Set(["3"]));
            } else {
              toast.dismiss();
              toast.error("Error in Verifying Transaction signature");
            }
          } else {
            toast.dismiss();
            toast.error("Error in sending transaction signature to server");
          }
          return;
        } else {
          utilConsoleOnlyDev("Error in apiLoginStep2");
          utilConsoleOnlyDev(resApi2);

          toast.dismiss();
          toast.error("Error in getting transaction from the server");
          return;
        }
      }

      // FID found
      if (resApi1?.fid !== "") {
        utilConsoleOnlyDev("FID found");

        localStorage.setItem("localFid", resApi1?.fid);

        toast.dismiss();
        toast.success("Welcome back to Quack");
        if (resApi1?.username != "") {
          // setSelectedKeys(new Set(["3"]));
          fnTriggerProfileSetupFlow();
        }

        setHasUserLoggedIn(true);
        return;
      }
    } else {
      utilConsoleOnlyDev("Error in apiLoginStep1");
      utilConsoleOnlyDev(resApi1);
    }

    setHasUserLoggedIn(true);
    onOpenChange();
  };

  let timeoutId: string | number | NodeJS.Timeout | undefined;
  const fnCheckInputBoxIsTyping = () => {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);
    // Set a new timeout for 1 second
    timeoutId = setTimeout(function () {
      // Call your function after 1 seconds of no typing
      handleUsernameValidation();
    }, 1000);
  };

  const handleUsernameValidation = async () => {
    setCheckingAvailability(true);
    const userNameRefVal = (userNameRef?.current as never as HTMLInputElement)
      ?.value;

    utilConsoleOnlyDev("userNameRefVal");
    utilConsoleOnlyDev(userNameRefVal || "");
    const checkUsername = await apiCheckUsernameAvailable(userNameRefVal);

    utilConsoleOnlyDev(checkUsername);
    if (checkUsername?.available === true) {
      setCheckingAvailability(false);
      setShowOnboardValidation(true);
      setOnboardValidation({
        ...onboardValidation,
        username: true,
      });
      return;
    }

    setOnboardValidation({
      ...onboardValidation,
      username: false,
    });
    setCheckingAvailability(false);
  };

  const fnContinueSetup = async () => {
    utilConsoleOnlyDev("fnContinueSetup");
    if (!onboardValidation.username) {
      return;
    }
  };
  const fnTriggerProfileSetupFlow = async () => {
    setSelectedKeys(new Set(["3"]));
    const resSuggestedUsernames = apiGetSuggestedUsernames();
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
  }, [solConnected, compMounted]);

  return (
    <>
      {(!solConnected || !hasUserLoggedIn) && (
        <>
          <Button
            onClick={onOpen}
            variant="light"
            fullWidth
            className="bg-[#F2AE40]"
          >
            <div className="text-sm">Login</div>
          </Button>
        </>
      )}

      {hasUserLoggedIn && solConnected && (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image
              src={"https://i.pravatar.cc/200/?img=6"}
              width={40}
              height={40}
              alt="User"
              className="cursor-pointer rounded-full"
              onClick={onOpen}
            />
            <div className="flex flex-col">
              <div className="text-sm">Display Name</div>
              <div className="text-xs text-slate-600">@{`${"username"}`}</div>
            </div>
          </div>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <div className="cursor-pointer">...</div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Options">
              <DropdownItem key="address">
                <div
                  onClick={() => {
                    utilCopytoClip(solPublicKey?.toBase58()?.toString() || "");
                    toast.success("Copied to Clipboard");
                  }}
                  className="flex justify-between items-center gap-4"
                >
                  <div className="">
                    {`${solPublicKey?.toBase58().toString()?.slice(0, 4)}` +
                      "..." +
                      `${solPublicKey?.toBase58().toString()?.slice(-4)}`}
                  </div>
                  <QuackIconCopy />
                </div>
              </DropdownItem>

              <DropdownItem key="disconnect">
                <div
                  className="flex justify-between items-center gap-4"
                  onClick={fnTriggerDisconnectWallet}
                >
                  <div className="">Disconnect</div>
                  <div className="">
                    <QuackIconLogout />
                  </div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold text-center text-gray-800">
                Login to Quack
              </ModalHeader>
              <ModalBody className="p-4 pt-0">
                <Accordion
                  variant="light"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  defaultExpandedKeys={["1"]}
                  // disabledKeys={[`${!selectedKeys}`]}
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
                    aria-label="Select Wallet"
                    title="Select Wallet"
                  >
                    <div className="flex flex-col gap-4 pt-0">
                      <div className="text-sm text-gray-600">
                        Please select your preferred Solana wallet to Login
                      </div>
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
                                  <Tooltip
                                    content="Disconnect"
                                    placement="right"
                                  >
                                    <div
                                      onClick={() =>
                                        fnTriggerDisconnectWallet()
                                      }
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
                            No wallets detected, please install a solana wallet
                            on your browser to start quacking.
                          </div>
                        )}
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="2"
                    aria-label="Registration"
                    title="Registration"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <Spinner />
                        <div className="text-sm">Logging you in</div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-slate-600">
                          {modalMessage && (
                            <div className="">{modalMessage}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="3"
                    title="Profile Setup"
                    aria-label="Profile Setup"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="text-sm text-slate-600">
                        Account setup successful, you can now setup your profile
                        and start Quacking
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="">
                          <Input required placeholder="Email" />
                        </div>

                        <div className="">
                          <Input
                            required
                            onInput={fnCheckInputBoxIsTyping}
                            ref={userNameRef}
                            placeholder="Username"
                          />
                        </div>

                        {checkingAvailability && (
                          <div className="flex items-center mt-2 text-sm">
                            {" "}
                            <div className="">Checking availability</div>
                            <Spinner
                              color="default"
                              className="ml-2"
                              size="sm"
                            />
                          </div>
                        )}
                        {!checkingAvailability && showOnboardValidation && (
                          <div className="mt-2 text-yellow-600">
                            {" "}
                            {onboardValidation.username === true ? (
                              <div className="text-green-600 text-sm">
                                {" "}
                                Username is available
                              </div>
                            ) : (
                              <div className="text-red-600 text-sm">
                                Username is not available
                              </div>
                            )}
                          </div>
                        )}
                        <Button
                          disabled={!onboardValidation.username}
                          variant="light"
                          className="bg-[#F2AE40]"
                          onClick={fnContinueSetup}
                        >
                          <div className="text-sm">Continue</div>
                        </Button>
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
