"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  Wifi,
  Globe,
  Server,
  Shield,
  AlertTriangle,
  BarChart2,
  Zap,
  Radio,
  Router,
  NetworkIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample network traffic data
const trafficData = [
  { time: "00:00", incoming: 42, outgoing: 28 },
  { time: "01:00", incoming: 35, outgoing: 22 },
  { time: "02:00", incoming: 30, outgoing: 18 },
  { time: "03:00", incoming: 27, outgoing: 15 },
  { time: "04:00", incoming: 25, outgoing: 14 },
  { time: "05:00", incoming: 28, outgoing: 16 },
  { time: "06:00", incoming: 45, outgoing: 25 },
  { time: "07:00", incoming: 65, outgoing: 40 },
  { time: "08:00", incoming: 85, outgoing: 65 },
  { time: "09:00", incoming: 95, outgoing: 75 },
  { time: "10:00", incoming: 90, outgoing: 70 },
  { time: "11:00", incoming: 85, outgoing: 65 },
]

// Sample network devices
const networkDevices = [
  {
    id: 1,
    name: "Main Router",
    type: "Router",
    status: "Online",
    ip: "192.168.1.1",
    mac: "00:1A:2B:3C:4D:5E",
    load: 45,
  },
  { id: 2, name: "Switch-01", type: "Switch", status: "Online", ip: "192.168.1.2", mac: "00:2B:3C:4D:5E:6F", load: 32 },
  {
    id: 3,
    name: "Access Point 1",
    type: "AP",
    status: "Online",
    ip: "192.168.1.3",
    mac: "00:3C:4D:5E:6F:7G",
    load: 67,
  },
  {
    id: 4,
    name: "Firewall",
    type: "Security",
    status: "Online",
    ip: "192.168.1.4",
    mac: "00:4D:5E:6F:7G:8H",
    load: 28,
  },
  { id: 5, name: "NAS", type: "Storage", status: "Online", ip: "192.168.1.5", mac: "00:5E:6F:7G:8H:9I", load: 76 },
]

// Sample active connections
const activeConnections = [
  {
    id: 1,
    source: "192.168.1.100",
    destination: "8.8.8.8",
    protocol: "TCP",
    port: 443,
    status: "Established",
    duration: "00:15:32",
  },
  {
    id: 2,
    source: "192.168.1.101",
    destination: "172.217.22.14",
    protocol: "TCP",
    port: 80,
    status: "Established",
    duration: "00:03:45",
  },
  {
    id: 3,
    source: "192.168.1.102",
    destination: "13.107.42.16",
    protocol: "UDP",
    port: 53,
    status: "Active",
    duration: "00:00:12",
  },
  {
    id: 4,
    source: "192.168.1.103",
    destination: "192.168.1.5",
    protocol: "TCP",
    port: 445,
    status: "Established",
    duration: "01:22:07",
  },
]

// Sample network alerts
const networkAlerts = [
  {
    id: 1,
    type: "Warning",
    message: "High bandwidth usage detected on WAN interface",
    time: "10 minutes ago",
    severity: "medium",
  },
  {
    id: 2,
    type: "Critical",
    message: "Multiple connection attempts blocked from 45.227.253.98",
    time: "15 minutes ago",
    severity: "high",
  },
  { id: 3, type: "Info", message: "Access Point 2 firmware update available", time: "1 hour ago", severity: "low" },
  {
    id: 4,
    type: "Warning",
    message: "Unusual traffic pattern detected on VLAN 3",
    time: "2 hours ago",
    severity: "medium",
  },
]

export default function Network() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [networkStatus, setNetworkStatus] = useState({
    uptime: "15 days, 7 hours, 23 minutes",
    wanStatus: "Connected",
    lanStatus: "Active",
    wifiStatus: "Broadcasting",
    bandwidth: {
      download: 945,
      upload: 432,
      utilization: 38,
    },
    latency: 24,
    packetLoss: 0.2,
    activeConnections: 47,
    securityThreats: 2,
  })

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "online":
      case "connected":
      case "active":
      case "broadcasting":
        return "text-green-500"
      case "warning":
      case "degraded":
        return "text-amber-500"
      case "offline":
      case "disconnected":
      case "error":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  // Function to determine severity badge color
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-auto bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NetworkIcon className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Network Control</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-black/30 text-cyan-400 border-cyan-400/30">
            {currentTime.toLocaleTimeString()}
          </Badge>
          <Badge
            variant="outline"
            className={`bg-black/30 border-green-400/30 ${networkStatus.wanStatus === "Connected" ? "text-green-400" : "text-red-400"}`}
          >
            WAN {networkStatus.wanStatus}
          </Badge>
        </div>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wifi className="h-4 w-4 text-cyan-400" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">WAN</span>
                <span className={`text-xs font-medium ${getStatusColor(networkStatus.wanStatus)}`}>
                  {networkStatus.wanStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">LAN</span>
                <span className={`text-xs font-medium ${getStatusColor(networkStatus.lanStatus)}`}>
                  {networkStatus.lanStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">WiFi</span>
                <span className={`text-xs font-medium ${getStatusColor(networkStatus.wifiStatus)}`}>
                  {networkStatus.wifiStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Uptime</span>
                <span className="text-xs font-medium text-white">{networkStatus.uptime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              Bandwidth Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Download</span>
                <span className="text-xs font-medium text-white">{networkStatus.bandwidth.download} Mbps</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Upload</span>
                <span className="text-xs font-medium text-white">{networkStatus.bandwidth.upload} Mbps</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70">Utilization</span>
                  <span className="text-xs font-medium text-white">{networkStatus.bandwidth.utilization}%</span>
                </div>
                <Progress
                  value={networkStatus.bandwidth.utilization}
                  className="h-1 bg-white/10"
                  indicatorClassName="bg-cyan-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Latency</span>
                <span className="text-xs font-medium text-white">{networkStatus.latency} ms</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70">Packet Loss</span>
                  <span className="text-xs font-medium text-white">{networkStatus.packetLoss}%</span>
                </div>
                <Progress
                  value={networkStatus.packetLoss * 10}
                  className="h-1 bg-white/10"
                  indicatorClassName="bg-amber-400"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Active Connections</span>
                <span className="text-xs font-medium text-white">{networkStatus.activeConnections}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Security Threats</span>
                <span className="text-xs font-medium text-red-400">{networkStatus.securityThreats}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/5 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Radio className="h-3.5 w-3.5 mr-1" />
                Scan WiFi
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Router className="h-3.5 w-3.5 mr-1" />
                Restart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Shield className="h-3.5 w-3.5 mr-1" />
                Firewall
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <BarChart2 className="h-3.5 w-3.5 mr-1" />
                Diagnostics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Tabs */}
      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="bg-black/50 border border-white/10">
          <TabsTrigger value="traffic" className="data-[state=active]:bg-cyan-950/30 data-[state=active]:text-cyan-400">
            Traffic Analysis
          </TabsTrigger>
          <TabsTrigger value="devices" className="data-[state=active]:bg-cyan-950/30 data-[state=active]:text-cyan-400">
            Network Devices
          </TabsTrigger>
          <TabsTrigger
            value="connections"
            className="data-[state=active]:bg-cyan-950/30 data-[state=active]:text-cyan-400"
          >
            Active Connections
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-cyan-950/30 data-[state=active]:text-cyan-400">
            Alerts
          </TabsTrigger>
        </TabsList>

        {/* Traffic Analysis Tab */}
        <TabsContent value="traffic" className="mt-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                Network Traffic
              </CardTitle>
              <CardDescription className="text-white/70">
                Real-time bandwidth usage over the last 12 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    incoming: {
                      label: "Incoming Traffic",
                      color: "hsl(var(--chart-1))",
                    },
                    outgoing: {
                      label: "Outgoing Traffic",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="incoming"
                        stroke="var(--color-incoming)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="outgoing"
                        stroke="var(--color-outgoing)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyan-400"></div>
                <span className="text-xs text-white/70">
                  Incoming: Avg {trafficData.reduce((acc, item) => acc + item.incoming, 0) / trafficData.length} Mbps
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-400"></div>
                <span className="text-xs text-white/70">
                  Outgoing: Avg {trafficData.reduce((acc, item) => acc + item.outgoing, 0) / trafficData.length} Mbps
                </span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Network Devices Tab */}
        <TabsContent value="devices" className="mt-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Server className="h-5 w-5 text-cyan-400" />
                Network Devices
              </CardTitle>
              <CardDescription className="text-white/70">Connected devices and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-2 text-xs font-medium text-white/70">Name</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Type</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">IP Address</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">MAC Address</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Status</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Load</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {networkDevices.map((device) => (
                      <tr key={device.id} className="hover:bg-white/5">
                        <td className="p-2 text-white">{device.name}</td>
                        <td className="p-2 text-white/70">{device.type}</td>
                        <td className="p-2 text-white/70">{device.ip}</td>
                        <td className="p-2 text-white/70">{device.mac}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(device.status)} bg-black/30`}
                          >
                            {device.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={device.load}
                              className="h-1.5 w-24 bg-white/10"
                              indicatorClassName={`${device.load > 80 ? "bg-red-400" : device.load > 60 ? "bg-amber-400" : "bg-cyan-400"}`}
                            />
                            <span className="text-xs text-white/70">{device.load}%</span>
                          </div>
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
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Server className="h-3.5 w-3.5 mr-1" />
                Add Device
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                Refresh Status
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Active Connections Tab */}
        <TabsContent value="connections" className="mt-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Globe className="h-5 w-5 text-cyan-400" />
                Active Connections
              </CardTitle>
              <CardDescription className="text-white/70">Current network connections and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-2 text-xs font-medium text-white/70">Source</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Destination</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Protocol</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Port</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Status</th>
                      <th className="text-left p-2 text-xs font-medium text-white/70">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeConnections.map((connection) => (
                      <tr key={connection.id} className="hover:bg-white/5">
                        <td className="p-2 text-white">{connection.source}</td>
                        <td className="p-2 text-white/70">{connection.destination}</td>
                        <td className="p-2 text-white/70">{connection.protocol}</td>
                        <td className="p-2 text-white/70">{connection.port}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(connection.status)} bg-black/30`}
                          >
                            {connection.status}
                          </span>
                        </td>
                        <td className="p-2 text-white/70">{connection.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <div className="text-xs text-white/70">Total active connections: {activeConnections.length}</div>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                Refresh
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="mt-4">
          <Card className="bg-black/40 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cyan-400" />
                Network Alerts
              </CardTitle>
              <CardDescription className="text-white/70">Recent network issues and security alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {networkAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className={`p-1.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-white">{alert.type}</h4>
                        <span className="text-xs text-white/50">{alert.time}</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Shield className="h-3.5 w-3.5 mr-1" />
                Security Scan
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                Clear Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Network Topology Visualization */}
      <Card className="bg-black/40 border-white/5 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <NetworkIcon className="h-5 w-5 text-cyan-400" />
            Network Topology
          </CardTitle>
          <CardDescription className="text-white/70">
            Visual representation of your network infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl h-64 rounded-lg border border-white/10 bg-black/20 flex items-center justify-center">
            {/* This would be replaced with an actual network topology visualization */}
            <div className="text-center">
              <NetworkIcon className="h-16 w-16 text-cyan-400/30 mx-auto mb-4" />
              <p className="text-white/50 text-sm">Network topology visualization would be displayed here</p>
              <p className="text-white/30 text-xs mt-2">Interactive map showing connections between devices</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-white/10 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            Refresh Topology
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
