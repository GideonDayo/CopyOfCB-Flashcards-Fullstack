import { useState } from "react"
import FlashcardSetList from "./flashcardSetList";

// sidebar currently does not work as intended because I didn't think about the structure enough before trying to implement this
export default function Sidebar({ openUsers }: {openUsers: ()=>void}) {
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

                    <button className="mt-auto hover:cursor-pointer bg-purple-800 px-3 py-1 rounded-md" onClick={openUsers}>Open Users</button>
                </div>
                ) : (
                <div className="text-black px-4 py-3 min-h-screen">
                    <button className="hover:cursor-pointer" onClick={handleCollapse}>→</button>
                </div>
            )}
        </>
    )
}