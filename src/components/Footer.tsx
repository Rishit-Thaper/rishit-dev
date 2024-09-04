import { footerIcons } from '@/utils/uiElements';
import { VStack, HStack, Heading } from '@chakra-ui/react';
import { Icon } from './Icon';
import { Link } from '@chakra-ui/next-js';
import { colors, fonts } from '@/tokens/colors';

const Footer = () => {
  return (
    <VStack p={30} bg={colors.secondary} gap={30} id='contact'>
      <Heading fontFamily={fonts.heading} fontWeight="bold" fontSize={20}>
        Connect with me 🤙🏻
      </Heading>
      <HStack gap={20}>
        {footerIcons.map((icon, index) => (
          <Link href={icon.links} key={index}>
            <Icon icon={icon.icon} color={colors.highlightText} />
          </Link>
        ))}
      </HStack>
    </VStack>
  );
};

export default Footer;
