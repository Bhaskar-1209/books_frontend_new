import React from 'react'

export default function Header() {
  return (
 <div>
  <div className="flex ml-[20%] w-[80%]">
    <div className="flex justify-between py-3 px-6 bg-black border-b border-gray-800 w-full">
      <form action="" className="w-full max-w-md">
        <div className="relative flex items-center text-gray-400 focus-within:text-white">
          <svg
            className="w-5 h-5 absolute ml-3 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="search"
            placeholder="Search talk"
            autoComplete="off"
            aria-label="Search talk"
            className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-400 text-white bg-gray-900 rounded-2xl border-none ring-2 ring-gray-700 focus:ring-gray-500 focus:ring-2"
          />
        </div>
      </form>

      <div className="relative flex-shrink-0 ml-6">
        <div className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          <img
            className="inline w-10 h-10 rounded-full"
            src="https://picsum.photos/150"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
