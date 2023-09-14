import {Transfer, Vault} from "bsafe";
import {ITransferAsset} from "bsafe/dist/cjs/library/assets";
import {bn} from "fuels";

export interface InstanceTransactionParams {
    vault: Vault;
    assets: ITransferAsset[];
    witnesses: string[];
}

const NativeAssetId =
    '0x0000000000000000000000000000000000000000000000000000000000000000';

const instanceTransaction = async (params: InstanceTransactionParams) => {
    const {witnesses, assets, vault} = params;

    const transaction = new Transfer({
        vault,
        assets,
        witnesses,
    });

    await transaction.instanceTransaction();

    return transaction;
}

const useSendTransfer = (vault?: Vault) => {
   return {
       vault,
   }
}

export {useSendTransfer};
