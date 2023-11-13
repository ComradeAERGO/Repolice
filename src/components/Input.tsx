import styled from "styled-components";
import { blackA } from "@radix-ui/colors";

export const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 15px;
  color: white;
  background-color: ${blackA.blackA5};
  box-shadow: 0 0 0 1px ${blackA.blackA9};
  height: 35px;
  line-height: 1;
  padding: 0 10px;

  &:hover {
    box-shadow: 0 0 0 1px black;
  }

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &::selection {
    background-color: ${blackA.blackA9};
    color: white;
  }
`;

export const Textarea = styled.textarea`
  ...inputStyles;
  resize: none;
  padding: 10px;
`;
