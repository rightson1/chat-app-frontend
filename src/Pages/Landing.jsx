import React, { useEffect } from "react";
import styled from "styled-components";
import bcg from "../img/chat-bg.jpeg";
import { AiOutlineMessage } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (!user.avatar) {
        navigate("/avatar");
      }
      window.location.reload();
    }
  }, []);
  return (
    <LandingStyled image={bcg}>
      <Container className="box">
        <div className="images">
          <div className="oval">
            <h1>
              <AiOutlineMessage />
            </h1>
          </div>
        </div>
        <div className="bottom">
          <h3>Enjoy the new experience of chatting with anyone in Riara</h3>

          <p>Meet new friends in riara</p>
          <button onClick={() => navigate("/register")}>Get started</button>
        </div>
      </Container>
    </LandingStyled>
  );
};

const LandingStyled = styled.div`
  background-color: black;
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    background-image: url(${(props) => props.image});
    width: 400px;
    max-height: 800px;
    height: 100%;
    background-position: center;
    background-size: cover;
    border-radius: 1rem;
    display: grid;
    grid-template-rows: 60% 40%;
    overflow: hidden;
    padding: 0;

    gap: 1rem;
    .images {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;

      .oval {
        height: 100px;
        width: 100px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 4rem 4rem 4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;

        h1 {
          color: red;
          opacity: 0.8;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 100%;
      background: rgba(100, 0, 100, 0.9);
      background-color: #131324;
      border-radius: 1rem 1rem 0 0;

      padding: 1rem;
      text-align: center;
      h3 {
        font-size: 1.4rem;

        opacity: 0.8;
      }
      p {
      }
      button {
        width: 100%;
        padding: 1rem;
        border-radius: 1rem;
        background-color: #997af0;
        border: transparent;
      }
    }
  }
  @media (max-width: 500px) and (max-height: 600px) {
    padding: 0;

    .box {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      grid-template-rows: 50% 50%;
      .bottom {
        display: flex;
        flex-direction: column;
      }
      .images {
        overflow: hidden;

        .circle {
          display: none;
        }
      }
    }
  }
`;

export default Landing;
