import {
  useRepolicePolls,
  useRepoliceGetPollById,
  useRepoliceGetPollsByCreator,
  useRepoliceGetVoteByPollAndVoter,
  useRepoliceGetPollIdsVotedOn,
  useRepoliceExtraPollFee,
  useRepolicePollCreationFee,
  useRepoliceChangeVoteFee,
  useRepolicePaused,
} from "@/RepoliceABI";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { useAccount } from "wagmi";

const errorCreator = (text: string, data: Error) => ({
  error: {
    status: 500,
    statusText: text,
    message: data.message,
  },
});

type QueryCreator<T> = (
  callback: T,
  errorText: string,
  args: any[]
) => Promise<any>;

const queryCreator = <T extends (...args: any[]) => any>(
  callback: T,
  errorText: string,
  ...args: any[]
): any => {
  try {
    const { data, error } = args.length ? callback(...args) : callback();
    if (error) {
      return errorCreator(errorText, error);
    }
    return { data };
  } catch (err) {
    return errorCreator(errorText, err as Error);
  }
};

export const api = createApi({
  reducerPath: "repoliceApi",
  baseQuery: fetchBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    /* ************
     **** Polls ****
     ************* */

    /* Get array of all polls */
    getPolls: builder.query({
      queryFn: queryCreator(useRepolicePolls, "Error fetching polls"),
    }),

    /* Get single poll by id */
    getPollById: builder.query({
      queryFn: (pollId) =>
        queryCreator(useRepoliceGetPollById, "Error fetching poll", pollId),
    }),

    /* Get polls filtered by creator address */
    getPollsByCreator: builder.query({
      queryFn: (user) =>
        queryCreator(
          useRepoliceGetPollsByCreator,
          "Error fetching polls",
          user
        ),
    }),

    /* Get polls a user voted on */
    getPollsUserVotedOn: builder.query({
      queryFn: (user) =>
        queryCreator(
          useRepoliceGetPollIdsVotedOn,
          "Error fetching polls",
          user
        ),
    }),

    /* ************
     **** Votes ****
     ************* */

    /* Get vote for a poll and a user */
    getVotesByPollIdAndVoter: builder.query({
      queryFn: (pollId, user) =>
        queryCreator(
          useRepoliceGetVoteByPollAndVoter,
          "Error fetching vote",
          pollId,
          user
        ),
    }),

    /* ************
     ***** Fees ****
     ************* */

    /* Get poll creation fee amount */
    getPollCreationFee: builder.query({
      queryFn: () =>
        queryCreator(useRepolicePollCreationFee, "Error fetching fee"),
    }),

    /* Get extra poll fee amount */
    getExtraPollFee: builder.query({
      queryFn: () =>
        queryCreator(useRepoliceExtraPollFee, "Error fetching fee"),
    }),

    /* Get change vote fee amount */
    getChangeVoteFee: builder.query({
      queryFn: () =>
        queryCreator(useRepoliceChangeVoteFee, "Error fetching fee"),
    }),

    /* ************
     **** User ****
     ************* */

    /* Get user address */
    getUserAddress: builder.query({
      queryFn: () => {
        try {
          const { address } = useAccount();
          return { data: address };
        } catch (err) {
          return errorCreator(
            "There was an error fetching the user address",
            err as Error
          );
        }
      },
    }),
    /* ************
     *** Contract **
     ************* */

    /* Check if contract is paused */
    getPausedState: builder.query({
      queryFn: () =>
        queryCreator(useRepolicePaused, "Error fetching paused state"),
    }),
  }),
});
