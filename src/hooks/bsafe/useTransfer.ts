import {IFormatTransfer, Transfer, Vault} from "bsafe";
import {useState} from "react";
import {useFuel} from "../fuel";
import {useStore} from "./useStore.ts";

export interface TransferParams {
  vault: Vault;
  account: string;
}

const useTransfer = ({vault}: TransferParams) => {
  const [fuel] = useFuel();
  const {session} = useStore();
  const [transfer, setTransfer] = useState<Transfer | null>(null)
  const [isSent, setIsSent] = useState(false)
  const [isSigned, setIsSigned] = useState(false)

  const send = async () => {
    debugger;
    if (!transfer) return;

    await transfer.send();
    const resume = await transfer.wait();
    setIsSent(true);
    return resume;
  };

  const sign = async () => {
    if (!transfer) return;

    const currentAccount = await fuel.currentAccount();
    const wallet = await fuel.getWallet(currentAccount);
    await session!.signTransaction(wallet, transfer.BSAFETransactionId);

    setIsSigned(true);
  }

  const create = async (txParams: IFormatTransfer) => {
    const tx = await vault.BSAFEIncludeTransaction({
      ...txParams,
      witnesses: [],
    });
    setTransfer(tx);
    return tx;
  };

  return {
    sign,
    send,
    create,
    isSent,
    isSigned,
    transfer,
  };
};

export { useTransfer };
