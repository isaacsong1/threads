import Image from "next/image";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
}

const ProfileHeader = ({ accountId, authUserId, name, username, imgUrl, bio,
}: Props) => {
    return (
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <Image 
                            src={imgUrl}
                            alt="Profile Image"
                            fill
                            className="rounded-full object-cover shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;