import { useState } from "react";
import posthog from "posthog-js";
import type { FlashcardInfo } from "../types";
import Flashcard from "./flashcard";


export default function FlashcardCarousel({flashcards}: {flashcards: FlashcardInfo[]}) {
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentFlashcardIndex(
            currIndex => currIndex === 0 ? flashcards.length - 1 : currentFlashcardIndex - 1
        );
        posthog.capture('flashcard_navigated', { direction: 'prev' });
    }

    const handleNextClick = () => {
        setCurrentFlashcardIndex(
            currIndex => (currIndex + 1) % flashcards.length
        );
        posthog.capture('flashcard_navigated', { direction: 'next' });
    }

    return (
        <section className="mx-auto self-center text-center">
            <h1 className="text-3xl mb-5">Flashcard Set Title</h1>

            <div className="flex flex-row gap-4">
                {flashcards.length > 1 && 
                    (<button className="text-3xl hover:cursor-pointer" onClick={handlePrevClick}>←</button>)}
                
                {flashcards.map((flashcard, index) => (
                    console.log(index, currentFlashcardIndex),
                    <Flashcard 
                        question={flashcard.question} 
                        answer={flashcard.answer}
                        hidden={index !== currentFlashcardIndex}
                    />
                ))}
                {flashcards.length > 1 && 
                    (<button className="text-3xl hover:cursor-pointer" onClick={handleNextClick}>→</button>)}
            </div>

        </section>
    )
}