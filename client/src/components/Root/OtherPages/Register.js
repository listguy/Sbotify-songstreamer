import React, { useContext, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { register } from "../wrapper";
import styled from "styled-components";

export default function Register() {
  const userRef = useRef("a");
  const emailRef = useRef("a");
  const passwordRef = useRef("a");
  const [error, setError] = useState([]);

  const onSubmit = async () => {
    const username = userRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(
      `username: ${username}, password: ${password}, email: ${email}`
    );
    const response = await register({
      username,
      email,
      password,
    });
    console.log(response);
    if (response && response.success) {
      window.location = "/login";
    } else {
      console.log(response.errors);
      setError(response.errors);
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
    grid-template-rows: 1.5fr 1.5fr 1.5fr 2fr;
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
    width: 30%;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1.5vh;
    margin: 0 auto;

    &:hover {
      background-color: rgba(20, 20, 20, 0.6);
      cursor: pointer;
      transition: 0.5s ease;
    }
  `;

  const ErrMsg = styled.div`
    color: rgb(220, 20, 30);
    font-weight: bold;
    font-size: 1.5vh;
  `;

  return (
    <>
      <Header>Register to Sbotify</Header>
      <Container>
        <Line>
          <Desc>Username:</Desc>
          <Field ref={userRef} />
        </Line>
        <Line>
          <Desc>Email:</Desc>
          <Field ref={emailRef} />
        </Line>
        <Line>
          <Desc>Password:</Desc>
          <Field type="password" ref={passwordRef} />
        </Line>
        <Button onClick={onSubmit}>Register</Button>
        {error[0] ? (
          <ErrMsg>
            {error.map((e) => (
              <>
                {`* ${e.message}`}
                <br />
              </>
            ))}
          </ErrMsg>
        ) : null}
      </Container>
    </>
  );
}
