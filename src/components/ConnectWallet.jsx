import React from 'react';
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";

require('@solana/wallet-adapter-react-ui/styles.css')
const ConnectWallet = () => {

    return (
        <>
            <WalletMultiButton
                className={"phantom-button"}/>
        </>
    );
};

export default ConnectWallet;