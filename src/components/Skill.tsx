import { colors, fonts } from '@/tokens/colors';
import { badges } from '@/utils/uiElements';
import { HStack, Heading, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Skill = () => {
  return (
    <VStack alignItems="flex-start" p={6} bg={colors.secondary} gap={4}>
      <Heading fontFamily={fonts.heading}>What I know 🧑🏻‍💻</Heading>
      <HStack flexWrap="wrap" gap={3}>
        {badges.map((badge, index) => (
          <>
            <Image
              src={badge.imageUrl}
              alt={badge.alt}
              key={index}
              width={50}
              height={28}
              style={{
                width: 'auto',
                height: '28px',
              }}
            />
          </>
        ))}
      </HStack>
    </VStack>
  );
};

export default Skill;
