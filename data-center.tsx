"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Activity,
  AlertCircle,
  Clock,
  Database,
  Download,
  FileText,
  HardDrive,
  RefreshCw,
  Save,
  Server,
  Settings,
  Shield,
  Thermometer,
  Upload,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DataCenter() {
  const [isLoading, setIsLoading] = useState(true)
  const [storageUsage, setStorageUsage] = useState(68)
  const [backupStatus, setBackupStatus] = useState(92)
  const [serverLoad, setServerLoad] = useState(45)
  const [dataTransfer, setDataTransfer] = useState(32)
  const [serverTemperature, setServerTemperature] = useState(42)

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
      setStorageUsage(Math.floor(Math.random() * 15) + 60)
      setServerLoad(Math.floor(Math.random() * 20) + 35)
      setDataTransfer(Math.floor(Math.random() * 25) + 20)
      setServerTemperature(Math.floor(Math.random() * 8) + 38)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getHealthColor = (value: number) => {
    if (value > 90) return "from-green-500 to-emerald-500"
    if (value > 70) return "from-yellow-500 to-amber-500"
    return "from-red-500 to-rose-500"
  }

  const getTemperatureColor = (temp: number) => {
    if (temp < 40) return "text-green-500"
    if (temp < 50) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
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
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">LOADING DATA CENTER</div>
          </div>
        </div>
      )}

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Database className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              DATA CENTER
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Clock className="inline-block h-4 w-4 text-slate-400 mr-2" />
              <span className="text-sm text-slate-300">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700/50 text-slate-300">
                <SelectValue placeholder="Server Group" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                <SelectItem value="all">All Servers</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="backup">Backup</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left side */}
          <div className="col-span-12 lg:col-span-8">
            {/* Storage Overview */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-lg">
                    <HardDrive className="mr-2 h-5 w-5 text-purple-500" />
                    Storage Overview
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-purple-400 border-purple-500/50 text-xs">
                    {storageUsage}% UTILIZED
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StorageMetricCard
                    title="Primary Storage"
                    used={8.2}
                    total={12}
                    icon={Database}
                    color="purple"
                    detail="SSD Array"
                  />
                  <StorageMetricCard
                    title="Backup Storage"
                    used={24.5}
                    total={48}
                    icon={Save}
                    color="blue"
                    detail="HDD Array"
                  />
                  <StorageMetricCard
                    title="Archive Storage"
                    used={156}
                    total={200}
                    icon={FileText}
                    color="cyan"
                    detail="Cold Storage"
                  />
                </div>

                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                    <h3 className="text-md font-medium text-slate-200 flex items-center">
                      <Server className="h-5 w-5 text-purple-500 mr-2" />
                      Storage Volumes
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 text-slate-400 hover:text-slate-100">
                        <Settings className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableHead className="text-slate-400">Volume</TableHead>
                        <TableHead className="text-slate-400">Type</TableHead>
                        <TableHead className="text-slate-400">Capacity</TableHead>
                        <TableHead className="text-slate-400 hidden md:table-cell">Used</TableHead>
                        <TableHead className="text-slate-400 hidden lg:table-cell">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">vol-primary-01</TableCell>
                        <TableCell>SSD RAID-10</TableCell>
                        <TableCell>4 TB</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-700 h-2 rounded-full mr-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                                style={{ width: "65%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">65%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">vol-primary-02</TableCell>
                        <TableCell>SSD RAID-10</TableCell>
                        <TableCell>8 TB</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-700 h-2 rounded-full mr-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                                style={{ width: "72%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">72%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">vol-backup-01</TableCell>
                        <TableCell>HDD RAID-6</TableCell>
                        <TableCell>24 TB</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-700 h-2 rounded-full mr-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                                style={{ width: "48%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">48%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">vol-backup-02</TableCell>
                        <TableCell>HDD RAID-6</TableCell>
                        <TableCell>24 TB</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-700 h-2 rounded-full mr-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                                style={{ width: "53%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">53%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Warning</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">vol-archive-01</TableCell>
                        <TableCell>Cold Storage</TableCell>
                        <TableCell>100 TB</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-700 h-2 rounded-full mr-2">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-teal-500 h-full rounded-full"
                                style={{ width: "78%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">78%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">vol-archive-02</TableCell>
                        <TableCell>Cold Storage</TableCell>
                        <TableCell>100 TB</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="w-full bg-slate-700 h-2 rounded-full mr-2">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-teal-500 h-full rounded-full"
                                style={{ width: "82%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">82%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Healthy</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Server Details Tabs */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 flex items-center">
                  <Server className="mr-2 h-5 w-5 text-blue-500" />
                  Server Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="status" className="w-full">
                  <TabsList className="bg-slate-800/50 p-1 mb-4">
                    <TabsTrigger
                      value="status"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Status
                    </TabsTrigger>
                    <TabsTrigger
                      value="performance"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger
                      value="backups"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Backups
                    </TabsTrigger>
                  </TabsList>

                  {/* Status Tab */}
                  <TabsContent value="status" className="mt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ServerStatusCard
                        name="app-server-01"
                        status="Online"
                        uptime="45d 12h 32m"
                        load={42}
                        memory={68}
                        temperature={41}
                      />
                      <ServerStatusCard
                        name="app-server-02"
                        status="Online"
                        uptime="45d 12h 32m"
                        load={38}
                        memory={72}
                        temperature={39}
                      />
                      <ServerStatusCard
                        name="db-server-01"
                        status="Online"
                        uptime="32d 08h 14m"
                        load={65}
                        memory={84}
                        temperature={46}
                      />
                      <ServerStatusCard
                        name="db-server-02"
                        status="Online"
                        uptime="32d 08h 14m"
                        load={58}
                        memory={76}
                        temperature={44}
                      />
                      <ServerStatusCard
                        name="cache-server-01"
                        status="Online"
                        uptime="28d 22h 45m"
                        load={32}
                        memory={62}
                        temperature={38}
                      />
                      <ServerStatusCard
                        name="backup-server-01"
                        status="Maintenance"
                        uptime="12h 08m"
                        load={12}
                        memory={24}
                        temperature={36}
                        maintenance
                      />
                    </div>
                  </TabsContent>

                  {/* Performance Tab */}
                  <TabsContent value="performance" className="mt-0 space-y-6">
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-medium text-slate-200 flex items-center">
                          <Activity className="h-5 w-5 text-cyan-500 mr-2" />
                          Server Performance Metrics
                        </h3>
                        <Select defaultValue="24h">
                          <SelectTrigger className="w-[120px] bg-slate-800/50 border-slate-700/50 text-slate-300">
                            <SelectValue placeholder="Time Range" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                            <SelectItem value="1h">Last Hour</SelectItem>
                            <SelectItem value="6h">Last 6 Hours</SelectItem>
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="h-64 w-full relative bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                        <PerformanceChart />
                        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                          <div className="text-xs text-slate-400">Avg. Server Load</div>
                          <div className="text-lg font-mono text-cyan-400">{serverLoad}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">CPU Utilization</div>
                          <div className="text-lg font-mono text-cyan-400">{serverLoad}%</div>
                          <div className="mt-2">
                            <div className="w-full bg-slate-700 h-2 rounded-full">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                                style={{ width: `${serverLoad}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Memory Usage</div>
                          <div className="text-lg font-mono text-purple-400">{storageUsage}%</div>
                          <div className="mt-2">
                            <div className="w-full bg-slate-700 h-2 rounded-full">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                                style={{ width: `${storageUsage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Network Throughput</div>
                          <div className="text-lg font-mono text-blue-400">{dataTransfer} GB/s</div>
                          <div className="mt-2">
                            <div className="w-full bg-slate-700 h-2 rounded-full">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                                style={{ width: `${dataTransfer * 2}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Backups Tab */}
                  <TabsContent value="backups" className="mt-0 space-y-6">
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                        <h3 className="text-md font-medium text-slate-200 flex items-center">
                          <Save className="h-5 w-5 text-blue-500 mr-2" />
                          Backup Status
                        </h3>
                        <Badge variant="outline" className="bg-slate-800/50 text-green-400 border-green-500/50 text-xs">
                          HEALTHY
                        </Badge>
                      </div>

                      <div className="p-4 border-b border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-slate-400">Backup Health</div>
                          <div className="text-sm text-green-400">{backupStatus}%</div>
                        </div>
                        <Progress value={backupStatus} className="h-2 bg-slate-700">
                          <div
                            className={`h-full bg-gradient-to-r ${getHealthColor(backupStatus)} rounded-full`}
                            style={{ width: `${backupStatus}%` }}
                          />
                        </Progress>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Last Full Backup</div>
                            <div className="text-sm font-mono text-slate-200">2023-05-13 02:15 AM</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Last Incremental</div>
                            <div className="text-sm font-mono text-slate-200">2023-05-14 03:45 AM</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Next Scheduled</div>
                            <div className="text-sm font-mono text-slate-200">2023-05-15 02:00 AM</div>
                          </div>
                        </div>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableHead className="text-slate-400">Backup ID</TableHead>
                            <TableHead className="text-slate-400">Type</TableHead>
                            <TableHead className="text-slate-400">Time</TableHead>
                            <TableHead className="text-slate-400 hidden md:table-cell">Size</TableHead>
                            <TableHead className="text-slate-400 hidden lg:table-cell">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">BKP-20230514-0345</TableCell>
                            <TableCell>Incremental</TableCell>
                            <TableCell>03:45 AM</TableCell>
                            <TableCell className="hidden md:table-cell">2.4 GB</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Completed</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">BKP-20230513-0215</TableCell>
                            <TableCell>Full</TableCell>
                            <TableCell>02:15 AM</TableCell>
                            <TableCell className="hidden md:table-cell">156 GB</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Completed</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">BKP-20230512-0345</TableCell>
                            <TableCell>Incremental</TableCell>
                            <TableCell>03:45 AM</TableCell>
                            <TableCell className="hidden md:table-cell">3.8 GB</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Completed</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">BKP-20230511-0345</TableCell>
                            <TableCell>Incremental</TableCell>
                            <TableCell>03:45 AM</TableCell>
                            <TableCell className="hidden md:table-cell">2.1 GB</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Completed</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-300">BKP-20230510-0345</TableCell>
                            <TableCell>Incremental</TableCell>
                            <TableCell>03:45 AM</TableCell>
                            <TableCell className="hidden md:table-cell">4.2 GB</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Completed</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right side */}
          <div className="col-span-12 lg:col-span-4">
            <div className="grid gap-6">
              {/* Data Transfer */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-lg">
                    <Activity className="mr-2 h-5 w-5 text-blue-500" />
                    Data Transfer
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-y border-slate-700/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="relative w-20 h-20">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                              className="text-slate-700 stroke-current"
                              strokeWidth="10"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className="text-blue-500 stroke-current"
                              strokeWidth="10"
                              strokeLinecap="round"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 * (1 - dataTransfer / 100)}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div>
                              <div className="text-xl font-bold text-blue-400">{dataTransfer}</div>
                              <div className="text-xs text-slate-400 text-center">GB/s</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-slate-300 font-medium">Download</div>
                      </div>

                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="relative w-20 h-20">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                              className="text-slate-700 stroke-current"
                              strokeWidth="10"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className="text-purple-500 stroke-current"
                              strokeWidth="10"
                              strokeLinecap="round"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 * (1 - (dataTransfer * 0.8) / 100)}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div>
                              <div className="text-xl font-bold text-purple-400">{Math.floor(dataTransfer * 0.8)}</div>
                              <div className="text-xs text-slate-400 text-center">GB/s</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-slate-300 font-medium">Upload</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-slate-400">
                            <Download className="h-3 w-3 inline-block mr-1" />
                            Download
                          </div>
                          <div className="text-xs text-blue-400">{dataTransfer} GB/s</div>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            style={{ width: `${dataTransfer}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-slate-400">
                            <Upload className="h-3 w-3 inline-block mr-1" />
                            Upload
                          </div>
                          <div className="text-xs text-purple-400">{Math.floor(dataTransfer * 0.8)} GB/s</div>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${dataTransfer * 0.8}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/50">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Total Today</div>
                            <div className="text-sm font-mono text-slate-200">8.4 TB</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Active Transfers</div>
                            <div className="text-sm font-mono text-slate-200">24</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Monitoring */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center">
                    <Thermometer className="mr-2 h-5 w-5 text-amber-500" />
                    Environmental Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Temperature</div>
                        <div className={`text-sm ${getTemperatureColor(serverTemperature)}`}>{serverTemperature}°C</div>
                      </div>
                      <Progress value={serverTemperature} max={60} className="h-2 bg-slate-700">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            serverTemperature < 40
                              ? "from-green-500 to-emerald-500"
                              : serverTemperature < 50
                                ? "from-yellow-500 to-amber-500"
                                : "from-red-500 to-rose-500"
                          } rounded-full`}
                          style={{ width: `${(serverTemperature / 60) * 100}%` }}
                        />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Humidity</div>
                        <div className="text-sm text-green-400">45%</div>
                      </div>
                      <Progress value={45} className="h-2 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: "45%" }}
                        />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Power Consumption</div>
                        <div className="text-sm text-cyan-400">12.4 kW</div>
                      </div>
                      <Progress value={62} className="h-2 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: "62%" }}
                        />
                      </Progress>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Cooling Status</div>
                          <div className="text-sm font-medium text-green-400">Optimal</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">UPS Status</div>
                          <div className="text-sm font-medium text-green-400">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AlertItem
                      component="vol-backup-02"
                      issue="Disk health degrading - 3 bad sectors detected"
                      time="15:42"
                      severity="warning"
                    />
                    <AlertItem
                      component="app-server-03"
                      issue="High CPU usage (92%) for over 15 minutes"
                      time="14:28"
                      severity="warning"
                    />
                    <AlertItem
                      component="backup-job-0512"
                      issue="Backup completed successfully"
                      time="03:45"
                      severity="info"
                    />
                    <AlertItem
                      component="network-switch-02"
                      issue="Port 14 link down"
                      time="Yesterday"
                      severity="error"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={Save} label="Backup Now" />
                    <ActionButton icon={RefreshCw} label="Sync Data" />
                    <ActionButton icon={Shield} label="Security Scan" />
                    <ActionButton icon={Zap} label="Power Options" />
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

// Component for storage metric cards
function StorageMetricCard({
  title,
  used,
  total,
  icon: Icon,
  color,
  detail,
}: {
  title: string
  used: number
  total: number
  icon: React.ElementType
  color: string
  detail: string
}) {
  const percentage = Math.round((used / total) * 100)

  const getColor = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      default:
        return "from-purple-500 to-pink-500 border-purple-500/30"
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {used} TB
      </div>
      <div className="text-xs text-slate-500">
        {used} TB / {total} TB ({percentage}%)
      </div>
      <div className="mt-2">
        <div className="h-1.5 bg-slate-700 rounded-full">
          <div
            className={`h-full bg-gradient-to-r ${getColor().split(" ")[0]} ${getColor().split(" ")[1]} rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-400">{detail}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-purple-500 to-blue-500"></div>
    </div>
  )
}

// Server status card component
function ServerStatusCard({
  name,
  status,
  uptime,
  load,
  memory,
  temperature,
  maintenance = false,
}: {
  name: string
  status: string
  uptime: string
  load: number
  memory: number
  temperature: number
  maintenance?: boolean
}) {
  const getStatusColor = () => {
    if (maintenance) return "bg-amber-500/20 text-amber-400 border-amber-500/50"
    return "bg-green-500/20 text-green-400 border-green-500/50"
  }

  const getTemperatureColor = (temp: number) => {
    if (temp < 40) return "text-green-500"
    if (temp < 50) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium text-slate-200">{name}</div>
        <Badge className={getStatusColor()}>{status}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-slate-400">Uptime</div>
        <div className="text-slate-300 text-right">{uptime}</div>

        <div className="text-slate-400">CPU Load</div>
        <div className="text-right">
          <div className="inline-flex items-center">
            <div className="w-16 bg-slate-700 h-1.5 rounded-full mr-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                style={{ width: `${load}%` }}
              ></div>
            </div>
            <span className="text-cyan-400">{load}%</span>
          </div>
        </div>

        <div className="text-slate-400">Memory</div>
        <div className="text-right">
          <div className="inline-flex items-center">
            <div className="w-16 bg-slate-700 h-1.5 rounded-full mr-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                style={{ width: `${memory}%` }}
              ></div>
            </div>
            <span className="text-purple-400">{memory}%</span>
          </div>
        </div>

        <div className="text-slate-400">Temperature</div>
        <div className={`text-right ${getTemperatureColor(temperature)}`}>{temperature}°C</div>
      </div>
    </div>
  )
}

// Performance chart component
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const cpuHeight = Math.floor(Math.random() * 60) + 20
          const memHeight = Math.floor(Math.random() * 40) + 40
          const netHeight = Math.floor(Math.random() * 30) + 30

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${cpuHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${memHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: `${netHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}

// Alert item component
function AlertItem({
  component,
  issue,
  time,
  severity,
}: {
  component: string
  issue: string
  time: string
  severity: string
}) {
  const getSeverityStyles = () => {
    switch (severity) {
      case "error":
        return { color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/30" }
      case "warning":
        return { color: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" }
      case "info":
        return { color: "text-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30" }
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

// Action button component
function ActionButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-purple-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
