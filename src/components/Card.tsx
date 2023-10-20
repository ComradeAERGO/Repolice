import React from "react";
import styled from "styled-components";

type Props = {
  heading?: string;
  children: React.ReactNode;
};

const CardContainer = styled.div`
  width: fit-content;
  border-radius: 0.375rem;
  border: 2px solid black;
  background-color: #bc95d4;
  font-weight: bold;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
`;

const Header = styled.div`
  border-bottom: 2px solid black;
  padding: 1rem;
`;

const Heading = styled.h2`
  font-size: 1.125rem;
`;

const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export default function Card({ heading, children }: Props) {
  return (
    <CardContainer>
      {heading && (
        <Header>
          <Heading>{heading}</Heading>
        </Header>
      )}
      <Content>{children}</Content>
    </CardContainer>
  );
}
