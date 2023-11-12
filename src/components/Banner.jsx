import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import ConnectWallet from "./ConnectWallet.jsx";
import AddGifModal from "./modals/AddGifModal.jsx";

const Banner = ({initialized, initializeUser, transactionPending, addGif}) => {
    const [addGifModalOpen, setAddGifModalOpen] = useState(false)

    return (
        <div className="relative w-full h-96 overflow-hidden">
            <img
                src={require("../assets/banner.jpg")}
                className="w-full h-full object-cover"
                alt=""

            />
            <span className="">BlockchainGIF Hub</span>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-4xl font-extrabold tracking-wider mb-4">
                    Gif Gallery DApp on Solana
                </h2>
                <p className="mb-6">
                    Explore an exquisite collection of NFT GIFs in our decentralized gallery built on the Solana
                    blockchain.
                </p>

                <div
                    className="w-1/2 mx-auto flex items-center justify-between bg-white rounded-full px-4 py-3">
                    <FaSearch size={16} color="#656F79"/>
                    <input
                        type="text"
                        placeholder="Search for gif here"
                        className="flex-1 border-none outline-none text-gray-800 text-lg font-semibold"
                    />

                </div>


            </div>
        </div>
    );
};

export default Banner;
