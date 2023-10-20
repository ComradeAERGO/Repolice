import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Repolice
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const repoliceABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollCreationFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'extraPollFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'changeVoteFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeesUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'question',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'options',
        internalType: 'string[]',
        type: 'string[]',
        indexed: false,
      },
    ],
    name: 'PollCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'PollDeleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'PollEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'optionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Voted',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pollId', internalType: 'uint256', type: 'uint256' },
      { name: '_newOptionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'changeVote',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'changeVoteFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_question', internalType: 'string', type: 'string' },
      { name: '_options', internalType: 'string[]', type: 'string[]' },
      { name: '_duration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPoll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'deletePoll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'endPoll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'extraPollFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeCollector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPollById',
    outputs: [
      {
        name: '',
        internalType: 'struct Repolice.Poll',
        type: 'tuple',
        components: [
          { name: 'question', internalType: 'string', type: 'string' },
          { name: 'options', internalType: 'string[]', type: 'string[]' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'creator', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getPollIdsVotedOn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getPollsByCreator',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_pollId', internalType: 'uint256', type: 'uint256' },
      { name: '_voter', internalType: 'address', type: 'address' },
    ],
    name: 'getVoteByPollAndVoter',
    outputs: [
      {
        name: '',
        internalType: 'struct Repolice.Vote',
        type: 'tuple',
        components: [
          { name: 'pollId', internalType: 'uint256', type: 'uint256' },
          { name: 'optionId', internalType: 'uint256', type: 'uint256' },
          { name: 'hasVoted', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'kill',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pollCreationFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'polls',
    outputs: [
      { name: 'question', internalType: 'string', type: 'string' },
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_feeCollector', internalType: 'address', type: 'address' },
    ],
    name: 'setFeeCollector',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updateChangeVoteFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updateExtraPollFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updatePollCreationFee',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userPolls',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pollId', internalType: 'uint256', type: 'uint256' },
      { name: '_optionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'vote',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'voteCounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'votes',
    outputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'optionId', internalType: 'uint256', type: 'uint256' },
      { name: 'hasVoted', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdrawFees',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, TFunctionName, TMode>({
    abi: ownableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOwnableRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownableABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'renounceOwnership', TMode>({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnableTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownableABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'transferOwnership', TMode>({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function usePrepareOwnableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOwnableRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ownableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownableABI,
    ...config,
  } as UseContractEventConfig<typeof ownableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnableOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownableABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__.
 */
export function useRepoliceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"changeVoteFee"`.
 */
export function useRepoliceChangeVoteFee<
  TFunctionName extends 'changeVoteFee',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'changeVoteFee',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"extraPollFee"`.
 */
export function useRepoliceExtraPollFee<
  TFunctionName extends 'extraPollFee',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'extraPollFee',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"feeCollector"`.
 */
export function useRepoliceFeeCollector<
  TFunctionName extends 'feeCollector',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'feeCollector',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"getPollById"`.
 */
export function useRepoliceGetPollById<
  TFunctionName extends 'getPollById',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'getPollById',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"getPollIdsVotedOn"`.
 */
export function useRepoliceGetPollIdsVotedOn<
  TFunctionName extends 'getPollIdsVotedOn',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'getPollIdsVotedOn',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"getPollsByCreator"`.
 */
export function useRepoliceGetPollsByCreator<
  TFunctionName extends 'getPollsByCreator',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'getPollsByCreator',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"getVoteByPollAndVoter"`.
 */
export function useRepoliceGetVoteByPollAndVoter<
  TFunctionName extends 'getVoteByPollAndVoter',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'getVoteByPollAndVoter',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"owner"`.
 */
export function useRepoliceOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"paused"`.
 */
export function useRepolicePaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"pollCreationFee"`.
 */
export function useRepolicePollCreationFee<
  TFunctionName extends 'pollCreationFee',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'pollCreationFee',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"polls"`.
 */
export function useRepolicePolls<
  TFunctionName extends 'polls',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'polls',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"userPolls"`.
 */
export function useRepoliceUserPolls<
  TFunctionName extends 'userPolls',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'userPolls',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"userVotes"`.
 */
export function useRepoliceUserVotes<
  TFunctionName extends 'userVotes',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'userVotes',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"voteCounts"`.
 */
export function useRepoliceVoteCounts<
  TFunctionName extends 'voteCounts',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'voteCounts',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"votes"`.
 */
export function useRepoliceVotes<
  TFunctionName extends 'votes',
  TSelectData = ReadContractResult<typeof repoliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: repoliceABI,
    functionName: 'votes',
    ...config,
  } as UseContractReadConfig<typeof repoliceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__.
 */
export function useRepoliceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof repoliceABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, TFunctionName, TMode>({
    abi: repoliceABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"changeVote"`.
 */
export function useRepoliceChangeVote<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'changeVote'
        >['request']['abi'],
        'changeVote',
        TMode
      > & { functionName?: 'changeVote' }
    : UseContractWriteConfig<typeof repoliceABI, 'changeVote', TMode> & {
        abi?: never
        functionName?: 'changeVote'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'changeVote', TMode>({
    abi: repoliceABI,
    functionName: 'changeVote',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"createPoll"`.
 */
export function useRepoliceCreatePoll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'createPoll'
        >['request']['abi'],
        'createPoll',
        TMode
      > & { functionName?: 'createPoll' }
    : UseContractWriteConfig<typeof repoliceABI, 'createPoll', TMode> & {
        abi?: never
        functionName?: 'createPoll'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'createPoll', TMode>({
    abi: repoliceABI,
    functionName: 'createPoll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"deletePoll"`.
 */
export function useRepoliceDeletePoll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'deletePoll'
        >['request']['abi'],
        'deletePoll',
        TMode
      > & { functionName?: 'deletePoll' }
    : UseContractWriteConfig<typeof repoliceABI, 'deletePoll', TMode> & {
        abi?: never
        functionName?: 'deletePoll'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'deletePoll', TMode>({
    abi: repoliceABI,
    functionName: 'deletePoll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"endPoll"`.
 */
export function useRepoliceEndPoll<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'endPoll'
        >['request']['abi'],
        'endPoll',
        TMode
      > & { functionName?: 'endPoll' }
    : UseContractWriteConfig<typeof repoliceABI, 'endPoll', TMode> & {
        abi?: never
        functionName?: 'endPoll'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'endPoll', TMode>({
    abi: repoliceABI,
    functionName: 'endPoll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"kill"`.
 */
export function useRepoliceKill<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'kill'
        >['request']['abi'],
        'kill',
        TMode
      > & { functionName?: 'kill' }
    : UseContractWriteConfig<typeof repoliceABI, 'kill', TMode> & {
        abi?: never
        functionName?: 'kill'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'kill', TMode>({
    abi: repoliceABI,
    functionName: 'kill',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"pause"`.
 */
export function useRepolicePause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof repoliceABI, 'pause', TMode> & {
        abi?: never
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'pause', TMode>({
    abi: repoliceABI,
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useRepoliceRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof repoliceABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'renounceOwnership', TMode>({
    abi: repoliceABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"setFeeCollector"`.
 */
export function useRepoliceSetFeeCollector<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'setFeeCollector'
        >['request']['abi'],
        'setFeeCollector',
        TMode
      > & { functionName?: 'setFeeCollector' }
    : UseContractWriteConfig<typeof repoliceABI, 'setFeeCollector', TMode> & {
        abi?: never
        functionName?: 'setFeeCollector'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'setFeeCollector', TMode>({
    abi: repoliceABI,
    functionName: 'setFeeCollector',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useRepoliceTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof repoliceABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'transferOwnership', TMode>({
    abi: repoliceABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"unpause"`.
 */
export function useRepoliceUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof repoliceABI, 'unpause', TMode> & {
        abi?: never
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'unpause', TMode>({
    abi: repoliceABI,
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"updateChangeVoteFee"`.
 */
export function useRepoliceUpdateChangeVoteFee<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'updateChangeVoteFee'
        >['request']['abi'],
        'updateChangeVoteFee',
        TMode
      > & { functionName?: 'updateChangeVoteFee' }
    : UseContractWriteConfig<
        typeof repoliceABI,
        'updateChangeVoteFee',
        TMode
      > & {
        abi?: never
        functionName?: 'updateChangeVoteFee'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'updateChangeVoteFee', TMode>({
    abi: repoliceABI,
    functionName: 'updateChangeVoteFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"updateExtraPollFee"`.
 */
export function useRepoliceUpdateExtraPollFee<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'updateExtraPollFee'
        >['request']['abi'],
        'updateExtraPollFee',
        TMode
      > & { functionName?: 'updateExtraPollFee' }
    : UseContractWriteConfig<
        typeof repoliceABI,
        'updateExtraPollFee',
        TMode
      > & {
        abi?: never
        functionName?: 'updateExtraPollFee'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'updateExtraPollFee', TMode>({
    abi: repoliceABI,
    functionName: 'updateExtraPollFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"updatePollCreationFee"`.
 */
export function useRepoliceUpdatePollCreationFee<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'updatePollCreationFee'
        >['request']['abi'],
        'updatePollCreationFee',
        TMode
      > & { functionName?: 'updatePollCreationFee' }
    : UseContractWriteConfig<
        typeof repoliceABI,
        'updatePollCreationFee',
        TMode
      > & {
        abi?: never
        functionName?: 'updatePollCreationFee'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'updatePollCreationFee', TMode>({
    abi: repoliceABI,
    functionName: 'updatePollCreationFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"vote"`.
 */
export function useRepoliceVote<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'vote'
        >['request']['abi'],
        'vote',
        TMode
      > & { functionName?: 'vote' }
    : UseContractWriteConfig<typeof repoliceABI, 'vote', TMode> & {
        abi?: never
        functionName?: 'vote'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'vote', TMode>({
    abi: repoliceABI,
    functionName: 'vote',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"withdrawFees"`.
 */
export function useRepoliceWithdrawFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof repoliceABI,
          'withdrawFees'
        >['request']['abi'],
        'withdrawFees',
        TMode
      > & { functionName?: 'withdrawFees' }
    : UseContractWriteConfig<typeof repoliceABI, 'withdrawFees', TMode> & {
        abi?: never
        functionName?: 'withdrawFees'
      } = {} as any,
) {
  return useContractWrite<typeof repoliceABI, 'withdrawFees', TMode>({
    abi: repoliceABI,
    functionName: 'withdrawFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__.
 */
export function usePrepareRepoliceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"changeVote"`.
 */
export function usePrepareRepoliceChangeVote(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'changeVote'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'changeVote',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'changeVote'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"createPoll"`.
 */
export function usePrepareRepoliceCreatePoll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'createPoll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'createPoll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'createPoll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"deletePoll"`.
 */
export function usePrepareRepoliceDeletePoll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'deletePoll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'deletePoll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'deletePoll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"endPoll"`.
 */
export function usePrepareRepoliceEndPoll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'endPoll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'endPoll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'endPoll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"kill"`.
 */
export function usePrepareRepoliceKill(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'kill'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'kill',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'kill'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareRepolicePause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'pause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareRepoliceRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"setFeeCollector"`.
 */
export function usePrepareRepoliceSetFeeCollector(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'setFeeCollector'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'setFeeCollector',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'setFeeCollector'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareRepoliceTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareRepoliceUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'unpause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"updateChangeVoteFee"`.
 */
export function usePrepareRepoliceUpdateChangeVoteFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'updateChangeVoteFee'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'updateChangeVoteFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'updateChangeVoteFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"updateExtraPollFee"`.
 */
export function usePrepareRepoliceUpdateExtraPollFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'updateExtraPollFee'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'updateExtraPollFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'updateExtraPollFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"updatePollCreationFee"`.
 */
export function usePrepareRepoliceUpdatePollCreationFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'updatePollCreationFee'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'updatePollCreationFee',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof repoliceABI,
    'updatePollCreationFee'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"vote"`.
 */
export function usePrepareRepoliceVote(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'vote'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'vote',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'vote'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link repoliceABI}__ and `functionName` set to `"withdrawFees"`.
 */
export function usePrepareRepoliceWithdrawFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof repoliceABI, 'withdrawFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: repoliceABI,
    functionName: 'withdrawFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof repoliceABI, 'withdrawFees'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__.
 */
export function useRepoliceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__ and `eventName` set to `"FeesUpdated"`.
 */
export function useRepoliceFeesUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, 'FeesUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    eventName: 'FeesUpdated',
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, 'FeesUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useRepoliceOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__ and `eventName` set to `"PollCreated"`.
 */
export function useRepolicePollCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, 'PollCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    eventName: 'PollCreated',
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, 'PollCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__ and `eventName` set to `"PollDeleted"`.
 */
export function useRepolicePollDeletedEvent(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, 'PollDeleted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    eventName: 'PollDeleted',
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, 'PollDeleted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__ and `eventName` set to `"PollEnded"`.
 */
export function useRepolicePollEndedEvent(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, 'PollEnded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    eventName: 'PollEnded',
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, 'PollEnded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link repoliceABI}__ and `eventName` set to `"Voted"`.
 */
export function useRepoliceVotedEvent(
  config: Omit<
    UseContractEventConfig<typeof repoliceABI, 'Voted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: repoliceABI,
    eventName: 'Voted',
    ...config,
  } as UseContractEventConfig<typeof repoliceABI, 'Voted'>)
}
