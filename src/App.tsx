import { useIsConnected } from "./hooks";
import { ConnectWallet } from "./components";
//import { SendTransaction } from "./components/SendTransaction.tsx";

function App() {
  const { connect, isConnecting, isConnected, account } = useIsConnected();

  //   const { vault, balance, hasBalance, createVault, getVaultBalance } =
  //     useCreateVault();

  //   const { send, isSending, blockExplorerLink } = useSendTransfer({
  //     account,
  //     vault: vault!,
  //   });

  return (
    <div className="container">
      <ConnectWallet
        account={account}
        onConnect={connect}
        isConnected={isConnected}
        isConnecting={isConnecting}
      />

      <br />

      {/* {account && !vault && (
        <CreateVaultForm
          onCreate={(addresses) => {
            console.log(addresses);
            // createVault({
            //   signers: addresses,
            //   signatureLength: addresses.length,
            // });
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
        <SendTransaction
          link={blockExplorerLink}
          onSend={(address) => send(address)}
          isSending={isSending}
        />
      )} */}
    </div>
  );
}

export default App;
