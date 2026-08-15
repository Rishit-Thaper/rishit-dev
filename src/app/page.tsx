'use client';

import { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import Sidebar, { SectionKey } from '@/components/Portfolio/Sidebar';
import ChatWindow from '@/components/Chat/ChatWindow';
import About from '@/components/Portfolio/About';
import Experience from '@/components/Portfolio/Experience';
import Skills from '@/components/Portfolio/Skills';
import Projects from '@/components/Portfolio/Projects';
import Contact from '@/components/Portfolio/Contact';
import { colors } from '@/tokens/colors';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

export default function Page() {
  const [active, setActive] = useState<SectionKey>('chat');

  return (
    <Flex direction={{ base: 'column', md: 'row' }} align="stretch" h="100%" minH={0} gap={0}>
      <Sidebar active={active} onSelect={setActive} />

      <Box flex="1" minH={0} display="flex" flexDirection="column" overflow="hidden">
        {/* Chat stays mounted so switching tabs never loses the conversation */}
        <Box display={active === 'chat' ? 'flex' : 'none'} flex="1" minH={0} flexDirection="column">
          <ChatWindow />
        </Box>

        {active !== 'chat' && (
          <AnimatePresence mode="wait">
            <MotionBox
              key={active}
              flex="1"
              minH={0}
              display="flex"
              flexDirection="column"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {active === 'about' && <About />}
              {active === 'experience' && <Experience />}
              {active === 'skills' && <Skills />}
              {active === 'projects' && <Projects />}
              {active === 'contact' && <Contact onScheduleCall={() => setActive('chat')} />}
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>

      <AnimatePresence>
        {active !== 'chat' && (
          <MotionIconButton
            key="chat-fab"
            aria-label="Open chat"
            icon={<IoChatbubbleEllipsesOutline size={24} />}
            onClick={() => setActive('chat')}
            position="fixed"
            bottom={{ base: 6, md: 8 }}
            right={{ base: 6, md: 8 }}
            zIndex={20}
            size="lg"
            borderRadius="full"
            bg={colors.highlightText}
            color={colors.text}
            boxShadow="0 8px 24px rgba(65,125,224,0.45)"
            _hover={{ bg: colors.highlightText, opacity: 0.9 }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        )}
      </AnimatePresence>
    </Flex>
  );
}
