import React from "react";
import "./userList.css";

export default function UserList(props) {
    const { list = [] } = props;
    return (
        <div className="user-list">
            {list.map((item, index) => (
                <div className="user-list-container" key={index}>
                    <p>{item.login}</p>
                    <div className="ava-github-container">
                        <img className="ava-github" src={item.avatar_url} alt="" />
                    </div>
                </div>
            ))}
        </div>
    );
}