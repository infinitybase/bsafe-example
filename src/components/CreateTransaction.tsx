import {useState} from "react";
import {Transfer} from "bsafe";

interface Props {
    onCreate: (params: {address: string, amount: string}) => void;
    onSign: () => void;
    onSend: () => void;
    isSigned: boolean;
    isSent: boolean;
    transfer: Transfer;
}

const CreateTransaction = (props: Props) => {
    const {onCreate, transfer, onSign, isSigned, isSent, onSend} = props;

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
            <div style={{display: 'flex', gap: 2}}>
                <button
                    disabled={!!transfer}
                    onClick={() => onCreate({address, amount})}
                >
                    Create transaction
                </button>
                <button
                    disabled={isSigned}
                    onClick={() => onSign()}
                >
                    Sign
                </button>
                <button
                    disabled={isSent}
                    onClick={() => onSend()}
                >
                    Send
                </button>
            </div>
            {isSent && (
                <button onClick={() => window.open(transfer.makeBlockUrl('bsafe'), '_blank')}>
                    Show in explorer
                </button>
            )}
        </div>
    )
}

export {CreateTransaction}
