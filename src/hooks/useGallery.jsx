import * as anchor from '@project-serum/anchor'
import React, {useEffect, useMemo, useState} from 'react'
import toast from 'react-hot-toast'
import {PublicKey, SystemProgram} from '@solana/web3.js'
import {utf8} from '@project-serum/anchor/dist/cjs/utils/bytes'
import {findProgramAddressSync} from '@project-serum/anchor/dist/cjs/utils/pubkey'
import {useAnchorWallet, useConnection, useWallet} from '@solana/wallet-adapter-react'
import idl from './idl.json'
import {PROGRAM_KEY} from "./constants.jsx";

export function useGallery() {
    const {connection} = useConnection()
    const {publicKey} = useWallet()
    const anchorWallet = useAnchorWallet()


    const [initialized, setInitialized] = useState(false)
    const [user, setUser] = useState({})
    const [gifList, setGifList] = useState([])
    const [myGifList, setMyGifList] = useState([])
    const [transactionPending, setTransactionPending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [lastGif, setLastGif] = useState(0)
    const [wallet, setWallet] = useState('')

    const program = useMemo(() => {

        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(idl, PROGRAM_KEY, provider)
        }
    }, [connection, anchorWallet])

    useEffect(() => {
        const start = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    const [profilePda, profileBump] = await findProgramAddressSync([utf8.encode('initialize'), publicKey.toBuffer()], program.programId)
                    const baseAccount = await program.account.baseAccount.fetch(profilePda)
                    console.log("Start:", baseAccount)
                    if (baseAccount) {
                        setLastGif(baseAccount.lastGif)
                        setInitialized(true)
                        setLoading(true)

                        const allGifs = await program.account.gifAccount.all();

                        setGifList(allGifs)
                        console.log("Gif List:", allGifs);

                        setWallet(publicKey.toString())
                        setUser(baseAccount.toString())
                        const allMyGifs = allGifs.filter(gif => gif.account.authority.toString() === baseAccount.authority.toString())
                        setMyGifList(allMyGifs)
                        console.log("My Gif List:", allMyGifs);
                    } else {
                        setInitialized(false)
                    }
                } catch (error) {
                    console.log("Error nimo", error)
                    setInitialized(false)
                } finally {
                    setLoading(false)
                }
            }

        }
        start()
    }, [publicKey, program, transactionPending])

    const initializeUser = async () => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                const [baseAccountPda] = findProgramAddressSync([utf8.encode('initialize'), publicKey.toBuffer()], program.programId)
                const tx = await program.methods
                    .initializeUser()
                    .accounts({
                        authority: publicKey,
                        baseAccount: baseAccountPda,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                setInitialized(true)
                console.log("Transaction: ", tx)
                toast.success('Successfully initialized user.')
            } catch (error) {
                console.log("Error initializing: ", error)
            } finally {
                setLoading(false)
                setTransactionPending(false)
            }
        }
    }

    const addGif = async (gifLink) => {
        console.log(gifLink, "YOOO")
        if (program && publicKey) {
            setTransactionPending(true)
            setLoading(true)
            try {
                const [baseAccountPda] = findProgramAddressSync([utf8.encode('initialize'), publicKey.toBuffer()], program.programId)
                const [gifPda] = findProgramAddressSync([utf8.encode('gif_state'), publicKey.toBuffer(), Uint8Array.from([lastGif])], program.programId)
                console.log("Adding a gif with ", publicKey.toString(), program.programId, baseAccountPda.toString(), gifPda.toString(), lastGif)
                await program.methods
                    .addGif(gifLink)
                    .accounts({
                        baseAccount: baseAccountPda,
                        gifAccount: gifPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success("SUCCESSFULLY ADDED A LISTING")
            } catch (error) {
                console.error(error)
            } finally {
                setTransactionPending(false)
                setLoading(false)
            }
        }
    }

    const removeGif = async (gifPda, gifIndex) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                const [baseAccountPda, profileBump] = findProgramAddressSync([utf8.encode('initialize'), publicKey.toBuffer()], program.programId)
                console.log(gifPda.toString(), gifIndex, publicKey.toString(), baseAccountPda.toString())
                await program.methods
                    .removeGif(gifIndex)
                    .accounts({
                        baseAccount: baseAccountPda,
                        gifAccount: gifPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success("Deleted listing")
                console.log("Deleted listing")
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
                setTransactionPending(false)
            }
        }
    }

    const likeGif = async (gifPda, gifIndex) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
                setLoading(true);

                const [gifAccountLikePda] = findProgramAddressSync(
                    [utf8.encode('like_state'), publicKey.toBuffer(), Uint8Array.from([gifIndex])],
                    program.programId
                );
                console.log(gifPda.toString(), gifIndex, publicKey.toString(), gifAccountLikePda.toString())
                await program.methods
                    .createLike(gifIndex)
                    .accounts({
                        gifLikeAccount: gifAccountLikePda,
                        gifAccount: gifPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc();

            } catch (error) {
                console.error("Error liking gif", error);
            } finally {
                setLoading(false);
                setTransactionPending(false);
            }
        }
    };


    return {
        initializeUser,
        removeGif,
        addGif,
        initialized,
        user,
        loading,
        transactionPending,
        myGifList,
        gifList,
        wallet,
        likeGif,
    }
}