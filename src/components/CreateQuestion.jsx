import React from "react";

const CreateQuestion = ({ question, setQuestion, count }) => {
    return (
        <form className="text-center w-fit ">
            {count}
            <input
                type="text"
                placeholder="Question"
                className=" border w-full px-2 py-1  text-center rounded-md mt-3"
                onChange={(e) =>
                    setQuestion((prev) => ({
                        ...prev,
                        question: e.target.value,
                    }))
                }
                value={question.question}
            />
            <br />
            <input
                type="text"
                placeholder="option1"
                className="w-[10rem] px-2 py-1 border rounded-md my-4 mr-10"
                onChange={(e) =>
                    setQuestion((prev) => ({
                        ...prev,
                        option1: e.target.value,
                    }))
                }
                value={question.option1}
            />
            <input
                type="text"
                placeholder="option2"
                className="w-[10rem] px-2 py-1 border rounded-md my-4 ml-10"
                onChange={(e) =>
                    setQuestion((prev) => ({
                        ...prev,
                        option2: e.target.value,
                    }))
                }
                value={question.option2}
            />
            <br />
            <input
                type="text"
                placeholder="option3"
                className="w-[10rem] px-2 py-1 border rounded-md my-2 mr-10"
                onChange={(e) =>
                    setQuestion((prev) => ({
                        ...prev,
                        option3: e.target.value,
                    }))
                }
                value={question.option3}
            />
            <input
                type="text"
                placeholder="option4"
                className="w-[10rem] px-2 py-1 border rounded-md my-2 ml-10"
                onChange={(e) =>
                    setQuestion((prev) => ({
                        ...prev,
                        option4: e.target.value,
                    }))
                }
                value={question.option4}
            />
            <br />
            <input
                type="text"
                placeholder="answer"
                className="w-[10rem] px-2 py-1  text-center border rounded-md my-2 "
                onChange={(e) =>
                    setQuestion((prev) => ({
                        ...prev,
                        answer: e.target.value,
                    }))
                }
                value={question.answer}
            />
        </form>
    );
};

export default CreateQuestion;
