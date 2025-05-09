import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaRegLightbulb } from "react-icons/fa";
import { useTheme } from "./themeContext";

interface MessageBubbleProps {
  role: "user" | "bot";
  content: string | React.ReactNode;
}

const isArabic = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const { isDarkMode } = useTheme();

  if (content === null || content === undefined) return null;

  const isStringContent = typeof content === "string";
  let thinkContent = "";
  let mainContent = content;

  if (isStringContent) {
    const thinkMatch = (content as string).match(/<think>([\s\S]*?)<\/think>/);
    thinkContent = thinkMatch ? thinkMatch[1].trim() : "";
    mainContent = thinkMatch
      ? (content as string).replace(thinkMatch[0], "").trim()
      : content;
  }

  const isArabicContent = isStringContent && isArabic(mainContent as string);

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-6`}>
      <div
        className={`px-5 py-3 rounded-xl text-base relative leading-relaxed shadow-md ${
          role === "user"
            ? "bg-[#0072bc] text-white"
            : isDarkMode
              ? "bg-gray-100 text-gray-800"
              : "bg-[#f0f9ff] text-gray-800"
        } max-w-3xl`}
      >
        {thinkContent && (
          <div
            className={`mb-4 p-3 border-l-4 rounded text-sm shadow-sm ${
              isDarkMode
                ? "bg-gray-200 border-blue-300 text-gray-800"
                : "bg-blue-50 border-[#0072bc] text-[#003a63]"
            }`}
            style={{ direction: isArabicContent ? "rtl" : "ltr" }}
          >
            <span className="font-semibold flex items-center gap-2 mb-1">
              <FaRegLightbulb className="text-yellow-400" />
              Thinking Phase
            </span>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {thinkContent.replace(/\n/g, "  \n")}
            </ReactMarkdown>
          </div>
        )}

        {isStringContent ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => <h1 className="text-xl font-bold mb-2" {...props} />,
              h2: (props) => <h2 className="text-lg font-bold mb-2" {...props} />,
              p: (props) => (
                <p
                  className="mb-2"
                  style={{ direction: isArabicContent ? "rtl" : "ltr" }}
                  {...props}
                />
              ),
              li: (props) => (
                <li
                  className="ml-4 list-disc"
                  style={{ direction: isArabicContent ? "rtl" : "ltr" }}
                  {...props}
                />
              ),
              a: (props) => (
                <a
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {(mainContent as string).replace(/\n/g, "  \n")}
          </ReactMarkdown>
        ) : (
          mainContent
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
