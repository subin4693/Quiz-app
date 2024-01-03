import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Confetti from "react-confetti";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";

const ResultCard = ({ correctAnswers, topic }) => {
    const totalQuestions = process.env.NEXT_PUBLIC_TOTALQUESTIONS;
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <>
            {correctAnswers && <Confetti width={width} height={height} />}
            <div className=" relative shadow-sm bg-white justify-center flex h-[70vh] w-screen md:w-[50rem] flex-col md:flex-row">
                {correctAnswers ? (
                    <div className="flex_center flex-col">
                        <h1 className=" text-3xl font-bold">Congraglactions</h1>
                        <br />
                        <h1 className=" text-2xl font-bold capitalize">
                            {topic}
                        </h1>

                        <br />
                        <div className="w-[8rem]">
                            <CircularProgressbar
                                value={(correctAnswers / totalQuestions) * 100}
                                text={`${correctAnswers}/${totalQuestions}`}
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
                        <br />
                        <br />

                        <p>
                            Go to{" "}
                            <Link href="/" className="underline">
                                {" "}
                                home
                            </Link>{" "}
                        </p>
                    </div>
                ) : (
                    <div className="text-blue text-3xl flex_center">
                        Loading...
                    </div>
                )}
            </div>
        </>
    );
};

export default ResultCard;
