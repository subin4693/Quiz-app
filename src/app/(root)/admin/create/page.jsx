"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateQuestion from "@/components/CreateQuestion";

const Create = () => {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [question1, setQuestion1] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    });
    const [question2, setQuestion2] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    });
    const [question3, setQuestion3] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    });
    const [question4, setQuestion4] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    });
    const [question5, setQuestion5] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
    });

    const handleCreate = async () => {
        if (
            question1.question.trim().length <= 0 &&
            question1.option1.trim().length <= 0 &&
            question1.option2.trim().length <= 0 &&
            question1.option3.trim().length <= 0 &&
            question1.option4.trim().length <= 0
        ) {
            alert("Fill question 1");
            return;
        }

        if (
            question2.question.trim().length <= 0 &&
            question2.option1.trim().length <= 0 &&
            question2.option2.trim().length <= 0 &&
            question2.option3.trim().length <= 0 &&
            question2.option4.trim().length <= 0
        ) {
            alert("Fill question 2");
            return;
        }

        if (
            question3.question.trim().length <= 0 &&
            question3.option1.trim().length <= 0 &&
            question3.option2.trim().length <= 0 &&
            question3.option3.trim().length <= 0 &&
            question3.option4.trim().length <= 0
        ) {
            alert("Fill question 3");
            return;
        }

        if (
            question4.question.trim().length <= 0 &&
            question4.option1.trim().length <= 0 &&
            question4.option2.trim().length <= 0 &&
            question4.option3.trim().length <= 0 &&
            question4.option4.trim().length <= 0
        ) {
            alert("Fill question 4");
            return;
        }

        if (
            question5.question.trim().length <= 0 &&
            question5.option1.trim().length <= 0 &&
            question5.option2.trim().length <= 0 &&
            question5.option3.trim().length <= 0 &&
            question5.option4.trim().length <= 0
        ) {
            alert("Fill question 5");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/admin/topics", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic,
                    quiz: [
                        question1,
                        question2,
                        question3,
                        question4,
                        question5,
                    ],
                }),
            });
            if (res.ok) {
                router.replace("/admin");
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <section className="pt-16 flex flex-col  items-center">
            <input
                type="text"
                placeholder="topic name"
                className="bg-white border h-fit text-center p-2 max-w-[10rem] rounded-md"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <br />
            <CreateQuestion
                question={question1}
                setQuestion={setQuestion1}
                count={1}
            />
            <div className="h-[1px]  my-10 border w-screen bg-blue" />
            <CreateQuestion
                question={question2}
                setQuestion={setQuestion2}
                count={2}
            />
            <div className="h-[1px]  my-10 border w-full bg-blue" />

            <CreateQuestion
                question={question3}
                setQuestion={setQuestion3}
                count={3}
            />
            <div className="h-[1px]  my-10 border w-screen bg-blue" />

            <CreateQuestion
                question={question4}
                setQuestion={setQuestion4}
                count={4}
            />
            <div className="h-[1px]  my-10 border w-screen bg-blue" />

            <CreateQuestion
                question={question5}
                setQuestion={setQuestion5}
                count={5}
            />

            <button
                onClick={handleCreate}
                className="text-white px-2 py-1 my-5 bg-gray rounded-md hover:bg-blue"
            >
                Create
            </button>
        </section>
    );
};

export default Create;
