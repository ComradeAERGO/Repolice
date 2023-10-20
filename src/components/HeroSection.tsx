import styled from "styled-components";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import Button from "./Button";
import Card from "./Card";

const HeroWrapper = styled.div`
  padding: 50px;
  text-align: center;
`;

export default function HeroSection() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ name: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && connector) {
    return (
      <HeroWrapper>
        <Card>
          <img src={ensAvatar ?? ""} alt="ENS Avatar" />
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector.name}</div>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </Card>
      </HeroWrapper>
    );
  }

  return (
    <HeroWrapper>
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
    </HeroWrapper>
  );
}
