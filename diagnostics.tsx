"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  AlertCircle,
  ChevronDown,
  Cpu,
  Download,
  FileDigit,
  FileWarning,
  HardDrive,
  ListFilter,
  Loader2,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  Thermometer,
  Wifi,
  X,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function Diagnostics() {
  const [isLoading, setIsLoading] = useState(true)
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false)
  const [diagnosticsProgress, setDiagnosticsProgress] = useState(0)
  const [diagnosticsResults, setDiagnosticsResults] = useState<DiagnosticResult[]>([])
  const [cpuTemperature, setCpuTemperature] = useState(65)
  const [systemLoad, setSystemLoad] = useState(38)
  const [memoryHealth, setMemoryHealth] = useState(92)
  const [storageHealth, setStorageHealth] = useState(88)
  const [networkLatency, setNetworkLatency] = useState(24)
  const [systemStatus, setSystemStatus] = useState(75) // Added systemStatus state

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuTemperature(Math.floor(Math.random() * 10) + 60)
      setSystemLoad(Math.floor(Math.random() * 20) + 30)
      setNetworkLatency(Math.floor(Math.random() * 15) + 15)
      setSystemStatus(Math.floor(Math.random() * 30) + 70) // Update systemStatus
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate running diagnostics
  const runDiagnostics = () => {
    setDiagnosticsRunning(true)
    setDiagnosticsProgress(0)
    setDiagnosticsResults([])

    const startTime = Date.now()
    const interval = setInterval(() => {
      setDiagnosticsProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 5) + 1
        if (newProgress >= 100) {
          clearInterval(interval)
          setDiagnosticsRunning(false)

          // Generate diagnostic results
          const results: DiagnosticResult[] = [
            {
              component: "CPU",
              status: "Optimal",
              details: "All cores functioning within parameters",
              timestamp: new Date().toISOString(),
            },
            {
              component: "Memory",
              status: "Good",
              details: "No memory errors detected",
              timestamp: new Date().toISOString(),
            },
            {
              component: "Storage",
              status: "Warning",
              details: "Sector errors detected on drive C:",
              timestamp: new Date().toISOString(),
            },
            {
              component: "Network",
              status: "Optimal",
              details: "Connectivity stable, latency within normal range",
              timestamp: new Date().toISOString(),
            },
            {
              component: "Power Management",
              status: "Optimal",
              details: "Power distribution normal",
              timestamp: new Date().toISOString(),
            },
            {
              component: "Thermal Management",
              status: "Good",
              details: "Temperatures within operating parameters",
              timestamp: new Date().toISOString(),
            },
          ]

          setDiagnosticsResults(results)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }

  const getHealthColor = (value: number) => {
    if (value > 90) return "from-green-500 to-emerald-500"
    if (value > 70) return "from-yellow-500 to-amber-500"
    return "from-red-500 to-rose-500"
  }

  const getTemperatureColor = (temp: number) => {
    if (temp < 65) return "text-green-500"
    if (temp < 75) return "text-amber-500"
    return "text-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Optimal":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Optimal</Badge>
      case "Good":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Good</Badge>
      case "Warning":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Warning</Badge>
      case "Critical":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Critical</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden p-4">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">LOADING DIAGNOSTICS</div>
          </div>
        </div>
      )}

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Activity className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SYSTEM DIAGNOSTICS
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="inline-block h-4 w-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search diagnostics..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <Select defaultValue="full">
              <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700/50 text-slate-300">
                <SelectValue placeholder="Diagnostic Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                <SelectItem value="quick">Quick Scan</SelectItem>
                <SelectItem value="full">Full Diagnostic</SelectItem>
                <SelectItem value="hardware">Hardware Only</SelectItem>
                <SelectItem value="network">Network Only</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={runDiagnostics}
              disabled={diagnosticsRunning}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {diagnosticsRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Run Diagnostics
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left side */}
          <div className="col-span-12 lg:col-span-8">
            {/* Diagnostic Progress */}
            {diagnosticsRunning && (
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center text-lg">
                      <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                      Diagnostic in Progress
                    </CardTitle>
                    <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                      RUNNING
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-2 flex justify-between items-center">
                    <div className="text-sm text-slate-400">System Scan</div>
                    <div className="text-sm text-cyan-400">{diagnosticsProgress}%</div>
                  </div>
                  <Progress value={diagnosticsProgress} className="h-2 bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${diagnosticsProgress}%` }}
                    />
                  </Progress>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-3">
                      <div className="text-xs text-slate-500 mb-1">Current Component</div>
                      <div className="text-sm text-slate-200 flex items-center">
                        <Server className="h-4 w-4 mr-1 text-cyan-500" />
                        Storage Subsystem
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-3">
                      <div className="text-xs text-slate-500 mb-1">Tests Completed</div>
                      <div className="text-sm text-slate-200">{Math.floor(diagnosticsProgress / 10)} / 10</div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-3">
                      <div className="text-xs text-slate-500 mb-1">Estimated Time</div>
                      <div className="text-sm text-slate-200">{Math.ceil((100 - diagnosticsProgress) / 10)} min</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {diagnosticsResults.length > 0 && !diagnosticsRunning && (
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6 overflow-hidden">
                <CardHeader className="pb-2 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center text-lg">
                      <FileDigit className="mr-2 h-5 w-5 text-cyan-500" />
                      Diagnostic Results
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableHead className="text-slate-400">Component</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                        <TableHead className="text-slate-400 hidden md:table-cell">Details</TableHead>
                        <TableHead className="text-slate-400 hidden lg:table-cell">Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diagnosticsResults.map((result, index) => (
                        <TableRow key={index} className="border-slate-700/50 hover:bg-slate-800/50">
                          <TableCell className="font-medium text-slate-300">{result.component}</TableCell>
                          <TableCell>{getStatusBadge(result.status)}</TableCell>
                          <TableCell className="text-slate-400 hidden md:table-cell">{result.details}</TableCell>
                          <TableCell className="text-slate-500 hidden lg:table-cell">
                            {new Date(result.timestamp).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* System Details Tabs */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 flex items-center">
                  <Server className="mr-2 h-5 w-5 text-purple-500" />
                  System Diagnostics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hardware" className="w-full">
                  <TabsList className="bg-slate-800/50 p-1 mb-4">
                    <TabsTrigger
                      value="hardware"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Hardware
                    </TabsTrigger>
                    <TabsTrigger
                      value="network"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Network
                    </TabsTrigger>
                    <TabsTrigger
                      value="logs"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      System Logs
                    </TabsTrigger>
                  </TabsList>

                  {/* Hardware Tab */}
                  <TabsContent value="hardware" className="mt-0 space-y-6">
                    {/* CPU Diagnostics */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Cpu className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-md font-medium text-slate-200">CPU Diagnostics</h3>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-slate-400">Temperature</div>
                            <div className={`text-sm ${getTemperatureColor(cpuTemperature)}`}>{cpuTemperature}°C</div>
                          </div>
                          <Progress value={cpuTemperature} max={100} className="h-2 bg-slate-700">
                            <div
                              className={`h-full bg-gradient-to-r ${
                                cpuTemperature < 65
                                  ? "from-green-500 to-emerald-500"
                                  : cpuTemperature < 75
                                    ? "from-yellow-500 to-amber-500"
                                    : "from-red-500 to-rose-500"
                              } rounded-full`}
                              style={{ width: `${cpuTemperature}%` }}
                            />
                          </Progress>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm text-slate-400">System Load</div>
                              <div className="text-sm text-cyan-400">{systemLoad}%</div>
                            </div>
                            <Progress value={systemLoad} className="h-2 bg-slate-700">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                style={{ width: `${systemLoad}%` }}
                              />
                            </Progress>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Core 1 & 2</div>
                            <div className="text-cyan-400">
                              {Math.floor(Math.random() * 20) + 30}% / {Math.floor(Math.random() * 20) + 30}%
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Core 3 & 4</div>
                            <div className="text-cyan-400">
                              {Math.floor(Math.random() * 20) + 30}% / {Math.floor(Math.random() * 20) + 30}%
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Core 5 & 6</div>
                            <div className="text-cyan-400">
                              {Math.floor(Math.random() * 20) + 30}% / {Math.floor(Math.random() * 20) + 30}%
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Core 7 & 8</div>
                            <div className="text-cyan-400">
                              {Math.floor(Math.random() * 20) + 30}% / {Math.floor(Math.random() * 20) + 30}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Memory Diagnostics */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <HardDrive className="h-5 w-5 text-purple-500 mr-2" />
                          <h3 className="text-md font-medium text-slate-200">Memory Diagnostics</h3>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-slate-400">Memory Health</div>
                            <div className="text-sm text-green-400">{memoryHealth}%</div>
                          </div>
                          <Progress value={memoryHealth} className="h-2 bg-slate-700">
                            <div
                              className={`h-full bg-gradient-to-r ${getHealthColor(memoryHealth)} rounded-full`}
                              style={{ width: `${memoryHealth}%` }}
                            />
                          </Progress>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm text-slate-400">Memory Usage</div>
                              <div className="text-sm text-purple-400">12.4 GB / 24 GB</div>
                            </div>
                            <Progress value={52} className="h-2 bg-slate-700">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: "52%" }}
                              />
                            </Progress>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-sm text-slate-400 pb-1 mb-2 border-b border-slate-700/50">
                            Memory Tests
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Read Test</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Passed</Badge>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Write Test</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Passed</Badge>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Allocation Test</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Passed</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Storage Diagnostics */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <HardDrive className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="text-md font-medium text-slate-200">Storage Diagnostics</h3>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Warning</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-slate-400">Drive C: Health</div>
                            <div className="text-sm text-amber-400">{storageHealth}%</div>
                          </div>
                          <Progress value={storageHealth} className="h-2 bg-slate-700">
                            <div
                              className={`h-full bg-gradient-to-r ${getHealthColor(storageHealth)} rounded-full`}
                              style={{ width: `${storageHealth}%` }}
                            />
                          </Progress>

                          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-md">
                            <div className="flex items-start">
                              <FileWarning className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                              <p className="text-xs text-amber-400">
                                Warning: 24 bad sectors detected on drive C:. Consider backing up important data.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-sm text-slate-400 pb-1 mb-2 border-b border-slate-700/50">
                            Storage Tests
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Read Speed</div>
                            <div className="text-blue-400">524 MB/s</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Write Speed</div>
                            <div className="text-blue-400">498 MB/s</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">SMART Status</div>
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Warning</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Network Tab */}
                  <TabsContent value="network" className="mt-0 space-y-6">
                    {/* Network Diagnostics */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Wifi className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-md font-medium text-slate-200">Network Diagnostics</h3>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Connected</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-slate-400">Latency</div>
                            <div className="text-sm text-cyan-400">{networkLatency} ms</div>
                          </div>
                          <Progress value={networkLatency} max={100} className="h-2 bg-slate-700">
                            <div
                              className={`h-full bg-gradient-to-r ${
                                networkLatency < 30
                                  ? "from-green-500 to-emerald-500"
                                  : networkLatency < 60
                                    ? "from-yellow-500 to-amber-500"
                                    : "from-red-500 to-rose-500"
                              } rounded-full`}
                              style={{ width: `${networkLatency}%` }}
                            />
                          </Progress>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm text-slate-400">Packet Loss</div>
                              <div className="text-sm text-green-400">0.02%</div>
                            </div>
                            <Progress value={0.2} max={10} className="h-2 bg-slate-700">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                style={{ width: "0.2%" }}
                              />
                            </Progress>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Download</div>
                            <div className="text-cyan-400">842 Mbps</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Upload</div>
                            <div className="text-cyan-400">512 Mbps</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">DNS Response</div>
                            <div className="text-cyan-400">8 ms</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-slate-400">Active Connections</div>
                            <div className="text-cyan-400">18</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-700/50">
                        <div className="font-medium text-sm mb-2 text-slate-300">Connectivity Tests</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-2 flex items-center justify-between">
                            <div className="text-xs text-slate-400">Local Network</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">OK</Badge>
                          </div>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-2 flex items-center justify-between">
                            <div className="text-xs text-slate-400">Internet</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">OK</Badge>
                          </div>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-2 flex items-center justify-between">
                            <div className="text-xs text-slate-400">DNS</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">OK</Badge>
                          </div>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-md p-2 flex items-center justify-between">
                            <div className="text-xs text-slate-400">Firewall</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">OK</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Network Interfaces */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                        <h3 className="text-md font-medium text-slate-200 flex items-center">
                          <Server className="h-5 w-5 text-blue-500 mr-2" />
                          Network Interfaces
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 text-slate-400 hover:text-slate-100">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Refresh
                          </Button>
                        </div>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableHead className="text-slate-400">Interface</TableHead>
                            <TableHead className="text-slate-400">IP Address</TableHead>
                            <TableHead className="text-slate-400 hidden md:table-cell">MAC Address</TableHead>
                            <TableHead className="text-slate-400 hidden lg:table-cell">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">Ethernet</TableCell>
                            <TableCell>192.168.1.100</TableCell>
                            <TableCell className="hidden md:table-cell text-slate-400">00:1B:44:11:3A:B7</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Connected</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">Wi-Fi</TableCell>
                            <TableCell>192.168.1.101</TableCell>
                            <TableCell className="hidden md:table-cell text-slate-400">00:1B:44:11:3A:B8</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">Disabled</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">Bluetooth</TableCell>
                            <TableCell>--</TableCell>
                            <TableCell className="hidden md:table-cell text-slate-400">00:1B:44:11:3A:B9</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">VPN</TableCell>
                            <TableCell>10.8.0.2</TableCell>
                            <TableCell className="hidden md:table-cell text-slate-400">--</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Connected</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* System Logs Tab */}
                  <TabsContent value="logs" className="mt-0 space-y-6">
                    {/* Log Filter */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div className="flex items-center space-x-2">
                        <ListFilter className="h-5 w-5 text-slate-400" />
                        <span className="text-sm text-slate-300">Filter Logs</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full md:w-auto">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-full md:w-[120px] bg-slate-800/50 border-slate-700/50 text-slate-300">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="error">Errors</SelectItem>
                            <SelectItem value="warning">Warnings</SelectItem>
                            <SelectItem value="info">Info</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select defaultValue="today">
                          <SelectTrigger className="w-full md:w-[120px] bg-slate-800/50 border-slate-700/50 text-slate-300">
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex w-full bg-slate-800/50 rounded-md border border-slate-700/50">
                          <Search className="h-4 w-4 text-slate-400 my-auto ml-2" />
                          <input
                            type="text"
                            placeholder="Search logs..."
                            className="bg-transparent border-none focus:outline-none text-sm w-full p-2 placeholder:text-slate-500"
                          />
                        </div>

                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Apply</Button>
                      </div>
                    </div>

                    {/* System Logs */}
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                        <h3 className="text-md font-medium text-slate-200 flex items-center">
                          <FileDigit className="h-5 w-5 text-cyan-500 mr-2" />
                          System Logs
                        </h3>
                        <div className="text-xs text-slate-500">Showing 50 of 1,248 entries</div>
                      </div>

                      <div className="divide-y divide-slate-700/30">
                        <LogEntry
                          timestamp="14:32:12"
                          type="error"
                          source="Storage"
                          message="Unable to read from sector 3042 on drive C:"
                        />
                        <LogEntry
                          timestamp="14:30:05"
                          type="warning"
                          source="Memory"
                          message="High memory usage detected: 85% utilization"
                        />
                        <LogEntry
                          timestamp="14:28:56"
                          type="info"
                          source="Network"
                          message="New IP assigned to interface eth0: 192.168.1.100"
                        />
                        <LogEntry
                          timestamp="14:15:22"
                          type="error"
                          source="Storage"
                          message="Unable to read from sector 3041 on drive C:"
                        />
                        <LogEntry
                          timestamp="14:02:45"
                          type="info"
                          source="System"
                          message="Diagnostic scan initiated by user"
                        />
                        <LogEntry
                          timestamp="13:54:02"
                          type="warning"
                          source="CPU"
                          message="Temperature threshold approaching: 72°C"
                        />
                        <LogEntry
                          timestamp="13:45:31"
                          type="info"
                          source="Security"
                          message="Authentication successful for user: admin"
                        />
                      </div>

                      <div className="p-4 border-t border-slate-700/50 flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="text-slate-400">
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Load More
                        </Button>
                        <div className="text-xs text-slate-500">Last updated: {new Date().toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right side */}
          <div className="col-span-12 lg:col-span-4">
            <div className="grid gap-6">
              {/* System Health */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-lg">
                    <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-y border-slate-700/50">
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-slate-700 stroke-current"
                            strokeWidth="10"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-cyan-500 stroke-current"
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 * (1 - systemStatus / 100)}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div>
                            <div className="text-3xl font-bold text-cyan-400">{systemStatus}%</div>
                            <div className="text-xs text-slate-400 text-center">System Health</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4 text-amber-500" />
                          <div className="text-xs text-slate-500">CPU Temp</div>
                        </div>
                        <div className="text-sm font-mono text-slate-200 mt-1">{cpuTemperature}°C</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-4 w-4 text-cyan-500" />
                          <div className="text-xs text-slate-500">System Load</div>
                        </div>
                        <div className="text-sm font-mono text-slate-200 mt-1">{systemLoad}%</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-4 w-4 text-blue-500" />
                          <div className="text-xs text-slate-500">Connectivity</div>
                        </div>
                        <div className="text-sm font-mono text-green-400 mt-1">Online</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <div className="text-xs text-slate-500">Security</div>
                        </div>
                        <div className="text-sm font-mono text-slate-200 mt-1">Protected</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diagnostic Tools */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-cyan-500" />
                    Diagnostic Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto py-4 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1"
                    >
                      <Activity className="h-5 w-5 text-cyan-500" />
                      <span className="text-xs">System Scan</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1"
                    >
                      <HardDrive className="h-5 w-5 text-purple-500" />
                      <span className="text-xs">Disk Check</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1"
                    >
                      <Wifi className="h-5 w-5 text-blue-500" />
                      <span className="text-xs">Network Test</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1"
                    >
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-xs">Security Audit</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1"
                    >
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span className="text-xs">Power Check</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1"
                    >
                      <Thermometer className="h-5 w-5 text-red-500" />
                      <span className="text-xs">Thermal Test</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Diagnostic Settings */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Settings className="mr-2 h-5 w-5 text-blue-500" />
                    Diagnostic Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Scan Intensity</div>
                        <div className="text-xs text-cyan-400">Medium</div>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={25} className="w-full" />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <div>Light</div>
                        <div>Deep</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Auto-repair Issues</div>
                        <div className="flex items-center h-4">
                          <div className="w-8 h-4 rounded-full bg-cyan-500/30 p-0.5">
                            <div className="w-3 h-3 rounded-full bg-cyan-500 ml-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Scheduled Scanning</div>
                        <div className="flex items-center h-4">
                          <div className="w-8 h-4 rounded-full bg-cyan-500/30 p-0.5">
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">Every Sunday at 2:00 AM</div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Alert Threshold</div>
                        <div className="text-xs text-cyan-400">Medium</div>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={25} className="w-full" />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <div>Low</div>
                        <div>High</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Issues */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                    Recent Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <IssueItem
                      component="Storage"
                      issue="Bad sectors detected on drive C:"
                      time="14:32"
                      severity="warning"
                    />
                    <IssueItem component="CPU" issue="Temperature spike: 82°C" time="Yesterday" severity="warning" />
                    <IssueItem
                      component="Memory"
                      issue="Memory allocation failure in process 1842"
                      time="Yesterday"
                      severity="error"
                    />
                    <IssueItem
                      component="Network"
                      issue="Packet loss on interface eth0"
                      time="2 days ago"
                      severity="warning"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Log entry component
function LogEntry({
  timestamp,
  type,
  source,
  message,
}: { timestamp: string; type: string; source: string; message: string }) {
  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return { icon: X, className: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "warning":
        return { icon: AlertCircle, className: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "info":
      default:
        return { icon: FileDigit, className: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, className } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-slate-800/30">
      <div className={`mt-0.5 p-1.5 rounded-full ${className}`}>
        <Icon className={`h-3 w-3`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-sm font-medium text-slate-300">{source}</div>
            <Badge variant="outline" className={`ml-2 ${className.replace("bg-", "bg-opacity-20 ")} text-xs`}>
              {type}
            </Badge>
          </div>
          <div className="text-xs text-slate-500">{timestamp}</div>
        </div>
        <div className="text-sm text-slate-400 mt-1">{message}</div>
      </div>
    </div>
  )
}

// Issue item component
function IssueItem({
  component,
  issue,
  time,
  severity,
}: { component: string; issue: string; time: string; severity: string }) {
  const getSeverityStyles = () => {
    switch (severity) {
      case "error":
        return { color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/30" }
      case "warning":
        return { color: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" }
      default:
        return { color: "text-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30" }
    }
  }

  const { color, bgColor, borderColor } = getSeverityStyles()

  return (
    <div className={`p-3 rounded-md ${bgColor} ${borderColor} border`}>
      <div className="flex justify-between items-center">
        <div className="font-medium text-sm">{component}</div>
        <div className="text-xs text-slate-500">{time}</div>
      </div>
      <div className={`text-sm mt-1 ${color}`}>{issue}</div>
    </div>
  )
}

// Types
interface DiagnosticResult {
  component: string
  status: string
  details: string
  timestamp: string
}
