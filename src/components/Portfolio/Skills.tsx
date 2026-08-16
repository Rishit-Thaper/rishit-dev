'use client';

import { SimpleGrid, Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import SectionShell from './SectionShell';
import { colors, fonts } from '@/tokens/colors';
import { skills } from '@/content/portfolioData';

export default function Skills() {
  return (
    <SectionShell title="Skills">
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
        {skills.map((group) => (
          <Box
            key={group.category}
            bg="rgba(255,255,255,0.03)"
            border={`1px solid ${colors.borderBlue}`}
            borderRadius={14}
            p={4}
          >
            <Text fontWeight={700} fontFamily={fonts.heading} fontSize={14} mb={3} color={colors.highlightText}>
              {group.category}
            </Text>
            <Wrap gap={2}>
              {group.items.map((item) => (
                <WrapItem key={item}>
                  <Box px={3} py={1} borderRadius="full" bg="rgba(255,255,255,0.05)" fontSize={13}>
                    {item}
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
}
