import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function Page() {
    const user = await currentUser();

    if (!user) return null

    const userInfo = await fetchUser(user.id);

    return <h1 className="head-text">Create Thread</h1>
}

export default Page;