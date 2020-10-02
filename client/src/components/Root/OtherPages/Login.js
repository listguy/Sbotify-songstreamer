import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../userContext";
import { login } from "../wrapper";
import styled from "styled-components";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const onSubmit = async () => {
    console.log(username + "" + password);
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
              <Field
                value={username}
                onChange={({ target: { value } }) => setUsername(value)}
              />
            </Line>
            <Line>
              <Desc>Password</Desc>
              <Field
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </Line>
            <button onClick={onSubmit}>Login</button>
            {error ? <div>*{error}</div> : null}
          </Container>
        </>
      )}
    </>
  );
}
