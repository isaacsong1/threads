import Image from "next/image";

interface Props {
    key: string;
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({ key, id, name, username, imgUrl, personType }: Props) => {
    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <Image 
                    src={imgUrl}
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                />

            </div>
        </article>
    )
}

export default UserCard