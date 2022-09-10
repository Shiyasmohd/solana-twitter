import type { NextPage } from 'next'
import TweetCard from '../components/TweetCard';
import useWalletHook from '../libs/useWalletHoot';
import { useEffect, useState } from 'react';
import { Card, Text,Input,Button,Loading } from "@nextui-org/react";
import { authorFilter, fetchTweets } from '../libs/fetchTweets';
import CreateTweet from '../components/CreateTweet';

const Home: NextPage = () => {
  
  const {program} = useWalletHook();

  const [allTweets,setAllTweets] = useState([])
  const [filterPubkey1,setFilterPubkey1] = useState("")
  const [filterPubkey2,setFilterPubkey2] = useState("")


  useEffect(()=>{
    fetchTweets(program).then((tweets)=>{
      setAllTweets(tweets)
    })
  },[])

  const filterTweets = async ()=>{
    setFilterPubkey2(filterPubkey1)
    if(filterPubkey2 != "" ){
      fetchTweets(program,[authorFilter(filterPubkey2)]).then((tweets)=>{
        setAllTweets(tweets)
      })
    }
  }

  if(!allTweets.length){
    return(
      <div className='w-full'>
      <div className='flex flex-col items-center gap-5 text-center '>
      <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
        <Card.Body> 
          <Text css={{textAlign: "center"}} >Fetching Tweets...  </Text>
          <Loading className='mt-4'/>
        </Card.Body>
      </Card>
      </div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center gap-5 '>

        <CreateTweet/>

      <Card isHoverable variant="bordered" css={{ mw: "75%" }}>
        <Card.Body> 
          <Text className='mb-8' >Filter Tweets</Text>
          <Input 
          labelPlaceholder="Wallet Address" 
          status="primary" 
          onChange={(e)=>setFilterPubkey1(e.target.value)}
        />
        <Button shadow color="primary" auto className='w-fit bg-[#0072F5] mt-6' onClick={filterTweets}>
          Filter 
        </Button>
        </Card.Body>
      </Card>
      <Text
          h1
          size={60}
                    css={{
                      textGradient: "45deg, $blue600 -20%, $pink600 50%",
                      width: "75%"
                    }}
                    weight="bold"
                  >
                    Latest Tweets
                    </Text>
      {
        allTweets.map((tweetData,index)=>(
          <TweetCard value={tweetData} key={allTweets.length - index} />
        ))
      }
      </div>
    </div>
  )
}

export default Home
