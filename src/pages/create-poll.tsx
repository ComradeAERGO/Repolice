import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Badge } from "@mantine/core";
import { useDebounce } from "usehooks-ts";
import Button from "@/components/Button";
import { useCreatePoll } from "@/hooks/useCreatePoll";
import { FormField, FormLabel, FormRoot } from "@/components/Form";
import { Input } from "@/components/Input";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import Card from "@/components/Card";

const Wrapper = styled.div`
  display: flex;
  height: 95vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const debouncedQuestion = useDebounce(question, 1000);
  const debouncedOptions = useDebounce(options, 1000);

  const { createPoll, isLoading, isError, isSuccess } = useCreatePoll({
    debouncedQuestion,
    debouncedOptions,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (newOption !== "") {
        const newValue = newOption.trim(); // exclude the trailing spaces
        setOptions([...options, newValue]);
        setNewOption("");
      }
    }
  };

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Call the smart contract's createVote method
    createPoll();
  };

  return (
    <Wrapper>
      <Card>
        <FormRoot onSubmit={handleSubmit}>
          <FormField name="Question">
            <FormLabel>Question</FormLabel>
            <Input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuestion(e.currentTarget.value)
              }
            />
          </FormField>
          <FormField name="Options">
            <FormLabel>Options</FormLabel>
            <Input
              type="text"
              placeholder="Options (comma separated)"
              value={newOption}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewOption(e.currentTarget.value)
              }
              onKeyDown={handleKeyDown}
            />
            <Options>
              {options.length > 0 &&
                options.map((option, index) => (
                  <Badge
                    radius="sm"
                    key={index}
                    onClick={() => handleDeleteOption(index)}
                  >
                    {option}
                  </Badge>
                ))}
            </Options>
          </FormField>
          <Form.Submit asChild>
            <Button disabled={isLoading}>Create Vote</Button>
          </Form.Submit>
          {isSuccess && <div>Vote created successfully!</div>}
          {isError && <div>Failed to create vote.</div>}
        </FormRoot>
      </Card>
    </Wrapper>
  );
};

export default CreatePoll;
