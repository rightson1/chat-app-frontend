import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Chats from "../components/Chats";
import io from "socket.io-client";
import Messages from "../components/Messages";
import Rada from "../components/Rada";
import avatar from "../img/avatar.png";
const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [newUsers, setNewUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState();
  const [chat, setChat] = useState();
  const [message, setMessage] = useState(null);
  const socket = useRef();
  const [arrival, setArrival] = useState();

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("new", user._id);
    }
  }, []);
  useEffect(() => {
    socket.current?.on("users", (data) => {
      setNewUsers(data);
    });
  }, []);
  useEffect(() => {
    socket.current?.on("msgs", (data) => {
      setArrival(data);
    });
  }, []);
  useEffect(() => {
    setMessage(arrival);
  }, [arrival]);
  useEffect(() => {
    let users = [];
    if (newUsers) {
      users = newUsers.filter((item) => item._id !== user._id);
    }
    setOnlineUsers(users);
  }, [newUsers]);
  return (
    <ChatStyled>
      <div className="smaller">
        {chat ? (
          <Messages
            chat={chat}
            setChat={setChat}
            socket={socket}
            message={message}
          />
        ) : (
          <Chats users={onlineUsers} setChat={setChat} chat={chat} />
        )}
      </div>
      <div className="wider">
        <div className="w-contacts">
          <Rada users={onlineUsers} setChat={setChat} />
        </div>
        <div className="messages">
          {chat ? (
            <Messages
              chat={chat}
              setChat={setChat}
              socket={socket}
              message={message}
            />
          ) : (
            <div className="pick">
              <div className="image">
                <img src={avatar} alt="" />
              </div>
              <div className="message">
                <p>Please Pick A Conversation if you wanna chat</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ChatStyled>
  );
};

const ChatStyled = styled.div`
  background-color: #131324;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .smaller {
    height: 100vh;
    background-color: #00000076;
    width: 100vw;
    overflow: hidden;
  }
  .wider {
    height: 100vh;
    background-color: #00000076;
    width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
  }
  .pick {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .message {
      p {
        font-size: 1.5rem;
        color: fuchsia;
      }
    }
  }
  @media (max-width: 700px) {
    .wider {
      display: none;
    }
  }
  @media (min-width: 700px) {
    .smaller {
      display: none;
    }
  }
`;
export default Chat;
