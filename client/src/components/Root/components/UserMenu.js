import React, { useState } from "react";
import styled from "styled-components";
import { ImUser } from "react-icons/im";

export default function UserMenu(props) {
  const [showMenu, setShowMenu] = useState(false);
  const loggedUser = localStorage.getItem("loggedUser");
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 10vw;
    margin-left: 2vw;
  `;

  const DropDownButton = styled.div`
    border-radius: 10px;
    padding: 0.5vw;
    width: inherit;
    font-size: 1.8vh;

    &:hover {
      transition: 1s ease-in-out;
      background-color: rgba(240, 240, 240, 0.85);
      color: ${props.backgroundColor};
    }
  `;

  const DropDownMenu = styled.div`
    background-color: ${props.backgroundColor};
    position: absolute;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    top: 8vh;
    height: 15vh;
    width: inherit;
    z-index: 3;
    border-radius: 5px;
  `;

  const DropDownMenuButton = styled.span`
    padding: 0.5vw;
    &:hover {
      transition: 1s ease-in-out;
      background-color: rgba(240, 240, 240, 0.85);
      color: ${props.backgroundColor};
    }
  `;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    localStorage.removeItem("LIT");
    localStorage.removeItem("loggedUser");
    window.location = "/login";
  };
  return (
    <>
      <Wrapper>
        <DropDownButton onClick={toggleMenu}>
          <ImUser fontSize="4vh" />
          <span>Hello, {loggedUser}.</span>
        </DropDownButton>
        {showMenu && (
          <DropDownMenu>
            <DropDownMenuButton onClick={logout}>log out</DropDownMenuButton>
            <DropDownMenuButton>Profile</DropDownMenuButton>
            <DropDownMenuButton>Library</DropDownMenuButton>
          </DropDownMenu>
        )}
      </Wrapper>
    </>
  );
}
