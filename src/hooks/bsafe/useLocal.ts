/*const structure data:
    auth: {@IBSAFEAuth}
    vault: {
        id: string,
        address: string,
        owner: string 
    }[]
*/

export interface ILocalVault {
  id: string;
  address: string;
  owner: string;
}

export const useLocal = () => {
  const getVaults = (filter?: {
    id?: string;
    address?: string;
    owner?: string;
  }) => {
    const vaults = localStorage.getItem("vaults");
    if (filter) {
      return vaults
        ? JSON.parse(vaults).filter((vault: ILocalVault) => {
            if (filter.id && filter.id !== vault.id) return false;
            if (filter.address && filter.address !== vault.address)
              return false;
            if (filter.owner && filter.owner !== vault.owner) return false;
            return true;
          })
        : undefined;
    }
    return vaults ? JSON.parse(vaults) : undefined;
  };

  const create = (vault: ILocalVault) => {
    const vaults = getVaults();
    if (vaults) {
      vaults.push(vault);
      localStorage.setItem("vaults", JSON.stringify(vaults));
      return;
    }
    if (!vaults) {
      localStorage.setItem("vaults", JSON.stringify([vault]));
      return;
    }
  };

  return {
    //vault
    getVaults,
    create,
  };
};
