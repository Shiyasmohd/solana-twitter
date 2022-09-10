import { Card, Text,Input,Button } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef } from "react";
import { sentTweet } from "../libs/sendTweet";
import useWalletHook from "../libs/useWalletHoot";

export default function CreateTweet() {

    const {publicKey} = useWallet()
    const {program,anchorWalletObj} = useWalletHook()

    const topicRef = useRef<String>("")
    const contentRef = useRef<String>("")

    const handleNewTweet = () =>{
        const topic = topicRef.current.value;
        const content = contentRef.current.value;

        console.log(topic,content)

        sentTweet(
          topic,
          content,
          anchorWalletObj,
          program
        )
    }

  return (
    <Card isHoverable variant="bordered" css={{ mw: "75%",padding:"15px 0" }}>
      <Card.Body>
          <div
          className="my-4 w-full"
          >

      <Input 
          labelPlaceholder="Topic" 
          status="primary" 
          css={{width: "100%"}}
          ref={topicRef}
          />
          </div>
          <div className="my-4 mt-6 w-full">
      <Input 
          labelPlaceholder="What's on your mind today?" 
          status="primary" 
          css={{width: "100%"}}
          ref={contentRef}
        />
        </div>
        <Button shadow onPress={handleNewTweet} color="primary" auto className={`w-fit bg-[#0072F5] mt-6 ${publicKey ? "cursor-pointer" : "cursor-not-allowed" } `}>
          Tweet Now 
        </Button>
      </Card.Body>
    </Card>
  );
}
