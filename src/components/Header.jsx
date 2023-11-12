import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {mainMenu} from "../utils/supports";
import ConnectWallet from "./ConnectWallet.jsx";
import AddGifModal from "./modals/AddGifModal.jsx";

const Header = ({connected, addGif, loading, transactionPending}) => {
    const [color, setColor] = useState(false);
    const [addGifModalOpen, setAddGifModalOpen] = useState(false)

    const changeColor = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY >= 1) {
                setColor(true);
            } else {
                setColor(false);
            }
        }
    };

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", changeColor);
    }


    return (
        <>
            <header
                className={`fixed h-20 inset-x-0 sm:px-12 lg:px-32 xl:px-44 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
                    color ? "bg-orange-400" : "bg-transparent"
                }`}
            >
                <img
                    src={require("../assets/cat-logo.png")}
                    alt="Main Logo"
                    className="w-24 h-auto object-contain"
                />
                <div className="flex items-center justify-center gap-4">
                    {connected && (
                        <div
                            className="px-4 py-2 rounded-full text-base font-semibold text-primary cursor-pointer bg-emerald-200 hover:bg-emerald-300"
                        >
                            <div className="absolute flex items-center content-center justify-center top-4 right-4">
                                <button
                                    onClick={() => setAddGifModalOpen(true)}
                                    type="button"
                                    className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Upload
                                </button>
                                <ConnectWallet/>
                            </div>
                            <AddGifModal addGif={addGif} addGifModalOpen={addGifModalOpen}
                                         setAddGifModalOpen={setAddGifModalOpen}/>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;