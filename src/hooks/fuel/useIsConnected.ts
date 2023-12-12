import {useFuel} from "./useFuel.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../bsafe/useAuth.ts";

const useIsConnected = () => {
    const [fuel] = useFuel();
    const {createAuth} = useAuth();

    const [account, setAccount] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)

    useEffect(() => {
        if (!!account) {
            createAuth(account);
        }
    }, [account]);

    const handleConnect = async () => {
        setIsConnecting(true)

        try {
            await fuel.connect();
        } finally {
            setIsConnecting(false)
        }
    }

    useEffect(() => {
        async function handleConnection() {
            const isConnected = await fuel.isConnected();
            const authAccounts = await fuel.accounts();
            const account = await fuel.currentAccount();

            if (authAccounts.includes(account)) {
                setAccount(account);
                setIsConnected(isConnected);
            }
        }

        handleConnection();

        fuel?.on(fuel.events.connection, handleConnection);
    }, []);

    return {
        account,
        isConnected,
        isConnecting,
        connect: handleConnect,
    }
}

export {useIsConnected}
