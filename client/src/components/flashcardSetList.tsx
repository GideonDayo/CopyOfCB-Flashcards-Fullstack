import { useState } from "react";
import posthog from "posthog-js";

let nextId: number = 0;

export default function FlashcardSetList() {
    interface Title {
        id: number;
        value: string;
    }

    const [flashcardSetTitles, setFlashcardSetTitles] = useState<Title[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const handleAddingState = () => {
        setIsAdding(isAdding => !isAdding);
    }

    const handleAddTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setFlashcardSetTitles(titles => [...titles, {id: nextId++, value: newTitle}]);
        posthog.capture('flashcard_set_created');
        setNewTitle('');
        setIsAdding(false);
    }

    return (
        <>
            <ul>
                {flashcardSetTitles.map(flashcardSetTitle => (
                    <li className="flex flex-row justify-between hover:cursor-pointer mb-1.5">
                        <p className="overflow-hidden max-w-[90%] font-light">{flashcardSetTitle.value}</p>
                        <p onClick={() => {
                            setFlashcardSetTitles(flashcardSetTitles.filter(title => title.id !== flashcardSetTitle.id));
                            posthog.capture('flashcard_set_deleted');
                        }}>X</p>
                    </li>
                ))}
            </ul>

            {!isAdding ? (
                <button className="hover:cursor-pointer bg-purple-800 px-3 py-1 rounded-md" onClick={handleAddingState}>New Set +</button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input className="caret-white outline-none" placeholder="Enter title..." autoFocus onBlur={handleAddingState} onChange={handleAddTitle} value={newTitle}/>
                </form>
            )}
        </>
    )
}