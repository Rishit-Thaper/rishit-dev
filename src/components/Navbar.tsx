import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { SiAboutdotme } from "react-icons/si";
import { GrTechnology } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";
import { MdCallMade } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

const NavMenuItems = [
  { title: "About Me", icon: <SiAboutdotme /> },
  { title: "Skills", icon: <GrTechnology /> },
  { title: "Projects", icon: <FaProjectDiagram /> },
  { title: "Contact", icon: <MdCallMade /> },
];

const Navbar = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      background="#0D1017"
      p={12}
    >
      <Box>
        <Text fontSize={25} id="name" fontWeight="bold" fontFamily="Montserrat">
          {"</>"} Rishit
        </Text>
      </Box>
      <HStack justifyContent="space-evenly" alignItems="center">
        <Button
          py={6}
          px={16}
          borderRadius={4}
          bg="#080B12"
          mx={6}
          fontWeight="bold"
          fontFamily="Montserrat"
        >
          Resume
        </Button>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={<RxHamburgerMenu size={30} />}
          />
          <MenuList bg="#0D1017" py={6} px={16} borderRadius={4}>
            {NavMenuItems.map((item) => (
              <MenuItem key={item.title} icon={item.icon} my={12}>
                {item.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Navbar;
