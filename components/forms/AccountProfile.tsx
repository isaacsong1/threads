"use client"

import { useForm } from 'react-hook-form';
import { 
    Form
} from '@/components/ui/form';

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
    const form = useForm()

    return (
        <Form>

        </Form>
    )
}

export default AccountProfile;