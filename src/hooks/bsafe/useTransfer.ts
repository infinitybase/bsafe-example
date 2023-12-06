import { IFormatTransfer, Transfer, Vault } from "bsafe";

export interface TransferParams {
  vault: Vault;
  txParams: IFormatTransfer;
}

const useTransfer = () => {
  const create = async ({ vault, txParams }: TransferParams) => {
    console.log(txParams);
    const tx = await vault.BSAFEIncludeTransaction({
      ...txParams,
      witnesses: [],
    });
    console.log(tx);
    return tx;
  };

  const send = async (tx: Transfer, witnesses: string[]) => {
    tx.witnesses = witnesses;
    await tx.send();
    return await tx.wait();
  };

  return {
    create,
    send,
  };
};

export { useTransfer };
