"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Question from "@/components/Question";
import ResultCard from "@/components/ResultCard";

const page = ({ params }) => {
    const { status, data: session } = useSession();

    const [answers, setAnswers] = useState([]);
    const [isLast, setIsLast] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(null);
    const [question, setQuestion] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);

    useEffect(() => {
        async function checkAnswer() {
            try {
                const res = await fetch(
                    "http://localhost:3000/api/quizes/answers",
                    {
                        method: "POST",
                        header: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            topic: params.topic,
                            answers: answers,
                            email: session.user.email,
                        }),
                    },
                );
                const data = await res.json();
                setCorrectAnswers(data.totalAnswers);
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        }

        if (isLast) checkAnswer();
    }, [isLast]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/quizes?search=${params.topic}`,
                );
                const data = await res.json();
                setQuestion(data.quizs);
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        };
        getData();
    }, []);

    return (
        <section className="flex_center h-screen">
            {isLast ? (
                <ResultCard
                    correctAnswers={correctAnswers}
                    topic={params.topic}
                />
            ) : (
                <Question
                    questionWithAns={question[questionCount]}
                    currentQuestion={questionCount}
                    setQuestionCount={setQuestionCount}
                    totalQuestions={question.length}
                    setAnswers={setAnswers}
                    setIsLast={setIsLast}
                />
            )}
        </section>
    );
};

export default page;
