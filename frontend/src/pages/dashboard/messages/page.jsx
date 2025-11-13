

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Search } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [message, setMessage] = useState("")

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Thank you for the great service!",
      timestamp: "2 min ago",
      unread: false,
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we reschedule to next week?",
      timestamp: "1 hour ago",
      unread: true,
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Perfect! See you at 3 PM",
      timestamp: "Yesterday",
      unread: false,
      avatar: "MJ",
    },
  ]

  const messages = [
    { id: 1, sender: "other", text: "Hi, are you available next week?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Yes, I have availability Monday-Friday", time: "10:32 AM" },
    { id: 3, sender: "other", text: "Great! Can we book for Wednesday?", time: "10:35 AM" },
    { id: 4, sender: "me", text: "What time works for you?", time: "10:36 AM" },
    { id: 5, sender: "other", text: "3 PM would be perfect", time: "10:38 AM" },
    { id: 6, sender: "me", text: "Perfect! See you Wednesday at 3 PM", time: "10:40 AM" },
  ]

  return (
    <div className="p-6 md:p-8 h-[calc(100vh-80px)] flex flex-col">
      <h1 className="text-3xl font-bold text-foreground mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Chat List */}
        <div className="md:col-span-1 border border-border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10 bg-muted border-border text-foreground" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat, idx) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(idx)}
                className={`w-full p-4 border-b border-border text-left transition-colors ${
                  selectedChat === idx ? "bg-primary/10 border-r-2 border-r-primary" : "hover:bg-muted"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold text-sm ${chat.unread ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {chat.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 border border-border rounded-lg flex flex-col bg-card">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {chats[selectedChat].avatar}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{chats[selectedChat].name}</h2>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "opacity-70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-muted border-border text-foreground"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-accent px-4">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

