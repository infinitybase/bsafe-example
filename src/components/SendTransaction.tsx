import {useState} from "react";

interface Props {
    onSend: (address: string) => void;
    isSending: boolean;
    link: string;
}

const SendTransaction = (props: Props) => {
    const {isSending, onSend, link} = props;

    const [address, setAddress] = useState('')

    return (
        <div>
            <br/>
            <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="To"
            />
            <br/>
            <button
                disabled={isSending}
                onClick={() => onSend(address)}
            >
                {isSending ? 'Sending...' : 'Send transaction'}
            </button>
            {link && (
                <button onClick={() => window.open(link, '_blank')}>
                    Show in explorer
                </button>
            )}
        </div>
    )
}

export {SendTransaction}
