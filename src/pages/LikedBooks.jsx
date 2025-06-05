import React, { useEffect, useState } from "react";

import heartFilled from "../assets/heart-filled.png";
import downloadIcon from "../assets/download.png";

const userId = "64abc123def4567890abcdef"; // replace with your logged-in user ID

export default function LikedBooks() {
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLikedBooks = () => {
    fetch(`https://books-backend-new.onrender.com/api/books?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((book) => book.likedByUser);
        setLikedBooks(filtered);
      })
      .catch((err) => console.error("Failed to fetch liked books", err));
  };

  useEffect(() => {
    fetchLikedBooks();
  }, []);

  const handleRead = (bookFile) => {
    if (bookFile) window.open(bookFile, "_blank", "noopener,noreferrer");
    else alert("Book file not available");
  };

  const handleDownload = (url, title) => {
    if (!url) return alert("Download not available");
    const link = document.createElement("a");
    link.href = url;
    link.download = title || "book";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUnlike = async (bookId) => {
    setLoading(true);
    try {
      const res = await fetch(`https://books-backend-new.onrender.com/api/books/${bookId}/unlike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to unlike book");
      // Optimistically remove the book from likedBooks
      setLikedBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (likedBooks.length === 0) {
    return (
      <div className="ml-[20%] w-[80%] bg-black min-h-screen py-10 px-6 text-white">
        <h2 className="text-2xl font-bold mb-6">Your Liked Books</h2>
        <p>You have not liked any books yet.</p>
      </div>
    );
  }

  return (
<div className="ml-[20%] w-[80%] bg-black min-h-screen py-10 px-6">
  <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    {likedBooks.map((book) => (
      <div
        key={book._id}
        className="rounded-lg shadow-lg max-w-full p-4 bg-yellow-300"
      >
        <img
          src={book.bookCover || "/fallback-cover.jpg"}
          alt={book.title || "Book Cover"}
          className="w-[100%] h-56 object-cover rounded-lg transition-transform duration-1000 hover:scale-105 shadow-md cursor-pointer"
          onClick={() => handleRead(book.bookFile)}
        />
        <div className="mt-2 px-2 text-black">
          <h3 className="text-lg font-semibold uppercase">{book.title}</h3>
          <p className="text-gray-800 mb-2">Category: {book.category}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleUnlike(book._id)}
              disabled={loading}
              className="flex items-center space-x-1 px-3 py-1 rounded transition"
              aria-label="Unlike"
              title="Remove from liked books"
            >
              <img
                src={heartFilled}
                alt="Unlike Icon"
                className={`w-5 h-5 ${loading ? "opacity-50" : ""}`}
              />
            </button>

            <button
              onClick={() => handleDownload(book.bookFile, book.title)}
              className="px-3 py-1 rounded transition flex items-center space-x-1 text-black hover:underline"
            >
              {/* <img src={downloadIcon} alt="Download" className="w-5 h-5" /> */}
            </button>
          </div>
        </div>
      </div>
    ))}
  </main>
</div>

  );
}
