'use client';

import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import SectionShell from './SectionShell';
import { colors } from '@/tokens/colors';
import { about } from '@/content/portfolioData';

export default function About() {
  return (
    <SectionShell title={`Hey, I'm ${about.name} 👋🏻`}>
      <Text fontSize={16} lineHeight={1.7}>
        {about.summary}
      </Text>
      <VStack align="stretch" gap={3} mt={2}>
        {about.highlights.map((h) => (
          <HStack
            key={h}
            align="start"
            gap={3}
            bg="rgba(255,255,255,0.03)"
            border={`1px solid ${colors.borderBlue}`}
            borderRadius={12}
            p={4}
          >
            <Box w="6px" h="6px" borderRadius="full" bg={colors.highlightText} mt={2} flexShrink={0} />
            <Text fontSize={14} color={colors.mutedText}>
              {h}
            </Text>
          </HStack>
        ))}
      </VStack>
    </SectionShell>
  );
}
