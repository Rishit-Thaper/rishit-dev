'use client';

import { VStack, Text, Box, Wrap, WrapItem, Link as ChakraLink } from '@chakra-ui/react';
import SectionShell from './SectionShell';
import { colors, fonts } from '@/tokens/colors';
import { projects } from '@/content/portfolioData';

export default function Projects() {
  return (
    <SectionShell title="Projects">
      <VStack align="stretch" gap={4}>
        {projects.map((p) => (
          <Box
            key={p.name}
            bg="rgba(255,255,255,0.03)"
            border={`1px solid ${colors.borderBlue}`}
            borderRadius={14}
            p={5}
            transition="transform 0.2s, border-color 0.2s"
            _hover={{ transform: 'translateY(-2px)', borderColor: colors.highlightText }}
          >
            <Text fontWeight={700} fontFamily={fonts.heading} fontSize={16}>
              {p.url ? (
                <ChakraLink href={p.url} isExternal color={colors.text}>
                  {p.name}
                </ChakraLink>
              ) : (
                p.name
              )}
            </Text>
            <Text fontSize={14} color={colors.mutedText} mt={2}>
              {p.description}
            </Text>
            <Wrap mt={3} gap={2}>
              {p.tech.map((t) => (
                <WrapItem key={t}>
                  <Box px={2.5} py={1} borderRadius="full" bg="rgba(65,125,224,0.1)" color={colors.highlightText} fontSize={12}>
                    {t}
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </VStack>
    </SectionShell>
  );
}
