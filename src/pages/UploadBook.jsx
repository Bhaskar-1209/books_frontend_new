import React, { useState } from "react";
import axios from "axios";

export default function UploadBooks() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [bookCover, setBookCover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookFile || !bookCover) {
      setMessage("Please upload both the book file and cover image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("bookFile", bookFile);
    formData.append("bookCover", bookCover);

    try {
      await axios.post("https://books-backend-new.onrender.com/api/books/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Book uploaded successfully!");
      setTitle("");
      setCategory("");
      setBookFile(null);
      setBookCover(null);
      e.target.reset();
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Upload failed");
    }
  };

  return (
 <div className="ml-[20%] w-[80%] bg-black min-h-screen">
  <div className="p-8 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Upload Book</h2>

    {message && (
      <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>
    )}

    <form
      onSubmit={handleSubmit}
      className="bg-black border border-yellow-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      encType="multipart/form-data"
    >
      <div className="mb-4">
        <label className="block text-yellow-400 text-sm font-bold mb-2">
          Book Title
        </label>
        <input
          className="bg-black border border-yellow-400 text-yellow-400 placeholder-yellow-300 rounded w-full py-2 px-3"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-yellow-400 text-sm font-bold mb-2">
          Category
        </label>
        <select
          className="bg-black border border-yellow-400 text-yellow-400 rounded w-full py-2 px-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled className="bg-black text-yellow-400">-- Select Category --</option>
          <option value="fantasy" className="bg-black text-yellow-400">Fantasy</option>
          <option value="historical" className="bg-black text-yellow-400">Historical Fiction</option>
          <option value="horror" className="bg-black text-yellow-400">Horror</option>
          <option value="mystery" className="bg-black text-yellow-400">Mystery & Thriller</option>
          <option value="adventure" className="bg-black text-yellow-400">Adventure</option>
          <option value="biography" className="bg-black text-yellow-400">Biography & Memoir</option>
          <option value="politics" className="bg-black text-yellow-400">Politics & Current Affairs</option>
          <option value="religion" className="bg-black text-yellow-400">Religion & Spirituality</option>
          <option value="true_crime" className="bg-black text-yellow-400">True Crime</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-yellow-400 text-sm font-bold mb-2">
          Upload Book (.pdf)
        </label>
        <input
          className="text-yellow-400"
          type="file"
          accept=".pdf"
          onChange={(e) => setBookFile(e.target.files[0])}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-yellow-400 text-sm font-bold mb-2">
          Upload Cover (.jpeg/.jpg)
        </label>
        <input
          className="text-yellow-400"
          type="file"
          accept=".jpeg,.jpg"
          onChange={(e) => setBookCover(e.target.files[0])}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
      >
        Upload Book
      </button>
    </form>
  </div>
</div>

  );
}
