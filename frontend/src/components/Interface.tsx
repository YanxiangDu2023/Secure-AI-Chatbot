import React, { useEffect, useState } from "react";
import { sendMessage, sendMessageStream, startNewChat, fetchChatHistoryById, fetchChatHistory } from "../api/chatAPI";
import ChatSidebar from "./ChatSidebar";
import MessageBubble from "./MessageBubble";
import { TypingIndicator } from "./typingIndicator";
import { useTheme } from "./themeContext";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface Chat {
  chat_id: string;
  title: string;
}

const ChatInterface: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await fetchChatHistory();
      setChatHistory(history);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setIsTyping(true);
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);
      let fullResponse = "";
      const responseStream = await sendMessageStream(currentChatId, input);

      for await (const chunk of responseStream) {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, content: fullResponse } : msg
          )
        );
      }

      if (!currentChatId) {
        const { chat_id } = await sendMessage(null, input);
        setCurrentChatId(chat_id);
        await loadChatHistory();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await startNewChat();
      setCurrentChatId(newChat.chat_id);
      setMessages([]);
      await loadChatHistory();
    } catch (error) {
      console.error("Error starting a new chat:", error);
    }
  };

  const handleSelectChat = async (chatId: string) => {
    try {
      const chatMessages = await fetchChatHistoryById(chatId);
      setCurrentChatId(chatId);
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
  };

  return (
    <div className={`flex h-screen font-sans ${isDarkMode ? "bg-gray-900 text-white" : "bg-[#f0faff] text-gray-800"}`}>
      <ChatSidebar
        chats={chatHistory}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onChatDeleted={(chatId: string) => {
          setChatHistory((prev) => prev.filter((chat) => chat.chat_id !== chatId));
          if (currentChatId === chatId) {
            setCurrentChatId(null);
            setMessages([]);
          }
        }}
        currentChatId={currentChatId}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          {messages.map((msg, index) => (
            <MessageBubble key={index} role={msg.role} content={msg.content} />
          ))}
          {isTyping && <MessageBubble role="bot" content={<TypingIndicator />} />}
        </div>
        <div className="p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <textarea
              className="w-full p-4 pr-24 pl-4 border rounded shadow-sm resize-none focus:ring-2 focus:ring-[#0072bc] dark:bg-gray-900 dark:border-gray-700"
              placeholder="Type a message..."
              value={input}
              rows={3}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="absolute right-4 bottom-4">
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#0072bc] text-white rounded hover:bg-[#005fa3] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
