import React, {useState} from 'react';
import {useWallet} from '@solana/wallet-adapter-react'
import {useGallery} from "../hooks/useGallery.jsx";
import HomeContainer from "../container/HomeContainer.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
    const {connected} = useWallet()
    const {
        user,
        initializeUser,
        initialized,
        loading,
        myGifList,
        gifList,
        transactionPending,
        addGif,
        removeGif,
        wallet,
        likeGif,
    } = useGallery()

    console.log("User", user)

    return (

        <div className={"w-full h-full"}>
            {connected && initialized &&
                <Header connected={connected} addGif={addGif} transactionPending={transactionPending}
                        loading={loading}/>}
            <HomeContainer initialized={initialized} initializeUser={initializeUser} connected={connected}
                           user={user}
                           gifList={gifList} myGifList={myGifList} transactionPending={transactionPending}
                           addGif={addGif} removeGif={removeGif} wallet={wallet} likeGif={likeGif}
            />
        </div>
    );
};

export default Home;