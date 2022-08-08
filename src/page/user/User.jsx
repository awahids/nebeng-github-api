import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import TableRepo from "../../components/table/table";
import axios from "axios";

export default function UserDetail() {
  const location = useLocation();
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tokenGithub = "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";
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${location.state.repoApi}`, {
        headers: {
          Authorization: `token ${tokenGithub}`,
        },
      })
      .then((response) => {
        setRepoData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <NavBar />
      {loading ? <p>loading</p> : <TableRepo listRepo={repoData} />}
    </div>
  );
}