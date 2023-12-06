import { AuthService, defaultConfigurable } from "bsafe";

import { useFuel } from "..";
import { useStore } from "./useStore";

export const useAuth = () => {
  const [fuel] = useFuel();
  const { session, setSession, auth, setAuth } = useStore();

  const createAuth = async (address: string) => {
    const a = await AuthService.create(
      address,
      defaultConfigurable["provider"]
    );
    const wallet = await fuel.getWallet(address!);

    await a.signerByAccount(wallet);

    const auth = await a.createSession();

    setAuth(auth);
    setSession(a);
  };

  const signTransaction = async (transactionId: string) => {
    if (!auth) return;
    const wallet = await fuel.getWallet(auth?.address);

    return await session?.signTransaction(wallet, transactionId);
  };

  return {
    createAuth,
    signTransaction,
    session,
    auth,
  };
};
