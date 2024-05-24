import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function Page() {
    const user = await currentUser();
    if (!user) return null

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Get Activity
    const activity = await getActivity(userInfo._id);
    
    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>

            <section className="mt-10 flex flex-col gap-5">
                {activity.length > 0 ? (
                    <>
                        {activity.map((activity) => (
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className="activity-card">
                                    <Image 
                                        src={activity.author.image}
                                        alt="Profile Picture"
                                        width={20}
                                        height={20}
                                        className="rounded-full object-cover"
                                    />
                                </article>
                            </Link>
                        ))}
                    </>
                ): <p>No activity yet</p>}
            </section>
        </section>
    )
}

export default Page;