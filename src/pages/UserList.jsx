import React, { useEffect, useState } from "react";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    fetch("https://books-backend-new.onrender.com/api/auth/all-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or error fetching users");
        return res.json();
      })
      .then((data) => {
        const usersWithSelected = data.map((user) => ({
          ...user,
          selected: false,
        }));
        setUsers(usersWithSelected);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch users or unauthorized");
      });
  }, [token]);

  const toggleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setUsers(users.map((user) => ({ ...user, selected: newValue })));
  };

  const toggleSelectUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].selected = !updatedUsers[index].selected;
    setUsers(updatedUsers);
    setSelectAll(updatedUsers.every((u) => u.selected));
  };

  return (
 <div className="ml-[20%] w-[80%]">
  <div className="bg-black min-h-screen py-10">
    <div className="max-w-6xl mx-auto">
      <div className="bg-black rounded-lg shadow-lg p-6 border border-yellow-400">
        <div className="flex items-center border-b border-yellow-400 pb-3 font-semibold text-yellow-400 text-xs uppercase">
          <span className="w-1/12 text-center">#</span>
          <span className="w-1/2">Email</span>
          <span className="w-1/4">Role</span>
          <span className="w-1/4">Created At</span>
        </div>

        {users.length === 0 ? (
          <div className="text-center text-yellow-400 py-6">
            No users found.
          </div>
        ) : (
          users.map((user, idx) => (
            <div
              key={user._id}
              className="flex items-center py-4 border-b border-yellow-400 last:border-b-0 hover:bg-yellow-900/30 transition text-yellow-400"
            >
              <div className="w-1/12 text-center font-medium">
                {idx + 1}
              </div>
              <div className="w-1/2">{user.email}</div>
              <div className="w-1/4 capitalize text-sm">
                {user.role}
              </div>
              <div className="w-1/4 text-sm">
                {user.createdAt
                  ? new Date(user.createdAt).toISOString().split("T")[0]
                  : "N/A"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</div>

  );
}
