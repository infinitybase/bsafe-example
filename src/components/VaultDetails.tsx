interface Props {
    hasVault: boolean;
    onRefresh: () => void;
    address: string;
    balance: string;
}

const VaultDetails = (props: Props) => {
    const {hasVault, address, balance, onRefresh} = props;

    return (
        <div>
            <button
                disabled={!hasVault}
                onClick={() => {
                    onRefresh()
                }}
            >
                Refresh balance
            </button>
            <br/>
            <br/>
            Vault address: {address}
            <br/>
            <br/>
            Vault balance: {balance}
            <br/>
        </div>
    )
}

export {VaultDetails};
