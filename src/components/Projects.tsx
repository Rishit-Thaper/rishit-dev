import { Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { projects } from '@/utils/uiElements';
import Project from './Project';
import { colors, fonts } from '@/tokens/colors';

const Projects = () => {
  return (
    <VStack alignItems="flex-start" p={6} bg={colors.secondary} gap={4} id='projects'>
      <Heading fontFamily={fonts.heading}>What I&apos;ve Built and What I&apos;m Building 🚀</Heading>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6}>
        {projects.map((project) => (
          <GridItem
            key={project.title}
            borderColor={colors.borderBlue}
            borderWidth="2px"
            p={4}
            borderRadius={5}
          >
            <Project {...project} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Projects;
