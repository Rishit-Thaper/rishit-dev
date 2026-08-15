'use client';

import { HStack, Text, Button, Link as ChakraLink } from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareGithub, FaSquareXTwitter } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import { SiGmail } from 'react-icons/si';
import SectionShell from './SectionShell';
import { colors } from '@/tokens/colors';
import { contact } from '@/content/portfolioData';

const LINKS = [
  { href: contact.linkedin, icon: FaLinkedin, label: 'LinkedIn', external: true },
  { href: contact.github, icon: FaSquareGithub, label: 'GitHub', external: true },
  { href: `mailto:${contact.email}`, icon: SiGmail, label: 'Email', external: false },
  { href: contact.instagram, icon: RiInstagramFill, label: 'Instagram', external: true },
  { href: contact.twitter, icon: FaSquareXTwitter, label: 'X', external: true },
];

export default function Contact({ onScheduleCall }: { onScheduleCall: () => void }) {
  return (
    <SectionShell title="Let's connect 🤙🏻">
      <Text fontSize={15} color={colors.mutedText}>
        Best way to reach me is email, or just ask my chatbot to set up a call , it checks my real calendar and
        books it.
      </Text>

      <HStack gap={3} wrap="wrap">
        {LINKS.map(({ href, icon: Icon, label, external }) => (
          <ChakraLink key={label} href={href} isExternal={external} aria-label={label}>
            <HStack
              gap={2}
              px={4}
              py={2.5}
              borderRadius="full"
              border={`1px solid ${colors.borderBlue}`}
              bg="rgba(255,255,255,0.03)"
              color={colors.text}
              _hover={{ borderColor: colors.highlightText, color: colors.highlightText }}
              transition="all 0.2s"
            >
              <Icon size={18} />
              <Text fontSize={14}>{label}</Text>
            </HStack>
          </ChakraLink>
        ))}
      </HStack>

      <HStack gap={3} pt={4} wrap="wrap">
        <Button
          as="a"
          href={contact.resumeUrl}
          target="_blank"
          borderRadius="full"
          bg={colors.highlightText}
          color={colors.text}
          _hover={{ opacity: 0.85 }}
        >
          📄 Download Resume
        </Button>
        <Button
          onClick={onScheduleCall}
          borderRadius="full"
          variant="outline"
          borderColor={colors.highlightText}
          color={colors.text}
          _hover={{ bg: 'rgba(65,125,224,0.1)' }}
        >
          📅 Schedule a Call
        </Button>
      </HStack>
    </SectionShell>
  );
}
