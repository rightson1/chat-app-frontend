import React, { useState } from "react";
import styled from "styled-components";

import { BsArrow90DegLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toastOptions } from "../components/data";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const [values, setValue] = useState({
    username: "",

    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/auth/login", { ...values }).then((res) => {
      if (res.data.username) {
        toast.success(`Welcome ${res.data.name}`, toastOptions);

        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload();
          navigate("/");
        }, [2000]);
      } else {
        toast.error(`${res.data}`);
      }
    });
  };
  const navigate = useNavigate();

  return (
    <RegisterStyled onSubmit={handleSubmit}>
      <div className="box">
        <div className="arrow">
          <BsArrow90DegLeft />
        </div>
        <div className="heading">
          <h1>Let's Sign You In.</h1>
          <p>Welcome back, you have been missed</p>
        </div>
        <div className="inputs">
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="bottom">
          <p>
            Don'n have an account?{" "}
            <span onClick={() => navigate("/register")}>Login</span>
          </p>
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
        </div>
      </div>
      <ToastContainer />
    </RegisterStyled>
  );
};

const RegisterStyled = styled.form`
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: black;
  color: white;

  .box {
    background-image: url(${(props) => props.image});
    width: 400px;
    height: 90%;
    background-position: center;
    background-size: cover;
    border-radius: 1rem;
    display: grid;
    /* grid-template-rows: 10% 20% 40% 20%; */
    gap: 1rem;
    overflow: hidden;
    padding: 0;
    padding: 1rem 2rem;
    gap: 1rem;
    .arrow {
      color: white;
      font-size: 1.5rem;
      font-weight: 800;
    }
    .heading {
      h1 {
        font-size: 2.4rem;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
        opacity: 0.8;
      }
    }
    .inputs {
      input {
        width: 100%;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 1rem;
        height: 4rem;
        background-color: rgba(255, 255, 255, 0.4);
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: red;
        &:focus {
          outline: none;
        }
        &::placeholder {
          color: rgba(255, 255, 255, 0.9);
        }
      }
    }
    .bottom {
      justify-self: center;

      align-self: end;
      p {
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.4);
        span {
          color: white;
        }
      }
      button {
        width: 100%;
        padding: 1rem;
        border-radius: 1rem;
      }
    }
  }
  @media (max-width: 600px) {
    padding: 0;
    min-height: 120vh;
    .box {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      border-radius: 1rem;

      .heading {
        h1 {
        }
        p {
        }
      }
      .arrow {
      }
      .inputs {
        input {
        }
      }
    }
  }
  @media (max-width: 500px) and (max-height: 650px) {
    padding: 0;
    overflow-y: auto;
    min-height: 150vh;

    .box {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      .heading {
        h1 {
          font-size: 1.4rem;
          padding: 0;
          margin: 0;
        }
        p {
          margin: 0;
          padding: 0;
          font-size: 1rem;
          opacity: 0.8;
        }
      }
      .arrow {
        color: white;
        font-size: 1rem;
        font-weight: 800;
      }
      .inputs {
        input {
          padding: 0.4rem;
          margin: 0.3rem 0;
          border-radius: 1rem;
          height: 3rem;
        }
      }
    }
  }
`;

export default Register;
