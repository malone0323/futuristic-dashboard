"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  UserCheck,
  FileWarning,
  Settings,
  RefreshCw,
  CheckCircle,
  Clock,
  Fingerprint,
  Users,
  Key,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  Globe,
  HardDrive,
  Server,
  Zap,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample threat data for chart
const threatData = [
  { time: "00:00", threats: 2, blocked: 2 },
  { time: "01:00", threats: 1, blocked: 1 },
  { time: "02:00", threats: 0, blocked: 0 },
  { time: "03:00", threats: 0, blocked: 0 },
  { time: "04:00", threats: 1, blocked: 1 },
  { time: "05:00", threats: 3, blocked: 3 },
  { time: "06:00", threats: 2, blocked: 2 },
  { time: "07:00", threats: 5, blocked: 5 },
  { time: "08:00", threats: 8, blocked: 7 },
  { time: "09:00", threats: 12, blocked: 11 },
  { time: "10:00", threats: 10, blocked: 10 },
  { time: "11:00", threats: 7, blocked: 7 },
  { time: "12:00", threats: 9, blocked: 8 },
]

// Sample security incidents
const securityIncidents = [
  {
    id: 1,
    type: "Intrusion Attempt",
    source: "45.227.253.98",
    target: "SSH Service",
    time: "10:42:15",
    severity: "high",
    status: "blocked",
  },
  {
    id: 2,
    type: "Malware Detected",
    source: "Email Attachment",
    target: "User Workstation",
    time: "09:15:32",
    severity: "critical",
    status: "quarantined",
  },
  {
    id: 3,
    type: "Suspicious Login",
    source: "192.168.1.105",
    target: "Admin Panel",
    time: "08:37:19",
    severity: "medium",
    status: "flagged",
  },
  {
    id: 4,
    type: "Port Scan",
    source: "103.45.78.122",
    target: "Network Perimeter",
    time: "07:22:48",
    severity: "low",
    status: "blocked",
  },
  {
    id: 5,
    type: "Data Exfiltration Attempt",
    source: "Internal Workstation",
    target: "External Server",
    time: "Yesterday",
    severity: "high",
    status: "blocked",
  },
]

// Sample firewall rules
const firewallRules = [
  {
    id: 1,
    name: "Block SSH External",
    source: "External",
    destination: "Internal",
    port: "22",
    protocol: "TCP",
    action: "Block",
    status: "Active",
  },
  {
    id: 2,
    name: "Allow HTTP/HTTPS",
    source: "Any",
    destination: "Web Server",
    port: "80, 443",
    protocol: "TCP",
    action: "Allow",
    status: "Active",
  },
  {
    id: 3,
    name: "Block Telnet",
    source: "Any",
    destination: "Internal",
    port: "23",
    protocol: "TCP",
    action: "Block",
    status: "Active",
  },
  {
    id: 4,
    name: "Allow Internal SMTP",
    source: "Internal",
    destination: "Mail Server",
    port: "25",
    protocol: "TCP",
    action: "Allow",
    status: "Active",
  },
  {
    id: 5,
    name: "Rate Limit DNS",
    source: "Any",
    destination: "DNS Server",
    port: "53",
    protocol: "UDP",
    action: "Rate Limit",
    status: "Active",
  },
]

// Sample vulnerabilities
const vulnerabilities = [
  {
    id: 1,
    name: "OpenSSL Vulnerability",
    affected: "Web Server",
    severity: "critical",
    status: "Unpatched",
    cve: "CVE-2023-0286",
  },
  {
    id: 2,
    name: "Outdated WordPress Plugin",
    affected: "CMS Server",
    severity: "high",
    status: "Scheduled",
    cve: "CVE-2023-1234",
  },
  {
    id: 3,
    name: "SMB Protocol Vulnerability",
    affected: "File Server",
    severity: "medium",
    status: "Patched",
    cve: "CVE-2022-5678",
  },
  {
    id: 4,
    name: "Default Credentials",
    affected: "IoT Device",
    severity: "high",
    status: "Unpatched",
    cve: "N/A",
  },
  {
    id: 5,
    name: "SQL Injection Vulnerability",
    affected: "Database Server",
    severity: "high",
    status: "In Progress",
    cve: "CVE-2023-4321",
  },
]

// Sample access logs
const accessLogs = [
  {
    id: 1,
    user: "admin",
    action: "Login",
    resource: "Control Panel",
    ip: "192.168.1.100",
    time: "11:42:15",
    status: "Success",
  },
  {
    id: 2,
    user: "system",
    action: "File Access",
    resource: "System Config",
    ip: "192.168.1.5",
    time: "11:30:22",
    status: "Success",
  },
  {
    id: 3,
    user: "guest",
    action: "Login",
    resource: "Public Portal",
    ip: "203.45.78.122",
    time: "11:15:48",
    status: "Success",
  },
  {
    id: 4,
    user: "unknown",
    action: "Login",
    resource: "Admin Panel",
    ip: "45.227.253.98",
    time: "10:58:33",
    status: "Failed",
  },
  {
    id: 5,
    user: "jsmith",
    action: "Password Change",
    resource: "User Account",
    ip: "192.168.1.105",
    time: "10:45:12",
    status: "Success",
  },
]

export default function Security() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [securityStatus, setSecurityStatus] = useState({
    threatLevel: "Low",
    securityScore: 92,
    activeThreats: 0,
    blockedThreats: 47,
    lastScan: "2 hours ago",
    firewallStatus: "Active",
    encryptionStatus: "Enabled",
    idpStatus: "Active",
    vulnerabilities: 3,
  })

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Function to determine severity color
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/30"
      case "high":
        return "text-amber-500 bg-amber-500/10 border-amber-500/30"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/30"
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/30"
    }
  }

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
      case "success":
      case "patched":
        return "text-green-500"
      case "blocked":
      case "quarantined":
        return "text-blue-500"
      case "failed":
      case "unpatched":
        return "text-red-500"
      case "flagged":
      case "in progress":
      case "scheduled":
        return "text-amber-500"
      default:
        return "text-slate-500"
    }
  }

  // Function to determine threat level color
  const getThreatLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-amber-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-auto bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Security Center</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-black/30 text-green-400 border-green-400/30">
            {currentTime.toLocaleTimeString()}
          </Badge>
          <Badge
            variant="outline"
            className={`bg-black/30 border-green-400/30 ${getThreatLevelColor(securityStatus.threatLevel)}`}
          >
            Threat Level: {securityStatus.threatLevel}
          </Badge>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Security Score</span>
                <span className="text-xs font-medium text-green-400">{securityStatus.securityScore}/100</span>
              </div>
              <Progress
                value={securityStatus.securityScore}
                className="h-1.5 bg-white/10"
                indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-400"
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-white/70">Firewall</span>
                  <span className={`text-xs font-medium ${getStatusColor(securityStatus.firewallStatus)}`}>
                    {securityStatus.firewallStatus}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/70">Encryption</span>
                  <span className={`text-xs font-medium ${getStatusColor(securityStatus.encryptionStatus)}`}>
                    {securityStatus.encryptionStatus}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/70">Intrusion Detection</span>
                  <span className={`text-xs font-medium ${getStatusColor(securityStatus.idpStatus)}`}>
                    {securityStatus.idpStatus}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/70">Last Scan</span>
                  <span className="text-xs font-medium text-white">{securityStatus.lastScan}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-green-400" />
              Threat Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Active Threats</span>
                <span className="text-xs font-medium text-white">{securityStatus.activeThreats}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Blocked (24h)</span>
                <span className="text-xs font-medium text-white">{securityStatus.blockedThreats}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Vulnerabilities</span>
                <span className="text-xs font-medium text-amber-400">{securityStatus.vulnerabilities}</span>
              </div>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                >
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  Run Security Scan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-400" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Active Sessions</span>
                <span className="text-xs font-medium text-white">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Failed Logins (24h)</span>
                <span className="text-xs font-medium text-white">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Password Policy</span>
                <span className="text-xs font-medium text-green-400">Strong</span>
              </div>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                >
                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                  Manage Users
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Settings className="h-4 w-4 text-green-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                Firewall
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                Monitoring
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <FileWarning className="h-3.5 w-3.5 mr-1" />
                Scan Files
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Update DB
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Tabs */}
      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="bg-black/50 border border-white/10">
          <TabsTrigger
            value="incidents"
            className="data-[state=active]:bg-green-950/30 data-[state=active]:text-green-400"
          >
            Security Incidents
          </TabsTrigger>
          <TabsTrigger
            value="firewall"
            className="data-[state=active]:bg-green-950/30 data-[state=active]:text-green-400"
          >
            Firewall
          </TabsTrigger>
          <TabsTrigger
            value="vulnerabilities"
            className="data-[state=active]:bg-green-950/30 data-[state=active]:text-green-400"
          >
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger
            value="access"
            className="data-[state=active]:bg-green-950/30 data-[state=active]:text-green-400"
          >
            Access Logs
          </TabsTrigger>
        </TabsList>

        {/* Security Incidents Tab */}
        <TabsContent value="incidents" className="mt-4 space-y-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-green-400" />
                Threat Activity
              </CardTitle>
              <CardDescription className="text-white/70">
                Security incidents detected in the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    threats: {
                      label: "Detected Threats",
                      color: "hsl(var(--chart-1))",
                    },
                    blocked: {
                      label: "Blocked Threats",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={threatData}>
                      <defs>
                        <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="threats"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#colorThreats)"
                      />
                      <Area
                        type="monotone"
                        dataKey="blocked"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorBlocked)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-green-400" />
                Recent Security Incidents
              </CardTitle>
              <CardDescription className="text-white/70">
                Details of recent security events and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-2 text-xs font-medium text-white/70">Type</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Source</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Target</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Time</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Severity</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {securityIncidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-white/5">
                        <td className="p-2 text-white">{incident.type}</td>
                        <td className="p-2 text-white/70">{incident.source}</td>
                        <td className="p-2 text-white/70">{incident.target}</td>
                        <td className="p-2 text-white/70">{incident.time}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(incident.severity)}`}
                          >
                            {incident.severity}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`text-xs font-medium ${getStatusColor(incident.status)}`}>
                            {incident.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <div className="text-xs text-white/70">Showing 5 of 24 incidents</div>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                View All Incidents
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Firewall Tab */}
        <TabsContent value="firewall" className="mt-4 space-y-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                Firewall Status
              </CardTitle>
              <CardDescription className="text-white/70">
                Current firewall configuration and protection status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-white">Firewall Mode</h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">WAN Protection</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">WiFi Protection</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Server Protection</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Storage Protection</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h3 className="text-sm font-medium text-white mb-2">Protection Statistics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/70">Intrusion Attempts</span>
                        <span className="text-xs text-white">156</span>
                      </div>
                      <Progress value={60} className="h-1 bg-white/10" indicatorClassName="bg-amber-400" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/70">Malware Blocked</span>
                        <span className="text-xs text-white">47</span>
                      </div>
                      <Progress value={40} className="h-1 bg-white/10" indicatorClassName="bg-red-400" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/70">Suspicious Traffic</span>
                        <span className="text-xs text-white">89</span>
                      </div>
                      <Progress value={30} className="h-1 bg-white/10" indicatorClassName="bg-blue-400" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/70">Port Scans</span>
                        <span className="text-xs text-white">215</span>
                      </div>
                      <Progress value={80} className="h-1 bg-white/10" indicatorClassName="bg-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h3 className="text-sm font-medium text-white mb-2">Firewall Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Protection Level</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Last Updated</span>
                      <span className="text-xs text-white">Today, 08:45 AM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Rule Count</span>
                      <span className="text-xs text-white">42</span>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                      >
                        <Settings className="h-3.5 w-3.5 mr-1" />
                        Advanced Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Firewall Rules
              </CardTitle>
              <CardDescription className="text-white/70">
                Active firewall rules and traffic filtering policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-2 text-xs font-medium text-white/70">Rule Name</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Source</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Destination</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Port/Protocol</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Action</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {firewallRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-white/5">
                        <td className="p-2 text-white">{rule.name}</td>
                        <td className="p-2 text-white/70">{rule.source}</td>
                        <td className="p-2 text-white/70">{rule.destination}</td>
                        <td className="p-2 text-white/70">
                          {rule.port} ({rule.protocol})
                        </td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              rule.action === "Block"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : rule.action === "Allow"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {rule.action}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`text-xs font-medium ${getStatusColor(rule.status)}`}>{rule.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <Shield className="h-3.5 w-3.5 mr-1" />
                Add Rule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <Settings className="h-3.5 w-3.5 mr-1" />
                Edit Rules
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities" className="mt-4 space-y-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-green-400" />
                System Vulnerabilities
              </CardTitle>
              <CardDescription className="text-white/70">
                Detected vulnerabilities and remediation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-2 text-xs font-medium text-white/70">Vulnerability</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Affected System</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">CVE</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Severity</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Status</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {vulnerabilities.map((vuln) => (
                      <tr key={vuln.id} className="hover:bg-white/5">
                        <td className="p-2 text-white">{vuln.name}</td>
                        <td className="p-2 text-white/70">{vuln.affected}</td>
                        <td className="p-2 text-white/70">{vuln.cve}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(vuln.severity)}`}
                          >
                            {vuln.severity}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`text-xs font-medium ${getStatusColor(vuln.status)}`}>{vuln.status}</span>
                        </td>
                        <td className="p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                          >
                            Fix
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <div className="text-xs text-white/70">Last scan: Today, 08:45 AM</div>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                Run Vulnerability Scan
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                Security Recommendations
              </CardTitle>
              <CardDescription className="text-white/70">Suggested actions to improve system security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="p-1.5 rounded-full bg-amber-500/20 text-amber-400">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">Update System Packages</h4>
                    <p className="text-xs text-white/70 mt-1">
                      Several system packages are outdated and may contain security vulnerabilities.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                  >
                    Update
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="p-1.5 rounded-full bg-red-500/20 text-red-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">Enable Two-Factor Authentication</h4>
                    <p className="text-xs text-white/70 mt-1">
                      Two-factor authentication is not enabled for administrator accounts.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                  >
                    Enable
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-400">
                    <Server className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">Configure Automatic Backups</h4>
                    <p className="text-xs text-white/70 mt-1">
                      Automatic system backups are not configured for critical systems.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Logs Tab */}
        <TabsContent value="access" className="mt-4 space-y-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-400" />
                Access Control
              </CardTitle>
              <CardDescription className="text-white/70">User authentication and access management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h3 className="text-sm font-medium text-white mb-3">Authentication Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Key className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Password Policy</Label>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Strong</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Fingerprint className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Two-Factor Auth</Label>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Partial</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Session Timeout</Label>
                      </div>
                      <span className="text-xs text-white">15 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Active Users</Label>
                      </div>
                      <span className="text-xs text-white">3 / 5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h3 className="text-sm font-medium text-white mb-3">Login Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Successful Logins (24h)</span>
                      <span className="text-xs text-white">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Failed Logins (24h)</span>
                      <span className="text-xs text-white">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Password Changes (30d)</span>
                      <span className="text-xs text-white">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Account Lockouts (30d)</span>
                      <span className="text-xs text-white">1</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h3 className="text-sm font-medium text-white mb-3">Access Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Brute Force Protection</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Login Monitoring</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Geo-Restriction</Label>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-green-400 mr-2" />
                        <Label className="text-xs text-white/70">Anomaly Detection</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-green-400" />
                Access Logs
              </CardTitle>
              <CardDescription className="text-white/70">Recent authentication and access events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-2 text-xs font-medium text-white/70">User</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Action</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Resource</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">IP Address</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Time</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {accessLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5">
                        <td className="p-2 text-white">{log.user}</td>
                        <td className="p-2 text-white/70">{log.action}</td>
                        <td className="p-2 text-white/70">{log.resource}</td>
                        <td className="p-2 text-white/70">{log.ip}</td>
                        <td className="p-2 text-white/70">{log.time}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              log.status === "Success"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <div className="text-xs text-white/70">Showing 5 of 124 log entries</div>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                View All Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Settings */}
      <Card className="bg-black/40 border-white/5 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Settings className="h-5 w-5 text-green-400" />
            Security Settings
          </CardTitle>
          <CardDescription className="text-white/70">Configure security policies and protection levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Automatic Security Updates</h4>
                  <p className="text-xs text-white/70 mt-0.5">Keep security definitions up to date automatically</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Real-time Protection</h4>
                  <p className="text-xs text-white/70 mt-0.5">Monitor system activity for threats in real-time</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Behavior Analysis</h4>
                  <p className="text-xs text-white/70 mt-0.5">Detect threats based on suspicious behavior patterns</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Ransomware Protection</h4>
                  <p className="text-xs text-white/70 mt-0.5">Prevent unauthorized encryption of important files</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Network Monitoring</h4>
                  <p className="text-xs text-white/70 mt-0.5">Monitor network traffic for suspicious activity</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Vulnerability Scanning</h4>
                  <p className="text-xs text-white/70 mt-0.5">
                    Regularly scan for system and application vulnerabilities
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Security Notifications</h4>
                  <p className="text-xs text-white/70 mt-0.5">Receive alerts about security events</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Data Encryption</h4>
                  <p className="text-xs text-white/70 mt-0.5">Encrypt sensitive data at rest and in transit</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Reset to Defaults
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-black/30 border-green-500/20 text-green-400 hover:bg-green-950/50 hover:text-green-300"
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
