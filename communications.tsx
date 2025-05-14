"use client"

import { useState, useEffect, useRef } from "react"
import {
  AlertCircle,
  ArrowRight,
  AtSign,
  Bell,
  AirplayIcon as Broadcast,
  Check,
  ChevronDown,
  CircleCheck,
  Clock,
  File,
  Filter,
  ImageIcon,
  Link2,
  Loader2,
  type LucideIcon,
  MessageCircle,
  Mic,
  PanelLeft,
  PaperclipIcon,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shield,
  Star,
  Users,
  Video,
  Volume2,
  Zap,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define types for our communications data
type Contact = {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "busy" | "offline"
  lastSeen?: string
  role?: string
  isStarred?: boolean
  unreadCount?: number
}

type MessageType = "text" | "image" | "file" | "audio" | "video" | "system"

type Message = {
  id: string
  senderId: string
  recipientId: string | "all"
  content: string
  type: MessageType
  timestamp: string
  status: "sending" | "sent" | "delivered" | "read" | "failed"
  isEncrypted?: boolean
  attachments?: {
    name: string
    type: string
    url: string
    size?: string
  }[]
}

type Notification = {
  id: string
  title: string
  description: string
  timestamp: string
  type: "info" | "warning" | "critical" | "success"
  isRead: boolean
  source: string
  icon?: LucideIcon
}

type Channel = {
  id: string
  name: string
  description?: string
  members: number
  isActive: boolean
  lastActivity?: string
  priority?: "low" | "medium" | "high"
}

// Mock data
const mockContacts: Contact[] = [
  {
    id: "c1",
    name: "System Administrator",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    role: "Administrator",
    isStarred: true,
    unreadCount: 2,
  },
  {
    id: "c2",
    name: "Security Module",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    role: "System",
    unreadCount: 1,
  },
  {
    id: "c3",
    name: "Network Control",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    role: "System",
  },
  {
    id: "c4",
    name: "Data Center",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    role: "System",
    lastSeen: "10 min ago",
  },
  {
    id: "c5",
    name: "Commander Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    role: "User",
    lastSeen: "3 hours ago",
    isStarred: true,
  },
  {
    id: "c6",
    name: "Dr. Alaris",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    role: "User",
  },
  {
    id: "c7",
    name: "Engineering Team",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    role: "Group",
    unreadCount: 5,
  },
  {
    id: "c8",
    name: "Operations Division",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    role: "Group",
  },
]

const mockMessages: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      senderId: "c1",
      recipientId: "user",
      content: "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.",
      type: "text",
      timestamp: "15:42:12",
      status: "read",
      isEncrypted: true,
    },
    {
      id: "m2",
      senderId: "user",
      recipientId: "c1",
      content: "Acknowledged. Is there any preparation needed from my end?",
      type: "text",
      timestamp: "15:43:45",
      status: "delivered",
    },
    {
      id: "m3",
      senderId: "c1",
      recipientId: "user",
      content: "Please save all active work and close any critical processes before 01:45.",
      type: "text",
      timestamp: "15:45:22",
      status: "read",
      isEncrypted: true,
    },
    {
      id: "m4",
      senderId: "c1",
      recipientId: "user",
      content: "System backup protocols have been initiated.",
      type: "text",
      timestamp: "15:50:18",
      status: "delivered",
      isEncrypted: true,
    },
    {
      id: "m5",
      senderId: "c1",
      recipientId: "user",
      content: "Maintenance update report attached.",
      type: "file",
      timestamp: "16:05:33",
      status: "sent",
      isEncrypted: true,
      attachments: [
        {
          name: "maintenance_report.pdf",
          type: "pdf",
          url: "#",
          size: "2.4 MB",
        },
      ],
    },
  ],
  c2: [
    {
      id: "m6",
      senderId: "c2",
      recipientId: "user",
      content: "Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist.",
      type: "text",
      timestamp: "14:30:45",
      status: "read",
    },
    {
      id: "m7",
      senderId: "user",
      recipientId: "c2",
      content: "Initiate full system scan and trace the origin.",
      type: "text",
      timestamp: "14:32:10",
      status: "delivered",
    },
    {
      id: "m8",
      senderId: "c2",
      recipientId: "user",
      content: "System scan initiated. Estimated completion time: 25 minutes.",
      type: "text",
      timestamp: "14:33:22",
      status: "read",
    },
    {
      id: "m9",
      senderId: "c2",
      recipientId: "user",
      content: "Scan complete. No malware detected. IP origin traced to Eastern European server farm.",
      type: "text",
      timestamp: "14:58:45",
      status: "delivered",
    },
    {
      id: "m10",
      senderId: "c2",
      recipientId: "user",
      content: "Updated firewall rules to block subnet range.",
      type: "text",
      timestamp: "15:02:10",
      status: "sent",
    },
  ],
  c3: [
    {
      id: "m11",
      senderId: "c3",
      recipientId: "user",
      content: "Bandwidth allocation adjusted for priority services during peak hours.",
      type: "text",
      timestamp: "12:15:33",
      status: "read",
    },
    {
      id: "m12",
      senderId: "user",
      recipientId: "c3",
      content: "What's the current latency on external connections?",
      type: "text",
      timestamp: "12:20:15",
      status: "delivered",
    },
    {
      id: "m13",
      senderId: "c3",
      recipientId: "user",
      content: "Current latency: 24ms. Peak today: 52ms. Network stability at 99.8%",
      type: "text",
      timestamp: "12:21:40",
      status: "read",
    },
  ],
  c4: [
    {
      id: "m14",
      senderId: "c4",
      recipientId: "user",
      content: "Backup verification complete. All data integrity checks passed.",
      type: "text",
      timestamp: "09:05:18",
      status: "read",
    },
  ],
  c5: [],
  c6: [],
  c7: [
    {
      id: "m15",
      senderId: "c7",
      recipientId: "user",
      content: "Team meeting scheduled for 18:00 in Conference Room Alpha.",
      type: "text",
      timestamp: "13:42:05",
      status: "read",
    },
    {
      id: "m16",
      senderId: "eng1",
      recipientId: "all",
      content: "Latest diagnostics show fluctuations in the primary power coupling.",
      type: "text",
      timestamp: "13:45:22",
      status: "read",
    },
    {
      id: "m17",
      senderId: "eng2",
      recipientId: "all",
      content: "I've deployed a team to check the physical connections.",
      type: "text",
      timestamp: "13:48:10",
      status: "read",
    },
    {
      id: "m18",
      senderId: "user",
      recipientId: "all",
      content: "Keep me updated on your findings. Priority level 2.",
      type: "text",
      timestamp: "13:50:45",
      status: "delivered",
    },
    {
      id: "m19",
      senderId: "eng3",
      recipientId: "all",
      content: "Attaching the power coupling schematics for reference.",
      type: "file",
      timestamp: "13:55:30",
      status: "read",
      attachments: [
        {
          name: "power_coupling_schematics.dwg",
          type: "dwg",
          url: "#",
          size: "5.8 MB",
        },
      ],
    },
  ],
  c8: [],
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "System Update",
    description: "Critical system update ready to install",
    timestamp: "20 min ago",
    type: "info",
    isRead: false,
    source: "System",
    icon: RefreshCw,
  },
  {
    id: "n2",
    title: "Security Alert",
    description: "Unusual activity detected on network port 443",
    timestamp: "1 hour ago",
    type: "warning",
    isRead: false,
    source: "Security Module",
    icon: Shield,
  },
  {
    id: "n3",
    title: "Power Fluctuation",
    description: "Minor power fluctuation detected in Sector 7",
    timestamp: "3 hours ago",
    type: "info",
    isRead: false,
    source: "Infrastructure",
    icon: Zap,
  },
  {
    id: "n4",
    title: "Backup Complete",
    description: "Daily backup routine completed successfully",
    timestamp: "5 hours ago",
    type: "success",
    isRead: true,
    source: "Data Center",
  },
  {
    id: "n5",
    title: "Hardware Failure",
    description: "Storage array #5 reporting disk failure",
    timestamp: "Yesterday",
    type: "critical",
    isRead: true,
    source: "Hardware Monitoring",
  },
]

const mockChannels: Channel[] = [
  {
    id: "ch1",
    name: "Emergency Broadcasts",
    description: "Critical system-wide alerts and emergency notifications",
    members: 32,
    isActive: true,
    priority: "high",
  },
  {
    id: "ch2",
    name: "Command Operations",
    description: "Channel for operations team coordination",
    members: 12,
    isActive: true,
    lastActivity: "15 min ago",
    priority: "medium",
  },
  {
    id: "ch3",
    name: "Engineering Updates",
    description: "Technical updates and engineering discussions",
    members: 18,
    isActive: true,
    lastActivity: "42 min ago",
    priority: "medium",
  },
  {
    id: "ch4",
    name: "Security Bulletins",
    description: "Security status and bulletin channel",
    members: 24,
    isActive: true,
    lastActivity: "1 hour ago",
    priority: "high",
  },
  {
    id: "ch5",
    name: "Maintenance Scheduling",
    description: "System maintenance coordination",
    members: 8,
    isActive: false,
    lastActivity: "2 days ago",
    priority: "low",
  },
]

// Main Communications component
export default function Communications() {
  const [activeTab, setActiveTab] = useState("direct")
  const [selectedContactId, setSelectedContactId] = useState<string | null>("c1")
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  // Filtered contacts based on search
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort contacts - online first, then with unread messages, then starred
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    // Online status first
    if (a.status === "online" && b.status !== "online") return -1
    if (a.status !== "online" && b.status === "online") return 1

    // Then unread messages
    if ((a.unreadCount || 0) > 0 && (b.unreadCount || 0) === 0) return -1
    if ((a.unreadCount || 0) === 0 && (b.unreadCount || 0) > 0) return 1

    // Then starred contacts
    if (a.isStarred && !b.isStarred) return -1
    if (!a.isStarred && b.isStarred) return 1

    return a.name.localeCompare(b.name)
  })

  // Filtered notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.isRead
    if (filter === "critical") return notification.type === "critical" || notification.type === "warning"
    if (filter === "system") return notification.source === "System"
    return true
  })

  // Effect to scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedContactId])

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContactId) return

    // Create new message
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      senderId: "user",
      recipientId: selectedContactId,
      content: newMessage,
      type: "text",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      status: "sending",
    }

    // Add message to the conversation
    setMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMsg],
    }))

    setNewMessage("")
    setIsLoading(true)

    // Simulate message being sent
    setTimeout(() => {
      setMessages((prev) => {
        const updatedConversation = [...prev[selectedContactId]]
        const msgIndex = updatedConversation.findIndex((m) => m.id === newMsg.id)

        if (msgIndex !== -1) {
          updatedConversation[msgIndex] = {
            ...updatedConversation[msgIndex],
            status: "delivered",
          }
        }

        return {
          ...prev,
          [selectedContactId]: updatedConversation,
        }
      })

      setIsLoading(false)

      // Simulate reply for demo purposes
      if (Math.random() > 0.3) {
        setTimeout(
          () => {
            const replies = [
              "Acknowledged. Proceeding with requested action.",
              "Updating system parameters based on your instructions.",
              "Request received and logged. Processing...",
              "Command accepted. Implementation in progress.",
              "Affirmative. Task prioritized and executing.",
            ]

            const randomReply = replies[Math.floor(Math.random() * replies.length)]

            const replyMsg: Message = {
              id: `reply-${Date.now()}`,
              senderId: selectedContactId,
              recipientId: "user",
              content: randomReply,
              type: "text",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              status: "delivered",
              isEncrypted: Math.random() > 0.5,
            }

            setMessages((prev) => ({
              ...prev,
              [selectedContactId]: [...(prev[selectedContactId] || []), replyMsg],
            }))
          },
          2000 + Math.random() * 3000,
        )
      }
    }, 1000)
  }

  // Function to mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    )
  }

  // Function to mark a single notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // Function to star/unstar a contact
  const toggleStarContact = (id: string) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === id ? { ...contact, isStarred: !contact.isStarred } : contact)),
    )
  }

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-amber-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-slate-500"
      default:
        return "bg-slate-500"
    }
  }

  const getMessageStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
      case "sent":
        return <Check className="h-3 w-3 text-slate-400" />
      case "delivered":
        return <Check className="h-3 w-3 text-cyan-400" />
      case "read":
        return <CircleCheck className="h-3 w-3 text-green-400" />
      case "failed":
        return <AlertCircle className="h-3 w-3 text-red-400" />
      default:
        return null
    }
  }

  const getNotificationTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "border-blue-500/30 bg-blue-500/10"
      case "warning":
        return "border-amber-500/30 bg-amber-500/10"
      case "critical":
        return "border-red-500/30 bg-red-500/10"
      case "success":
        return "border-green-500/30 bg-green-500/10"
      default:
        return "border-slate-500/30 bg-slate-500/10"
    }
  }

  const getChannelPriorityStyles = (priority?: Channel["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10"
      case "medium":
        return "border-amber-500/30 bg-amber-500/10"
      case "low":
        return "border-green-500/30 bg-green-500/10"
      default:
        return "border-slate-500/30 bg-slate-500/10"
    }
  }

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "text":
        return (
          <div className="px-4 py-2 rounded-lg overflow-hidden">
            {message.content}
            {message.isEncrypted && (
              <div className="flex items-center mt-1 text-xs text-green-400">
                <Shield className="h-3 w-3 mr-1" />
                End-to-end encrypted
              </div>
            )}
          </div>
        )
      case "image":
        return (
          <div className="rounded-lg overflow-hidden">
            <div className="px-4 py-2">{message.content}</div>
            <div className="mt-2 relative">
              <img
                src={message.attachments?.[0]?.url || "/placeholder.svg?height=200&width=300"}
                alt="Image attachment"
                className="rounded-md max-h-64 object-contain"
              />
            </div>
          </div>
        )
      case "file":
        return (
          <div className="px-4 py-2 rounded-lg">
            <div>{message.content}</div>
            {message.attachments &&
              message.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="mt-2 flex items-center p-2 rounded bg-slate-800/50 border border-slate-700/50"
                >
                  <div className="h-8 w-8 rounded bg-cyan-500/20 flex items-center justify-center mr-2">
                    <File className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{attachment.name}</div>
                    <div className="text-xs text-slate-400">{attachment.size}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        )
      default:
        return <div className="px-4 py-2 rounded-lg">{message.content}</div>
    }
  }

  const unreadNotifications = notifications.filter((n) => !n.isRead).length

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
              Communications Interface
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                SECURE
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400"
                      onClick={() => setShowSidebar(!showSidebar)}
                    >
                      <PanelLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Communications settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100vh-240px)] overflow-hidden">
          <div className="flex h-full">
            {/* Sidebar - Contacts and channels list */}
            {showSidebar && (
              <div className="w-80 border-r border-slate-700/50 h-full flex flex-col">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
                  <div className="px-4 pt-4">
                    <TabsList className="w-full bg-slate-800/50">
                      <TabsTrigger
                        value="direct"
                        className="flex-1 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Direct
                      </TabsTrigger>
                      <TabsTrigger
                        value="channels"
                        className="flex-1 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                      >
                        <Broadcast className="h-4 w-4 mr-1" />
                        Channels
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="flex-1 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 relative"
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        Alerts
                        {unreadNotifications > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                            {unreadNotifications}
                          </span>
                        )}
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                      <Input
                        type="search"
                        placeholder={activeTab === "notifications" ? "Search alerts..." : "Search..."}
                        className="pl-9 bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <TabsContent value="direct" className="flex-1 flex flex-col mt-0">
                    <div className="px-4 mb-2 flex items-center justify-between">
                      <div className="text-xs font-medium text-slate-400">CONTACTS</div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add new contact</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <ScrollArea className="flex-1">
                      <div className="px-2 space-y-1">
                        {sortedContacts.map((contact) => (
                          <button
                            key={contact.id}
                            className={`w-full flex items-center p-2 text-left rounded-md transition-colors 
                              ${
                                selectedContactId === contact.id
                                  ? "bg-slate-800/90 text-slate-100"
                                  : "hover:bg-slate-800/50 text-slate-300"
                              }`}
                            onClick={() => setSelectedContactId(contact.id)}
                          >
                            <div className="relative">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                <AvatarFallback className="bg-slate-700 text-cyan-500">
                                  {contact.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span
                                className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 ${getStatusColor(contact.status)}`}
                              />
                            </div>

                            <div className="ml-3 flex-1 overflow-hidden">
                              <div className="flex items-center">
                                <div className="flex-1 truncate font-medium">{contact.name}</div>
                                {contact.unreadCount && contact.unreadCount > 0 && (
                                  <Badge className="ml-2 bg-blue-500 hover:bg-blue-500 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                    {contact.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 truncate">
                                {contact.status === "online" ? (
                                  <span className="text-green-400">Online</span>
                                ) : contact.status === "busy" ? (
                                  <span className="text-red-400">Busy</span>
                                ) : contact.status === "away" ? (
                                  <span className="text-amber-400">Away</span>
                                ) : (
                                  <span>Last seen: {contact.lastSeen || "Unknown"}</span>
                                )}
                              </div>
                            </div>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-slate-400 hover:text-yellow-400"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleStarContact(contact.id)
                                    }}
                                  >
                                    <Star
                                      className={`h-3.5 w-3.5 ${contact.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`}
                                    />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{contact.isStarred ? "Unstar contact" : "Star contact"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="channels" className="flex-1 flex flex-col mt-0">
                    <div className="px-4 mb-2 flex items-center justify-between">
                      <div className="text-xs font-medium text-slate-400">CHANNELS</div>
                      <div className="flex items-center space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <Broadcast className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Create broadcast</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Create new channel</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <ScrollArea className="flex-1">
                      <div className="px-2 space-y-1">
                        {channels.map((channel) => (
                          <button
                            key={channel.id}
                            className={`w-full flex items-center p-2 text-left rounded-md transition-colors 
                              ${
                                selectedChannel === channel.id
                                  ? "bg-slate-800/90 text-slate-100"
                                  : "hover:bg-slate-800/50 text-slate-300"
                              }`}
                            onClick={() => setSelectedChannel(channel.id)}
                          >
                            <div
                              className={`h-9 w-9 rounded-md flex items-center justify-center ${getChannelPriorityStyles(channel.priority)}`}
                            >
                              <Broadcast className="h-4 w-4 text-slate-300" />
                            </div>

                            <div className="ml-3 flex-1 overflow-hidden">
                              <div className="flex items-center">
                                <div className="flex-1 truncate font-medium">{channel.name}</div>
                                {channel.priority === "high" && (
                                  <Badge className="ml-1 bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/20">
                                    High
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center text-xs text-slate-500">
                                <Users className="h-3 w-3 mr-1" />
                                <span className="truncate">{channel.members} members</span>
                                {channel.lastActivity && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{channel.lastActivity}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="notifications" className="flex-1 flex flex-col mt-0">
                    <div className="px-4 mb-2 flex items-center justify-between">
                      <div className="text-xs font-medium text-slate-400">NOTIFICATIONS</div>
                      <div className="flex items-center space-x-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                              <Filter className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem
                              className={filter === "all" ? "bg-slate-700" : ""}
                              onClick={() => setFilter("all")}
                            >
                              All notifications
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={filter === "unread" ? "bg-slate-700" : ""}
                              onClick={() => setFilter("unread")}
                            >
                              Unread only
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={filter === "critical" ? "bg-slate-700" : ""}
                              onClick={() => setFilter("critical")}
                            >
                              Critical alerts
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={filter === "system" ? "bg-slate-700" : ""}
                              onClick={() => setFilter("system")}
                            >
                              System messages
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-slate-400"
                                onClick={markAllNotificationsAsRead}
                              >
                                <Check className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mark all as read</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <ScrollArea className="flex-1">
                      <div className="px-2 space-y-2">
                        {filteredNotifications.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Bell className="h-8 w-8 text-slate-500 mb-2" />
                            <p className="text-sm text-slate-500">No notifications found</p>
                          </div>
                        ) : (
                          filteredNotifications.map((notification) => (
                            <button
                              key={notification.id}
                              className={`w-full flex items-start p-2 text-left rounded-md transition-colors border
                                ${!notification.isRead ? "border-l-2 border-l-blue-500" : "border-transparent"}
                                ${getNotificationTypeStyles(notification.type)} hover:bg-slate-800/70`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="h-8 w-8 rounded-full flex items-center justify-center mr-2">
                                {notification.icon ? (
                                  <notification.icon className="h-4 w-4 text-slate-300" />
                                ) : (
                                  <Bell className="h-4 w-4 text-slate-300" />
                                )}
                              </div>

                              <div className="flex-1 overflow-hidden">
                                <div className="flex items-center">
                                  <div className="flex-1 truncate font-medium text-sm">{notification.title}</div>
                                  <div className="text-xs text-slate-500 ml-2">{notification.timestamp}</div>
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">{notification.description}</div>
                                <div className="text-xs text-slate-500 mt-1">Source: {notification.source}</div>
                              </div>

                              {!notification.isRead && <div className="h-2 w-2 bg-blue-500 rounded-full mr-1"></div>}
                            </button>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                {/* User status section */}
                <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback className="bg-slate-700 text-cyan-500">CM</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm">Commander</div>
                      <div className="flex items-center text-xs">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                        <span className="text-green-400">Online</span>
                        <ChevronDown className="h-3 w-3 ml-1 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-100">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-100">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main chat area */}
            <div className="flex-1 flex flex-col h-full">
              {/* Chat header */}
              {selectedContactId && (
                <>
                  <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={contacts.find((c) => c.id === selectedContactId)?.avatar || ""}
                          alt="Contact"
                        />
                        <AvatarFallback className="bg-slate-700 text-cyan-500">
                          {contacts.find((c) => c.id === selectedContactId)?.name.substring(0, 2) || ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="font-medium text-slate-100">
                          {contacts.find((c) => c.id === selectedContactId)?.name}
                        </div>
                        <div className="flex items-center text-xs text-slate-400">
                          {contacts.find((c) => c.id === selectedContactId)?.role && (
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-700 bg-slate-800/50 text-slate-300 py-0 h-4"
                            >
                              {contacts.find((c) => c.id === selectedContactId)?.role}
                            </Badge>
                          )}
                          <div className="flex items-center ml-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full mr-1 ${getStatusColor(contacts.find((c) => c.id === selectedContactId)?.status || "offline")}`}
                            />
                            {contacts.find((c) => c.id === selectedContactId)?.status === "online" ? (
                              <span className="text-green-400">Online</span>
                            ) : contacts.find((c) => c.id === selectedContactId)?.status === "busy" ? (
                              <span className="text-red-400">Busy</span>
                            ) : contacts.find((c) => c.id === selectedContactId)?.status === "away" ? (
                              <span className="text-amber-400">Away</span>
                            ) : (
                              <span>
                                Last seen: {contacts.find((c) => c.id === selectedContactId)?.lastSeen || "Unknown"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Voice call</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                              <Video className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Video call</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                              <Search className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Search conversation</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuLabel>Conversation options</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                          <DropdownMenuItem>Block contact</DropdownMenuItem>
                          <DropdownMenuItem>Archive conversation</DropdownMenuItem>
                          <DropdownMenuItem>Clear history</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Messages area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages[selectedContactId]?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] ${
                              message.senderId === "user"
                                ? "bg-cyan-500/20 border-cyan-500/30 text-slate-100"
                                : "bg-slate-800/70 border-slate-700/50 text-slate-200"
                            } border rounded-lg overflow-hidden`}
                          >
                            {renderMessageContent(message)}
                            <div
                              className={`px-4 pb-1 text-xs text-slate-400 flex items-center ${
                                message.senderId === "user" ? "justify-end" : "justify-start"
                              }`}
                            >
                              {message.timestamp}
                              {message.senderId === "user" && (
                                <div className="ml-1.5">{getMessageStatusIcon(message.status)}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input area */}
                  <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-slate-100"
                              >
                                <PaperclipIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Attach file</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-slate-100"
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Send image</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-slate-100"
                              >
                                <AtSign className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mention</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <div className="flex items-center space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-slate-100"
                              >
                                <Mic className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Voice message</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-cyan-600 hover:bg-cyan-700"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || isLoading}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-500">
                      <div className="flex items-center">
                        <Shield className="h-3 w-3 mr-1 text-green-500" />
                        <span>End-to-end encrypted</span>
                      </div>
                      <div>
                        <span
                          className="typing-indicator"
                          data-content={`${contacts.find((c) => c.id === selectedContactId)?.name} is typing`}
                        >
                          {Math.random() > 0.8 && (
                            <span className="inline-flex items-center">
                              <span className="text-slate-400">
                                {contacts.find((c) => c.id === selectedContactId)?.name} is typing
                              </span>
                              <span className="ml-1 inline-flex space-x-1">
                                <span
                                  className="h-1 w-1 rounded-full bg-slate-400 animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></span>
                                <span
                                  className="h-1 w-1 rounded-full bg-slate-400 animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></span>
                                <span
                                  className="h-1 w-1 rounded-full bg-slate-400 animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></span>
                              </span>
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* No conversation selected */}
              {!selectedContactId && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-md p-6">
                    <MessageCircle className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-slate-200 mb-2">No conversation selected</h3>
                    <p className="text-slate-400 mb-6">
                      Choose a contact or channel from the sidebar to start a conversation.
                    </p>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Status bar */}
        <CardFooter className="py-2 px-4 border-t border-slate-700/50 bg-slate-800/30">
          <div className="w-full flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Shield className="h-3 w-3 mr-1 text-green-500" />
                <span>Secure Connection</span>
              </div>
              <div className="flex items-center">
                <Volume2 className="h-3 w-3 mr-1 text-slate-500" />
                <span>Audio: On</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-slate-500" />
                <span>Last synced: 1 min ago</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-green-400 mr-1">●</span>
                <span>5 Online</span>
              </div>
              <div className="flex items-center">
                <Link2 className="h-3 w-3 mr-1 text-blue-400" />
                <span>Connected to Data Center</span>
              </div>
              <div>
                <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-slate-800/50 border-slate-700">
                  NEXUS COMMS v1.4.2
                </Badge>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
