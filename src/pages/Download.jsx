import React, { useState, useEffect } from "react";

function BookList() {
  const [books, setBooks] = useState([]);
  const [downloadStatus, setDownloadStatus] = useState({}); // { [bookId]: 'idle'|'downloading'|'done'|'error' }
  const [progress, setProgress] = useState({}); // { [bookId]: 0-100 }

  useEffect(() => {
    fetch("https://books-backend-new.onrender.com/api/books") // Replace with your backend URL
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  const handleDownload = async (book) => {
    setDownloadStatus((prev) => ({ ...prev, [book._id]: "downloading" }));
    setProgress((prev) => ({ ...prev, [book._id]: 0 }));

    try {
      const response = await fetch(book.bookFile);
      if (!response.ok) throw new Error("Network response was not ok");

      const contentLength = response.headers.get("Content-Length");
      if (!contentLength) {
        // No progress info, just download
        const blob = await response.blob();
        downloadBlob(blob, book.title);
        setDownloadStatus((prev) => ({ ...prev, [book._id]: "done" }));
        return;
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;
      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        setProgress((prev) => ({
          ...prev,
          [book._id]: Math.round((loaded / total) * 100),
        }));
      }

      const blob = new Blob(chunks);
      downloadBlob(blob, book.title);
      setDownloadStatus((prev) => ({ ...prev, [book._id]: "done" }));
    } catch (error) {
      console.error("Download error:", error);
      setDownloadStatus((prev) => ({ ...prev, [book._id]: "error" }));
    }
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="ml-[20%] w-[80%] bg-black min-h-screen py-10 px-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Available Books</h1>
      {books.length === 0 ? (
        <p>Loading books...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-600 text-left">
          <thead>
            <tr className="bg-yellow-300 text-black">
              <th className="border border-gray-600 px-4 py-2">Cover</th>
              <th className="border border-gray-600 px-4 py-2">Title</th>
              <th className="border border-gray-600 px-4 py-2">Category</th>
              <th className="border border-gray-600 px-4 py-2">Download</th>
              <th className="border border-gray-600 px-4 py-2">Status</th>
              <th className="border border-gray-600 px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="bg-yellow-200 text-black">
                <td className="border border-gray-600 px-4 py-2">
                  <img
                    src={book.bookCover}
                    alt={book.title}
                    style={{ width: "80px", height: "auto" }}
                  />
                </td>
                <td className="border border-gray-600 px-4 py-2">{book.title}</td>
                <td className="border border-gray-600 px-4 py-2">{book.category}</td>
                <td className="border border-gray-600 px-4 py-2">
                  <button
                    onClick={() => handleDownload(book)}
                    disabled={downloadStatus[book._id] === "downloading"}
                    className="bg-black text-yellow-300 px-3 py-1 rounded hover:bg-yellow-300 hover:text-black transition disabled:opacity-50"
                  >
                    {downloadStatus[book._id] === "downloading"
                      ? `Downloading...`
                      : "Download"}
                  </button>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {downloadStatus[book._id] === "done" && (
                    <span className="text-green-700 font-semibold">Completed</span>
                  )}
                  {downloadStatus[book._id] === "error" && (
                    <span className="text-red-600 font-semibold">Failed</span>
                  )}
                  {!downloadStatus[book._id] && <span>Idle</span>}
                  {downloadStatus[book._id] === "downloading" && (
                    <span>Downloading</span>
                  )}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {downloadStatus[book._id] === "downloading"
                    ? `${progress[book._id] || 0}%`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;
