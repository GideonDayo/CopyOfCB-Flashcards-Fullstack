import { useEffect, useState } from "react";
import UserBox from "./userBox";
import type { User } from "../types";


export default function UsersPopup({openForm, closeForm, setActiveUserId, activeUserId}: {openForm: boolean, closeForm: ()=>void, setActiveUserId: (id:string)=>void, activeUserId: string}) {
    const [users, setUsers] = useState<User[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>("");
    const [lastUsedIdNum, setLastUsedIdNum] = useState<number>(0);

    const handleAddingState = () => {
        setIsAdding(isAdding => !isAdding);
    }

    const handleNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        addUser();

        setNewName('');
        setIsAdding(false);
    }

    const fetchUsers = async () => {
        const res = await fetch(`/api/users`);
        const data = await res.json();

        console.log(data);

        const tempUsers: [string, string][] = Object.entries(data ?? {});
        setUsers(tempUsers.map(user => ({
            ...JSON.parse(user[1]),
            id: user[0]
        })));

        const userIds = Object.keys(data ?? {}).map(id => (id as unknown) as number);
        userIds.length !== 0 ? setLastUsedIdNum(Math.max(...userIds)): setLastUsedIdNum(0);

        return data;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = async () => {
        const userData = { name: newName };

        try {
            await fetch(`/api/users/${lastUsedIdNum+1}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            setLastUsedIdNum(currNum => currNum+1);
            setUsers(currUsers => [...currUsers, {name: newName, id: `${lastUsedIdNum + 1}`}]);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteUser = async (id: string) => {
        try {
            await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            setUsers(currUsers => currUsers.filter(user => (user.id as unknown) as string !== id));
        } catch (err) {
            console.log(err);
        }
    }

    const updateUser = async (id: string, editedName: string) => {
        const userData = { name: editedName }

        try {
            await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            fetchUsers();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        openForm && (
        <div className="flex flex-col self-center justify-self-center px-5 py-3 bg-gray-100 min-w-screen min-h-screen fixed top-0 left-0 gap-3">
            <button className="hover:cursor-pointer self-end" onClick={closeForm}>X</button>
            {users.map(user => (
                <UserBox key={user.id} id={user.id} name={user.name} deleteFunc={deleteUser} updateFunc={updateUser} isActive={user.id === activeUserId} onActivate={() => setActiveUserId(user.id)}/>
            ))}
            

            {!isAdding ? (
                <button className="bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1 self-center" onClick={handleAddingState}>Add User +</button>
            ) : (
                <form className="rounded-md border-gray-900 border px-3 py-5" onSubmit={handleSubmit}>
                    <input className="caret-black outline-none max-w-80" placeholder="Enter name..." autoFocus onBlur={handleAddingState} onChange={handleNameOnChange} value={newName}/>
                </form>
            )}
        </div>)
    )
}