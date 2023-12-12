import {AuthService, IFormatTransfer, Transfer, Vault} from "bsafe";
import {useState} from "react";
import {useFuel} from "../fuel";
import {useStore} from "./useStore.ts";

export interface TransferParams {
  vault: Vault;
  account: string;
}

const useTransfer = ({vault}: TransferParams) => {
  const [fuel] = useFuel();
  const {auth} = useStore();
  const [transfer, setTransfer] = useState<Transfer | null>(null)
  const [isSending, setIsSending] = useState(false)

  const send = async () => {
    if (!transfer) return;

    setIsSending(true);
    await transfer.send();
    const resume = await transfer.wait();
    setIsSending(false);
    return resume;
  };

  const create = async (txParams: IFormatTransfer) => {
    console.log(vault)
    const currentAccount = await fuel.currentAccount();
    const wallet = await fuel.getWallet(currentAccount);
    const auxVault = await Vault.create({
      predicateAddress: vault.address.toString(),
      address: auth!.address,
      token: auth!.token,
    });
    const tx = await auxVault.BSAFEIncludeTransaction({
      ...txParams,
      witnesses: [],
    });
    setTransfer(tx);
    const authService = await AuthService.create(currentAccount, vault.provider.url);
    await authService.signTransaction(wallet, tx.BSAFETransactionId);
    send();
    return tx;
  };

  return {
    send,
    create,
    transfer,
    isSending,
  };
};

export { useTransfer };
