import React, { useState } from "react";

const EditCard = ({ selectedQuestion, setSelectedQuestion }) => {
    const [question, setQuestion] = useState(selectedQuestion);
    const handleClose = (e) => {
        e.stopPropagation();

        setSelectedQuestion(null);
    };

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/admin/topics/edit", {
            method: "PUT",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quiz: question,
                id: question._id,
            }),
        });
        const data = await res.json();

        setSelectedQuestion(null);
    };

    return (
        <div onClick={handleClose} className="fixed  inset-0 flex_center">
            <form
                onClick={handleClick}
                onSubmit={handleSubmit}
                className="bg-gray px-10 pt-10 pb-8 text-center"
            >
                <input
                    type="text"
                    value={question.question}
                    className="w-full p-2 py-1"
                    onChange={(e) =>
                        setQuestion((prev) => ({
                            ...prev,
                            question: e.target.value,
                        }))
                    }
                />
                <br />
                <input
                    type="text"
                    value={question.option1}
                    className="mr-5 mt-5 p-2 py-1"
                    onChange={(e) =>
                        setQuestion((prev) => ({
                            ...prev,
                            option1: e.target.value,
                        }))
                    }
                />
                <input
                    type="text"
                    value={question.option2}
                    className="ml-5 mt-5 p-2 py-1"
                    onChange={(e) =>
                        setQuestion((prev) => ({
                            ...prev,
                            option2: e.target.value,
                        }))
                    }
                />
                <br />

                <input
                    type="text"
                    value={question.option3}
                    className="mr-5 mt-5 p-2 py-1"
                    onChange={(e) =>
                        setQuestion((prev) => ({
                            ...prev,
                            option3: e.target.value,
                        }))
                    }
                />
                <input
                    type="text"
                    value={question.option4}
                    className="ml-5 mt-5 p-2 py-1"
                    onChange={(e) =>
                        setQuestion((prev) => ({
                            ...prev,
                            option4: e.target.value,
                        }))
                    }
                />
                <br />
                <input
                    type="text"
                    value={question.answer}
                    className=" mt-5 p-2 py-1"
                    onChange={(e) =>
                        setQuestion((prev) => ({
                            ...prev,
                            answer: e.target.value,
                        }))
                    }
                />
                <br />
                <button
                    type="submit"
                    className="mt-5 bg-blue text-white px-2 py-1 "
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditCard;
