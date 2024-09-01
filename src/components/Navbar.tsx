import { colors, fonts } from '@/tokens/colors';
import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaProjectDiagram } from 'react-icons/fa';
import { GrTechnology } from 'react-icons/gr';
import { MdCallMade } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiAboutdotme } from 'react-icons/si';

const NavMenuItems = [
  { title: 'About Me', icon: <SiAboutdotme /> },
  { title: 'Skills', icon: <GrTechnology /> },
  { title: 'Projects', icon: <FaProjectDiagram /> },
  { title: 'Contact', icon: <MdCallMade /> },
];

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" alignItems="center" background={colors.secondary} p={12}>
      <Box>
        <Text fontSize={25} id="name" fontWeight="bold" fontFamily={fonts.heading}>
          {'</>'} Rishit
        </Text>
      </Box>
      <HStack justifyContent="space-evenly" alignItems="center">
        <Button py={6} px={16} borderRadius={4} bg={colors.main} mx={6} fontWeight="bold" fontFamily="{fonts.heading}">
          Resume
        </Button>
        <Menu isLazy>
          <MenuButton as={IconButton} aria-label="Menu" icon={<RxHamburgerMenu size={30} />} />
          <MenuList bg={colors.secondary} py={6} px={16} borderRadius={4}>
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
