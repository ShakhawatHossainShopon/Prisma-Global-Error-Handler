"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Enter The Title Please");
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true before starting the fetch request
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setMessage("Topic Added");
        router.push("/"); // Redirect to the homepage (/)
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (err) {
      console.log(err);
      alert(err.message); // Display the error message
    } finally {
      setIsLoading(false); // Stop loading state once the request is finished
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      {message && (
        <p className="text-sm font-semibold text-green-800">{message}</p>
      )}
      <button
        type="submit"
        className="bg-green-600 rounded-sm font-bold text-white py-3 px-4 w-fit"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>{" "}
            {/* Tailwind spinner */}
          </div>
        ) : (
          "Add Topic"
        )}
      </button>
    </form>
  );
};

export default Page;
