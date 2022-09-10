import { Connection,PublicKey } from "@solana/web3.js"
import { AnchorWallet, useAnchorWallet, useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from "@project-serum/anchor";
// import idl from "../../target/idl/dapp.json"
import idl from "../idl/dapp.json"


const programId = new PublicKey(idl.metadata.address);




export const useWalletHook = ():{
    connection : Connection;
    adapterWalletObj : WalletContextState;
    anchorWalletObj: AnchorWallet;
    provider : AnchorProvider;
    program: Program
} =>{


    const {connection} = useConnection();
    const adapterWalletObj = useWallet()
    const anchorWalletObj = useAnchorWallet();

    const provider = new AnchorProvider(connection,adapterWalletObj,{});
    const program = new Program(idl,programId,provider);


    return {
        connection ,
        adapterWalletObj,
        anchorWalletObj,
        provider,
        program
    }

}

export default useWalletHook