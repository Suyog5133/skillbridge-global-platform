"use client";

import { useState } from "react";

type Message = {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  unread: number;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "HR Manager",
    company: "Google",
    avatar: "SJ",
    online: true,
    lastMessage: "We would like to schedule an interview.",
    unread: 2,
    messages: [
      { id: 1, sender: "other", text: "Hello! Thank you for applying.", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Thank you for considering my application.", time: "10:32 AM" },
      { id: 3, sender: "other", text: "We would like to schedule an interview.", time: "10:35 AM" },
    ],
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Technical Recruiter",
    company: "Microsoft",
    avatar: "MS",
    online: true,
    lastMessage: "Please share your updated resume.",
    unread: 1,
    messages: [
      { id: 1, sender: "other", text: "Hi! We reviewed your profile.", time: "Yesterday" },
      { id: 2, sender: "other", text: "Please share your updated resume.", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Project Manager",
    company: "Freelance Client",
    avatar: "DW",
    online: false,
    lastMessage: "The project details look good.",
    unread: 0,
    messages: [
      { id: 1, sender: "me", text: "I have shared the project proposal.", time: "Yesterday" },
      { id: 2, sender: "other", text: "The project details look good.", time: "Yesterday" },
    ],
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Talent Acquisition",
    company: "Amazon",
    avatar: "EB",
    online: false,
    lastMessage: "Thank you for your interest!",
    unread: 0,
    messages: [
      { id: 1, sender: "other", text: "Thank you for your interest!", time: "Monday" },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const activeConversation = conversations.find((chat) => chat.id === activeId);

  const filteredConversations = conversations.filter((chat) =>
    `${chat.name} ${chat.company} ${chat.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function sendMessage() {
    if (!message.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((previous) =>
      previous.map((chat) =>
        chat.id === activeId
          ? {
              ...chat,
              lastMessage: newMessage.text,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessage("");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-7">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7">
          <p className="text-sm font-bold tracking-wider text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Messages</h1>
          <p className="mt-2 text-slate-500">
            Connect and communicate with companies, recruiters and clients.
          </p>
        </div>

        <div className="grid min-h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[340px_1fr]">
          {/* Conversation List */}
          <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Conversations
                </h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {conversations.length} Chats
                </span>
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search people or companies..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="max-h-[520px] overflow-y-auto">
              {filteredConversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveId(chat.id)}
                  className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                    activeId === chat.id ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {chat.avatar}
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        chat.online ? "bg-green-500" : "bg-slate-400"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-semibold text-slate-900">
                        {chat.name}
                      </h3>
                      {chat.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {chat.company} · {chat.role}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {chat.lastMessage}
                    </p>
                  </div>
                </button>
              ))}

              {filteredConversations.length === 0 && (
                <p className="p-6 text-center text-sm text-slate-500">
                  No conversations found.
                </p>
              )}
            </div>
          </aside>

          {/* Chat Window */}
          <section className="flex min-h-[550px] flex-col">
            {activeConversation ? (
              <>
                <div className="flex items-center gap-3 border-b border-slate-200 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {activeConversation.avatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">
                      {activeConversation.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {activeConversation.online ? (
                        <span className="text-green-600">● Online</span>
                      ) : (
                        <span>● Offline</span>
                      )}{" "}
                      · {activeConversation.company}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
                  <div className="mb-6 text-center">
                    <span className="rounded-full bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
                      Conversation started
                    </span>
                  </div>

                  {activeConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                          msg.sender === "me"
                            ? "rounded-br-sm bg-blue-600 text-white"
                            : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-sm">
                          {msg.text}
                        </p>
                        <p
                          className={`mt-2 text-right text-[10px] ${
                            msg.sender === "me"
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex items-center gap-3 border-t border-slate-200 bg-white p-4"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div>
                  <div className="mb-3 text-5xl">💬</div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Select a conversation
                  </h2>
                  <p className="mt-2 text-slate-500">
                    Choose a person from the list to start chatting.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Demo messaging interface · Real-time messaging will be enabled later.
        </p>
      </div>
    </main>
  );
}