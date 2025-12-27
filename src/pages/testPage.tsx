import { useState } from "react";




export default function TestPage() {
    
    const[count,setcount]=useState(0);

    return (
        <div className="bg-amber-50 flex flex-row justify-center items-center flex-col h-screen">
            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
            onClick={() => setcount(count - 1)}
            >
                increment
            </button >
            <h1 className=" text-3xl font-bold mb-4 p-4">
                The count is {count}
            </h1>
            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
            onClick={() => setcount (count + 1)}>
                decrement
            </button>
        </div>
    )
        
        

}