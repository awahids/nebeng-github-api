import React from "react";
import "./userList.css";
import { Link } from "react-router-dom";

export default function UserList(props) {
  const { list = [] } = props;
  return (
    <div className="user-list">
      {list.map((item, index) => (
        <Link
          to={`user-detail/${item.login}`}
          key={index}
          state={{ user: `${item.login}`, repoApi: item.repos_url }}
          className="user-list-container"
        >
          <p>{item.login}</p>
          <div className="ava-github-container">
            <img className="ava-github" src={item.avatar_url} alt="" />
          </div>
        </Link>
      ))}
    </div>
  );
}