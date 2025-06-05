import React, { useEffect, useState } from "react";

export default function BooksByCategory({ category }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  async function fetchBooks() {
    try {
      const res = await fetch(`https://books-backend-new.onrender.com/api/books/category/${encodeURIComponent(category)}`);
      console.log("Fetch status:", res.status);
      if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
      const data = await res.json();
      console.log("Books data received:", data);
      setBooks(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  fetchBooks();
}, [category]);


  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;
  if (books.length === 0) return <p>No books found in category: {category}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Books in category: {category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="border rounded p-4 bg-white shadow">
            <img
              src={book.bookCover}
              alt={book.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold text-lg">{book.title}</h3>
            <a
              href={book.bookFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              Read / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
