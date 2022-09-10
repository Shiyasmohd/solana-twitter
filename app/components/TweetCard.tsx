import { Card, Grid, Text, Link } from "@nextui-org/react";
import Image from "next/image";
import Twitter from "../public/twitter.png"

export default function TweetCard(props:any) {



  const tweetPubkey = props.value.publicKey.toBase58();
  const author = props.value.account.author.toBase58();
  const topic = props.value.account.topic;
  const content = props.value.account.content

  return (
    <Card css={{ p: "$6", mw: "75%" }}>
      <Card.Header>
        <Image src={Twitter} width={34} height={34} />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {author}
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header> 
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Topic: {topic}<br/>
          {content}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href={`https://solscan.io/account/${tweetPubkey}?cluster=devnet`}
        >
          View on SolScan
        </Link>
      </Card.Footer>
    </Card>
  );
}
