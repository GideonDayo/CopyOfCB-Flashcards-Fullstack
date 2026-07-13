import { useState } from "react"
import FlashcardSetList from "./flashcardSetList";

// sidebar currently does not work as intended because I didn't think about the structure enough before trying to implement this
export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(isCollapsed => !isCollapsed)
    }

    return (
        <>
            {!isCollapsed ? (
                <div className="flex flex-col bg-gray-800 text-white px-4 py-3 min-h-screen w-3xs">
                    <div className="flex flex-row justify-between mb-5">
                        <button className="hover:cursor-pointer" onClick={handleCollapse}>←</button>
                    </div>

                    <FlashcardSetList/>
                </div>
                ) : (
                <div className="text-black px-4 py-3 min-h-screen">
                    <button className="hover:cursor-pointer" onClick={handleCollapse}>→</button>
                </div>
            )}
        </>
    )
}