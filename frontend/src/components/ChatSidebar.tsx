import React, { useEffect, useState } from "react";
import { deleteChat, renameChat } from "../api/chatAPI";
import { FaTrash, FaEdit, FaComments, FaSun, FaMoon } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTheme } from "./themeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import unrwaLogo from "../assets/unrwa-logo.png";

interface Chat {
  chat_id: string;
  title: string;
}

interface SidebarProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  chats: Chat[];
  onChatDeleted: (chatId: string) => void;
  currentChatId: string | null;
}

const ChatSidebar: React.FC<SidebarProps> = ({
  onSelectChat,
  onNewChat,
  chats,
  onChatDeleted,
  currentChatId,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarChats, setSidebarChats] = useState<Chat[]>(chats);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    setSidebarChats(chats);
  }, [chats]);

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
      onChatDeleted(chatId);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleRenameChat = async (chatId: string) => {
    if (!newTitle.trim()) return;
    try {
      await renameChat(chatId, newTitle);
      setSidebarChats((prev) =>
        prev.map((chat) =>
          chat.chat_id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
      setEditingChatId(null);
      setNewTitle("");
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  return (
    <div className="w-1/4 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* UNRWA Logo */}
      <div className="p-4 border-b border-gray-200 text-center">
        <img src={unrwaLogo} alt="UNRWA" className="w-28 mx-auto mb-2 rounded" />
        <p className="text-sm text-gray-600 font-semibold">UNRWA Secure Chat</p>
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onNewChat}
          className="w-full h-14 py-6 bg-[#0072bc] text-white hover:bg-[#005fa3] flex items-center justify-center gap-3 text-lg rounded-lg shadow"
        >
          <FaEdit />
          <span>New Chat</span>
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <h2 className="text-lg font-semibold text-[#0072bc] mb-4 flex items-center gap-2">
          <FaComments />
          <span>All Chats</span>
        </h2>
        <ul className="space-y-2">
          {sidebarChats.map((chat) => (
            <li
              key={chat.chat_id}
              className={`cursor-pointer p-2 rounded-md flex justify-between items-center border ${
                currentChatId === chat.chat_id
                  ? "bg-[#e6f2fb] border-[#0072bc]"
                  : "bg-white hover:bg-[#f0faff] border-gray-300"
              }`}
              onClick={() => onSelectChat(chat.chat_id)}
            >
              {editingChatId === chat.chat_id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameChat(chat.chat_id);
                    if (e.key === "Escape") setEditingChatId(null);
                  }}
                  className="flex-1 rounded p-1 text-sm border border-gray-300"
                  placeholder="Enter new title"
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-sm truncate">{chat.title || "Untitled Chat"}</span>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="hover:bg-gray-200 px-1">
                    <BsThreeDots />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-md">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingChatId(chat.chat_id);
                      setNewTitle(chat.title || "");
                    }}
                    className="flex items-center gap-2 hover:bg-gray-100"
                  >
                    <DropdownMenuShortcut>
                      <FaEdit size={16} />
                    </DropdownMenuShortcut>
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.chat_id);
                    }}
                    className="flex items-center gap-2 hover:bg-gray-100"
                  >
                    <DropdownMenuShortcut>
                      <FaTrash size={16} className="text-red-500" />
                    </DropdownMenuShortcut>
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <button onClick={toggleTheme} className="text-[#0072bc] hover:text-[#005fa3]">
          {isDarkMode ? <FaSun size={22} /> : <FaMoon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
