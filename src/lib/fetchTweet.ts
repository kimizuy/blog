import { fetchTweetAst } from 'static-tweets'

const TOKEN = process.env.TWITTER_BEARER_TOKEN
const TWITTER_ID = '706822591617445888'
const url = `https://api.twitter.com/2/users/${TWITTER_ID}/tweets?exclude=retweets`

export const fetchTweet = async (): Promise<{
  tweetId: string
  tweetAst: string
}> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json())
    const [latestTweet] = response.data
    const tweetId = latestTweet.id
    const tweetAst = await fetchTweetAst(tweetId)

    return { tweetId, tweetAst }
  } catch (err) {
    console.error(err)
  }
}
