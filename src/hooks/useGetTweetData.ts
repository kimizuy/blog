import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useGetTweetData = (initialData: {
  tweetId: string
  tweetAst: string
}): { data: { tweetId: string; tweetAst: string }; error: Error } => {
  const router = useRouter()
  const { basePath } = router
  const url = basePath + '/api/tweet'
  const { data, error } = useSWR(url, fetcher, {
    initialData,
    revalidateOnMount: true,
  })

  return { data, error }
}
