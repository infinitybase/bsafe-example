import { useIsConnected, useVault, useTransfer } from "./hooks";
import {ConnectWallet, CreateVaultForm, VaultDetails} from "./components";
import {CreateTransaction} from "./components/CreateTransaction.tsx";
import {BaseAssetId, bn} from "fuels";
//import { SendTransaction } from "./components/SendTransaction.tsx";

function App() {
  const { connect, isConnecting, isConnected, account } = useIsConnected();

    const { vault, balance, hasBalance, createVault, getVaultBalance } =
        useVault();

    const { transfer, create, isSigned, sign, isSent, send } = useTransfer({
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
          isSent={isSent}
          isSigned={isSigned}
          transfer={transfer!}
          onSend={() => send()}
          onSign={() => sign()}
          onCreate={(params) => create({
              witnesses: [],
              name: 'Transaction example',
              assets: [{
                  assetId: BaseAssetId,
                  amount: bn(bn.parseUnits(params.amount)).format(),
                  to: params.address,
              }]
          })}
        />
      )}
    </div>
  );
}

export default App;
