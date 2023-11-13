import React from "react";
import { useRouter } from "next/router";
import Button from "./Button";

const CreatePollCta = () => {
  const router = useRouter();

  const handleCreatePoll = () => {
    router.push("/create-poll");
  };

  return (
    <div className="create-poll-cta">
      <Button onClick={handleCreatePoll}>Create a Poll</Button>
    </div>
  );
};

export default CreatePollCta;
