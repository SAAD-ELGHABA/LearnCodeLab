import { Pencil, UserRoundPen } from "lucide-react";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../lib/themes.js";
import MyCollections from "../../Components/MyCollections.jsx";
function Profile() {
  const user = useSelector((state) => state.userReducer.user);
  const choosedTheme = useSelector((state) => state.themeReducer);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    group: user?.groupstagiaire?.name || "",
    role: user?.role || "",
    created_at: user?.created_at || "",
    updated_at: user?.updated_at || "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Submit logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div
      className="py-10"
      style={{
        color: themes.find((theme) => theme.name === choosedTheme)?.textColor,
      }}
    >
      <div className="lg:flex rounded-lg overflow-hidden">
        <div className="w-full p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center space-x-2 ">
              <span>My Profile</span>
              <UserRoundPen className="h-6 w-6 " />
            </h1>
          </div>
          <div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="lg:w-1/3 flex justify-center">
              <span className="inline-block relative">
                <img
                  src={
                    selectedImage ||
                    "http://127.0.0.1:8000/" + user?.image ||
                    "/profile-icon.png"
                  }
                  alt="image profile"
                  className="rounded-full w-56 h-56 object-cover "
                  style={{
                    border: `1px solid ${
                      themes.find((theme) => theme.name === choosedTheme)
                        ?.colors[2]
                    }`,
                  }}
                />
                <button
                  type="button"
                  className="opacity-75 hover:opacity-100 cursor-pointer rounded-full p-3 absolute top-5 right-2 shadow"
                  style={{
                    backgroundColor: themes.find(
                      (theme) => theme.name === choosedTheme
                    )?.colors[1],
                    color: themes.find((theme) => theme.name === choosedTheme)
                      ?.textColor,
                    border: `1px solid ${
                      themes.find((theme) => theme.name === choosedTheme)
                        ?.colors[2]
                    }`,
                  }}
                  onClick={handleImageClick}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </span>
            </div>
            <div className="w-full lg:w-2/3 mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium ">
                      First Name
                    </label>
                    <input
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      className="rounded-lg  focus:ring-1  focus:outline-none px-4 py-2"
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            ?.colors[2]
                        }`,
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.textColor,
                      }}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium ">
                      Last Name
                    </label>
                    <input
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      className="border rounded-lg border-gray-300 focus:ring-1  focus:outline-none px-4 py-2"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            ?.colors[2]
                        }`,
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.textColor,
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium ">Email</label>
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      className="border rounded-lg border-gray-300 focus:ring-1  focus:outline-none px-4 py-2"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            ?.colors[2]
                        }`,
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.textColor,
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium ">Group</label>
                    <input
                      placeholder="Group"
                      type="text"
                      name="group"
                      className="border rounded-lg border-gray-300 focus:ring-1  focus:outline-none px-4 py-2"
                      value={formData?.group}
                      onChange={handleChange}
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            ?.colors[2]
                        }`,
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.textColor,
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium ">
                      Created At
                    </label>
                    <input
                      placeholder="Created At"
                      type="text"
                      name="created_at"
                      className="border rounded-lg border-gray-300 focus:ring-1  focus:outline-none px-4 py-2"
                      value={new Date(formData.created_at).toDateString()}
                      disabled
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            ?.colors[2]
                        }`,
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.textColor,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`w-1/2 mt-4 py-1 rounded-lg text-white text-sm font-medium ${
                        isLoading
                          ? "bg-blue-400"
                          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      }`}
                    >
                      {isLoading ? "..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          borderColor: themes.find((theme) => theme.name === choosedTheme)
            ?.colors[2],
        }}
      />
      <div>

        <MyCollections />
      </div>
    </div>
  );
}

export default Profile;
