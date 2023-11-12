import React, {useState} from "react";
import {MdDelete} from "react-icons/md";
import {AiFillHeart} from "react-icons/ai";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GalleryItem = ({index, gif, removeGif, wallet, likeGif}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    console.log("Gallery Item PublicKey:", gif.publicKey)
    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const onClickDelete = () => {
        if (window.confirm("Are you sure you want to delete this GIF?")) {
            removeGif(gif.publicKey, index)
                .then(() => {
                    toast.warning("GIF deleted successfully");
                })
                .catch((error) => {
                    console.error("Error deleting GIF:", error);
                    toast.error("Error deleting GIF. Please try again.");
                });
        }
    };


    const onClickLike = () => {
        likeGif(gif.publicKey, index)
        setAlreadyLiked(false)
    }

    return (
        <div
            className="m-2 relative cursor-pointer"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative cursor-pointer w-auto rounded-lg shadow-md overflow-hidden">
                {gif && gif.account.gifLink && (
                    <img src={gif.account.gifLink} alt="" className="w-full h-full object-cover"/>
                )}

                {isHovered && (
                    <>
                        <div className="absolute inset-x-0 top-0 px-3 py-2 flex items-center">
                            <div
                                className={"w-8 h-8 rounded-md flex items-center justify-center"
                                }
                            >
                                {gif.account.authority.toString() === wallet && "👑"}
                            </div>
                        </div>
                        <div
                            className="text-white justify-center absolute inset-x-0 bottom-0 px-3 py-2 flex items-center gap-1 bg-gradient-to-bl from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] backdrop-blur-sm flex-wrap">
                            <p className="mr-1">Uploaded by:</p>
                            <a
                                href={`https://explorer.solana.com/address/${gif?.account.authority}?cluster=devnet`}
                                className="text-xs hover:text-blue-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`${gif?.account.authority.toBase58().slice(0, 15)}...${gif?.account.authority.toBase58().slice(-15)}`}
                            </a>
                        </div>
                    </>
                )}

                {gif.account.authority.toString() === wallet && (
                    <div
                        className="absolute top-2 right-2 z-20 w-6 h-6 cursor-pointer rounded-full bg-[rgba(256,256,256,0.6)] flex items-center justify-center hover:bg-white"
                    >

                        <MdDelete onClick={onClickDelete} className="text-lg text-red-500"/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryItem;
