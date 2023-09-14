import {useIsConnected, useCreateVault} from "./hooks";
import {ConnectWallet, CreateVaultForm, VaultDetails} from "./components";

function App() {
    const {
        connect,
        isConnecting,
        isConnected,
        account,
    } = useIsConnected();

    const {
        vault,
        balance,
        createVault,
        getVaultBalance
    } = useCreateVault();

    return (
        <div className="container">
            <ConnectWallet
                account={account}
                onConnect={connect}
                isConnected={isConnected}
                isConnecting={isConnecting}
            />

            <br/>

            {account && !vault && (
                <CreateVaultForm
                    onCreate={addresses => {
                        console.log(addresses)
                        createVault({
                            signers: addresses,
                            signatureLength: addresses.length
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
        </div>
    )
}

export default App
