import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://books-backend-new.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to load user");
      }
    };

    fetchUser();
  }, []);

const handleUpload = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("profileImage", e.target.profileImage.files[0]);

  setUploading(true);
  try {
    await axios.put("https://books-backend-new.onrender.com/api/auth/upload-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  } catch (err) {
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};


  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!user) return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className="ml-[20%] w-[80%] bg-black min-h-screen">
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl p-8 flex flex-col md:flex-row items-center gap-8 text-white">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={
              user.profileImage
                ? `https://books-backend-new.onrender.com/uploads/profiles/${user.profileImage}`
                : "https://placehold.co/150x150?text=Profile"
            }
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* User Info */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2 border-gray-700">User Profile</h2>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Role:</strong> {user.role}</p>
          <p className="mb-4"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center gap-4">
            <input type="file" name="profileImage" accept="image/*" required className="text-white" />
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
