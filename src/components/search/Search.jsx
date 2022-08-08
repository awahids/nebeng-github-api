import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../user-list/UserList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./search.css";

export default function Search() {
  const [resData, setResData] = useState([]);
  const [search, setSearch] = useState("");

  const tokenGithub = "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";
  const notifyError = (message) =>
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "info",
  });

  useEffect(() => {
    if (search == "") {
      setResData([]);
      return;
    } else {
      axios
        .get(`https://api.github.com/search/users?q=${search}&per_page=5`, {
          headers: {
            Authorization: `token ${tokenGithub}`,
          },
        })
        .then((response) => {
          setResData(response.data.items);
        })
        .catch((error) => {
          notifyError("reached search limit, wait 1 minute ");
        });
    }
  }, [search]);

  return (
    <div style={{ width: "100%" }}>
      <ToastContainer limit={1} />
      <form className="py-2 form-setup">
        <div className="relative" style={{ width: "100" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-300 input-setup"
          />
        </div>
      </form>
      <UserList list={resData} />
    </div>
  );
}
