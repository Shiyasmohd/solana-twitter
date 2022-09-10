import Image from "next/image";
import HamburgerIcon from "../public/hamburger.png"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import NavStyles from "../styles/Navbar.module.css" 
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import HomeIcon from "../public/home-icon.svg"
import UpArrow from "../public/up-arrow.svg"
import DownArrow from "../public/down-arrow.svg"
import Profile from "../public/profile.svg"
import DCLogo from "../public/twitter-logo.png"


export default function Navbar () {

  const [sideNavActive,setSideNavActive] = useState<boolean>(false); 
  const [myProfileOpts,setMyProfileOpts] = useState<boolean>(false)
  const [marketplaceOpts,setMarketplaceOpts] = useState<boolean>(false)

  return (
    <div className="">
        <div className="w-full h-[74px] bg-[#1C181D] flex justify-between items-center p-5
                        lg: p-8 h-auto">
        <div className="h-[24px] lg: hidden" onClick={()=>setSideNavActive(!sideNavActive)}><Image src={HamburgerIcon} /></div>
        <div className="hidden lg:block w-[150px] xl: w-[175px]"> <Image src={DCLogo} /> </div>
        <div className="flex gap-4">
            <div className="border border-[#1DA1F2] rounded hidden lg:block"> <WalletMultiButton /> </div>
        </div>
        </div>
        <div className={` ${sideNavActive ? NavStyles.activeSideNav : NavStyles.sideNav} lg: hidden `}>
            <div className="w-[60%]">
                <div className="h-[74px] w-full bg-[#1C181D] p-5 flex items-center">
                    <div className="h-[24px]" onClick={()=>setSideNavActive(!sideNavActive)}><Image src={HamburgerIcon} /></div>
                </div>
                <div className="w-full p-5">
                    <div className="border border-[#1DA1F2] rounded"> <WalletMultiButton /> </div>
                </div>
                <div className="w-full p-5">
                    <div className={ marketplaceOpts ? NavStyles.activeSideNavDD : NavStyles.sideNavDD} onClick={()=>setMarketplaceOpts(!marketplaceOpts)}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-[10px]">
                                <div className="h-[24px] w-[24px]"><Image src={HomeIcon}/></div>
                                <b className="font-kanit font-semibold text-white tracking-wider">Home </b>
                            </div>
                        </div>
                    </div>
                    <div className={ myProfileOpts ? NavStyles.activeSideNavDD : NavStyles.sideNavDD} onClick={()=>setMyProfileOpts(!myProfileOpts)}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-[10px]">
                                <div className="h-[24px] w-[24px]"><Image src={Profile}/></div>
                                <b className="font-kanit font-semibold text-white tracking-wider">My Tweets </b>
                            </div>
                           
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  );
}
