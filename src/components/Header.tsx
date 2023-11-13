import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import Profile from "./Profile";
import Link from "next/link";

const Header = () => {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        {/* <NavigationMenu.Item>
          <StyledLink href={"/cast"}>Cast</StyledLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <StyledLink href={"/create"}>Create</StyledLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <StyledLink href={"/manage"}>Manage</StyledLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <StyledLink href={"/results"}>Results</StyledLink>
        </NavigationMenu.Item> */}
        <Profile />
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
};

const NavigationMenuRoot = styled(NavigationMenu.Root)`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 100vw;
  z-index: 1;
  background-color: var(--decorative-yellow-70);
`;

const NavigationMenuList = styled(NavigationMenu.List)`
  display: flex;
  width: 100vw;
  height: 3rem;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  list-style: none;
  margin: 0;
`;

const StyledLink = styled(Link)`
  padding: 8px 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
`;

export default Header;
