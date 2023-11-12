import dynamic from 'next/dynamic'
import Home from "./index.jsx";


function App() {
    const WalletConnectionProvider = dynamic(() => import('../context/WalletConnectionProvider'), {
        ssr: false,
    })
    return (
        <>
            <div className={"bg-white h-full w-full"}>
                <WalletConnectionProvider>
                    <Home/>
                </WalletConnectionProvider>
            </div>
        </>
    )
}

export default App
