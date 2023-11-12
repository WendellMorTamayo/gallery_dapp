import React, {useState} from 'react';
import Banner from "../components/Banner.jsx";
import Filter from "../components/Filter.jsx";
import ConnectWallet from "../components/ConnectWallet.jsx";
import GifList from "../components/GifList.jsx";
import Footer from "../components/Footer.jsx";

const HomeContainer = ({
                           connected,
                           user,
                           gifList,
                           myGifList,
                           removeGif,
                           initialized,
                           initializeUser,
                           transactionPending,
                           addGif,
                           wallet,
                           unLikeGif,
                           likeGif,
                       }) => {


    return (
        <>
            {!connected &&
                <div className="bg-gray-800 flex flex-col items-center justify-center h-screen w-screen">
                    <p className="mb-2 text-white font-bold text-2xl">View your GIF collection in the Blockchain✨</p>
                    <ConnectWallet/>
                </div>
            }
            {connected && !initialized &&
                <div className="bg-gray-800 flex flex-col items-center justify-center h-screen w-screen">
                    <p className="mb-2 text-white font-bold text-2xl">Initialize your account to view your GIF
                        collection in the Blockchain✨</p>
                    <button type="button"
                            className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2"
                            onClick={() => initializeUser()} disabled={transactionPending}>
                        Initialize
                    </button>
                </div>
            }
            {connected && initialized && <div className="bg-white w-screen h-full">
                <Banner initialized={initialized} initializeUser={initializeUser}
                        transactionPending={transactionPending} addGif={addGif}/>
                <div className=" w-full items-center justify-between flex-wrap gap-3 px-8 py-6">
                    <Filter gifList={gifList} myGifList={myGifList} removeGif={removeGif} wallet={wallet}
                            likeGif={likeGif} unlikeGif={unLikeGif}/>
                </div>
                <Footer/>
            </div>}


        </>
    );
}

export default HomeContainer;