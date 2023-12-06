import { AuthService, IBSAFEAuth, Vault } from "bsafe";
import create from "zustand";

interface Store {
  session?: AuthService;
  setSession: (session: AuthService) => void;
  auth?: IBSAFEAuth;
  setAuth: (auth: IBSAFEAuth) => void;
  currentVault?: Vault;
  setCurrentVault?: (vault: Vault) => void;
}

export const useStore = create<Store>((set) => ({
  session: undefined,
  setSession: (session: AuthService) => set({ session }),
  auth: undefined,
  setAuth: (auth: IBSAFEAuth) => set({ auth }),
  currentVault: undefined,
}));
