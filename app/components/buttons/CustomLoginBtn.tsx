import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { utilConsoleOnlyDev } from "@/app/utils/functions/utilConsoleOnlyDev";
import useSolWallet from "@/app/hooks/useSolWallet";
import { apiLoginStep1 } from "@/app/server";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMutation, useQuery } from "@tanstack/react-query";

const CustomLoginBtn = () => {
  const { connected, publicKey } = useWallet();
  const { fnTriggerSignature } = useSolWallet();
  const signatureMessage =
    "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.";

  const fnTriggerLoginFlow = async () => {
    const sigBase58 = await fnTriggerSignature(signatureMessage);
    const res = await apiLoginStep1({
      signature: `${sigBase58}`.toString(),
      message: signatureMessage,
      solana_address: `${publicKey}`.toString(),
    });

    utilConsoleOnlyDev(res);
  };

  useEffect(() => {
    if (connected) {
      utilConsoleOnlyDev("Connected");
      utilConsoleOnlyDev("in LeftSidebar");
    }
  });
  return (
    <>
      {" "}
      <WalletMultiButton />
    </>
  );
};

export default CustomLoginBtn;
