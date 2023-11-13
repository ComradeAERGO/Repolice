import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

const StyledButton = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 0.375rem;
  border: 2px solid black;
  background-color: var(--primary);
  padding: 1rem 2.5rem;
  font-weight: bold;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  transition: all 0.3s;

  &:hover {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

export default function Button({ children, onClick, disabled, type }: Props) {
  return (
    <StyledButton
      type={type ? type : "button"}
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      disabled={disabled ? disabled : false}
    >
      {children}
    </StyledButton>
  );
}
