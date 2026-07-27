import { useState } from "react"
import posthog from "posthog-js"

export default function Flashcard({question, answer, hidden}: {question: string, answer: string, hidden: boolean}) {
    const [showAnswer, setShowAnswer] = useState(false);

    const handleClick = () => {
        setShowAnswer(showAnswer => {
            posthog.capture('flashcard_flipped', { revealed: !showAnswer });
            return !showAnswer;
        });
    }

    return (
        !hidden && (<div className="flex mx-auto px-5 py-3 w-lg h-64 hover:cursor-pointer self-center shadow-[0_0px_10px_rgba(0,0,0,0.25)] text-center items-center justify-center rounded-lg" onClick={handleClick}>
            {showAnswer ? (
                <p className="text-xl font-light">{answer}</p>
            ) : (
                <h1 className="text-xl font-light overflow-y-scroll">{question}</h1>
            )}
        </div>)
    )
}