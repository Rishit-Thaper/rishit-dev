import { colors, fonts } from '@/tokens/colors';
import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaProjectDiagram } from 'react-icons/fa';
import { GrTechnology } from 'react-icons/gr';
import { MdCallMade } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiAboutdotme } from 'react-icons/si';

const NavMenuItems = [
  { title: 'About Me', icon: <SiAboutdotme />, url: '#about' },
  { title: 'Skills', icon: <GrTechnology />, url: '#skills' },
  { title: 'Projects', icon: <FaProjectDiagram />, url: '#projects' },
  { title: 'Contact', icon: <MdCallMade />, url: '#contact' },
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
        <Button
          as="a"
          py={6}
          px={16}
          borderRadius={4}
          bg={colors.main}
          mx={6}
          target='_blank'
          fontWeight="bold"
          fontFamily="{fonts.heading}"
          href="https://drive.google.com/file/d/1pbiw-gIYyvqgDhWMY7HdoEJjbs4K0zKO/view?usp=sharing"
        >
          Resume
        </Button>
        <Menu isLazy>
          <MenuButton as={IconButton} aria-label="Menu" icon={<RxHamburgerMenu size={30} />} />
          <MenuList bg={colors.borderBlue} py={6} px={16} borderRadius={4} blur="40px">
            {NavMenuItems.map((item) => (
              <Link href={item.url} key={item.title}>
                <MenuItem key={item.title} icon={item.icon} my={12} color={colors.text}>
                  {item.title}
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Navbar;
