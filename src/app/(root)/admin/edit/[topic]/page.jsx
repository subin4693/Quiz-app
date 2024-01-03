"use client";
import React, { useState, useEffect } from "react";
import EditCard from "@/components/EditCard";

const Edit = ({ params }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);

    const deleteQuestion = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/admin/topics/edit/${id}`,
                {
                    method: "DELETE",
                },
            );
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
        console.log(res);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/admin/topics/edit?search=${params.topic}`,
                );
                const data = await res.json();
                setQuestions(data.response);
            } catch (error) {
                alert(error.message);
                console.log(error);
            }
        };
        getData();
    }, []);
    return (
        <section className="flex items-center pt-16  flex-col gap-5 h-screen">
            {selectedQuestion && (
                <EditCard
                    setSelectedQuestion={setSelectedQuestion}
                    selectedQuestion={selectedQuestion}
                />
            )}
            {questions &&
                questions.map((question) => (
                    <div
                        className="  flex items-center pt-16  flex-col gap-5 "
                        key={question._id}
                    >
                        <p>question : {question.question} </p>
                        <p>option1 : {question.option1}</p>
                        <p>option2 : {question.option2}</p>
                        <p>option3 : {question.option3}</p>
                        <p>option4 : {question.option4}</p>
                        <p>answer : {question.answer}</p>
                        <button onClick={() => setSelectedQuestion(question)}>
                            Edit
                        </button>
                        <button onClick={() => deleteQuestion(question._id)}>
                            delete
                        </button>
                    </div>
                ))}
        </section>
    );
};

export default Edit;
