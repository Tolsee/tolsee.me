import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex flex-row place-content-between py-4">
            <Link href="/" className="flex flex-row justify-start items-center text-2xl">
                <Logo />
                <span
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, rgba(0,175,154,1) 0%, rgba(0,212,255,1) 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        transition: "rgba(0,175,154,1) 0.2s ease-out, rgba(0,212,255,1) 0.2s ease-in-out",
                    }}
                    className="font-bold ml-1"
                >
                    tolsee.me
                </span>
            </Link>
        </header>
    );
}
