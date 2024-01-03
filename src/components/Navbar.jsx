"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const pathname = usePathname();

    const { status, data: session } = useSession();

    return (
        <nav className="flex fixed z-10 left-0 top-0 right-0 items-center justify-between shadow  py-3 px-10 text-blue">
            <Link href="/" className=" font-bold text-xl">
                Quiz
            </Link>
            <div>
                <Link
                    href="/leaderboard"
                    className={`${
                        pathname == "/admin/leaderboard" && "bg-gray text-white"
                    } text-sm rounded-md  py-1 px-2 mr-5  hover:bg-gray hover:text-white`}
                >
                    Leaderboard
                </Link>
                {session && session.user.role === "admin" && (
                    <Link
                        href="/admin"
                        className={`${
                            pathname == "/admin" && "bg-gray text-white"
                        } text-sm rounded-md  py-1 px-2 mr-5 hover:bg-gray hover:text-white`}
                    >
                        Admin
                    </Link>
                )}
                {session && session.user.email && (
                    <Link
                        href="/user"
                        className="text-sm rounded-md  mr-5 py-1 px-2 hover:bg-gray hover:text-white"
                    >
                        {session.user.email}
                    </Link>
                )}
                {status !== "authenticated" ? (
                    <Link
                        href="/register"
                        className="text-sm rounded-md  py-1 px-2 hover:bg-gray hover:text-white"
                        type="button"
                    >
                        Login
                    </Link>
                ) : (
                    <button
                        className="text-sm rounded-md  py-1 px-2 hover:bg-gray hover:text-white"
                        type="button"
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
