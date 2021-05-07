import { fetchTweet } from 'lib/fetchTweet'
import { NextApiRequest, NextApiResponse } from 'next'

const tweetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const tweet = await fetchTweet()
  res.status(200).json(tweet)
}

// eslint-disable-next-line import/no-default-export
export default tweetHandler
