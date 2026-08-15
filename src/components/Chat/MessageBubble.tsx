import { Box, HStack, VStack, Text, Wrap, WrapItem, Button, Link as ChakraLink, UnorderedList, OrderedList, ListItem, Code } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { colors, fonts } from '@/tokens/colors';

export type ToolEvent = { name: string; args: Record<string, unknown>; result: any };

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolEvents?: ToolEvent[];
  streaming?: boolean;
};

const MotionBox = motion(Box);

function formatSlot(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getMarkdownComponents(isUser: boolean) {
  // Links default to highlightText (blue), but user bubbles are ALSO blue —
  // blue-on-blue would blend, so links inside a user bubble go white instead.
  const linkColor = isUser ? colors.text : colors.highlightText;
  return {
    p: (props: React.ComponentProps<'p'>) => <Text mb={2} lineHeight={1.6} {...props} />,
    a: (props: React.ComponentProps<'a'>) => (
      <ChakraLink color={linkColor} textDecoration="underline" isExternal {...props} />
    ),
    ul: (props: React.ComponentProps<'ul'>) => <UnorderedList mb={2} pl={4} {...props} />,
    ol: (props: React.ComponentProps<'ol'>) => <OrderedList mb={2} pl={4} {...props} />,
    li: (props: React.ComponentProps<'li'>) => <ListItem {...props} />,
    code: (props: React.ComponentProps<'code'>) => (
      <Code bg={colors.main} color={colors.highlightText} px={1} borderRadius={4} {...props} />
    ),
    h1: (props: React.ComponentProps<'h1'>) => (
      <Text as="h1" fontSize="lg" fontWeight={700} mt={2} mb={1} fontFamily={fonts.heading} {...props} />
    ),
    h2: (props: React.ComponentProps<'h2'>) => (
      <Text as="h2" fontSize="md" fontWeight={700} mt={2} mb={1} fontFamily={fonts.heading} {...props} />
    ),
    h3: (props: React.ComponentProps<'h3'>) => (
      <Text as="h3" fontSize="sm" fontWeight={700} mt={2} mb={1} fontFamily={fonts.heading} {...props} />
    ),
  };
}

function ToolCards({ toolEvents, onPickSlot }: { toolEvents: ToolEvent[]; onPickSlot: (iso: string) => void }) {
  return (
    <VStack align="stretch" gap={2} mt={2}>
      {toolEvents.map((event, i) => {
        if (event.name === 'get_resume' && event.result?.url) {
          return (
            <Box key={i} p={3} borderRadius={10} bg={colors.main} border={`1px solid ${colors.borderBlue}`}>
              <ChakraLink href={event.result.url} isExternal color={colors.highlightText} fontWeight="bold">
                📄 Download my Resume
              </ChakraLink>
            </Box>
          );
        }

        if (event.name === 'get_linkedin' && event.result?.url) {
          return (
            <Box key={i} p={3} borderRadius={10} bg={colors.main} border={`1px solid ${colors.borderBlue}`}>
              <ChakraLink href={event.result.url} isExternal color={colors.highlightText} fontWeight="bold">
                🔗 View my LinkedIn
              </ChakraLink>
            </Box>
          );
        }

        if (event.name === 'get_github' && event.result?.url) {
          const { url, bio, publicRepos, followers, topRepos } = event.result;
          return (
            <Box key={i} p={3} borderRadius={10} bg={colors.main} border={`1px solid ${colors.borderBlue}`}>
              <ChakraLink href={url} isExternal color={colors.highlightText} fontWeight="bold">
                🐙 View my GitHub
              </ChakraLink>
              {bio && (
                <Text fontSize={13} mt={1}>
                  {bio}
                </Text>
              )}
              {(publicRepos !== null || followers !== null) && (
                <Text fontSize={12} color={colors.mutedText} mt={1}>
                  {publicRepos !== null && `${publicRepos} public repos`}
                  {publicRepos !== null && followers !== null && ' · '}
                  {followers !== null && `${followers} followers`}
                </Text>
              )}
              {Array.isArray(topRepos) && topRepos.length > 0 && (
                <VStack align="stretch" gap={1} mt={2}>
                  {topRepos.slice(0, 5).map((repo: { name: string; url: string; description: string | null }) => (
                    <ChakraLink key={repo.url} href={repo.url} isExternal fontSize={13} color={colors.highlightText}>
                      {repo.name}
                      {repo.description ? ` , ${repo.description}` : ''}
                    </ChakraLink>
                  ))}
                </VStack>
              )}
            </Box>
          );
        }

        if (event.name === 'schedule_call' && (event.result?.eventLink || event.result?.meetLink)) {
          return (
            <Box key={i} p={3} borderRadius={10} bg={colors.main} border={`1px solid ${colors.borderBlue}`}>
              <Text fontWeight="bold" mb={1}>
                ✅ Call booked!
              </Text>
              {event.result.meetLink && (
                <Text>
                  <ChakraLink href={event.result.meetLink} isExternal color={colors.highlightText}>
                    Join on Google Meet
                  </ChakraLink>
                </Text>
              )}
              {event.result.eventLink && (
                <Text>
                  <ChakraLink href={event.result.eventLink} isExternal color={colors.highlightText}>
                    View on Google Calendar
                  </ChakraLink>
                </Text>
              )}
            </Box>
          );
        }

        if (event.name === 'check_availability' && Array.isArray(event.result?.slots)) {
          if (event.result.slots.length === 0) {
            return (
              <Text key={i} fontSize={13} color={colors.mutedText}>
                No open slots found that day , try another date?
              </Text>
            );
          }
          return (
            <Wrap key={i}>
              {event.result.slots.slice(0, 6).map((iso: string) => (
                <WrapItem key={iso}>
                  <Button
                    size="xs"
                    variant="outline"
                    borderColor={colors.highlightText}
                    color={colors.highlightText}
                    borderRadius="full"
                    _hover={{ bg: colors.highlightText, color: colors.text }}
                    onClick={() => onPickSlot(iso)}
                  >
                    {formatSlot(iso)}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          );
        }

        return null;
      })}
    </VStack>
  );
}

function Avatar() {
  return (
    <Box
      w="32px"
      h="32px"
      borderRadius="full"
      overflow="hidden"
      flexShrink={0}
      border={`1px solid ${colors.borderBlue}`}
      bg={colors.main}
    >
      <Image src="/rishit.png" alt="Rishit" width={32} height={32} style={{ objectFit: 'cover' }} />
    </Box>
  );
}

export default function MessageBubble({
  message,
  onPickSlot,
}: {
  message: ChatMessage;
  onPickSlot: (iso: string) => void;
}) {
  const isUser = message.role === 'user';
  const isEmpty = !message.content && message.streaming;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.7 }}
    >
      <HStack justify={isUser ? 'flex-end' : 'flex-start'} align="flex-start" gap={2}>
        {!isUser && <Avatar />}
        <Box
          maxW="80%"
          bg={isUser ? colors.highlightText : 'rgba(255,255,255,0.04)'}
          backdropFilter={isUser ? undefined : 'blur(6px)'}
          border={isUser ? 'none' : `1px solid ${colors.borderBlue}`}
          color={colors.text}
          px={4}
          py={2.5}
          borderRadius={16}
          borderTopLeftRadius={isUser ? 16 : 4}
          borderTopRightRadius={isUser ? 4 : 16}
          fontFamily={fonts.body}
          boxShadow={isUser ? '0 4px 14px rgba(65,125,224,0.25)' : '0 2px 10px rgba(0,0,0,0.2)'}
        >
          {message.content && (
            <Box fontSize={15}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents(isUser)}>
                {message.content}
              </ReactMarkdown>
              {message.streaming && <Box as="span" className="streaming-cursor" />}
            </Box>
          )}
          {isEmpty && (
            <HStack gap={1} py={1}>
              <Box as="span" className="typing-dot" />
              <Box as="span" className="typing-dot" />
              <Box as="span" className="typing-dot" />
            </HStack>
          )}
          {!isUser && !message.streaming && message.toolEvents && message.toolEvents.length > 0 && (
            <ToolCards toolEvents={message.toolEvents} onPickSlot={onPickSlot} />
          )}
        </Box>
      </HStack>
    </MotionBox>
  );
}
