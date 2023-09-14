import {Vault} from "bsafe";
import {bn} from "fuels";
import {useFuel} from "../fuel";
import {useState} from "react";

export interface UseSendTransferParams {
    vault: Vault;
    account: string;
}

const NativeAssetId =
    '0x0000000000000000000000000000000000000000000000000000000000000000';

const useSendTransfer = (params: UseSendTransferParams) => {
    const [fuel] = useFuel();

    const [isSending, setIsSending] = useState(false)
    const [blockExplorerLink, setBlockExplorerLink] = useState('')

    const send = async (to: string) => {
        setBlockExplorerLink('');
        setIsSending(true);

        try {
            const transfer = await params.vault!.includeTransaction([
                {
                    amount: bn(bn.parseUnits('0.001')).format(),
                    assetId: NativeAssetId,
                    to
                }
            ], []);

            const wallet = await fuel.getWallet(params.account);
            const signature = await wallet.signMessage(transfer.transaction.getHashTxId());

            transfer.transaction.witnesses = [signature]

            const transactionResponse = await transfer.transaction.sendTransaction();

            setBlockExplorerLink(transactionResponse.block);
        } finally {
            setIsSending(false)
        }
    }

    return {send, isSending, blockExplorerLink};
}

export {useSendTransfer};
