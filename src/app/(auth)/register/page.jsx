"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { status } = useSession();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        const isValidUsername = usernameRegex.test(name);
        const isValidPassword = passwordRegex.test(password);

        if (!isValidUsername) {
            alert(`Your name can contain 
                                        Lowercase and uppercase letters (a-z and A-Z)
                                        Numbers (0-9)
                                        Underscore (_)
                                        Hyphen (-)`);
            return;
        } else if (!isValidPassword) {
            alert(`Your password must contains
                        At least one uppercase letter (A-Z)
                        At least 8 characters long
                        And password lenght don't exists 15 characters
                    `);
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:3000/api/users/regester",
                {
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        password,
                    }),
                },
            );
            if (res.ok) {
                const val = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });
            }
        } catch (error) {
            alert(error.message);
            console.log("Error occured while register a new user", error);
        }
    };

    useEffect(() => {
        if (status === "authenticated") router.push("/");
    }, [status]);

    return (
        <section className="flex_center flex-col h-screen text-blue">
            <div className="flex_center flex-col drop-shadow-md bg-white p-10">
                <h1 className="text-2xl font-bold">Quiz </h1>
                <p className="text-sm">Sign up to atten a quiz</p>
                <form
                    className="flex flex-col  gap-4  mt-5"
                    onSubmit={handleSubmit}
                >
                    <label className="w-[15rem] p-2 border border-gray relative">
                        <input
                            type="text"
                            className="w-full text-xs bg-white  border-none outline-none "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p
                            className={`${
                                email.length > 0
                                    ? "top-0  text-[10px] "
                                    : " top-3 text-xs  "
                            } absolute text-gray duration-100`}
                        >
                            Email
                        </p>
                    </label>
                    <label className="w-[15rem] p-2 border border-gray relative">
                        <input
                            type="text"
                            className="w-full text-xs bg-white border-none outline-none "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p
                            className={`${
                                name.length > 0
                                    ? "top-0  text-[10px] "
                                    : " top-3 text-xs  "
                            } absolute text-gray duration-100`}
                        >
                            Name
                        </p>
                    </label>

                    <label className="flex items-center justify-between w-[15rem] p-2 py-3 border border-gray relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full text-xs bg-white border-none outline-none  "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {password && (
                            <button
                                type="button"
                                className="text-xs border-none outline-none  "
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "hide" : "view"}
                            </button>
                        )}

                        <p
                            className={`${
                                password.length > 0
                                    ? "top-0  text-[10px] "
                                    : " top-3 text-xs  "
                            } absolute text-gray duration-100`}
                        >
                            Password
                        </p>
                    </label>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue text-white text-sm rounded-md hover:bg-black"
                    >
                        Signup
                    </button>
                </form>
                <br />

                <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="w-full p-2 bg-blue text-white flex_center gap-2 text-sm rounded-md hover:bg-black"
                >
                    <Image src="/google.png" alt="" width={20} height={20} />{" "}
                    Login with google
                </button>
                <br />
                <p className="text-sm ">
                    Have an account?{" "}
                    <Link href="/login" className="text-black">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
