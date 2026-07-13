import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar.tsx'
import FlashcardCarousel from './components/flashcardCarousel.tsx'
import type { FlashcardInfo } from './types.ts'
import FlashcardForm from './components/flashcardForm.tsx'

let runningId = 0

function App() {
  const [flashcardInfos, setFlashcardInfos] = useState<FlashcardInfo[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setFlashcardInfos(currFlashcardInfos => [...currFlashcardInfos, {id: runningId++, question: newQuestion, answer: newAnswer}]);
    setNewQuestion('');
    setNewAnswer('');
    setIsAdding(false);
  }

  const handleQuestionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.target.value);
  }

  const handleAnswerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(e.target.value);
  }

  const handleAdding = () => {
    setIsAdding(currIsAdding => !currIsAdding);
  }

  const handleGenerateRandom = async () => {
    const res = await fetch(`/api/questions`);
    const data = await res.json();
    const randomFlashcards = await data.map((elm:any) => ({id: runningId++, question: elm.question.text, answer: elm.correctAnswer}));
    setFlashcardInfos(currFlashcardInfos => [...currFlashcardInfos, ...randomFlashcards]);
  }

  // would have to move flashcard set list logic here to avoid messy logic
  return (
    <>
      <div className="flex flex-row">
        <Sidebar/>
        <div className="mx-auto self-center flex-col text-center">
          {flashcardInfos.length > 0 ? (
            <FlashcardCarousel flashcards={flashcardInfos}/>
          ) : (
            <h1 className="text-5xl">No flashcards yet!</h1>
          )}
          <button className="mt-4 mr-4 bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1 self-center" onClick={handleAdding}>Add Flashcard +</button>
          <button className="bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1 self-center" onClick={handleGenerateRandom}>Generate Random +</button>
        </div>
      </div>

      <FlashcardForm openForm={isAdding} closeForm={() => setIsAdding(false)}>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="font-medium">Question</label>
          <input className="font-light outline-none mb-3" placeholder="2+2..." value={newQuestion} onChange={handleQuestionOnChange}></input>
          
          <label className="font-medium">Answer</label>
          <input className="font-light outline-none mb-3" placeholder="4!" value={newAnswer} onChange={handleAnswerOnChange}></input>

          <button className="bg-purple-800 text-white hover:cursor-pointer rounded-md max-w-48 px-3 py-1 self-center">Add Flashcard!</button>
        </form>
      </FlashcardForm>
    </>
  )
}

export default App
