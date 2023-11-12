import React from 'react';
import GalleryItem from "./GalleryItem.jsx";

const GifList = ({gifList, removeGif, wallet, likeGif}) => {
    console.log("GL:", gifList);
    return (
        <div className="columns-4 gap-3 w-3/4 mx-auto space-y-1 pb-28">
            {gifList.map((gif, index) => (
                <div key={index}>
                    <GalleryItem index={index} {...gif.account} gif={gif}
                                 removeGif={removeGif} wallet={wallet} likeGif={likeGif}/>
                </div>
            ))}
        </div>
    );
};

export default GifList;
