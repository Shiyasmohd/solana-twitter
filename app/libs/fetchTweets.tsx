import { Program } from "@project-serum/anchor"

export const fetchTweets = async(program:Program,filters=[]) =>{

    const tweetAccounts = await program.account.tweet.all(filters)
    console.log("filtered: ",tweetAccounts)

    return tweetAccounts; 

}


export const authorFilter = (authorPubkey: String) =>({
    memcmp: {
        offset: 8, //Discriminator
        bytes: authorPubkey,
    },
})