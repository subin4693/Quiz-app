"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res.ok) {
                return router.push("/");
            }
        } catch (error) {
            alert(error.message);
            console.log("Error occured in login page", error);
        }
    };

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
                            className="w-full text-xs bg-white border-none outline-none "
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
                                view
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
                <p className="text-sm ">
                    Have an account?{" "}
                    <Link href="/register" className="text-black">
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
