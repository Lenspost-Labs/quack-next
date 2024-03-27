// README : This file creates the useSolWallet custom hook which is used to handle all the Solana wallet functionality

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import { Buffer } from "buffer";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { utilConsoleOnlyDev } from "../utils/functions";

const useSolWallet = () => {
  const {
    connected: solConnected,
    signMessage,
    sendTransaction,
    publicKey: solPublicKey,
    connect: solConnect,
    disconnect: solDisconnect,
    select: solSelect,
    wallets: solWallets,
  } = useWallet();
  const { connection } = useConnection();

  const fnCheckWalletConnection = () => {
    if (!solConnected) {
      utilConsoleOnlyDev("Wallet not connected");
      return;
    }
  };

  const fnTriggerConnectWallet = async () => {
    try {
      await solConnect();
    } catch (error) {
      utilConsoleOnlyDev(`Error in fnTriggerConnectWallet ${error}`);
      return null;
    }
  };

  const fnTriggerDisconnectWallet = async () => {
    try {
      await solDisconnect();
    } catch (error) {
      utilConsoleOnlyDev(`Error in fnTriggerDisconnectWallet ${error}`);
      return null;
    }
  };

  const fnTriggerSignature = async (signInMessage: string) => {
    fnCheckWalletConnection();

    try {
      let signatureUint8, signatureBase58;
      if (signMessage) {
        signatureUint8 = await signMessage(
          new TextEncoder().encode(signInMessage)
        );
        utilConsoleOnlyDev(`signatureUint8 is ${signatureUint8}`);
        signatureBase58 = base58.encode(signatureUint8 as Uint8Array);
        utilConsoleOnlyDev(`signatureBase58 is ${signatureBase58}`);
      }
      return signatureBase58;
    } catch (error) {
      utilConsoleOnlyDev(`Error in fnTriggerSignature ${error}`);
      return null;
    }
  };

  const fnGetRawTransaction = (encodedTx: string) => {
    let recoveredTx: Transaction | VersionedTransaction;
    try {
      let decodedData = Uint8Array.from(atob(encodedTx), (c) =>
        c.charCodeAt(0)
      );
      recoveredTx = Transaction.from(decodedData);
    } catch (e) {
      // If the first method fails, try deserializing with VersionedTransaction
      // Also replacing Buffer.from with Uint8Array for browser compatibility
      let decodedData = Uint8Array.from(atob(encodedTx), (c) =>
        c.charCodeAt(0)
      );
      recoveredTx = VersionedTransaction.deserialize(decodedData);
    }
    utilConsoleOnlyDev(`recoveredTx is ${recoveredTx}`);
    return recoveredTx;
  };

  const fnSignAndSendTx = async (txBase64: string) => {
    try {
      const recoveredTx = fnGetRawTransaction(txBase64);
      utilConsoleOnlyDev(`recoveredTx is ${recoveredTx}`);
      if (sendTransaction && recoveredTx) {
        const signedTxOutput = await sendTransaction(recoveredTx, connection);
        utilConsoleOnlyDev(`signedTxOutput is ${signedTxOutput}`);
        return signedTxOutput;
      } else {
        utilConsoleOnlyDev(`sendTransaction or recoveredTx is null`);
        return null;
      }
    } catch (error) {
      utilConsoleOnlyDev(`Error in fnSignAndSendTx ${error}`);
      return null;
    }
  };

  return {
    fnCheckWalletConnection,
    fnTriggerSignature,
    fnGetRawTransaction,
    fnSignAndSendTx,
    fnTriggerConnectWallet,
    fnTriggerDisconnectWallet,
    solPublicKey,
    solSelect,
    solConnected,
    solWallets,
  };
};

export default useSolWallet;
