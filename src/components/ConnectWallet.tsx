interface Props {
    account: string;
    isConnecting: boolean;
    isConnected: boolean;
    onConnect: () => void;
}

const ConnectWallet = (props: Props) => {
    const {account, isConnecting, isConnected, onConnect} = props;

    return (
        <div>
            {account && <h5>You account: {account}</h5>}
            <br/>
            {!account && (
                <button disabled={isConnecting || isConnected} onClick={onConnect}>
                    {
                        isConnecting
                            ? 'Connecting...'
                            : isConnected
                                ? 'Your account is connected'
                                : 'Connect your wallet'
                    }
                </button>
            )}
        </div>
    )
}

export {ConnectWallet}
