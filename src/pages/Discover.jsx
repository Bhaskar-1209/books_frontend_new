import React, { useEffect, useState } from "react";

import heartFilled from "../assets/heart-filled.png";
import heartOutline from "../assets/heart.png";
import downloadIcon from "../assets/download.png";

const userId = "64abc123def4567890abcdef"; // demo logged in user ID

export default function BookGrid() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch(`https://books-backend-new.onrender.com/api/books?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const toggleLike = async (bookId, liked) => {
    const url = `https://books-backend-new.onrender.com/api/books/${bookId}/${liked ? "unlike" : "like"}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to update like");
      await res.json();
      fetchBooks();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRead = (bookFile) => {
    if (bookFile) {
      window.open(bookFile, "_blank", "noopener,noreferrer");
    } else {
      alert("Book file not available");
    }
  };

  const handleDownload = async (url, title, bookId) => {
    if (!url) return alert("Download not available");

    try {
      // Fetch file as blob to force download
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch file for download");

      const blob = await response.blob();

      // Create blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = title || "book";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

      // Notify backend about download
      const res = await fetch(`https://books-backend-new.onrender.com/api/books/${bookId}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to update download status");

      fetchBooks(); // refresh list to update download count or other info
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="ml-[20%] w-[80%] bg-black min-h-screen py-10 px-6">
      <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {books.map((book) => (
          <div
            key={book._id}
            className="rounded-lg shadow-lg p-4 bg-yellow-300 text-black"
          >
            <img
              src={book.bookCover || "/fallback-cover.jpg"}
              alt={book.title || "Book Cover"}
              className="w-[100%] h-56 object-cover rounded-lg transition-transform duration-1000 hover:scale-105 shadow-md cursor-pointer"
              onClick={() => handleRead(book.bookFile)}
            />
            <div className="mt-2 px-2">
              <h3 className="text-lg font-semibold uppercase">{book.title}</h3>
              <p className="text-gray-800 mb-2">Category: {book.category}</p>

              {/* <p className="text-gray-700 text-sm mb-2">
                Downloads: {book.downloadCount || 0}
              </p> */}

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(book._id, book.likedByUser)}
                  className="flex items-center space-x-1 px-3 py-1 rounded transition"
                  aria-label={book.likedByUser ? "Unlike" : "Like"}
                >
                  <img
                    src={book.likedByUser ? heartFilled : heartOutline}
                    alt="Like Icon"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  onClick={() => handleDownload(book.bookFile, book.title, book._id)}
                  className="px-3 py-1 rounded transition flex items-center space-x-1 hover:underline"
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
