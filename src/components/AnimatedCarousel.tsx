import { icons } from '@/utils/uiElements';
import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { colors } from '@/tokens/colors';

const animationDirection = [{ x: ['0%', '-100%'] }, { x: ['-100%', '0%'] }];

const AnimatedCarousel = () => {
  return animationDirection.map((direction, index) => (
    <Box overflow="hidden" width="100%" key={index} mt={5}>
      <motion.div
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
        animate={direction}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
      >
        {icons.map(({ name, icon }) => (
          <Flex key={name} direction="column" align="center" mr={10}>
            <Icon icon={icon} color={colors.greyTwo} />
          </Flex>
        ))}
        {icons.map(({ name, icon }) => (
          <Flex key={name} direction="column" align="center" mr={10}>
            <Icon icon={icon} color={colors.greyTwo} />
          </Flex>
        ))}
      </motion.div>
    </Box>
  ));
};

export default AnimatedCarousel;
