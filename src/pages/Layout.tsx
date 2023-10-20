import styled from "styled-components";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { ReactNode, useEffect } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
