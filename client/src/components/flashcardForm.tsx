import { useRef, useEffect } from "react"


export default function FlashcardForm({openForm, closeForm, children}: {openForm: boolean, closeForm: ()=>void, children:any}) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (openForm) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openForm]);

    return (
        openForm && (<dialog
            ref={ref}
            onCancel={closeForm}
            className="flex flex-col self-center justify-self-center px-5 py-3 bg-gray-100 min-w-lg rounded-lg"
        >
            <button className="hover:cursor-pointer self-end" onClick={closeForm}>X</button>
            {children}
        </dialog>)
    )
}