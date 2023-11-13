import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
  useNetwork,
} from "wagmi";
import styled from "styled-components";
import { Space } from "@mantine/core";
import Button from "./Button";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Profile() {
  const { address, isConnected, connector } = useAccount();
  // const { data: ensAvatar } = useEnsAvatar({ name: address });
  // const { data: ensName } = useEnsName({ address });
  const { chain } = useNetwork();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Right>
        <Button onClick={() => disconnect()}>
          {/* <div>{ensName ? `${ensName} (${address})` : address}</div> */}
          <div>{address}</div>
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
          onClick={(event) => {
            event.preventDefault();
            connect({ connector });
          }}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            pendingConnector &&
            connector.id === pendingConnector.id &&
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
  gap: 0.5rem;
`;
