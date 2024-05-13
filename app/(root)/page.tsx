
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  // Fetch Threads from threads actions with page size 1 and number of posts 30
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  console.log(result);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.threads.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          {result.threads.map((thread) => (
            <ThreadCard 
              key={thread._id}
              id={thread._id}
              currentUserId={user?.id}
              parentId={thread.parentId}
              content={thread.text}
              author={thread.author}
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        )}
      </section>
    </>
  )
}