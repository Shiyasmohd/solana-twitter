import type { NextPage } from 'next'
import TweetCard from '../components/TweetCard';
import useWalletHook from '../libs/useWalletHoot';
import { useEffect, useState } from 'react';
import { Card, Text,Input,Button,Loading } from "@nextui-org/react";
import { authorFilter, fetchTweets } from '../libs/fetchTweets';
import { useWallet } from '@solana/wallet-adapter-react';

const MyTweets: NextPage = () => {
  
  const {program} = useWalletHook();

  const [allTweets,setAllTweets] = useState([])
  const [filterPubkey1,setFilterPubkey1] = useState("")
  const [filterPubkey2,setFilterPubkey2] = useState("")

  const {publicKey} = useWallet();


  useEffect(()=>{
    // fetchTweets(program).then((tweets)=>{
    //   setAllTweets(tweets)
    // })
    filterTweets()
  },[])

  const filterTweets = async ()=>{
    setFilterPubkey2(filterPubkey1)
    if(publicKey != "" ){
      fetchTweets(program,[authorFilter(publicKey)]).then((tweets)=>{
        setAllTweets(tweets)
      })
    }
  }

  // if(!allTweets.length){
  //   return(
  //     <div className='w-full'>
  //     <div className='flex flex-col items-center gap-5 text-center '>
  //     <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
  //       <Card.Body> 
  //         <Text css={{textAlign: "center"}} >Fetching Tweets...  </Text>
  //         <Loading className='mt-4'/>
  //       </Card.Body>
  //     </Card>
  //     </div>
  //     </div>
  //   )
  // }

  return (
    <div className='w-full'>

      {
        publicKey ? 
          !allTweets.length ?

          <div className='flex flex-col items-center gap-5 '>
          <Text
          h1
          size={60}
                    css={{
                      textGradient: "45deg, $blue600 -20%, $pink600 50%",
                      width: "100%"
                    }}
                    weight="bold"
                  >
                    My Tweets
                    </Text>
                    
                    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
                      <Card.Body> 
                        <Text css={{textAlign: "center"}} >No Tweets Found  </Text>
                       </Card.Body>
                    </Card>
                  </div> 
            :
            <div className='flex flex-col items-center gap-5 '>
            <Text
            h1
            size={60}
                      css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                        width: "100%"
                      }}
                      weight="bold"
                    >
                      My Tweets
                      </Text>
                      
                    {
                      allTweets.map((tweetData,index)=>(
                        <TweetCard value={tweetData} key={index} />
                      ))
                    }
                    </div> 
          :
          <div>
            <Text
              h1
              size={60}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                width: "100%"
              }}
              weight="bold"
            >
              Connect your wallet 
            </Text>
            <Text
              h1
              size={30}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                width: "100%"
              }}
              weight="bold"
            >
              To see your Tweets 
            </Text>
          </div>

      }
    </div>
  )
}

export default MyTweets
