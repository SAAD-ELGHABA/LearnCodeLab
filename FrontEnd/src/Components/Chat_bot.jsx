import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import spinner from "../Assets/spinner.gif";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { msgChatAi } from "../redux/action";
import { Link } from "react-router-dom";
import { themes } from "../lib/themes.js";

const SUGGESTIONS = [
  "How do I start a new project?",
  "What is React?",
  "How can I use JavaScript in this platform?",
  "Show me HTML basics.",
  "How do I change the theme?",
];

// Function to turn route paths in AI text into clickable links
function linkify(text) {
  const routePaths = [
    "/user",
    "/settings",
    "/saves",
    "/groups",
    "/languages",
    "/resources",
    "/help",
    "/add",
    "/collection/details", // shortened for dynamic param routes
    "/profile",
  ];

  let linkedText = text;

  routePaths.forEach((routeBase) => {
    const regex = new RegExp(`(${routeBase}[\\w\\/\\-\\:\\@\\.]*)`, "g");

    linkedText = linkedText.replace(regex, (match) => {
      const href = match.startsWith("/") ? match : `/${match}`;

      return `<a href="${href}" rel="noopener noreferrer" class="text-blue-500 ">${match}</a>`;
    });
  });

  return linkedText;
}

const ChatBot = () => {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const messagesChatAi = useSelector((state) => state.ChatAiReducer);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languagesReducer);
  const routes = [
    { path: "/user", description: "User home page" },
    { path: "/settings", description: "User settings page" },
    { path: "/saves", description: "Saved items" },
    { path: "/groups", description: "Groups page" },
    { path: "/languages", description: "Programming languages page" },
    { path: "/resources", description: "Learning resources" },
    { path: "/help", description: "Help and support" },
    { path: "/add", description: "Add new content" },
    {
      path: "/collection/details/",
      description: "Collection details page",
    },
    { path: "/profile", description: "User profile page" },
  ];
  const routesList = routes
    .map((r) => `- ${r.path}: ${r.description}`)
    .join("\n");

  const conversationRef = useRef(null);
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messagesChatAi]);

  const sendMessage = async (customInput) => {
    const message = typeof customInput === "string" ? customInput : input;
    if (message.trim() === "") return;
    dispatch(msgChatAi({ data: message, role: "user" }));

    setThinking(true);
    const languageNames = languages.map((lang) => lang.name).join(", ");

    const systemMessage = {
      role: "system",
      content: `
You are a helpful and concise AI assistant for a platform called LearnCodeLab —  
a community of trainers focused on programming and software development. Here you can share and post your questions and even your codes!

You can answer questions related to programming concepts or how to navigate the platform.

### ✍️ Formatting Instructions (VERY IMPORTANT):
- Use **markdown syntax** in your answers.
- When writing steps, use **a numbered list** with **each step on a new line**.
- To force line breaks in markdown, add **two spaces at the end of each step** or use a **newline character** (`+"\\n"+`) explicitly.
- **DO NOT** put all steps in one paragraph.

✅ Example of a good answer:
Sure! Here are the steps to create a collection on LearnCodeLab:  
1. Visit the [Add](/add) page on LearnCodeLab.  
2. Click on the "Create Collection" button.  
3. Enter the title and description for your collection.  
4. Add appropriate tags to facilitate searchability.  
5. Upload a cover image for your collection.  
6. Click the "Save" button to save your collection.  
7. Your collection is now visible on your profile.  

Supported programming languages: ${languageNames}

The platform contains the following routes:  
${routesList}

When answering:
- Format clearly using markdown.
- If you mention a route, include a clickable [link] and a short description.
- Keep your answer concise (under 150 words).
- Use icons 
`.trim(),
    };

    const chatHistoryMessages = messagesChatAi.map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.data,
    }));
    const userMessage = {
      role: "user",
      content: message,
    };

    const messages = [systemMessage, ...chatHistoryMessages, userMessage];

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "HTTP-Referer": "http://localhost:3000/",
            "X-Title": "LearnCodeLab",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: messages,
            max_tokens: 100,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(
          msgChatAi({
            data: data.choices[0]?.message?.content || "No response",
            role: "ai",
          })
        );
      } else {
        throw new Error(data.error?.message || "Failed to fetch AI response");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setThinking(false);
      setInput("");
    }
  };

  return (
    <div
      className="h-[90%] rounded-xl w-[70%] flex flex-col justify-center items-center shadow shadow-blue-500"
      style={{
        backgroundColor: themes.find((theme) => theme.name === choosedTheme)
          .colors[0],
        color: themes.find((theme) => theme.name === choosedTheme).textColor,
        border: `1px solid ${
          themes.find((theme) => theme.name === choosedTheme).borderColor
        }`,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-5/6  mx-auto ">
        <div
          className="flex items-center justify-between pb-2"
          style={{
            borderBottom: `1px solid ${
              themes.find((theme) => theme.name === choosedTheme).colors[2]
            }`,
          }}
        >
          <div className="flex items-center space-x-2 text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            <Bot className="h-7 w-7 text-blue-400" />
            <h1>Ask the assistant ai to guide you through our plateform</h1>
          </div>
          <div className="flex space-x-2 text-sm items-center text-blue-400">
            <Link
              className="flex items-center px-4 py-2"
              to={"/help"}
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[1],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[2];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[1];
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <p>Go to the help section</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col h-[500px] ">
          <div className="flex flex-wrap gap-2 my-4 ">
            {messagesChatAi?.length <= 1 &&
              SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="px-3 py-2 rounded cursor-pointer text-xs transition"
                  style={{
                    backgroundColor: themes.find(
                      (theme) => theme.name === choosedTheme
                    ).colors[1],
                    color: themes.find((theme) => theme.name === choosedTheme)
                      .textColor,
                    border: `1px solid ${
                      themes.find((theme) => theme.name === choosedTheme)
                        .borderColor
                    }`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = themes.find(
                      (theme) => theme.name === choosedTheme
                    ).colors[2];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themes.find(
                      (theme) => theme.name === choosedTheme
                    ).colors[1];
                  }}
                  disabled={thinking}
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
          </div>
          <div
            ref={conversationRef}
            className={`flex-1 px-4 py-5 overflow-y-scroll custom-scrollbar ${
              messagesChatAi.length > 0
                ? "space-y-3"
                : "flex items-center justify-center"
            }`}
            id="conversation"
          >
            {messagesChatAi && messagesChatAi.length > 0 ? (
              messagesChatAi.map((msg, index) =>
                msg.role === "ai" ? (
                  <div
                    key={index}
                    className="w-full flex justify-start items-start"
                  >
                    <Bot className="h-5 w-5 text-blue-400" />
                    <div
                      className="p-3 rounded min-w-1/3 max-w-5/6"
                      dangerouslySetInnerHTML={{ __html: linkify(msg.data) }}
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </div>
                ) : (
                  <div key={index} className="w-full flex justify-end">
                    <div
                      className="flex items-end text-sm justify-start space-x-2 w-2/3 p-3 rounded "
                      style={{
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).textColor,
                      }}
                    >
                      <div>
                        <div className="font-bold text-gray-400">You</div>
                        <p>{msg.data}</p>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-400">
                Ask me anything about programming or navigation
              </p>
            )}
            {thinking && (
              <div className="w-full flex justify-start items-center space-x-2">
                <img
                  src={spinner}
                  alt="Thinking..."
                  className="h-6 w-6 animate-spin"
                />
                <p>Thinking...</p>
              </div>
            )}
          </div>

          <form
            className="flex gap-4 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              className="flex-1 rounded p-2.5 outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={thinking}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  .textColor,
                border: `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme).colors[2]
                }`,
              }}
            />
            <button
              type="submit"
              disabled={thinking || input.trim() === ""}
              className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
