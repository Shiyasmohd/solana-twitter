import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Dapp } from "../target/types/dapp";

describe("dapp", async() => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Dapp as Program<Dapp>;
  const { SystemProgram } = anchor.web3;

  const tweetAccount = anchor.web3.Keypair.generate();
  const otherUser = anchor.web3.Keypair.generate();

  // 1 Sol = 1 Billion Lamports
  // const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey,1000000000)

  // const latestBlockHash = await program.provider.connection.getLatestBlockhash();

  // await program.provider.connection.confirmTransaction({
  //   blockhash: latestBlockHash.blockhash,
  //   lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  //   signature: signature,
  // })

  it("Can send a Tweet", async () => {

    await program.methods.sendTweet("Topic","Content").accounts({
      myTweet: tweetAccount.publicKey,
      senderOfTweet: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([tweetAccount]).rpc();


    const account = await program.account.tweet.fetch(tweetAccount.publicKey);
    console.log("Tweet: ",account);

  });


  // it("Send tweet with another user",async()=>{

  //   await program.methods.sendTweet("Topic 2","Content 2").accounts({
  //     myTweet: tweetAccount.publicKey,
  //     senderOfTweet: otherUser.publicKey,
  //     systemProgram: SystemProgram.programId
  //   }).signers([otherUser,tweetAccount]).rpc();

  //   const account = await program.account.tweet.fetch(tweetAccount.publicKey);
  //   console.log("Tweet: ",account);

  // })

  it("Fetch all tweets",async () => {
    const tweetAccounts = await program.account.tweet.all();
    console.log(tweetAccounts)
  })

  it("Can filter Tweets by author",async()=>{

    const authorPubkey = program.provider.publicKey;
    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8, // Discriminator
          bytes: authorPubkey.toBase58()
        }
      }
    ])

    console.log(tweetAccounts);
  })



});
