import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatState } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { Bot } from 'lucide-react';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: 'Hello! How can I assist you today?',
        role: 'assistant',
        timestamp: new Date(),
      },
    ],
    isTyping: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const simulateResponse = async (userMessage: string) => {
    setChatState(prev => ({ ...prev, isTyping: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      "I understand your question. Let me help you with that.",
      "Thank you for asking. Here's what I can tell you about that.",
      "I'd be happy to assist you with your inquiry.",
      "That's a great question. Let me provide you with the information.",
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    setChatState(prev => ({
      isTyping: false,
      messages: [...prev.messages, {
        id: Date.now().toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      }],
    }));
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    simulateResponse(content);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white text-lg font-semibold">Customer Support Assistant</h1>
              <p className="text-blue-100 text-sm">Always here to help</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-4 flex flex-col gap-4">
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={chatState.isTyping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;