'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { SiAboutdotme } from 'react-icons/si';
import { MdWorkOutline, MdCallMade } from 'react-icons/md';
import { GrTechnology } from 'react-icons/gr';
import { FaProjectDiagram, FaLinkedin } from 'react-icons/fa';
import { FaSquareGithub } from 'react-icons/fa6';
import { colors, fonts } from '@/tokens/colors';
import { contact } from '@/content/portfolioData';

export type SectionKey = 'chat' | 'about' | 'experience' | 'skills' | 'projects' | 'contact';

const NAV_ITEMS: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: 'chat', label: 'Chat', icon: <IoChatbubbleEllipsesOutline size={18} /> },
  { key: 'about', label: 'About', icon: <SiAboutdotme size={16} /> },
  { key: 'experience', label: 'Experience', icon: <MdWorkOutline size={18} /> },
  { key: 'skills', label: 'Skills', icon: <GrTechnology size={16} /> },
  { key: 'projects', label: 'Projects', icon: <FaProjectDiagram size={16} /> },
  { key: 'contact', label: 'Contact', icon: <MdCallMade size={18} /> },
];

const MotionBox = motion(Box);

function NavList({
  active,
  onSelect,
  layoutIdPrefix,
}: {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
  layoutIdPrefix: string;
}) {
  return (
    <VStack align="stretch" gap={1} w="100%">
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <Box
            key={item.key}
            as="button"
            onClick={() => onSelect(item.key)}
            position="relative"
            display="flex"
            alignItems="center"
            gap={3}
            px={4}
            py={2.5}
            borderRadius={10}
            textAlign="left"
            color={isActive ? colors.text : colors.mutedText}
            fontWeight={isActive ? 600 : 500}
            transition="color 0.2s"
            _hover={{ color: colors.text }}
          >
            {isActive && (
              <MotionBox
                layoutId={`${layoutIdPrefix}-active-pill`}
                position="absolute"
                inset={0}
                bg="rgba(65,125,224,0.15)"
                border={`1px solid ${colors.highlightText}`}
                borderRadius={10}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Box position="relative" zIndex={1} display="flex" alignItems="center" gap={3}>
              {item.icon}
              <Text fontSize={14}>{item.label}</Text>
            </Box>
          </Box>
        );
      })}
    </VStack>
  );
}

function BrandHeader() {
  return (
    <HStack gap={3} px={2}>
      <Box w="36px" h="36px" borderRadius="full" overflow="hidden" border={`1px solid ${colors.borderBlue}`}>
        <Image src="/rishit.png" alt="Rishit" width={36} height={36} style={{ objectFit: 'cover' }} />
      </Box>
      <Text fontFamily={fonts.heading} fontSize={18} fontWeight={700}>
        Rishit
      </Text>
    </HStack>
  );
}

function SocialRow() {
  return (
    <HStack gap={4} px={2}>
      <ChakraLink href={contact.linkedin} isExternal color={colors.mutedText} _hover={{ color: colors.highlightText }}>
        <FaLinkedin size={18} />
      </ChakraLink>
      <ChakraLink href={contact.github} isExternal color={colors.mutedText} _hover={{ color: colors.highlightText }}>
        <FaSquareGithub size={18} />
      </ChakraLink>
      <ChakraLink href={`mailto:${contact.email}`} color={colors.mutedText} _hover={{ color: colors.highlightText }}>
        <MdCallMade size={18} />
      </ChakraLink>
    </HStack>
  );
}

export default function Sidebar({
  active,
  onSelect,
}: {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (key: SectionKey) => {
    onSelect(key);
    onClose();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <VStack
        display={{ base: 'none', md: 'flex' }}
        w="240px"
        flexShrink={0}
        h="100%"
        bg={colors.secondary}
        borderRight={`1px solid ${colors.borderBlue}`}
        py={6}
        px={3}
        gap={8}
        align="stretch"
      >
        <BrandHeader />
        <NavList active={active} onSelect={onSelect} layoutIdPrefix="desktop" />
        <Box flex="1" />
        <SocialRow />
      </VStack>

      {/* Mobile top bar */}
      <HStack
        display={{ base: 'flex', md: 'none' }}
        justify="space-between"
        align="center"
        bg={colors.secondary}
        borderBottom={`1px solid ${colors.borderBlue}`}
        px={4}
        py={3}
        flexShrink={0}
      >
        <BrandHeader />
        <IconButton
          aria-label="Menu"
          icon={<RxHamburgerMenu size={20} />}
          onClick={onOpen}
          variant="ghost"
          color={colors.text}
        />
      </HStack>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={colors.secondary} maxW="260px">
          <DrawerBody py={6} px={3} display="flex" flexDirection="column" gap={8}>
            <BrandHeader />
            <NavList active={active} onSelect={handleSelect} layoutIdPrefix="mobile" />
            <Box flex="1" />
            <SocialRow />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
