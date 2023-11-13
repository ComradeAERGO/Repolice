import styled from "styled-components";

const BadgeItem = styled.div`
  width: 50%;
  border-radius: 9999px;
  border: 2px solid black;
  padding: 0.25rem 2rem;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  transition: all;
  background-color: var(--primary);

  &:hover {
    transform: translateX(3px) translateY(3px);
    box-shadow: none;
  }
`;

export default function Badge({ badgeText }: { badgeText: string }) {
  return <BadgeItem>{badgeText}</BadgeItem>;
}
