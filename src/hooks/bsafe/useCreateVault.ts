import {Vault} from "bsafe";
import {bn, Provider} from "fuels";
import {useMemo, useState} from "react";

type CreateBsafeVaultParams = {
    signers: string[];
    signatureLength: number;
}

const fuelProvider = new Provider('https://beta-3.fuel.network/graphql')

const useCreateVault = () => {
    const [vault, setVault] = useState<Vault | undefined>()
    const [balance, setBalance] = useState('')

    const hasBalance = useMemo(() => {
        return bn(bn.parseUnits(balance)).gt(0);
    }, [balance]);

    const createVault = async (params: CreateBsafeVaultParams) => {
        const _vault = new Vault({
            configurable: {
                network: fuelProvider.url,
                SIGNATURES_COUNT: params.signatureLength,
                SIGNERS: params.signers,
                HASH_PREDUCATE: undefined,
            }
        });

        setVault(_vault);
        getVaultBalance(_vault);
    }

    const getVaultBalance = async (_vault = vault) => {
        if (!_vault) return;

        const balance = await _vault.getBalance();
        setBalance(balance.format())
    }

    return {
        vault,
        balance,
        hasBalance,
        createVault,
        getVaultBalance,
    }
}

export {useCreateVault}
