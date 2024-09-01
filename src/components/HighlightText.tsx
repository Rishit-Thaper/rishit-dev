import { Box } from '@chakra-ui/react';
import React from 'react';

interface HighlightTextProps {
  color: string;
  text: string;
  fontWeight?: string;
}
const HighlightText: React.FC<HighlightTextProps> = ({ color, text, fontWeight }) => {
  return (
    <Box as="span" fontWeight={fontWeight} color={color}>
      {text}
    </Box>
  );
};

export default HighlightText;
