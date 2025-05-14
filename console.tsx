"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Terminal,
  Clock,
  X,
  Plus,
  Maximize2,
  Minimize2,
  ChevronRight,
  Download,
  Copy,
  Trash2,
  Settings,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Wifi,
  Shield,
  Server,
  FileText,
  Folder,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define command history type
interface CommandEntry {
  id: number
  command: string
  output: string | JSX.Element
  timestamp: Date
  status: "success" | "error" | "warning" | "info"
}

// Define available commands
const availableCommands = [
  { name: "help", description: "Display available commands" },
  { name: "clear", description: "Clear the console" },
  { name: "status", description: "Show system status" },
  { name: "network", description: "Display network information" },
  { name: "processes", description: "List running processes" },
  { name: "memory", description: "Show memory usage" },
  { name: "storage", description: "Display storage information" },
  { name: "security", description: "Show security status" },
  { name: "logs", description: "Display system logs" },
  { name: "users", description: "List system users" },
  { name: "shutdown", description: "Shutdown the system" },
  { name: "restart", description: "Restart the system" },
  { name: "date", description: "Display current date and time" },
  { name: "echo", description: "Echo a message" },
  { name: "ls", description: "List directory contents" },
  { name: "cd", description: "Change directory" },
  { name: "cat", description: "Display file contents" },
  { name: "mkdir", description: "Create a directory" },
  { name: "rm", description: "Remove files or directories" },
]

// Sample system information
const systemInfo = {
  hostname: "NEXUS-CENTRAL",
  os: "NEXUS OS v12.4.5",
  kernel: "5.15.0-76-nexus",
  uptime: "14d 06:42:18",
  cpu: {
    model: "Quantum Core i9-13900K",
    cores: 16,
    threads: 32,
    usage: 42,
  },
  memory: {
    total: "64 GB",
    used: "24.3 GB",
    free: "39.7 GB",
    usage: 38,
  },
  storage: {
    total: "4 TB",
    used: "1.8 TB",
    free: "2.2 TB",
    usage: 45,
  },
  network: {
    interface: "eth0",
    ip: "192.168.1.100",
    mask: "255.255.255.0",
    gateway: "192.168.1.1",
    status: "Connected",
    speed: "10 Gbps",
  },
}

// Sample processes
const processes = [
  { pid: 1, name: "system_core", cpu: 2.4, memory: 345, status: "running", user: "system" },
  { pid: 1842, name: "nexus_service", cpu: 8.7, memory: 128, status: "running", user: "system" },
  { pid: 2156, name: "security_monitor", cpu: 5.2, memory: 96, status: "running", user: "admin" },
  { pid: 3012, name: "network_manager", cpu: 3.8, memory: 84, status: "running", user: "system" },
  { pid: 4268, name: "user_interface", cpu: 15.3, memory: 256, status: "running", user: "user" },
  { pid: 5124, name: "data_analyzer", cpu: 22.1, memory: 512, status: "running", user: "admin" },
  { pid: 6234, name: "backup_service", cpu: 1.2, memory: 64, status: "running", user: "system" },
  { pid: 7845, name: "monitoring_agent", cpu: 0.8, memory: 48, status: "running", user: "system" },
]

// Sample users
const users = [
  {
    username: "admin",
    fullname: "System Administrator",
    role: "Administrator",
    status: "Active",
    lastLogin: "Today, 11:42:15",
  },
  { username: "system", fullname: "System Service", role: "Service", status: "Active", lastLogin: "System Boot" },
  { username: "user", fullname: "Standard User", role: "User", status: "Active", lastLogin: "Today, 09:15:22" },
  { username: "guest", fullname: "Guest User", role: "Guest", status: "Inactive", lastLogin: "Yesterday, 16:30:45" },
]

// Sample file system
const fileSystem = {
  "/": {
    type: "directory",
    children: ["system", "data", "users", "config", "logs"],
  },
  "/system": {
    type: "directory",
    children: ["core", "services", "drivers", "security"],
  },
  "/data": {
    type: "directory",
    children: ["storage", "backup", "temp"],
  },
  "/users": {
    type: "directory",
    children: ["admin", "user", "guest"],
  },
  "/config": {
    type: "directory",
    children: ["system.conf", "network.conf", "security.conf"],
  },
  "/logs": {
    type: "directory",
    children: ["system.log", "security.log", "network.log", "error.log"],
  },
  "/system/core": {
    type: "directory",
    children: ["kernel.sys", "boot.sys", "drivers.sys"],
  },
  "/system/core/kernel.sys": {
    type: "file",
    content: "NEXUS OS Kernel v5.15.0-76-nexus\nQuantum Core Architecture\nSecure Boot Enabled\nTPM 2.0 Active",
  },
  "/config/system.conf": {
    type: "file",
    content:
      "# System Configuration\nhostname=NEXUS-CENTRAL\nlocale=en_US.UTF-8\ntimezone=UTC-08:00\nauto_update=true\npower_management=adaptive",
  },
  "/logs/system.log": {
    type: "file",
    content:
      "[2023-05-14 08:00:01] INFO: System boot completed\n[2023-05-14 08:00:05] INFO: All services started\n[2023-05-14 08:15:22] INFO: User 'user' logged in\n[2023-05-14 11:42:15] INFO: User 'admin' logged in",
  },
}

// Sample logs
const systemLogs = [
  { timestamp: "2023-05-14 11:42:15", level: "INFO", source: "auth", message: "User 'admin' logged in" },
  { timestamp: "2023-05-14 11:30:22", level: "INFO", source: "system", message: "System configuration updated" },
  {
    timestamp: "2023-05-14 10:58:33",
    level: "WARNING",
    source: "auth",
    message: "Failed login attempt for user 'admin'",
  },
  { timestamp: "2023-05-14 10:45:12", level: "INFO", source: "user", message: "User 'jsmith' changed password" },
  { timestamp: "2023-05-14 09:15:22", level: "INFO", source: "auth", message: "User 'user' logged in" },
  {
    timestamp: "2023-05-14 08:37:19",
    level: "ERROR",
    source: "network",
    message: "Connection to backup server failed",
  },
  { timestamp: "2023-05-14 08:15:22", level: "INFO", source: "system", message: "Scheduled backup completed" },
  { timestamp: "2023-05-14 08:00:05", level: "INFO", source: "system", message: "All services started" },
  { timestamp: "2023-05-14 08:00:01", level: "INFO", source: "system", message: "System boot completed" },
]

export default function Console() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandId, setCommandId] = useState(0)
  const [currentDirectory, setCurrentDirectory] = useState("/")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeTab, setActiveTab] = useState("terminal-1")
  const [terminals, setTerminals] = useState([{ id: "terminal-1", name: "Terminal 1" }])
  const [isFullscreen, setIsFullscreen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Add welcome message on component mount
  useEffect(() => {
    const welcomeMessage = (
      <div className="space-y-1">
        <div className="text-green-400 font-bold">
          {systemInfo.os} - {systemInfo.hostname}
        </div>
        <div className="text-slate-400">Type 'help' to see available commands</div>
        <div className="text-slate-500 text-xs">
          System Time: {currentTime.toLocaleTimeString()} | Uptime: {systemInfo.uptime}
        </div>
      </div>
    )

    setCommandHistory([
      {
        id: commandId,
        command: "",
        output: welcomeMessage,
        timestamp: new Date(),
        status: "info",
      },
    ])
    setCommandId(commandId + 1)
  }, [])

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle command input change
  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentCommand(value)

    // Show command suggestions
    if (value.trim() !== "") {
      const matchedCommands = availableCommands
        .filter((cmd) => cmd.name.startsWith(value.trim()))
        .map((cmd) => cmd.name)
      setSuggestions(matchedCommands)
      setShowSuggestions(matchedCommands.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setCurrentCommand(suggestion)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Process command
  const processCommand = (
    command: string,
  ): { output: string | JSX.Element; status: "success" | "error" | "warning" | "info" } => {
    const cmd = command.trim().toLowerCase()
    const args = cmd.split(" ").slice(1)

    // Process commands
    if (cmd === "" || !cmd) {
      return { output: "", status: "info" }
    } else if (cmd === "help") {
      return {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Available Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {availableCommands.map((cmd) => (
                <div key={cmd.name} className="flex">
                  <span className="text-green-400 w-24 font-mono">{cmd.name}</span>
                  <span className="text-slate-400">{cmd.description}</span>
                </div>
              ))}
            </div>
          </div>
        ),
        status: "info",
      }
    } else if (cmd === "clear") {
      setCommandHistory([])
      return { output: "", status: "success" }
    } else if (cmd === "status") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">System Status:</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Hostname:</span>
                  <span className="text-white font-mono">{systemInfo.hostname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">OS:</span>
                  <span className="text-white font-mono">{systemInfo.os}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kernel:</span>
                  <span className="text-white font-mono">{systemInfo.kernel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Uptime:</span>
                  <span className="text-white font-mono">{systemInfo.uptime}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">CPU Usage:</span>
                  <span className="text-cyan-400 font-mono">{systemInfo.cpu.usage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Memory Usage:</span>
                  <span className="text-purple-400 font-mono">{systemInfo.memory.usage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Storage Usage:</span>
                  <span className="text-blue-400 font-mono">{systemInfo.storage.usage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Network:</span>
                  <span className="text-green-400 font-mono">{systemInfo.network.status}</span>
                </div>
              </div>
            </div>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "network") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">Network Information:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Interface:</span>
                <span className="text-white font-mono">{systemInfo.network.interface}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IP Address:</span>
                <span className="text-white font-mono">{systemInfo.network.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Subnet Mask:</span>
                <span className="text-white font-mono">{systemInfo.network.mask}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gateway:</span>
                <span className="text-white font-mono">{systemInfo.network.gateway}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-green-400 font-mono">{systemInfo.network.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Speed:</span>
                <span className="text-white font-mono">{systemInfo.network.speed}</span>
              </div>
            </div>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "processes") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">Running Processes:</div>
            <table className="w-full text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="text-left">PID</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">CPU</th>
                  <th className="text-left">Memory</th>
                  <th className="text-left">User</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process) => (
                  <tr key={process.pid} className="text-white">
                    <td className="text-slate-500">{process.pid}</td>
                    <td>{process.name}</td>
                    <td className="text-cyan-400">{process.cpu}%</td>
                    <td className="text-purple-400">{process.memory} MB</td>
                    <td className="text-slate-400">{process.user}</td>
                    <td className="text-green-400">{process.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "memory") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">Memory Information:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Memory:</span>
                <span className="text-white font-mono">{systemInfo.memory.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Used Memory:</span>
                <span className="text-purple-400 font-mono">{systemInfo.memory.used}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Free Memory:</span>
                <span className="text-green-400 font-mono">{systemInfo.memory.free}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Usage:</span>
                <span className="text-purple-400 font-mono">{systemInfo.memory.usage}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${systemInfo.memory.usage}%` }}
              ></div>
            </div>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "storage") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">Storage Information:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Storage:</span>
                <span className="text-white font-mono">{systemInfo.storage.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Used Storage:</span>
                <span className="text-blue-400 font-mono">{systemInfo.storage.used}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Free Storage:</span>
                <span className="text-green-400 font-mono">{systemInfo.storage.free}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Usage:</span>
                <span className="text-blue-400 font-mono">{systemInfo.storage.usage}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: `${systemInfo.storage.usage}%` }}
              ></div>
            </div>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "security") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">Security Status:</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Firewall:</span>
                  <span className="text-green-400 font-mono">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Intrusion Detection:</span>
                  <span className="text-green-400 font-mono">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Encryption:</span>
                  <span className="text-green-400 font-mono">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Scan:</span>
                  <span className="text-white font-mono">2 hours ago</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Threat Level:</span>
                  <span className="text-green-400 font-mono">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Threats:</span>
                  <span className="text-white font-mono">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Blocked (24h):</span>
                  <span className="text-white font-mono">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vulnerabilities:</span>
                  <span className="text-amber-400 font-mono">3</span>
                </div>
              </div>
            </div>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "logs") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">System Logs:</div>
            <div className="space-y-1">
              {systemLogs.map((log, index) => (
                <div key={index} className="flex">
                  <span className="text-slate-500 font-mono mr-2">[{log.timestamp}]</span>
                  <span
                    className={`font-mono mr-2 ${
                      log.level === "INFO"
                        ? "text-blue-400"
                        : log.level === "WARNING"
                          ? "text-amber-400"
                          : "text-red-400"
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-slate-400 font-mono mr-2">{log.source}:</span>
                  <span className="text-white">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "users") {
      return {
        output: (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">System Users:</div>
            <table className="w-full text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="text-left">Username</th>
                  <th className="text-left">Full Name</th>
                  <th className="text-left">Role</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username} className="text-white">
                    <td>{user.username}</td>
                    <td className="text-slate-300">{user.fullname}</td>
                    <td className="text-slate-400">{user.role}</td>
                    <td className={user.status === "Active" ? "text-green-400" : "text-slate-500"}>{user.status}</td>
                    <td className="text-slate-400">{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        status: "success",
      }
    } else if (cmd === "shutdown") {
      return {
        output: (
          <div className="text-red-400">
            Shutdown command received. This is a simulated environment, no actual shutdown will occur.
          </div>
        ),
        status: "warning",
      }
    } else if (cmd === "restart") {
      return {
        output: (
          <div className="text-amber-400">
            Restart command received. This is a simulated environment, no actual restart will occur.
          </div>
        ),
        status: "warning",
      }
    } else if (cmd === "date") {
      return {
        output: (
          <div className="text-white font-mono">
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </div>
        ),
        status: "success",
      }
    } else if (cmd.startsWith("echo ")) {
      const message = command.substring(5)
      return { output: <div className="text-white">{message}</div>, status: "success" }
    } else if (cmd === "ls" || cmd.startsWith("ls ")) {
      let path = currentDirectory
      if (args.length > 0) {
        path = resolvePath(args[0])
      }

      if (!fileSystem[path]) {
        return { output: <div className="text-red-400">Directory not found: {path}</div>, status: "error" }
      }

      if (fileSystem[path].type !== "directory") {
        return { output: <div className="text-red-400">Not a directory: {path}</div>, status: "error" }
      }

      const children = fileSystem[path].children
      return {
        output: (
          <div className="grid grid-cols-3 gap-2">
            {children.map((child) => {
              const childPath = path === "/" ? `/${child}` : `${path}/${child}`
              const isDirectory = fileSystem[childPath]?.type === "directory"
              return (
                <div key={child} className="flex items-center">
                  {isDirectory ? (
                    <Folder className="h-4 w-4 text-blue-400 mr-1" />
                  ) : (
                    <FileText className="h-4 w-4 text-slate-400 mr-1" />
                  )}
                  <span className={isDirectory ? "text-blue-400" : "text-white"}>{child}</span>
                </div>
              )
            })}
          </div>
        ),
        status: "success",
      }
    } else if (cmd.startsWith("cd ")) {
      const path = args[0]
      const newPath = resolvePath(path)

      if (!fileSystem[newPath]) {
        return { output: <div className="text-red-400">Directory not found: {newPath}</div>, status: "error" }
      }

      if (fileSystem[newPath].type !== "directory") {
        return { output: <div className="text-red-400">Not a directory: {newPath}</div>, status: "error" }
      }

      setCurrentDirectory(newPath)
      return { output: "", status: "success" }
    } else if (cmd.startsWith("cat ")) {
      const path = resolvePath(args[0])

      if (!fileSystem[path]) {
        return { output: <div className="text-red-400">File not found: {path}</div>, status: "error" }
      }

      if (fileSystem[path].type !== "file") {
        return { output: <div className="text-red-400">Not a file: {path}</div>, status: "error" }
      }

      return {
        output: <div className="text-white font-mono whitespace-pre-wrap">{fileSystem[path].content}</div>,
        status: "success",
      }
    } else if (cmd.startsWith("mkdir ")) {
      return {
        output: (
          <div className="text-amber-400">
            mkdir command received. This is a simulated environment, no actual directory will be created.
          </div>
        ),
        status: "warning",
      }
    } else if (cmd.startsWith("rm ")) {
      return {
        output: (
          <div className="text-amber-400">
            rm command received. This is a simulated environment, no actual files will be removed.
          </div>
        ),
        status: "warning",
      }
    } else {
      return {
        output: <div className="text-red-400">Command not found: {command}</div>,
        status: "error",
      }
    }
  }

  // Resolve path (handle relative paths)
  const resolvePath = (path: string): string => {
    if (path.startsWith("/")) {
      return path
    }

    if (path === "..") {
      const parts = currentDirectory.split("/").filter(Boolean)
      if (parts.length === 0) {
        return "/"
      }
      return "/" + parts.slice(0, -1).join("/")
    }

    if (path === ".") {
      return currentDirectory
    }

    return currentDirectory === "/" ? `/${path}` : `${currentDirectory}/${path}`
  }

  // Handle command submission
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim() === "") return

    const { output, status } = processCommand(currentCommand)

    // Add command to history
    if (currentCommand.trim().toLowerCase() !== "clear") {
      setCommandHistory((prev) => [
        ...prev,
        {
          id: commandId,
          command: currentCommand,
          output,
          timestamp: new Date(),
          status,
        },
      ])
    } else {
      setCommandHistory([])
    }

    // Reset command input and increment ID
    setCurrentCommand("")
    setCommandId(commandId + 1)
    setShowSuggestions(false)

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 0)
  }

  // Add new terminal tab
  const addTerminal = () => {
    const id = `terminal-${terminals.length + 1}`
    const name = `Terminal ${terminals.length + 1}`
    setTerminals([...terminals, { id, name }])
    setActiveTab(id)
  }

  // Close terminal tab
  const closeTerminal = (id: string) => {
    if (terminals.length === 1) return
    const newTerminals = terminals.filter((terminal) => terminal.id !== id)
    setTerminals(newTerminals)
    if (activeTab === id) {
      setActiveTab(newTerminals[0].id)
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      className={`flex flex-col ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "h-full"
      } overflow-hidden bg-black/20 backdrop-blur-sm rounded-lg border border-white/10`}
    >
      <div className="flex items-center justify-between p-2 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-green-400" />
          <h2 className="text-lg font-bold text-white">System Console</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-black/30 text-green-400 border-green-400/30">
            {currentTime.toLocaleTimeString()}
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="flex items-center bg-black/30 border-b border-white/10">
          <TabsList className="bg-transparent h-9 p-0">
            {terminals.map((terminal) => (
              <div key={terminal.id} className="relative group">
                <TabsTrigger
                  value={terminal.id}
                  className="data-[state=active]:bg-black/40 data-[state=active]:text-green-400 rounded-none border-r border-white/10 h-9 px-4"
                >
                  {terminal.name}
                </TabsTrigger>
                {terminals.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 absolute top-2 right-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={() => closeTerminal(terminal.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-800 rounded-none"
              onClick={addTerminal}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TabsList>
          <div className="ml-auto flex items-center gap-1 pr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Output</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={() => setCommandHistory([])}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear Terminal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Log</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Terminal Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {terminals.map((terminal) => (
          <TabsContent key={terminal.id} value={terminal.id} className="flex-1 flex flex-col p-0 m-0">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden" onClick={focusInput}>
                <ScrollArea className="h-full" ref={terminalRef}>
                  <div className="p-4 font-mono text-sm">
                    {commandHistory.map((entry) => (
                      <div key={entry.id} className="mb-4">
                        {entry.command && (
                          <div className="flex items-center text-white mb-1">
                            <span className="text-green-400 mr-1">{currentDirectory}</span>
                            <ChevronRight className="h-3 w-3 text-green-400 mr-1" />
                            <span>{entry.command}</span>
                          </div>
                        )}
                        <div
                          className={`pl-4 border-l-2 ${
                            entry.status === "error"
                              ? "border-red-500"
                              : entry.status === "warning"
                                ? "border-amber-500"
                                : entry.status === "info"
                                  ? "border-blue-500"
                                  : "border-green-500"
                          }`}
                        >
                          {entry.output}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <form onSubmit={handleCommandSubmit} className="relative">
                <div className="flex items-center bg-black/40 border-t border-white/10 px-2 py-2">
                  <span className="text-green-400 font-mono mr-1">{currentDirectory}</span>
                  <ChevronRight className="h-4 w-4 text-green-400 mr-1" />
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={handleCommandChange}
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                    autoFocus
                  />
                </div>
                {showSuggestions && (
                  <div className="absolute bottom-full left-0 w-full bg-black/90 border border-white/10 rounded-t-md max-h-32 overflow-auto z-10">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="px-4 py-1 hover:bg-slate-800 cursor-pointer text-white font-mono"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex items-center justify-between p-2 bg-black/40 border-t border-white/10 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Cpu className="h-3 w-3 text-cyan-400 mr-1" />
            <span>{systemInfo.cpu.usage}%</span>
          </div>
          <div className="flex items-center">
            <Memory className="h-3 w-3 text-purple-400 mr-1" />
            <span>{systemInfo.memory.usage}%</span>
          </div>
          <div className="flex items-center">
            <HardDrive className="h-3 w-3 text-blue-400 mr-1" />
            <span>{systemInfo.storage.usage}%</span>
          </div>
          <div className="flex items-center">
            <Wifi className="h-3 w-3 text-green-400 mr-1" />
            <span>{systemInfo.network.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Shield className="h-3 w-3 text-green-400 mr-1" />
            <span>Secure</span>
          </div>
          <div className="flex items-center">
            <Server className="h-3 w-3 text-slate-400 mr-1" />
            <span>{systemInfo.hostname}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 text-slate-400 mr-1" />
            <span>{systemInfo.uptime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
