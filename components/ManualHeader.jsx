import { useMoralis } from "react-moralis"
// useEffect hook is used when we refresh the page and want the states to hold (wallet should be connected)
import { useEffect } from 'react'


export default function ManualHeader() {
    // hooks to re-render the website based on an input or change in state of a var
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(() => {
        if(isWeb3Enabled) return
        if (typeof window !== "undefined"){
            if (window.localStorage.getItem("Connected")) {
                enableWeb3()
            }
        }
        
    }, [isWeb3Enabled])
    // no depedency array: run anytime something re-renders
    // blank array run once on load
    // dependencies in the array, run anytime something in the array changes (best way)

    // Moralis.onAccountChanged() takes a function as parameter
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if(account == null){
                window.localStorage.removeItem("Connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (<div>
        {account 
        ? (<div>Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}</div>) 
        : (<button onClick={ 
            async () => {
            await enableWeb3()
            if (typeof window !== "undefined"){
                window.localStorage.setItem("Connected","injected")
            }
        }}
        disabled={isWeb3EnableLoading}
        >
            Connect</button>)}
    </div>)

}