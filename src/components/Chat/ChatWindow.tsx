'use client';

import { useRef, useState } from 'react';
import { Box, VStack, HStack, Textarea, IconButton, Text, Wrap, WrapItem, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MdSend } from 'react-icons/md';
import { colors, fonts } from '@/tokens/colors';
import MessageBubble, { ChatMessage, ToolEvent } from './MessageBubble';

const SUGGESTIONS = [
  { icon: '💼', label: 'What are your skills?' },
  { icon: '🚀', label: 'Tell me about your projects' },
  { icon: '📄', label: 'Send me your resume' },
  { icon: '📅', label: 'Schedule a call with you' },
];

const MotionButton = motion(Button);

let idCounter = 0;
const nextId = () => `msg-${(idCounter += 1)}`;

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { id: nextId(), role: 'user', content: trimmed };
    const assistantId = nextId();
    const history = [...messages, userMessage];

    setMessages([...history, { id: assistantId, role: 'assistant', content: '', streaming: true }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);
    scrollToBottom();

    const updateAssistant = (patch: Partial<ChatMessage>) =>
      setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m)));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong.');
      }
      if (!res.body) throw new Error('No response stream.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let toolEvents: ToolEvent[] | undefined;
      let errorMessage: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.type === 'token') {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + event.text } : m)),
            );
            scrollToBottom();
          } else if (event.type === 'done') {
            toolEvents = event.toolEvents;
          } else if (event.type === 'error') {
            errorMessage = event.message;
          }
        }
      }

      if (errorMessage) {
        updateAssistant({ content: errorMessage, streaming: false });
      } else {
        updateAssistant({ streaming: false, toolEvents });
      }
    } catch (err) {
      updateAssistant({
        content: err instanceof Error ? err.message : 'Something went wrong , please try again.',
        streaming: false,
      });
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  function handleSlotPick(slotISO: string) {
    const formatted = new Date(slotISO).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
    send(`Please book the ${formatted} slot for me.`);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }

  return (
    <Box position="relative" flex="1" display="flex" flexDirection="column" minH={0} overflow="hidden">
      <Box
        position="absolute"
        top="-15%"
        left="50%"
        transform="translateX(-50%)"
        w="700px"
        h="500px"
        bg={colors.highlightText}
        opacity={0.1}
        filter="blur(140px)"
        borderRadius="full"
        pointerEvents="none"
      />

      <Box ref={scrollRef} flex="1" overflowY="auto" px={4} py={6} position="relative" zIndex={1}>
        <VStack
          maxW="720px"
          mx="auto"
          align="stretch"
          gap={4}
          minH="100%"
          justify={messages.length === 0 ? 'center' : 'flex-start'}
        >
          {messages.length === 0 ? (
            <VStack gap={5} textAlign="center" px={4} pb={10}>
              <Box
                w="76px"
                h="76px"
                borderRadius="full"
                overflow="hidden"
                border={`2px solid ${colors.highlightText}`}
                boxShadow="0 0 30px rgba(65,125,224,0.35)"
              >
                <Image src="/rishit.png" alt="Rishit" width={76} height={76} style={{ objectFit: 'cover' }} />
              </Box>
              <VStack gap={1}>
                <Text fontFamily={fonts.heading} fontSize={24} fontWeight={700}>
                  Hey, I&apos;m Rishit 👋🏻
                </Text>
                <Text fontSize={14} color={colors.mutedText} maxW="380px">
                  Ask me about my skills, experience, and projects, or grab my resume and book a call with me.
                </Text>
              </VStack>
              <Wrap justify="center" gap={2} pt={2}>
                {SUGGESTIONS.map((s, i) => (
                  <WrapItem key={s.label}>
                    <MotionButton
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                      whileHover={{ scale: 1.04, borderColor: colors.highlightText }}
                      whileTap={{ scale: 0.97 }}
                      size="sm"
                      variant="outline"
                      borderRadius="full"
                      borderColor={colors.borderBlue}
                      color={colors.text}
                      bg="rgba(255,255,255,0.03)"
                      _hover={{ bg: 'rgba(255,255,255,0.08)', color: colors.text }}
                      onClick={() => send(s.label)}
                    >
                      {s.icon} {s.label}
                    </MotionButton>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} onPickSlot={handleSlotPick} />
              ))}
            </AnimatePresence>
          )}
        </VStack>
      </Box>

      <Box px={4} pb={6} pt={2} position="relative" zIndex={1}>
        <HStack
          as="form"
          maxW="720px"
          mx="auto"
          align="flex-end"
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(10px)"
          border={`1px solid ${colors.borderBlue}`}
          borderRadius="24px"
          px={2}
          py={1.5}
          boxShadow="0 8px 30px rgba(0,0,0,0.35)"
          transition="border-color 0.2s"
          _focusWithin={{ borderColor: colors.highlightText }}
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!loading) send(input);
              }
            }}
            placeholder="Ask me anything, or say 'schedule a call'..."
            variant="unstyled"
            resize="none"
            rows={1}
            minH="40px"
            maxH="120px"
            px={3}
            py={2}
            fontSize={15}
            isDisabled={loading}
          />
          <IconButton
            aria-label="Send"
            icon={<MdSend size={18} />}
            type="submit"
            borderRadius="full"
            bg={colors.highlightText}
            color={colors.text}
            flexShrink={0}
            _hover={{ opacity: 0.85 }}
            _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
            isDisabled={loading || !input.trim()}
          />
        </HStack>
      </Box>
    </Box>
  );
}
