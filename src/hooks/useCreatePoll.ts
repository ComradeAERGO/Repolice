import {
  repoliceABI,
  usePrepareRepoliceCreatePoll,
  useRepoliceCreatePoll,
} from "@/RepoliceABI";
import { SEPOLIA_ADDRESS } from "@/domain/Contract";
import { parseEther } from "viem";

export const useCreatePoll = ({ debouncedQuestion, debouncedOptions }: any) => {
  const { config } = usePrepareRepoliceCreatePoll({
    address: SEPOLIA_ADDRESS,
    args: [debouncedQuestion, debouncedOptions, BigInt(172800)],
    value: parseEther("0.005"),
  });

  const { isLoading, isSuccess, isError, write } =
    useRepoliceCreatePoll(config);

  const createPoll = () => {
    try {
      if (write) {
        write();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createPoll,
    isLoading,
    isSuccess,
    isError,
  };
};
