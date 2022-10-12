import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { FaPowerOff } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "./data";
const Chats = ({ users, setChat }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [online, setOnline] = useState([]);
  const fetchUsers = async () => {
    if (!users) return;
    axios
      .post("/auth/users", { users })
      .then((res) => {
        setOnline(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchUsers();
  }, [users]);

  const handleClick = () => {
    toast.success(
      "Was i not good enough😥😥, good by though😂😂",
      toastOptions
    );
    setTimeout(() => {
      localStorage.removeItem("user");
      window.location.reload();
    }, 2000);
  };

  return (
    <Chat>
      <div className="search">
        <input type="text" placeholder="search for a user" />
        <div className="go">
          <BsSearch />
        </div>
      </div>
      <div className="users">
        {online.length ? (
          online.map((user, index) => {
            return (
              <div
                className="contact"
                onClick={() => setChat(user)}
                key={index}
              >
                <div className="image">
                  <img src={user.avatar} alt="" />
                </div>
                <div className="name">
                  <span>{user.name}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading">
            <div class="center">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
            <span>Looking for users online, please wait</span>
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="image">
          <img src={user.avatar} alt="" />
        </div>
        <div className="name">{user.name}</div>
        <button onClick={handleClick}>
          <FaPowerOff />
        </button>
      </div>
      <ToastContainer />
    </Chat>
  );
};
const Chat = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  /* overflow: hidden; */

  position: relative;
  .users {
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .contact {
      height: 4rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 2rem;
      border-top: 1px solid #4e0eff;
      border-bottom: 1px solid #4e0eff;
      background: #997af0;
      cursor: pointer;
      img {
        height: 100%;
        width: 70px;
        gap: 4rem;
      }
      .name {
        font-size: 2rem;
        color: fuchsia;
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 1rem;
    height: 5rem;
    display: flex;
    background-color: #0d0d30;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    overflow: hidden;
    .image {
      height: 100%;
      img {
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      font-size: 1.3rem;
      color: white;
      opacity: 0.8;
    }
    button {
      background: #997af0;
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 0.4rem;
      text-transform: uppercase;
      font-weight: bold;
      margin-right: 0.5rem;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      svg {
        font-size: 1.3rem;
        color: #ebe7ff;
      }
      &:hover {
        background: #4e0eff;
      }
    }
  }
  .search {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0.2rem;

    input {
      width: 100%;
      flex: 7;
      padding: 0.5rem;
      height: 3rem;
      border-radius: 0.3rem;
      border: none;
      background-color: rgba(255, 255, 255, 0.6);
      color: white;
      background-color: #0d0d30;
      &:focus {
        outline: none;
        border: 1px solid fuchsia;
      }
    }
    .go {
      flex: 3;
      background-color: rgba(255, 255, 255, 0.6);
      width: 100%;
      border-radius: 0.3rem;
      cursor: pointer;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0d0d30;
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
  @media (max-width: 850px) {
    .bottom {
      .name {
        font-size: 1.2rem;
      }
    }
  }
  @media (min-width: 700px) {
    .users {
      height: 80%;
      width: 100%;
      .contact {
        height: 200px;
        width: 300px;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        img {
          height: 100%;
          width: 70px;
          gap: 4rem;
        }
        .name {
          font-size: 2rem;
          color: fuchsia;
        }
      }
    }
  }
  .loading {
    padding-top: 3rem;
    text-align: center;
    span {
      padding-top: 2rem;
      color: fuchsia;
    }
  }
  .center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wave {
    width: 5px;
    height: 100px;
    background: linear-gradient(45deg, cyan, #fff);
    margin: 10px;
    animation: wave 1s linear infinite;
    border-radius: 20px;
  }
  .wave:nth-child(2) {
    animation-delay: 0.1s;
  }
  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(4) {
    animation-delay: 0.3s;
  }
  .wave:nth-child(5) {
    animation-delay: 0.4s;
  }
  .wave:nth-child(6) {
    animation-delay: 0.5s;
  }
  .wave:nth-child(7) {
    animation-delay: 0.6s;
  }
  .wave:nth-child(8) {
    animation-delay: 0.7s;
  }
  .wave:nth-child(9) {
    animation-delay: 0.8s;
  }
  .wave:nth-child(10) {
    animation-delay: 0.9s;
  }

  @keyframes wave {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

export default Chats;
