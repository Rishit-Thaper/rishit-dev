'use client';

import { VStack, HStack, Text, Box, UnorderedList, ListItem } from '@chakra-ui/react';
import SectionShell from './SectionShell';
import { colors, fonts } from '@/tokens/colors';
import { experience, achievements, education } from '@/content/portfolioData';

export default function Experience() {
  return (
    <SectionShell title="Experience">
      <VStack align="stretch" gap={5}>
        {experience.map((job) => (
          <Box
            key={job.company}
            bg="rgba(255,255,255,0.03)"
            border={`1px solid ${colors.borderBlue}`}
            borderRadius={14}
            p={5}
          >
            <HStack justify="space-between" flexWrap="wrap" gap={2}>
              <Text fontWeight={700} fontFamily={fonts.heading}>
                {job.title} · {job.company}
              </Text>
              <Text fontSize={13} color={colors.mutedText}>
                {job.dates}
              </Text>
            </HStack>
            <Text fontSize={13} color={colors.mutedText} mb={3}>
              {job.location}
            </Text>
            <UnorderedList spacing={2} fontSize={14} pl={4}>
              {job.bullets.map((b) => (
                <ListItem key={b}>{b}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        ))}

        {achievements.map((a) => (
          <Box
            key={a.title}
            bg="rgba(65,125,224,0.06)"
            border={`1px solid ${colors.highlightText}`}
            borderRadius={14}
            p={5}
          >
            <HStack justify="space-between" flexWrap="wrap" gap={2}>
              <Text fontWeight={700}>🏆 {a.title}</Text>
              <Text fontSize={13} color={colors.mutedText}>
                {a.dates}
              </Text>
            </HStack>
            <Text fontSize={14} mt={2}>
              {a.description}
            </Text>
          </Box>
        ))}

        <Box bg="rgba(255,255,255,0.03)" border={`1px solid ${colors.borderBlue}`} borderRadius={14} p={5}>
          <Text fontWeight={700} fontFamily={fonts.heading} mb={1}>
            🎓 {education.degree}
          </Text>
          <Text fontSize={13} color={colors.mutedText}>
            {education.school} · {education.location} · {education.dates}
          </Text>
          <Text fontSize={13} color={colors.mutedText} mt={1}>
            {education.cgpa}
          </Text>
          <Text fontSize={13} mt={3}>
            Coursework: {education.coursework.join(', ')}
          </Text>
        </Box>
      </VStack>
    </SectionShell>
  );
}
