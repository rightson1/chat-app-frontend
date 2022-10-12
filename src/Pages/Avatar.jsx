import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toastOptions } from "../components/data";
import { useNavigate } from "react-router-dom";
const Avatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [reload, setReload] = useState(false);
  const [urlNum, setUrlNum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();
  const api = "https://avatars.dicebear.com/api/adventurer/";
  useEffect(() => {
    const data = [];
    const urlArray = [];
    for (let i = 0; i < 4; i++) {
      const url = `${api}${Math.round(Math.random() * 1000)}.svg`;
      data.push(url);
      urlArray.push({ url, index: i });
      setAvatars(data);
      setUrlNum(urlArray);
    }
  }, [reload]);
  const setProfile = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    }
    const user = await JSON.parse(localStorage.getItem("user"));
    const avatar = urlNum.find((one) => one.index === selectedAvatar);
    axios
      .put("/auth/avatar", { _id: user._id, avatar: avatar.url })
      .then((res) => {
        if (res.data.avatar) {
          localStorage.removeItem("user");
          toast.success("Avatar has been Set", toastOptions);
          setTimeout(() => {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.reload();
            navigate("/");
          }, [2000]);
        } else {
          toast.error("There was an error", toastOptions);
        }
      });
  };
  return (
    <AvatarStyled>
      <div className="heading">
        <h1> Pick Avatar as you profile Picture</h1>
      </div>
      <div className="container">
        {avatars.map((ava, index) => {
          return (
            <div
              onClick={() => {
                setSelectedAvatar(index);
              }}
              key={index}
              className={
                selectedAvatar === index ? "avatar selected" : "avatar"
              }
            >
              <img src={ava} alt="" />
            </div>
          );
        })}
      </div>
      <div className="bottom">
        <button className="reload" onClick={() => setReload(!reload)}>
          Reload
        </button>
        <button className="select" onClick={setProfile}>
          Select
        </button>
      </div>
      <ToastContainer />
    </AvatarStyled>
  );
};

const AvatarStyled = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #131324;

  .heading {
    color: white;
    text-align: center;
  }
  .container {
    display: grid;
    gap: 1rem;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;

      transition: 0.5s;
      margin: 1rem;
      img {
        height: 100%;

        width: 100%;
      }
    }
    .selected.avatar {
      border: 0.4rem solid #4e0eff;
      transition: 0.5s;
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 0 1rem;
    justify-content: center;

    button {
      padding: 1rem;
      max-width: 100px;
      flex: 1;

      background: #997af0;
      color: white;
      border: none;
      border-radius: 0.4rem;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      &:hover {
        background: #4e0eff;
      }
    }
  }
  @media (max-width: 400px) and (max-height: 600px) {
    padding: 2rem;

    .container {
      gap: 0;

      .avatar {
        width: 80px;
        height: 80px;
      }
    }
    button {
      padding: 0rem;
    }
  }
`;
export default Avatar;
