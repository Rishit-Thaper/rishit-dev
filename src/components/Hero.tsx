import { Box, Button, VStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { colors, fonts } from '@/tokens/colors';
import AnimatedCarousel from './AnimatedCarousel';
const Hero = () => {
  return (
    <VStack justifyContent="center" alignItems="center" h={'70vh'}>
      <Image src="/rishit.png" width={150} height={150} alt="rishit" />
      <Heading pt={6} fontFamily={fonts.heading} size="xl">
        Hello! I&apos;m{' '}
        <Text as="span" color={colors.highlightText}>
          Rishit
        </Text>
      </Heading>
      <Heading as="h3" size="md" textAlign="center" fontFamily={fonts.heading} color={colors.greyTwo}>
        Full Stack, full passion, full code!
      </Heading>
      <AnimatedCarousel />
    </VStack>
  );
};

export default Hero;
