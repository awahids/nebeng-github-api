import React, {useState, useEffect} from "react";
import axios from "axios";
import UserList from "../user-list/UserList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Search() {
  const [resData, setResData] = useState([]);
  const [search, setSearch] = useState("");
  const [ warning, setWarning ] = useState(false);
  const tokenGithub = "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"
  // const handleChange = (e) => {
  //   console.log(e);
  //   axios
  //     .get(`https://api.github.com/search/users?q=${e}&per_page=5`)
  //     .then((Response) => {
  //       setResData(Response.data.items);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };
  useEffect(() => {
    if (search == "") {
      setResData([]);
      return ;
    } else {
      axios
        .get(`https://api.github.com/search/users?q=${search}&per_page=5`, {
          headers: {
            Authorization: `token ${tokenGithub}`,
          }
        })
        .then((response) => {
          setResData(response.data.items);
        })
        .catch((error) => {
          setWarning(true);
        });
    }
  } , [search]);

  console.log(resData);
  return (
    <div>
      {
        warning
        &&
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        >
          limmit search
        </ToastContainer>
      }
      <form className="max-w-sm py-2">
        <div className="relative">
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
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-300"
          />
        </div>
      </form>
      <UserList list={resData} />
    </div>
  )
}