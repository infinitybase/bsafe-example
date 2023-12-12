import { useIsConnected, useVault, useTransfer } from "./hooks";
import {ConnectWallet, CreateVaultForm, VaultDetails} from "./components";
import {CreateTransaction} from "./components/CreateTransaction.tsx";
import {BaseAssetId, bn} from "fuels";
//import { SendTransaction } from "./components/SendTransaction.tsx";

function App() {
  const { connect, isConnecting, isConnected, account } = useIsConnected();

    const { vault, balance, hasBalance, createVault, getVaultBalance } =
        useVault();

    const { transfer, create, isSending } = useTransfer({
      account,
      vault: vault!,
    });

  return (
    <div className="container">
      <ConnectWallet
        account={account}
        onConnect={connect}
        isConnected={isConnected}
        isConnecting={isConnecting}
      />

      <br />

      {account && !vault && (
        <CreateVaultForm
          onCreate={(addresses) => {
            createVault({
              signers: addresses,
              signatureLength: addresses.length,
            });
          }}
          hasVault={!!vault}
        />
      )}

      {vault && (
        <VaultDetails
          balance={balance}
          address={vault.address.toAddress()}
          hasVault={!!vault}
          onRefresh={() => {
            getVaultBalance();
          }}
        />
      )}

      {hasBalance && (
        <CreateTransaction
          link={transfer?.makeBlockUrl('') ?? ''}
          onSend={(params) => create({
              witnesses: [],
              name: 'Transaction example',
              assets: [{
                  assetId: BaseAssetId,
                  amount: bn(bn.parseUnits(params.amount)).format(),
                  to: params.address,
              }]
          })}
          isCreating={isSending}
        />
      )}
    </div>
  );
}

export default App;
