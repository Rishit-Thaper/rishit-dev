import { colors, fonts } from '@/tokens/colors';
import { Link } from '@chakra-ui/next-js';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import HighlightText from './HighlightText';

const About = () => {
  return (
    <VStack alignItems="flex-start" p={6} bg={colors.secondary} gap={4}>
      <Heading fontFamily={fonts.heading}>Hello World 👋🏻</Heading>
      <Text fontFamily={fonts.body} letterSpacing={1} lineHeight={8}>
        I&apos;m <HighlightText text="Rishit" fontWeight="bold" color={colors.highlightText} />, a passionate software
        engineer from India dedicated to <HighlightText text="problem-solving" color={colors.highlightText} />,
        enhancing <HighlightText text="user experiences" color={colors.highlightText} />, and designing{' '}
        <HighlightText text="scalable systems." color={colors.highlightText} />
      </Text>
      <Box>
        <Text lineHeight={8} letterSpacing={1}>
          Let&apos;s connect and grow together! You can find me active on{' '}
          <Link href="https://www.linkedin.com/in/rishit-5463261a6/">
            <HighlightText text="LinkedIn" color={colors.highlightText} />
          </Link>{' '}
          and{' '}
          <Link href="https://github.com/Rishit-Thaper">
            <HighlightText text="Github" color={colors.highlightText} />
          </Link>
          . Feel free to reach out to me at{' '}
          <Link href="mailto:thaperrishit@gmail.com">
            <HighlightText text="thaperrishit@gmail.com" color={colors.highlightText} />
          </Link>
          .
        </Text>
      </Box>
    </VStack>
  );
};

export default About;
