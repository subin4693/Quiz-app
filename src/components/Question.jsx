import { useState, useRef } from "react";

const Question = ({
    questionWithAns,
    currentQuestion,
    setQuestionCount,
    totalQuestions,
    setAnswers,
    setIsLast,
}) => {
    const [answer, setAnswer] = useState(null);
    const ref = useRef();

    const handleChange = (e) => {
        setAnswer(e.target.value);
    };
    const handleNext = () => {
        if (currentQuestion + 1 !== totalQuestions) {
            setAnswers((prev) => [
                ...prev,
                { id: questionWithAns._id, answer },
            ]);
            setQuestionCount((prev) => prev + 1);
            setAnswer(null);
            ref.current.reset();
        } else {
            setAnswers((prev) => [
                ...prev,
                { id: questionWithAns._id, answer },
            ]);
            setIsLast(true);
        }
    };
    return (
        <div className=" relative shadow-sm bg-white justify-center flex h-[70vh] w-screen md:w-[50rem] flex-col md:flex-row">
            <div className="relative md:w-1/2 flex_center md:bg-blue md:text-white text-2xl">
                <p className="absolute -top-10 left-2 md:top-10 md:left-10 text-sm">
                    {currentQuestion + 1}/{totalQuestions}
                </p>
                <p className="text-center mb-8 md:mb-0">
                    {questionWithAns && questionWithAns.question}{" "}
                </p>
            </div>

            <form
                ref={ref}
                onChange={handleChange}
                className="flex_center text-md  font-bold flex-col md:w-1/2 md:relative"
            >
                <label htmlFor="option1">
                    {" "}
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value={questionWithAns && questionWithAns.option1}
                    />
                    &nbsp;{questionWithAns && questionWithAns.option1}
                </label>
                <br />

                <label htmlFor="option2">
                    {" "}
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value={questionWithAns && questionWithAns.option2}
                    />
                    &nbsp;
                    {questionWithAns && questionWithAns.option2}
                </label>
                <br />

                <label htmlFor="option3">
                    {" "}
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value={questionWithAns && questionWithAns.option3}
                    />
                    &nbsp;{questionWithAns && questionWithAns.option3}
                </label>

                <br />
                <label htmlFor="option4">
                    {" "}
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value={questionWithAns && questionWithAns.option4}
                    />
                    &nbsp;{questionWithAns && questionWithAns.option4}
                </label>
                <button
                    disabled={answer ? false : true}
                    type="button"
                    className="disabled:opacity-75 absolute disable bg-blue rounded-sm font-thin px-2 py-1 text-white bottom-10 right-10 sm:bottom-20 sm:right-20 md:bottom-10 md:right-10"
                    onClick={handleNext}
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default Question;
