"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  Building2,
  CheckCircle2,
  Clock,
  MoreVertical,
  Archive,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { CompanyLogo } from "@/components/common/CompanyLogo";

interface MessageItem {
  id: string;
  senderName: string;
  senderRole: string;
  company: string;
  logoText: string;
  avatarBg: string;
  subject: string;
  preview: string;
  time: string;
  isUnread: boolean;
  isArchived: boolean;
  thread: {
    sender: "recruiter" | "candidate";
    text: string;
    time: string;
  }[];
}

const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: "msg-1",
    senderName: "Marcus Vance",
    senderRole: "Staff SRE Lead",
    company: "Datadog",
    logoText: "DD",
    avatarBg: "bg-teal-100 text-teal-800",
    subject: "Technical Deep-Dive on your Go Concurrency Repo",
    preview: "Hi Rashed, our backend team reviewed your verified Go microservices track...",
    time: "10:24 AM",
    isUnread: true,
    isArchived: false,
    thread: [
      {
        sender: "recruiter",
        text: "Hi Rashed, our backend team reviewed your verified Go microservices track solution. We were really impressed by your lock-contention handling and clean channel architecture. We'd love to schedule a 30-min call for our Summer 2026 internship role.",
        time: "10:24 AM",
      },
    ],
  },
  {
    id: "msg-2",
    senderName: "Elena Rostova",
    senderRole: "Engineering Manager",
    company: "Stripe",
    logoText: "SP",
    avatarBg: "bg-blue-100 text-blue-800",
    subject: "Platform Infrastructure Internship Match",
    preview: "Hello Rashed, your technical score placed in the top 2% for distributed storage...",
    time: "Yesterday",
    isUnread: true,
    isArchived: false,
    thread: [
      {
        sender: "recruiter",
        text: "Hello Rashed, your technical score placed in the top 2% for distributed storage benchmarks. Would you be open to an introductory screening call this Friday?",
        time: "Yesterday, 3:15 PM",
      },
    ],
  },
];

interface CandidateInboxTabProps {
  onTriggerToast: (msg: string) => void;
}

export const CandidateInboxTab: React.FC<CandidateInboxTabProps> = ({ onTriggerToast }) => {
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [forceEmptyState, setForceEmptyState] = useState(true); // Default to exact empty state matching user's screenshot!

  const filteredMessages = forceEmptyState
    ? []
    : messages.filter((m) => {
        if (filter === "unread") return m.isUnread && !m.isArchived;
        if (filter === "archived") return m.isArchived;
        return !m.isArchived;
      });

  const selectedMessage = messages.find((m) => m.id === selectedMsgId);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMsgId) return;

    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === selectedMsgId) {
          return {
            ...m,
            isUnread: false,
            thread: [
              ...m.thread,
              {
                sender: "candidate",
                text: replyText,
                time: "Just now",
              },
            ],
          };
        }
        return m;
      })
    );

    setReplyText("");
    onTriggerToast("Message sent to hiring manager!");
  };

  return (
    <div className="h-[calc(100vh-8rem)] w-full bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs flex flex-col select-none">
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANE: Filter Pills & Message List */}
        <div className="w-full sm:w-80 lg:w-96 border-r border-zinc-200 flex flex-col bg-white shrink-0">
          {/* Top Filter Buttons Bar */}
          <div className="p-3.5 border-b border-zinc-200 flex items-center justify-between gap-2">
            <div className="inline-flex p-1 rounded-lg bg-zinc-100 border border-zinc-200/80 text-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-white text-zinc-900 shadow-xs font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  filter === "unread"
                    ? "bg-white text-zinc-900 shadow-xs font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Unread
              </button>
              <button
                type="button"
                onClick={() => setFilter("archived")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  filter === "archived"
                    ? "bg-white text-zinc-900 shadow-xs font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Archived
              </button>
            </div>

            {/* Quick Demo Switcher (Toggle between Screenshot Empty State and Conversations) */}
            <button
              type="button"
              onClick={() => {
                setForceEmptyState(!forceEmptyState);
                setSelectedMsgId(null);
                onTriggerToast(forceEmptyState ? "Loaded sample conversations!" : "Showing empty inbox state");
              }}
              className="text-[11px] font-bold text-[#095964] hover:text-[#00D4BE] px-2 py-1 rounded hover:bg-zinc-50 transition-colors cursor-pointer"
              title="Toggle between empty view and sample conversation threads"
            >
              {forceEmptyState ? "Show Messages" : "Empty View"}
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              /* Empty State for Left Column: Centered "No messages" */
              <div className="h-full flex items-center justify-center p-8 text-center">
                <span className="text-sm font-medium text-zinc-400">
                  No messages
                </span>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {filteredMessages.map((msg) => {
                  const isSelected = selectedMsgId === msg.id;
                  return (
                    <button
                      key={msg.id}
                      type="button"
                      onClick={() => {
                        setSelectedMsgId(msg.id);
                        // Mark as read
                        setMessages((prev) =>
                          prev.map((m) => (m.id === msg.id ? { ...m, isUnread: false } : m))
                        );
                      }}
                      className={`w-full p-4 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#00D4BE]/10 border-l-4 border-l-[#00D4BE]"
                          : msg.isUnread
                          ? "bg-zinc-50/80 hover:bg-zinc-100/70"
                          : "hover:bg-zinc-50"
                      }`}
                    >
                      <CompanyLogo name={msg.company} size="sm" className="shrink-0" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs truncate ${msg.isUnread ? "font-black text-zinc-950" : "font-bold text-zinc-800"}`}>
                            {msg.senderName}
                          </span>
                          <span className="text-[10px] text-zinc-400 shrink-0 font-medium">
                            {msg.time}
                          </span>
                        </div>

                        <p className="text-[11px] text-zinc-500 truncate font-medium">
                          {msg.company} • {msg.senderRole}
                        </p>

                        <p className={`text-xs mt-1 truncate ${msg.isUnread ? "font-bold text-zinc-900" : "text-zinc-600"}`}>
                          {msg.subject}
                        </p>

                        <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-normal">
                          {msg.preview}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: Conversation Detail OR Empty State Illustration */}
        <div className="hidden sm:flex flex-1 flex-col bg-white">
          {selectedMessage ? (
            /* ACTIVE CONVERSATION THREAD */
            <div className="h-full flex flex-col justify-between">
              {/* Thread Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <CompanyLogo name={selectedMessage.company} size="md" className="shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900">
                      {selectedMessage.senderName}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {selectedMessage.senderRole} at <span className="font-semibold text-zinc-800">{selectedMessage.company}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMessages((prev) =>
                        prev.map((m) =>
                          m.id === selectedMessage.id ? { ...m, isArchived: !m.isArchived } : m
                        )
                      );
                      setSelectedMsgId(null);
                      onTriggerToast("Conversation archived");
                    }}
                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                    title="Archive conversation"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thread Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-zinc-50/50">
                <div className="text-center">
                  <span className="text-[11px] font-semibold text-zinc-400 px-3 py-1 bg-white rounded-full border border-zinc-200/80 shadow-2xs">
                    {selectedMessage.subject}
                  </span>
                </div>

                {selectedMessage.thread.map((msg, index) => {
                  const isCandidate = msg.sender === "candidate";
                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${isCandidate ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isCandidate
                            ? "bg-[#00D4BE] text-[#051C19] font-medium rounded-br-xs"
                            : "bg-white text-zinc-800 border border-zinc-200/90 rounded-bl-xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Bar */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-zinc-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message to the hiring manager..."
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-full px-5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#00D4BE] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="p-2.5 rounded-full bg-[#00D4BE] hover:bg-[#00baa6] disabled:opacity-40 disabled:hover:bg-[#00D4BE] text-[#051C19] transition-all cursor-pointer shadow-xs shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* EMPTY STATE ILLUSTRATION & COPY */
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              {/* Envelope SVG Illustration with Motion Lines */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg
                  className="w-36 h-36 drop-shadow-sm"
                  viewBox="0 0 160 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Motion burst lines */}
                  <path
                    d="M32 64L24 58M42 46L36 34M62 38L64 26M102 38L106 26M122 48L130 36M128 66L138 60"
                    stroke="#18181B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Envelope Base */}
                  <g transform="rotate(-6 80 80)">
                    {/* Shadow / Back flap */}
                    <rect
                      x="25"
                      y="45"
                      width="100"
                      height="65"
                      rx="8"
                      fill="#8B5CF6"
                      stroke="#18181B"
                      strokeWidth="2.5"
                    />

                    {/* Flap Open Peak */}
                    <path
                      d="M25 45L75 80L125 45"
                      fill="#7C3AED"
                      stroke="#18181B"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />

                    {/* Green Accent Stamp / Node */}
                    <circle
                      cx="75"
                      cy="48"
                      r="7"
                      fill="#00D4BE"
                      stroke="#18181B"
                      strokeWidth="2"
                    />

                    {/* Bottom folds */}
                    <path
                      d="M25 110L62 76M125 110L88 76"
                      stroke="#18181B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>

              {/* Headline & Subtitle */}
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Stay connected
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                  Reply to employers and manage conversations in your network.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
