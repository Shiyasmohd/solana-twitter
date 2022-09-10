import { useEffect, useState } from "react" 
import Image from "next/image";
import NavStyles from "../styles/Navbar.module.css" 
import HomeIcon from "../public/home-icon.png"
import UpArrow from "../public/up-arrow.svg"
import DownArrow from "../public/down-arrow.svg"
import Profile from "../public/profile.png"
import Raffle from "../public/raffle.png"
import Auction from "../public/auction.png"
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

function SideOpts(){

    const router = useRouter()

    const {publicKey} = useWallet()


    return (
        <div className="w-full px-4">
                    <div className={NavStyles.sideNavDD} onClick={()=>router.push('/')} >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-[10px]">
                                <div className="h-[24px] w-[24px] xl:h-[30px] w-[30px]"><Image src={HomeIcon}/></div>
                                <b className="font-kanit font-semibold text-white tracking-wider xl:text-xl">Home </b>
                            </div>
                        </div>
                    </div>
                    <div className={`${NavStyles.sideNavDD2}  ${publicKey ? "cursor-pointer" : "cursor-not-allowed" }`} onClick={()=>router.push('/myTweets')} >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-[10px]">
                                <div className="h-[24px] w-[24px] xl:h-[30px] w-[30px]"><Image src={Profile}/></div>
                                <b className="font-kanit font-semibold text-white tracking-wider xl:text-xl">My Tweets </b>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default SideOpts