import { defaultConfigurable, Vault } from "bsafe";
import { bn, Provider } from "fuels";
import { useMemo, useState } from "react";
import { useLocal } from "./useLocal";
import { useStore } from "./useStore";

type CreateBsafeVaultParams = {
  signers: string[];
  signatureLength: number;
};

const useVault = () => {
  const [vault, setVault] = useState<Vault | undefined>();
  const [balance, setBalance] = useState("");

  const { auth } = useStore();

  const hasBalance = useMemo(() => {
    return bn(bn.parseUnits(balance)).gt(0);
  }, [balance]);

  const { create } = useLocal();

  const createVault = async (params: CreateBsafeVaultParams) => {
    const _vault = await Vault.create({
      configurable: {
        SIGNERS: params.signers,
        SIGNATURES_COUNT: params.signatureLength,
        network: defaultConfigurable["provider"],
        chainId: defaultConfigurable["chainId"],
      },
      BSAFEAuth: auth,
      provider: await Provider.create(defaultConfigurable["provider"]),
    });
    setVault(_vault);
    getVaultBalance(_vault);

    if (!auth) return;

    create({
      id: _vault.BSAFEVaultId,
      address: _vault.address.toString(),
      owner: auth.address,
    });
  };

  // id or address
  const getOldVault = async (predicateId: string) => {
    if (!auth) return;
    const _vault = await Vault.create({
      ...auth,
      id: predicateId,
    });

    setVault(_vault);
  };

  const getVaultBalance = async (_vault = vault) => {
    if (!_vault) return;
    console.log(await _vault.getBalance(), vault);
    const balance = await _vault.getBalance();
    console.log(balance.format());
    setBalance(balance.format());
  };

  return {
    vault,
    // generate
    createVault,
    getOldVault,

    // balance
    getVaultBalance,
    balance,
    hasBalance,
  };
};

export { useVault };
