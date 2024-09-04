import { Heading, HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Icon } from './Icon';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { colors } from '@/tokens/colors';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectProps {
  title: string;
  desc: string;
  url: string;
  techStack: string[];
}
const Project: React.FC<ProjectProps> = ({ title, desc, url, techStack }) => {
  return (
    <VStack justifyContent="left" alignItems="flex-start" gap={4}>
      <HStack justifyContent="space-around" alignItems="center" gap={4}>
        <HStack alignItems="center">
          <Icon icon={RiGitRepositoryLine} color={colors.greyTwo} size={20} />
        </HStack>
        <Link href={url}>
          <Heading fontSize="1rem" color={colors.highlightText}>
            {title}
          </Heading>
        </Link>
      </HStack>
      <Text fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}>{desc}</Text>

      <HStack flexWrap={'wrap'}>
        {techStack.map((tech) => (
          <Text
            key={tech}
            bg={colors.highlightTextTransparent}
            color={colors.highlightText}
            fontSize="0.75rem"
            px={2}
            py={1}
            borderRadius={32}
          >
            {tech}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
};

export default Project;
