"use client";

import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { signOut, useSession } from "next-auth/react";

const User = () => {
    const { status, data: session } = useSession();
    const [answersData, setAnswersData] = useState([]);
    const [totalans, setTotalans] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/users?email=${session.user.email}`,
                );
                const data = await res.json();

                setAnswersData(data.answersData);
                setTotalans(data.totalans);
            } catch (error) {
                console.log(error.message);
            }
        }

        getData();
    }, []);

    return (
        <section className="pt-20 px-36 ">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl">
                        {status === "authenticated" && session.user.name}
                    </h2>
                    <h2 className="text-2xl mt-3">
                        {status === "authenticated" && session.user.email}
                    </h2>
                </div>
                <div className="w-[15rem]">
                    {" "}
                    {totalans && (
                        <CircularProgressbar
                            value={
                                (totalans.correct_ans / totalans.total_quiz) *
                                100
                            }
                            text={
                                totalans.correct_ans + "/" + totalans.total_quiz
                            }
                            styles={buildStyles({
                                strokeLinecap: "butt",

                                textSize: "26px",

                                pathTransitionDuration: 0.5,

                                pathColor: `#14213d`,
                                textColor: "#000",
                                trailColor: "#d6d6d6",
                            })}
                        />
                    )}
                </div>
            </div>
            <div className="grid gap-10 grid-cols-3 mt-10">
                {answersData.map((data) => (
                    <div
                        className="flex_center gap-10 border rounded-md p-5"
                        key={data._id}
                    >
                        <p>{data.topic}</p>
                        <div className="w-[5rem] ">
                            <CircularProgressbar
                                value={(data.correct_answers / 5) * 100}
                                text={data.correct_answers + "/" + 5}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    textSize: "26px",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#14213d`,
                                    textColor: "#000",
                                    trailColor: "#d6d6d6",
                                })}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default User;
