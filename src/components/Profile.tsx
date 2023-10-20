import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
} from "wagmi";
import styled from "styled-components";
import { Space } from "@mantine/core";
import Button from "./Button";

export default function Profile() {
  let ensName = undefined;

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (chain?.contracts?.ensUniversalResolver) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ensName = useEnsName({ address });
  }

  if (isConnected) {
    return (
      <Right>
        <Button onClick={() => disconnect()}>
          <div>{ensName ? `${ensName} (${address})` : address}</div>
        </Button>
        <Space w="sm" />
        <Button disabled>{chain?.name}</Button>
      </Right>
    );
  }

  return (
    <Right>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {"Connect with " && connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </Right>
  );
}

const Right = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  padding-right: 2rem;
`;
