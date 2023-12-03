import React from "react";
import styled from "styled-components";

const BaseButton = styled.button`
  font-size: 20px;
  font-weight: 600;
  color: white;
  background-color: #295871;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color linear 800ms;
  margin-top: 20px;
  :hover {
    background-color: black;
  }
`;

const DeleteButton = styled(BaseButton)`
  background-color: #900e0e;
`;

function Button() {
  return (
    <div>
      <BaseButton>Base button</BaseButton>
      <DeleteButton>Delete button</DeleteButton>
    </div>
  );
}

export { Button, BaseButton, DeleteButton };
