
import { fetchThreads } from "@/lib/actions/thread.actions";

export default async function Home() {
  // Fetch Threads from threads actions with page size 1 and number of posts 30
  const result = await fetchThreads(1, 30);

  console.log(result);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  )
}