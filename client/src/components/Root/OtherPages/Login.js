import React, { useContext, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../userContext";
import { login } from "../wrapper";
import styled from "styled-components";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const onSubmit = async () => {
    const username = userRef.current.value;
    const password = passwordRef.current.value;
    const response = await login({
      username,
      password,
    });
    console.log(response);
    if (response && response.success && response.token) {
      localStorage.setItem("LIT", response.token); //LIT = LogIn Token
      localStorage.setItem("loggedUser", username); //Current logged user
      window.location = "/";
      // setLoggedUser(username);
    } else {
      console.log(response.msg);
      setError(response.msg);
    }
  };

  const Header = styled.h1`
    margin-top: 10vh;
    font-size: 8vh;
    text-align: center;
  `;

  const Container = styled.div`
    background-color: rgba(160, 160, 160, 0.6);
    display: grid;
    grid-template-rows: 1.5fr 1.5fr 2fr;
    grid-row-gap: 2vh;
    margin: 12vh auto;
    padding: 2vh 1vw;
    width: 20vw;
  `;

  const Line = styled.div`
    display: flex;
  `;

  const Field = styled.input`
    padding: 0.2vw;
    margin-left: auto;
    margin-right: 1vw;
    width: 60%;
  `;

  const Desc = styled.span`
    margin-left: 0.5vw;
  `;

  const Button = styled.button`
    background-color: rgba(20, 20, 20, 0.45);
    width: 20%;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1.5vh;
    margin-left: auto;

    &:hover {
      background-color: rgba(20, 20, 20, 0.6);
      cursor: pointer;
      transition: 0.5s ease;
    }
  `;

  const StyledLink = styled.a`
    color: rgb(30, 30, 30);
    &:hover {
      cursor: pointer;
      color: white;
      transition: 0.5s ease;
    }
  `;

  const ErrMsg = styled.div`
    color: rgb(220, 20, 30);
    font-weight: bold;
  `;

  return (
    <>
      {loggedUser ? (
        <Redirect to="/" />
      ) : (
        <>
          <Header>Welcome to Sbotify</Header>
          <Container>
            <Line>
              <Desc>Username</Desc>
              <Field ref={userRef} />
            </Line>
            <Line>
              <Desc>Password</Desc>
              <Field ref={passwordRef} type="password" />
            </Line>
            <Line>
              <Desc style={{ fontSize: "1.5vh" }}>
                Don't have a user?{" "}
                <StyledLink href="/register">Join Us</StyledLink>
              </Desc>
              <Button onClick={onSubmit}>Login</Button>
            </Line>
            {error ? <ErrMsg>*{error.replace(/"/g, "")}</ErrMsg> : null}
          </Container>
        </>
      )}
    </>
  );
}
