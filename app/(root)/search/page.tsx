import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from "next/image";
import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';

async function Page() {
    const user = await currentUser();
    if (!user) return null

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Fetch all users

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
        </section>
    )
}

export default Page;