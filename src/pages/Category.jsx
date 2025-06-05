import React, { useState } from "react";
import BooksByCategory from "./BooksByCategory";

export default function Category() {
  const categories = [
    "Fantasy",
    "Historical Fiction",
    "Mystery & Thriller",
    "Horror",
    "Adventure",
    "Biography & Memoir",
    "True Crime",
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return (
      <div>
        <button
          onClick={() => setSelectedCategory(null)}
          className="m-4 px-4 py-2 bg-yellow-400 rounded"
        >
          Back to Categories
        </button>
        <BooksByCategory category={selectedCategory} />
      </div>
    );
  }

  return (
    <div className="ml-[20%] w-[80%] bg-black min-h-screen py-10 px-6">
      <div className="flex justify-center items-center font-['Roboto']">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1170px] w-full px-4">
          {categories.map((title, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(title)}
              className="relative flex flex-col justify-between h-[130px] bg-yellow-400 border border-yellow-300 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-transparent text-black no-underline group"
            >
              <span className="font-bold text-[23px] leading-[28px] pl-5 pt-5 group-hover:text-blue-800">
                {title}
              </span>
              <span className="text-sm text-gray-800 pl-5 pb-4 flex items-center gap-1">
                Click Here!!
                <span className="transition-all duration-500 group-hover:ml-2 ml-[3px]">
                  <svg
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.228824 7.88793C-0.0650262 8.13366 -0.0762933 8.54196 0.203658 8.79989C0.48361 9.05782 0.948767 9.06771 1.24262 8.82198C1.24262 8.82198 5.77719 4.97116 5.78955 4.95998C6.07934 4.69388 6.06851 4.27195 5.76535 4.01758L1.24266 0.178763C0.949277 -0.067399 0.484101 -0.0581918 0.203658 0.199327C-0.0767845 0.456847 -0.0662956 0.865161 0.227086 1.11132L3.71295 4.12125C3.94389 4.32066 3.94393 4.67861 3.71304 4.87807L0.228824 7.88793Z"
                      fill="#000"
                    />
                  </svg>
                </span>
              </span>
              <img
                src={`https://web2dev.ru/other/codepen/${(index % 2) + 1}.png`}
                alt=""
                className="absolute right-[37px] top-[22px] -z-10"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
