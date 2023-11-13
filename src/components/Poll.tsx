import styled from "styled-components";
import Badge from "./Badge";
import Card from "./Card";

const PollCard = styled(Card)`
  width: 1024px;
`;

const Badges = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 1rem;
  gap: 1rem;
`;

type PollProps = {
  question: string;
  options: readonly string[];
  active: boolean;
  endTime: bigint;
  creator: string;
};
export const Poll = ({
  question,
  options,
  active,
  endTime,
  creator,
}: PollProps) => {
  return (
    <PollCard heading={question}>
      <Badges>
        {options.map((option) => (
          <Badge badgeText={option} />
        ))}
      </Badges>
      <div>{active ? "Active" : "Inactive"}</div>
      <div>{`Ends on ${endTime}`}</div>
      <div>{`Created by ${creator}`}</div>
    </PollCard>
  );
};
