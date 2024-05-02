"use client"

import { useForm } from 'react-hook-form';
import { 
    Form
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

// Defines Props as an interface
interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    }
}

// AccountProfile accepts user and btnTitle as type Props
const AccountProfile = ({ user, btnTitle }: Props) => {
    const form = useForm({
        resolver:
    })

    return (
        <Form>

        </Form>
    )
}

export default AccountProfile;