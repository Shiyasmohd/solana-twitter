import { Program, web3 } from "@project-serum/anchor";
import { AnchorWallet,useWallet,WalletContextState } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";

export const sentTweet = async (
    topic: String,
    content: String,
    anchorWalletObj: AnchorWallet,
    program: Program
) =>{

    const tweetPubkey = web3.Keypair.generate()

    const publicKey = anchorWalletObj.publicKey
    
    await program.methods
    .sendTweet(topic,content)
    .accounts({
        myTweet: tweetPubkey.publicKey,
        senderOfTweet :publicKey?.toBase58(),
        systemProgram: web3.SystemProgram.programId
    })
    .signers([tweetPubkey])
    .rpc();


    const newTweetAccount = await program.account.tweet.fetch(tweetPubkey.publicKey);
    console.log("newTweetAccount: ",newTweetAccount)
    return newTweetAccount
}