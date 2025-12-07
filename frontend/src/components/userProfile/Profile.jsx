import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .finally(() => setLoading(false));
  }, []);

  // DELETE ACCOUNT
  const deleteAccount = async () => {
    const token = localStorage.getItem("userToken");

    try {
      await axios.delete("http://localhost:5000/api/user/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("userToken");
      navigate("/login");
    } catch (err) {
      alert("Failed to delete account.", err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading Profile...
      </div>
    );

  // Fallback Initial Letter
  const initial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  const hasProfilePic = Boolean(user?.profilePicture);

  return (
    <div className="font-display bg-[#f8f7f6] min-h-screen text-[#181411] px-4 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* =========================================
              SIDEBAR
          ========================================== */}
          <aside className="w-full md:w-64 lg:w-72">
            <div className="sticky top-10 flex h-full min-h-[650px] flex-col justify-between rounded-xl bg-white p-4 shadow-sm">
              {/* USER MINI HEADER */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {/* PROFILE PICTURE OR INITIAL */}
                  {hasProfilePic ? (
                    <div
                      className="bg-center bg-cover bg-no-repeat rounded-full size-12 border"
                      style={{
                        backgroundImage: `url("${user.profilePicture}")`,
                      }}
                    ></div>
                  ) : (
                    <div className="size-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
                      {initial}
                    </div>
                  )}

                  <div>
                    <h1 className="text-base font-bold">
                      {user?.name || "User"}
                    </h1>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* MENU */}
                <div className="mt-4 flex flex-col gap-2">
                  <button className="flex items-center gap-3 rounded-lg bg-orange-200/40 text-orange-600 font-bold px-3 py-2">
                    My Profile
                  </button>

                  <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-orange-200/30">
                    Order History
                  </button>

                  <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-orange-200/30">
                    Setting
                  </button>
                  <Link to={"/admin-login"}>
                    <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-orange-200/30">
                      Admin Login
                    </button>
                  </Link>
                </div>
              </div>

              {/* LOGOUT AND DELETE ACCOUNT*/}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full bg-[#FFEFDC] text-[#FF6900] py-2 rounded-lg font-medium hover:bg-[#fbe3c5]"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="w-full bg-red-600 text-white py-2 px-2 rounded-lg font-medium hover:bg-red-700"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </aside>

          {/* =========================================
              MAIN CONTENT
          ========================================== */}
          <section className="flex-1 flex flex-col gap-8">
            {/* PROFILE MAIN CARD */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              {/* LARGE PROFILE IMAGE OR INITIAL */}
              <div className="flex items-center gap-6 mb-6">
                {hasProfilePic ? (
                  <img
                    src={user.profilePicture}
                    className="w-28 h-28 rounded-full object-cover border"
                    alt="profile"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-orange-500 text-white flex items-center justify-center text-4xl font-bold">
                    {initial}
                  </div>
                )}

                <div>
                  <h1 className="text-xl font-semibold">{user?.name}</h1>
                  <p className="text-gray-500">@{user?.username}</p>
                </div>
              </div>

              {/* PERSONAL INFO */}
              <h2 className="text-2xl font-bold mb-1">My Profile</h2>
              <p className="text-gray-500 mb-6">
                Your personal information is shown below.
              </p>

              {/* ⭐ Replaced Input Fields with Read-Only Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Full Name</p>
                  <p className="text-base font-semibold mt-1">{user?.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-base font-semibold mt-1">{user?.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Phone Number
                  </p>
                  <p className="text-base font-semibold mt-1">
                    {user?.phone || "Not Added"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Delivery Address
                  </p>
                  <p className="text-base font-semibold mt-1">
                    {user?.address
                      ? `${user.address.street || ""}, ${
                          user.address.city || ""
                        }, ${user.address.state || ""}, ${
                          user.address.pincode || ""
                        }`
                      : "Not Added"}
                  </p>
                </div>
              </div>

              {/* EDIT PROFILE BUTTON */}
              <div className="flex justify-end mt-6">
                <Link to="/update-profile">
                  <button
                    className="px-6 py-2 rounded-lg text-white font-semibold bg-[#dfa26d] hover:bg-[#c98f5f] transition"
                    type="button"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>{" "}
            {/* ✅ FIXED — this closing div was missing */}
            {/* ORDER HISTORY */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Order History</h2>
              <p className="text-gray-500 mb-6">
                Review your past purchases with us.
              </p>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-bold">Order #RB12{item}34</p>
                      <p className="text-xs text-gray-500">October 25, 2023</p>
                    </div>
                    <span className="font-semibold">$75.50</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Delivered
                    </span>
                    <button className="text-orange-600 font-bold text-sm">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LOGOUT POPUP ANIMATION */}
          {showLogoutModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm px-4 z-50 transition-all duration-300">
              <div className="bg-white p-6 rounded-xl shadow-xl w-80 animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2 text-[#181411]">
                  Logout
                </h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await axios.post(
                          "http://localhost:5000/api/auth/logout"
                        );

                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userInfo");
                        window.dispatchEvent(new Event("storage"));

                        window.location.href = "/home";
                      } catch (error) {
                        console.error("Logout Error:", error);
                      }
                    }}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE ACCOUNT POPUP ANIMATION */}
          {showDeletePopup && (
            <div className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm px-4 z-50 transition-all duration-300">
              <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-xl font-semibold mb-2 text-[#181411]">
                  Delete Account?
                </h2>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to permanently delete your account? This
                  action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeletePopup(false)}
                    className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deleteAccount}
                    className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
