import { useState } from "react";

export default function UserBox({id, name, deleteFunc, updateFunc, isActive, onActivate}: {id: string, name: string, deleteFunc: (idToDel:string)=>void, updateFunc: (idToUpd: string, newName: string)=>void, isActive: boolean, onActivate: ()=>void}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>("");

    const handleDelete = () => {
        deleteFunc((id as unknown) as string);
    }

    const handleEditingName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    }

    const handleUpdate = (e: React.SubmitEvent) => {
        e.preventDefault();

        updateFunc((id as unknown) as string, editedName);

        setEditedName('');
        setIsEditing(false);
    }

    return (
        !isEditing ? (
            <div className="flex flex-row rounded-md border-gray-900 border px-3 py-5 justify-between">
                <div className="">
                    <h1>User: {name}</h1>
                    {isActive && (<h1 className="text-green-400">Active</h1>)}
                </div>
                <div className="self-center">
                    <button className="bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1 mr-2" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1 mr-2" onClick={handleDelete}>Delete</button>
                    <button className="bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1" onClick={onActivate}>Set Active</button>
                </div>
            </div>
        ) : (
            <form className="rounded-md border-gray-900 border px-3 py-5" onSubmit={handleUpdate}>
                <input className="caret-black outline-none max-w-80" placeholder="Enter name..." autoFocus onBlur={()=>setIsEditing(false)} onChange={handleEditingName} value={editedName}/>
            </form>
        )
    )
}