'use client';

import { Box, VStack, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fonts } from '@/tokens/colors';

const MotionVStack = motion(VStack);

export default function SectionShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box flex="1" minH={0} overflowY="auto" px={{ base: 4, md: 10 }} py={{ base: 6, md: 10 }}>
      <MotionVStack
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        maxW="800px"
        mx="auto"
        align="stretch"
        gap={6}
        pb={10}
      >
        <Heading fontFamily={fonts.heading} fontSize={28}>
          {title}
        </Heading>
        {children}
      </MotionVStack>
    </Box>
  );
}
