import * as Form from "@radix-ui/react-form";
import styled from "styled-components";

export const FormRoot = styled(Form.Root)`
  width: 260px;
`;

export const FormField = styled(Form.Field)`
  display: grid;
  margin-bottom: 10px;
`;

export const FormLabel = styled(Form.Label)`
  font-size: 15px;
  font-weight: 500;
  line-height: 35px;
  color: white;
`;

export const FormMessage = styled(Form.Message)`
  font-size: 13px;
  color: white;
  opacity: 0.8;
`;
