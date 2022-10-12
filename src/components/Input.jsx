import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSettingsVoice, MdPermMedia, MdSend } from "react-icons/md";
import Picker from "emoji-picker-react";
const Input = ({ handleMsg }) => {
  const [open, setOpen] = useState(false);
  const height = useRef();
  const [msg, setMsg] = useState("");
  <MdSettingsVoice />;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg) {
      handleMsg(msg);

      setMsg("");
      e.target.reset();
    }
  };
  useEffect(() => {
    height.current.setAttribute(
      "style",
      "height:" + height.current.scrollHeight + "px;overflow-y:hidden;"
    );
    height.current.addEventListener("input", OnInput, false);

    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
    if (height.current.value.length < 30) {
      height.current.setAttribute("style", "height:3.2rem;");
    }
    if (height.current.value.length < 10) {
      height.current.setAttribute("style", "height:2.5rem");
    }
  }, [height.current?.value]);
  const handleChange = (e, emoji) => {
    setMsg(msg + emoji.emoji);
  };
  useEffect(() => {
    if (height.current.value.length < 30) {
      height.current.setAttribute("style", "height:3.2rem;");
    }
    if (height.current.value.length < 10) {
      height.current.setAttribute("style", "height:2.5rem");
    }
  });

  return (
    <Container onSubmit={handleSubmit}>
      <div className="left">
        <div className="smile" onClick={() => setOpen(!open)}>
          <BsEmojiSmile />
        </div>
        <div className="media">
          <MdPermMedia />
        </div>
      </div>
      <div className="input">
        <textarea
          type="text"
          ref={height}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <div className="sound">
        <button type="submit" className="icon1">
          <MdSend />
        </button>
        <div className="icon2">
          {" "}
          <MdSettingsVoice />
        </div>
      </div>
      {open && <Picker onEmojiClick={handleChange} />}
    </Container>
  );
};
const Container = styled.form`
  position: absolute;
  right: 0;
  height: fit-content;

  padding: 0.6rem 1rem;
  width: 100%;
  background-color: #0d0d30;
  display: grid;
  grid-template-columns: 15% 60% 25%;
  align-items: center;
  .left {
    display: flex;
    justify-self: center;
    align-items: center;
    gap: 1rem;
    .smile {
      cursor: pointer;
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
    .media {
      cursor: pointer;
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
  .input {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
    textarea {
      border-radius: 1rem;
      width: 100%;
      height: 2.5rem;
      border: none;
      padding: 1rem;
      padding: 0.2rem;
      background-color: rgba(255, 255, 255, 0.6);
      font-size: 1rem;
      font-weight: 500;
      resize: none;
      min-height: 2rem;
      &::-webkit-scrollbar {
        cursor: pointer;
        width: 0.7rem;
        background: black;
        border-radius: 1rem;
        &-thumb {
          cursor: pointer;

          background-color: #fff;
          border-radius: 1rem;
        }
      }
      &:focus {
        border: transparent;
        outline: none;
      }
    }
  }
  .sound {
    justify-self: center;
    gap: 1rem;
    display: flex;
    cursor: pointer;
    button {
      all: unset;
    }
    svg {
      font-size: 1.7rem;
      color: white;
    }
  }
  @media (min-width: 700px) {
    width: 100%;
  }
  .emoji-picker-react {
    position: absolute;
    top: -330px;
    left: 50px;
    border: 1px solid black;
    background-color: #080420;
    box-shadow: none;

    .emoji-search {
      background-color: #080420;
    }
    .emoji-scroll-wrapper {
      &::-webkit-scrollbar {
        background-color: #080420;
        &-thumb {
          background-color: #9186f3;
          border-radius: 1rem;
          height: 3rem;
        }
      }
    }
    .emoji-group::before {
      background-color: #080420;
    }
    nav {
      button {
        filter: contrast(0);
      }
    }
  }
`;

export default Input;
