import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import styled from "styled-components";
import Input from "./Input";
const Messages = ({ chat, setChat, socket, message }) => {
  const [online, setOnline] = useState(true);
  const [msgs, setMsgs] = useState([]);
  const [arrival, setArrival] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!message) return;
    setMsgs((prev) => [...prev, message]);
  }, [message]);
  const handleMsg = (message) => {
    let msg = { message, _id: chat._id };
    setMsgs((prev) => [...prev, msg]);

    const data = { message, _id: chat._id };
    socket.current?.emit("msg", data);
  };

  useEffect(() => {
    socket.current?.on("users", (data) => {
      const online = data.some(({ _id }) => _id === chat._id);
      setOnline(online);
    });
  }, []);

  return (
    <Container>
      <div className="top">
        <button onClick={() => setChat(undefined)}>
          <BsArrow90DegLeft />
        </button>
        <div className="img">
          <img src={chat.avatar} alt="" />
        </div>
        <div className="side">
          <p className="name">{chat.name}</p>
          <p className="online">{online ? "online" : "offline"}</p>
        </div>
      </div>
      <div>
        <div className="messages">
          {msgs &&
            msgs.map((message, index) => {
              return (
                <div
                  key={index}
                  className={
                    message && user._id === message._id
                      ? "content right"
                      : "content left"
                  }
                >
                  <p>{message.message}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="bottom">
        <Input handleMsg={handleMsg} />
      </div>
    </Container>
  );
};
const Container = styled.div`
  .top {
    padding: 1rem;
    height: 4rem;
    justify-content: space-between;
    background-color: #0d0d30;

    display: flex;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      margin-right: 4rem;

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  .img {
    height: 100%;
    margin-right: 2rem;
    img {
      height: 150%;
    }
  }
  .side {
    p {
      padding: 0;
      margin: 0;
    }
    .name {
      font-size: 1.2rem;
      color: fuchsia;
    }
    .online {
      color: white;
      opacity: 0.8;
    }
  }
  .messages {
    height: calc(100vh - 8rem);
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    .content {
      min-height: 2rem;
      min-width: 2rem;
      max-width: 80%;

      background-color: #fff;
      padding: 0 1rem;
    }
    .content.left {
      align-self: flex-end;
      border-radius: 10px 0px 10px 10px;
      background-color: #4f04ff21;
      color: white;
      background-color: #0d0d30;
      position: relative;
      &:before {
        position: absolute;
        content: "";
        top: 0px;
        right: -10px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 10px solid transparent;

        border-left: 10px solid #0d0d30;
      }
    }
    .content.right {
      align-self: flex-start;
      border-radius: 0px 10px 10px 10px;
      background-color: #9900ff20;
      color: white;
      position: relative;
      &:before {
        position: absolute;
        content: "";
        top: 0px;
        left: -10px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 10px solid transparent;

        border-right: 10px solid #9900ff20;
      }
    }
  }
  .bottom {
    position: relative;
    width: 100%;
    bottom: 0rem;
  }
  @media (min-width: 700px) {
    margin-left: 1rem;
    margin-right: 1rem;
    .top {
      background-color: transparent;
    }
  }
  @media (max-width: 400px) and (max-height: 650px) {
    .side {
      .name {
        font-size: 1rem;
      }
      .online {
        font-size: 0.8rem;
      }
    }
  }
`;
export default Messages;
