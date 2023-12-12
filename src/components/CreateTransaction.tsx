import {useState} from "react";

interface Props {
    onSend: (params: {address: string, amount: string}) => void;
    link: string;
    isCreating: boolean;
}

const CreateTransaction = (props: Props) => {
    const {isCreating, onSend, link} = props;

    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')

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
            <input
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <br/>
            <button
                disabled={isCreating}
                onClick={() => onSend({address, amount})}
            >
                {isCreating ? 'Sending...' : 'Send transaction'}
            </button>
            {link && (
                <button onClick={() => window.open(link, '_blank')}>
                    Show in explorer
                </button>
            )}
        </div>
    )
}

export {CreateTransaction}
