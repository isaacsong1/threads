import Image from "next/image";
import Link from "next/link";

function Topbar() {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4"></Link>
            <Image src="/logo.svg" alt="logo" width={28} height={28} />
        </nav>
    )
}

export default Topbar;