"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  AlertCircle,
  Bell,
  Bluetooth,
  Calendar,
  Check,
  ChevronRight,
  Cog,
  Cpu,
  Download,
  Eye,
  EyeOff,
  FileDown,
  Fingerprint,
  Globe,
  HardDrive,
  Key,
  Layers,
  Lock,
  Moon,
  Palette,
  Power,
  RefreshCw,
  Save,
  Search,
  Server,
  SettingsIcon,
  Shield,
  Sun,
  Terminal,
  Trash2,
  User,
  Users,
  Wifi,
  X,
  Zap,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define types for settings
interface SystemInfo {
  version: string;
  buildNumber: string;
  lastUpdated: string;
  platform: string;
  architecture: string;
  uptime: string;
  status: "stable" | "beta" | "experimental";
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  lastLogin: string;
  twoFactorEnabled: boolean;
  notifications: {
    email: boolean;
    system: boolean;
    security: boolean;
    updates: boolean;
  };
  theme: "system" | "dark" | "light";
  language: string;
  timezone: string;
}

interface NetworkSettings {
  connectionType: "wired" | "wireless" | "vpn";
  ipAddress: string;
  subnet: string;
  gateway: string;
  dns: string[];
  proxy: {
    enabled: boolean;
    server: string;
    port: number;
    authentication: boolean;
  };
  firewall: {
    enabled: boolean;
    level: "low" | "medium" | "high" | "custom";
    blockIncoming: boolean;
    allowOutgoing: boolean;
  };
}

interface DisplaySettings {
  theme: "system" | "dark" | "light";
  accentColor: string;
  fontSize: number;
  animationsEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  clockFormat: "12h" | "24h";
  dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
}

interface SecuritySettings {
  passwordExpiration: number;
  loginAttempts: number;
  sessionTimeout: number;
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  encryptionLevel: "standard" | "high" | "military";
  autoLock: boolean;
  autoLockDelay: number;
  passwordComplexity: "low" | "medium" | "high";
}

interface NotificationSettings {
  enabled: boolean;
  doNotDisturb: boolean;
  doNotDisturbStart: string;
  doNotDisturbEnd: string;
  showOnLockScreen: boolean;
  sound: boolean;
  vibration: boolean;
  criticalAlerts: boolean;
  systemNotifications: boolean;
  securityAlerts: boolean;
  updateNotifications: boolean;
  maintenanceAlerts: boolean;
}

interface StorageSettings {
  autoCleanup: boolean;
  autoCleanupThreshold: number;
  backupEnabled: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
  backupLocation: "local" | "network" | "cloud";
  backupEncryption: boolean;
  compressionLevel: "none" | "low" | "medium" | "high";
  retentionPeriod: number;
}

interface AdvancedSettings {
  developerMode: boolean;
  experimentalFeatures: boolean;
  telemetry: boolean;
  crashReporting: boolean;
  autoUpdates: boolean;
  updateChannel: "stable" | "beta" | "experimental";
  powerManagement: "balanced" | "performance" | "efficiency";
  startupMode: "normal" | "safe" | "diagnostic";
  loggingLevel: "error" | "warning" | "info" | "debug" | "verbose";
}

// Mock data
const mockSystemInfo: SystemInfo = {
  version: "12.4.5",
  buildNumber: "20230514.1",
  lastUpdated: "2023-05-14",
  platform: "NEXUS OS",
  architecture: "x64",
  uptime: "14d 06:42:18",
  status: "stable",
};

const mockUserProfile: UserProfile = {
  id: "USR-12345",
  name: "Commander",
  email: "commander@nexus.sys",
  role: "Administrator",
  avatar: "/placeholder.svg?height=128&width=128",
  lastLogin: "2023-05-14 11:42:15",
  twoFactorEnabled: true,
  notifications: {
    email: true,
    system: true,
    security: true,
    updates: true,
  },
  theme: "dark",
  language: "en-US",
  timezone: "UTC-08:00",
};

const mockNetworkSettings: NetworkSettings = {
  connectionType: "wired",
  ipAddress: "192.168.1.100",
  subnet: "255.255.255.0",
  gateway: "192.168.1.1",
  dns: ["8.8.8.8", "8.8.4.4"],
  proxy: {
    enabled: false,
    server: "",
    port: 8080,
    authentication: false,
  },
  firewall: {
    enabled: true,
    level: "high",
    blockIncoming: true,
    allowOutgoing: true,
  },
};

const mockDisplaySettings: DisplaySettings = {
  theme: "dark",
  accentColor: "#00b4d8",
  fontSize: 14,
  animationsEnabled: true,
  reducedMotion: false,
  highContrast: false,
  clockFormat: "24h",
  dateFormat: "YYYY-MM-DD",
};

const mockSecuritySettings: SecuritySettings = {
  passwordExpiration: 90,
  loginAttempts: 5,
  sessionTimeout: 30,
  twoFactorAuth: true,
  biometricAuth: true,
  encryptionLevel: "high",
  autoLock: true,
  autoLockDelay: 5,
  passwordComplexity: "high",
};

const mockNotificationSettings: NotificationSettings = {
  enabled: true,
  doNotDisturb: false,
  doNotDisturbStart: "22:00",
  doNotDisturbEnd: "06:00",
  showOnLockScreen: false,
  sound: true,
  vibration: true,
  criticalAlerts: true,
  systemNotifications: true,
  securityAlerts: true,
  updateNotifications: true,
  maintenanceAlerts: true,
};

const mockStorageSettings: StorageSettings = {
  autoCleanup: true,
  autoCleanupThreshold: 85,
  backupEnabled: true,
  backupFrequency: "daily",
  backupLocation: "network",
  backupEncryption: true,
  compressionLevel: "medium",
  retentionPeriod: 30,
};

const mockAdvancedSettings: AdvancedSettings = {
  developerMode: false,
  experimentalFeatures: false,
  telemetry: true,
  crashReporting: true,
  autoUpdates: true,
  updateChannel: "stable",
  powerManagement: "balanced",
  startupMode: "normal",
  loggingLevel: "warning",
};

// Settings component
export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Settings state
  const [systemInfo, setSystemInfo] = useState<SystemInfo>(mockSystemInfo);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [networkSettings, setNetworkSettings] =
    useState<NetworkSettings>(mockNetworkSettings);
  const [displaySettings, setDisplaySettings] =
    useState<DisplaySettings>(mockDisplaySettings);
  const [securitySettings, setSecuritySettings] =
    useState<SecuritySettings>(mockSecuritySettings);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(mockNotificationSettings);
  const [storageSettings, setStorageSettings] =
    useState<StorageSettings>(mockStorageSettings);
  const [advancedSettings, setAdvancedSettings] =
    useState<AdvancedSettings>(mockAdvancedSettings);

  const [searchQuery, setSearchQuery] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle save settings
  const handleSaveSettings = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Handle reset settings
  const handleResetSettings = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Reset all settings to defaults
      setUserProfile(mockUserProfile);
      setNetworkSettings(mockNetworkSettings);
      setDisplaySettings(mockDisplaySettings);
      setSecuritySettings(mockSecuritySettings);
      setNotificationSettings(mockNotificationSettings);
      setStorageSettings(mockStorageSettings);
      setAdvancedSettings(mockAdvancedSettings);

      setIsLoading(false);
      setShowResetConfirm(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-auto bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-black/30 text-cyan-400 border-cyan-400/30"
          >
            {formatTime(currentTime)}
          </Badge>
          <Badge
            variant="outline"
            className="bg-black/30 border-green-400/30 text-green-400"
          >
            System:{" "}
            {systemInfo.status === "stable"
              ? "Stable"
              : systemInfo.status === "beta"
              ? "Beta"
              : "Experimental"}
          </Badge>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-180px)]">
        {/* Settings navigation */}
        <Card className="bg-black/40 border-white/5 text-white w-64 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Cog className="h-4 w-4 text-cyan-400" />
                Settings
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search settings..."
                  className="h-7 pl-7 text-xs bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              <SettingsNavItem
                icon={User}
                label="User Profile"
                active={activeTab === "user"}
                onClick={() => setActiveTab("user")}
              />
              <SettingsNavItem
                icon={Palette}
                label="Display"
                active={activeTab === "display"}
                onClick={() => setActiveTab("display")}
              />
              <SettingsNavItem
                icon={Bell}
                label="Notifications"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              />
              <SettingsNavItem
                icon={Shield}
                label="Security"
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              />
              <SettingsNavItem
                icon={Globe}
                label="Network"
                active={activeTab === "network"}
                onClick={() => setActiveTab("network")}
              />
              <SettingsNavItem
                icon={HardDrive}
                label="Storage & Backup"
                active={activeTab === "storage"}
                onClick={() => setActiveTab("storage")}
              />
              <SettingsNavItem
                icon={Activity}
                label="System"
                active={activeTab === "system"}
                onClick={() => setActiveTab("system")}
              />
              <SettingsNavItem
                icon={Terminal}
                label="Advanced"
                active={activeTab === "advanced"}
                onClick={() => setActiveTab("advanced")}
              />
            </div>
          </ScrollArea>
          <CardFooter className="border-t border-white/10 p-4 flex flex-col gap-2">
            <Button
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
            <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-white/10 hover:bg-slate-800"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset to Default
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Reset Settings</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    This will reset all settings to their default values. This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="bg-red-950/30 border border-red-500/20 rounded-md p-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 inline-block mr-2" />
                  Warning: All custom configurations will be lost.
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowResetConfirm(false)}
                    className="border-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleResetSettings}
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Reset All Settings
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* Settings content */}
        <div className="flex-1">
          {/* Success message */}
          {saveSuccess && (
            <div className="mb-4 bg-green-950/30 border border-green-500/20 rounded-md p-3 text-sm text-green-400 flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Settings saved successfully.
            </div>
          )}

          {/* User Profile Settings */}
          {activeTab === "user" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-400" />
                  User Profile
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Information */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24 border-2 border-cyan-500/50">
                      <AvatarImage
                        src={userProfile.avatar || "/placeholder.svg"}
                        alt={userProfile.name}
                      />
                      <AvatarFallback className="bg-slate-700 text-cyan-500 text-xl">
                        {userProfile.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      className="text-xs h-8 border-white/10"
                    >
                      Change Avatar
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-400">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              name: e.target.value,
                            })
                          }
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-400">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              email: e.target.value,
                            })
                          }
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-slate-400">
                          Role
                        </Label>
                        <Input
                          id="role"
                          value={userProfile.role}
                          readOnly
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="id" className="text-slate-400">
                          User ID
                        </Label>
                        <Input
                          id="id"
                          value={userProfile.id}
                          readOnly
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div>
                        <div className="text-sm font-medium">Last Login</div>
                        <div className="text-xs text-slate-400">
                          {userProfile.lastLogin}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="h-8 text-xs border-white/10"
                      >
                        View Login History
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Account Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Preferences</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-slate-400">
                          Language
                        </Label>
                        <Select
                          value={userProfile.language}
                          onValueChange={(value) =>
                            setUserProfile({ ...userProfile, language: value })
                          }
                        >
                          <SelectTrigger
                            id="language"
                            className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                          >
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectGroup>
                              <SelectLabel>Languages</SelectLabel>
                              <SelectItem value="en-US">
                                English (US)
                              </SelectItem>
                              <SelectItem value="en-GB">
                                English (UK)
                              </SelectItem>
                              <SelectItem value="fr-FR">French</SelectItem>
                              <SelectItem value="de-DE">German</SelectItem>
                              <SelectItem value="ja-JP">Japanese</SelectItem>
                              <SelectItem value="zh-CN">
                                Chinese (Simplified)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-slate-400">
                          Time Zone
                        </Label>
                        <Select
                          value={userProfile.timezone}
                          onValueChange={(value) =>
                            setUserProfile({ ...userProfile, timezone: value })
                          }
                        >
                          <SelectTrigger
                            id="timezone"
                            className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                          >
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectGroup>
                              <SelectLabel>Time Zones</SelectLabel>
                              <SelectItem value="UTC-12:00">
                                (UTC-12:00) International Date Line West
                              </SelectItem>
                              <SelectItem value="UTC-08:00">
                                (UTC-08:00) Pacific Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="UTC-05:00">
                                (UTC-05:00) Eastern Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="UTC+00:00">
                                (UTC+00:00) Greenwich Mean Time
                              </SelectItem>
                              <SelectItem value="UTC+01:00">
                                (UTC+01:00) Central European Time
                              </SelectItem>
                              <SelectItem value="UTC+08:00">
                                (UTC+08:00) Beijing, Hong Kong, Singapore
                              </SelectItem>
                              <SelectItem value="UTC+09:00">
                                (UTC+09:00) Tokyo, Seoul
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-slate-400">
                          Notification Preferences
                        </Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="email-notifications"
                              className="text-sm cursor-pointer"
                            >
                              Email Notifications
                            </Label>
                            <Switch
                              id="email-notifications"
                              checked={userProfile.notifications.email}
                              onCheckedChange={(checked) =>
                                setUserProfile({
                                  ...userProfile,
                                  notifications: {
                                    ...userProfile.notifications,
                                    email: checked,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="system-notifications"
                              className="text-sm cursor-pointer"
                            >
                              System Notifications
                            </Label>
                            <Switch
                              id="system-notifications"
                              checked={userProfile.notifications.system}
                              onCheckedChange={(checked) =>
                                setUserProfile({
                                  ...userProfile,
                                  notifications: {
                                    ...userProfile.notifications,
                                    system: checked,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="security-notifications"
                              className="text-sm cursor-pointer"
                            >
                              Security Alerts
                            </Label>
                            <Switch
                              id="security-notifications"
                              checked={userProfile.notifications.security}
                              onCheckedChange={(checked) =>
                                setUserProfile({
                                  ...userProfile,
                                  notifications: {
                                    ...userProfile.notifications,
                                    security: checked,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="update-notifications"
                              className="text-sm cursor-pointer"
                            >
                              Update Notifications
                            </Label>
                            <Switch
                              id="update-notifications"
                              checked={userProfile.notifications.updates}
                              onCheckedChange={(checked) =>
                                setUserProfile({
                                  ...userProfile,
                                  notifications: {
                                    ...userProfile.notifications,
                                    updates: checked,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Security</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10"
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>

                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center">
                          <Fingerprint className="h-5 w-5 text-cyan-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium">
                              Two-Factor Authentication
                            </div>
                            <div className="text-xs text-slate-400">
                              {userProfile.twoFactorEnabled
                                ? "Enabled"
                                : "Disabled"}
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={userProfile.twoFactorEnabled}
                          onCheckedChange={(checked) =>
                            setUserProfile({
                              ...userProfile,
                              twoFactorEnabled: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Manage Connected Devices
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Security Audit Log
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Display Settings */}
          {activeTab === "display" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Palette className="h-5 w-5 text-cyan-400" />
                  Display Settings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Customize the appearance and visual preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        displaySettings.theme === "dark"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-white/10 hover:border-white/30"
                      }`}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          theme: "dark",
                        })
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 text-slate-300 mr-2" />
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                        {displaySettings.theme === "dark" && (
                          <Check className="h-4 w-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="h-20 rounded-md bg-slate-900 border border-slate-700"></div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        displaySettings.theme === "light"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-white/10 hover:border-white/30"
                      }`}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          theme: "light",
                        })
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 text-amber-300 mr-2" />
                          <span className="text-sm font-medium">Light</span>
                        </div>
                        {displaySettings.theme === "light" && (
                          <Check className="h-4 w-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="h-20 rounded-md bg-slate-200 border border-slate-300"></div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        displaySettings.theme === "system"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-white/10 hover:border-white/30"
                      }`}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          theme: "system",
                        })
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Cog className="h-4 w-4 text-slate-300 mr-2" />
                          <span className="text-sm font-medium">
                            System Default
                          </span>
                        </div>
                        {displaySettings.theme === "system" && (
                          <Check className="h-4 w-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="h-20 rounded-md bg-gradient-to-r from-slate-900 to-slate-200 border border-slate-700"></div>
                    </div>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Accent Color</h3>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <ColorOption
                      color="#00b4d8"
                      name="Cyan"
                      selected={displaySettings.accentColor === "#00b4d8"}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          accentColor: "#00b4d8",
                        })
                      }
                    />
                    <ColorOption
                      color="#4361ee"
                      name="Blue"
                      selected={displaySettings.accentColor === "#4361ee"}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          accentColor: "#4361ee",
                        })
                      }
                    />
                    <ColorOption
                      color="#4cc9f0"
                      name="Sky"
                      selected={displaySettings.accentColor === "#4cc9f0"}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          accentColor: "#4cc9f0",
                        })
                      }
                    />
                    <ColorOption
                      color="#7209b7"
                      name="Purple"
                      selected={displaySettings.accentColor === "#7209b7"}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          accentColor: "#7209b7",
                        })
                      }
                    />
                    <ColorOption
                      color="#f72585"
                      name="Pink"
                      selected={displaySettings.accentColor === "#f72585"}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          accentColor: "#f72585",
                        })
                      }
                    />
                    <ColorOption
                      color="#4ade80"
                      name="Green"
                      selected={displaySettings.accentColor === "#4ade80"}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          accentColor: "#4ade80",
                        })
                      }
                    />
                  </div>
                </div>

                {/* Text Size */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Text Size</h3>
                    <span className="text-sm text-slate-400">
                      {displaySettings.fontSize}px
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs">A</span>
                    <Slider
                      value={[displaySettings.fontSize]}
                      min={12}
                      max={20}
                      step={1}
                      onValueChange={(value) =>
                        setDisplaySettings({
                          ...displaySettings,
                          fontSize: value[0],
                        })
                      }
                      className="flex-1"
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>

                {/* Animation Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Animation & Motion</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="animations-enabled"
                        className="text-sm cursor-pointer"
                      >
                        Enable Animations
                      </Label>
                      <Switch
                        id="animations-enabled"
                        checked={displaySettings.animationsEnabled}
                        onCheckedChange={(checked) =>
                          setDisplaySettings({
                            ...displaySettings,
                            animationsEnabled: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="reduced-motion"
                        className="text-sm cursor-pointer"
                      >
                        Reduced Motion
                      </Label>
                      <Switch
                        id="reduced-motion"
                        checked={displaySettings.reducedMotion}
                        onCheckedChange={(checked) =>
                          setDisplaySettings({
                            ...displaySettings,
                            reducedMotion: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="high-contrast"
                        className="text-sm cursor-pointer"
                      >
                        High Contrast Mode
                      </Label>
                      <Switch
                        id="high-contrast"
                        checked={displaySettings.highContrast}
                        onCheckedChange={(checked) =>
                          setDisplaySettings({
                            ...displaySettings,
                            highContrast: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time Format */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Date & Time Format</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="clock-format" className="text-slate-400">
                        Clock Format
                      </Label>
                      <Select
                        value={displaySettings.clockFormat}
                        onValueChange={(value: "12h" | "24h") =>
                          setDisplaySettings({
                            ...displaySettings,
                            clockFormat: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="clock-format"
                          className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                        >
                          <SelectValue placeholder="Select clock format" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format" className="text-slate-400">
                        Date Format
                      </Label>
                      <Select
                        value={displaySettings.dateFormat}
                        onValueChange={(
                          value: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD"
                        ) =>
                          setDisplaySettings({
                            ...displaySettings,
                            dateFormat: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="date-format"
                          className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                        >
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Bell className="h-5 w-5 text-cyan-400" />
                  Notification Settings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Global Notification Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Global Settings</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="notifications-enabled"
                          className="text-sm cursor-pointer"
                        >
                          Enable Notifications
                        </Label>
                        <Switch
                          id="notifications-enabled"
                          checked={notificationSettings.enabled}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              enabled: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="sound-enabled"
                          className="text-sm cursor-pointer"
                        >
                          Notification Sounds
                        </Label>
                        <Switch
                          id="sound-enabled"
                          checked={notificationSettings.sound}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              sound: checked,
                            })
                          }
                          disabled={!notificationSettings.enabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="vibration-enabled"
                          className="text-sm cursor-pointer"
                        >
                          Vibration
                        </Label>
                        <Switch
                          id="vibration-enabled"
                          checked={notificationSettings.vibration}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              vibration: checked,
                            })
                          }
                          disabled={!notificationSettings.enabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="lockscreen-notifications"
                          className="text-sm cursor-pointer"
                        >
                          Show on Lock Screen
                        </Label>
                        <Switch
                          id="lockscreen-notifications"
                          checked={notificationSettings.showOnLockScreen}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              showOnLockScreen: checked,
                            })
                          }
                          disabled={!notificationSettings.enabled}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="do-not-disturb"
                            className="text-sm cursor-pointer"
                          >
                            Do Not Disturb
                          </Label>
                          <p className="text-xs text-slate-400 mt-1">
                            Silence notifications during specified hours
                          </p>
                        </div>
                        <Switch
                          id="do-not-disturb"
                          checked={notificationSettings.doNotDisturb}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              doNotDisturb: checked,
                            })
                          }
                          disabled={!notificationSettings.enabled}
                        />
                      </div>

                      {notificationSettings.doNotDisturb && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="dnd-start"
                              className="text-xs text-slate-400"
                            >
                              Start Time
                            </Label>
                            <Input
                              id="dnd-start"
                              type="time"
                              value={notificationSettings.doNotDisturbStart}
                              onChange={(e) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  doNotDisturbStart: e.target.value,
                                })
                              }
                              className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="dnd-end"
                              className="text-xs text-slate-400"
                            >
                              End Time
                            </Label>
                            <Input
                              id="dnd-end"
                              type="time"
                              value={notificationSettings.doNotDisturbEnd}
                              onChange={(e) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  doNotDisturbEnd: e.target.value,
                                })
                              }
                              className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>

                  <div className="space-y-3 p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                        <Label
                          htmlFor="critical-alerts"
                          className="text-sm cursor-pointer"
                        >
                          Critical Alerts
                        </Label>
                      </div>
                      <Switch
                        id="critical-alerts"
                        checked={notificationSettings.criticalAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            criticalAlerts: checked,
                          })
                        }
                      />
                    </div>
                    <div className="text-xs text-slate-400 ml-6">
                      Critical system alerts will always be shown, even in Do
                      Not Disturb mode
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 text-cyan-400 mr-2" />
                        <Label
                          htmlFor="system-notifications"
                          className="text-sm cursor-pointer"
                        >
                          System Notifications
                        </Label>
                      </div>
                      <Switch
                        id="system-notifications"
                        checked={notificationSettings.systemNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            systemNotifications: checked,
                          })
                        }
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-green-400 mr-2" />
                        <Label
                          htmlFor="security-alerts"
                          className="text-sm cursor-pointer"
                        >
                          Security Alerts
                        </Label>
                      </div>
                      <Switch
                        id="security-alerts"
                        checked={notificationSettings.securityAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            securityAlerts: checked,
                          })
                        }
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 text-blue-400 mr-2" />
                        <Label
                          htmlFor="update-notifications"
                          className="text-sm cursor-pointer"
                        >
                          Update Notifications
                        </Label>
                      </div>
                      <Switch
                        id="update-notifications"
                        checked={notificationSettings.updateNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            updateNotifications: checked,
                          })
                        }
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 text-purple-400 mr-2" />
                        <Label
                          htmlFor="maintenance-alerts"
                          className="text-sm cursor-pointer"
                        >
                          Maintenance Alerts
                        </Label>
                      </div>
                      <Switch
                        id="maintenance-alerts"
                        checked={notificationSettings.maintenanceAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            maintenanceAlerts: checked,
                          })
                        }
                        disabled={!notificationSettings.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification History */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Notification History
                    </h3>
                    <Button
                      variant="outline"
                      className="h-8 text-xs border-white/10"
                    >
                      View All
                    </Button>
                  </div>

                  <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                    <div className="text-sm text-center text-slate-400">
                      Notification history is available in the Notifications
                      panel
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure security and privacy settings for your system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Authentication Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center">
                          <Fingerprint className="h-5 w-5 text-cyan-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium">
                              Two-Factor Authentication
                            </div>
                            <div className="text-xs text-slate-400">
                              Require a second form of verification when signing
                              in
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              twoFactorAuth: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center">
                          <Fingerprint className="h-5 w-5 text-purple-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium">
                              Biometric Authentication
                            </div>
                            <div className="text-xs text-slate-400">
                              Use fingerprint or facial recognition to sign in
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={securitySettings.biometricAuth}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              biometricAuth: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="password-complexity"
                          className="text-slate-400"
                        >
                          Password Complexity
                        </Label>
                        <Select
                          value={securitySettings.passwordComplexity}
                          onValueChange={(value: "low" | "medium" | "high") =>
                            setSecuritySettings({
                              ...securitySettings,
                              passwordComplexity: value,
                            })
                          }
                        >
                          <SelectTrigger
                            id="password-complexity"
                            className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                          >
                            <SelectValue placeholder="Select password complexity" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="low">
                              Low (8+ characters)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium (8+ chars, mixed case, numbers)
                            </SelectItem>
                            <SelectItem value="high">
                              High (12+ chars, mixed case, numbers, symbols)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password-expiration"
                          className="text-slate-400"
                        >
                          Password Expiration (days)
                        </Label>
                        <span className="text-sm text-slate-400">
                          {securitySettings.passwordExpiration} days
                        </span>
                      </div>
                      <Slider
                        id="password-expiration"
                        value={[securitySettings.passwordExpiration]}
                        min={30}
                        max={180}
                        step={15}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            passwordExpiration: value[0],
                          })
                        }
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>30 days</span>
                        <span>180 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Security</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="login-attempts"
                            className="text-slate-400"
                          >
                            Maximum Login Attempts
                          </Label>
                          <span className="text-sm text-slate-400">
                            {securitySettings.loginAttempts}
                          </span>
                        </div>
                        <Slider
                          id="login-attempts"
                          value={[securitySettings.loginAttempts]}
                          min={3}
                          max={10}
                          step={1}
                          onValueChange={(value) =>
                            setSecuritySettings({
                              ...securitySettings,
                              loginAttempts: value[0],
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="session-timeout"
                            className="text-slate-400"
                          >
                            Session Timeout (minutes)
                          </Label>
                          <span className="text-sm text-slate-400">
                            {securitySettings.sessionTimeout} min
                          </span>
                        </div>
                        <Slider
                          id="session-timeout"
                          value={[securitySettings.sessionTimeout]}
                          min={5}
                          max={120}
                          step={5}
                          onValueChange={(value) =>
                            setSecuritySettings({
                              ...securitySettings,
                              sessionTimeout: value[0],
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-cyan-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium">Auto-Lock</div>
                            <div className="text-xs text-slate-400">
                              Automatically lock system after period of
                              inactivity
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={securitySettings.autoLock}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              autoLock: checked,
                            })
                          }
                        />
                      </div>

                      {securitySettings.autoLock && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="auto-lock-delay"
                              className="text-slate-400"
                            >
                              Auto-Lock Delay (minutes)
                            </Label>
                            <span className="text-sm text-slate-400">
                              {securitySettings.autoLockDelay} min
                            </span>
                          </div>
                          <Slider
                            id="auto-lock-delay"
                            value={[securitySettings.autoLockDelay]}
                            min={1}
                            max={30}
                            step={1}
                            onValueChange={(value) =>
                              setSecuritySettings({
                                ...securitySettings,
                                autoLockDelay: value[0],
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Encryption Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Encryption</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="encryption-level"
                        className="text-slate-400"
                      >
                        Encryption Level
                      </Label>
                      <Select
                        value={securitySettings.encryptionLevel}
                        onValueChange={(
                          value: "standard" | "high" | "military"
                        ) =>
                          setSecuritySettings({
                            ...securitySettings,
                            encryptionLevel: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="encryption-level"
                          className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                        >
                          <SelectValue placeholder="Select encryption level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="standard">
                            Standard (AES-128)
                          </SelectItem>
                          <SelectItem value="high">High (AES-256)</SelectItem>
                          <SelectItem value="military">
                            Military Grade (AES-256 with multi-layer)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-green-400 mr-2" />
                        <div className="text-sm font-medium">
                          Encryption Status
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        All system data is currently encrypted using AES-256
                        encryption
                      </div>
                      <Button
                        variant="outline"
                        className="mt-2 text-xs h-8 border-white/10"
                      >
                        Verify Encryption
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Security Audit */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Security Audit</h3>
                    <Button
                      variant="outline"
                      className="h-8 text-xs border-white/10"
                    >
                      <Shield className="h-3.5 w-3.5 mr-1.5" />
                      Run Security Scan
                    </Button>
                  </div>

                  <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-green-400 mr-2" />
                        <div className="text-sm font-medium">
                          Last Security Scan
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-black/30 text-slate-400 border-slate-500/30"
                      >
                        2 days ago
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400 mb-3">
                      No security vulnerabilities were detected in the last scan
                    </div>
                    <Progress value={100} className="h-1.5 bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Network Settings */}
          {activeTab === "network" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-400" />
                  Network Settings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure network connections and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connection Status</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        networkSettings.connectionType === "wired"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-white/10 hover:border-white/30"
                      }`}
                      onClick={() =>
                        setNetworkSettings({
                          ...networkSettings,
                          connectionType: "wired",
                        })
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-sm font-medium">Wired</span>
                        </div>
                        {networkSettings.connectionType === "wired" && (
                          <Check className="h-4 w-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        Ethernet connection
                      </div>
                      <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                        Connected
                      </Badge>
                    </div>

                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        networkSettings.connectionType === "wireless"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-white/10 hover:border-white/30"
                      }`}
                      onClick={() =>
                        setNetworkSettings({
                          ...networkSettings,
                          connectionType: "wireless",
                        })
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Wifi className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-sm font-medium">Wireless</span>
                        </div>
                        {networkSettings.connectionType === "wireless" && (
                          <Check className="h-4 w-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        Wi-Fi connection
                      </div>
                      <Badge className="mt-2 bg-slate-500/20 text-slate-400 border-slate-500/30">
                        Disconnected
                      </Badge>
                    </div>

                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        networkSettings.connectionType === "vpn"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-white/10 hover:border-white/30"
                      }`}
                      onClick={() =>
                        setNetworkSettings({
                          ...networkSettings,
                          connectionType: "vpn",
                        })
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-purple-400 mr-2" />
                          <span className="text-sm font-medium">VPN</span>
                        </div>
                        {networkSettings.connectionType === "vpn" && (
                          <Check className="h-4 w-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        Virtual Private Network
                      </div>
                      <Badge className="mt-2 bg-slate-500/20 text-slate-400 border-slate-500/30">
                        Disconnected
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Network Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Network Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ip-address" className="text-slate-400">
                          IP Address
                        </Label>
                        <Input
                          id="ip-address"
                          value={networkSettings.ipAddress}
                          onChange={(e) =>
                            setNetworkSettings({
                              ...networkSettings,
                              ipAddress: e.target.value,
                            })
                          }
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subnet-mask" className="text-slate-400">
                          Subnet Mask
                        </Label>
                        <Input
                          id="subnet-mask"
                          value={networkSettings.subnet}
                          onChange={(e) =>
                            setNetworkSettings({
                              ...networkSettings,
                              subnet: e.target.value,
                            })
                          }
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gateway" className="text-slate-400">
                          Default Gateway
                        </Label>
                        <Input
                          id="gateway"
                          value={networkSettings.gateway}
                          onChange={(e) =>
                            setNetworkSettings({
                              ...networkSettings,
                              gateway: e.target.value,
                            })
                          }
                          className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dns-servers" className="text-slate-400">
                          DNS Servers
                        </Label>
                        <div className="space-y-2">
                          {networkSettings.dns.map((dns, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Input
                                value={dns}
                                onChange={(e) => {
                                  const newDns = [...networkSettings.dns];
                                  newDns[index] = e.target.value;
                                  setNetworkSettings({
                                    ...networkSettings,
                                    dns: newDns,
                                  });
                                }}
                                className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-white"
                                onClick={() => {
                                  const newDns = [...networkSettings.dns];
                                  newDns.splice(index, 1);
                                  setNetworkSettings({
                                    ...networkSettings,
                                    dns: newDns,
                                  });
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="w-full text-xs h-8 border-white/10"
                            onClick={() => {
                              setNetworkSettings({
                                ...networkSettings,
                                dns: [...networkSettings.dns, ""],
                              });
                            }}
                          >
                            <Plus className="h-3.5 w-3.5 mr-1.5" />
                            Add DNS Server
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proxy Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Proxy Settings</h3>
                    <Switch
                      checked={networkSettings.proxy.enabled}
                      onCheckedChange={(checked) =>
                        setNetworkSettings({
                          ...networkSettings,
                          proxy: { ...networkSettings.proxy, enabled: checked },
                        })
                      }
                    />
                  </div>

                  {networkSettings.proxy.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="proxy-server"
                            className="text-slate-400"
                          >
                            Proxy Server
                          </Label>
                          <Input
                            id="proxy-server"
                            value={networkSettings.proxy.server}
                            onChange={(e) =>
                              setNetworkSettings({
                                ...networkSettings,
                                proxy: {
                                  ...networkSettings.proxy,
                                  server: e.target.value,
                                },
                              })
                            }
                            className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="proxy-port"
                            className="text-slate-400"
                          >
                            Port
                          </Label>
                          <Input
                            id="proxy-port"
                            type="number"
                            value={networkSettings.proxy.port}
                            onChange={(e) =>
                              setNetworkSettings({
                                ...networkSettings,
                                proxy: {
                                  ...networkSettings.proxy,
                                  port: Number.parseInt(e.target.value),
                                },
                              })
                            }
                            className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                          <Label
                            htmlFor="proxy-auth"
                            className="text-sm cursor-pointer"
                          >
                            Proxy Authentication
                          </Label>
                          <Switch
                            id="proxy-auth"
                            checked={networkSettings.proxy.authentication}
                            onCheckedChange={(checked) =>
                              setNetworkSettings({
                                ...networkSettings,
                                proxy: {
                                  ...networkSettings.proxy,
                                  authentication: checked,
                                },
                              })
                            }
                          />
                        </div>

                        {networkSettings.proxy.authentication && (
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <Label
                                htmlFor="proxy-username"
                                className="text-slate-400"
                              >
                                Username
                              </Label>
                              <Input
                                id="proxy-username"
                                className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="proxy-password"
                                className="text-slate-400"
                              >
                                Password
                              </Label>
                              <Input
                                id="proxy-password"
                                type="password"
                                className="bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Firewall Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Firewall</h3>
                    <Switch
                      checked={networkSettings.firewall.enabled}
                      onCheckedChange={(checked) =>
                        setNetworkSettings({
                          ...networkSettings,
                          firewall: {
                            ...networkSettings.firewall,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>

                  {networkSettings.firewall.enabled && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firewall-level"
                          className="text-slate-400"
                        >
                          Firewall Security Level
                        </Label>
                        <Select
                          value={networkSettings.firewall.level}
                          onValueChange={(
                            value: "low" | "medium" | "high" | "custom"
                          ) =>
                            setNetworkSettings({
                              ...networkSettings,
                              firewall: {
                                ...networkSettings.firewall,
                                level: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger
                            id="firewall-level"
                            className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                          >
                            <SelectValue placeholder="Select firewall level" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="low">
                              Low (Basic Protection)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium (Standard Protection)
                            </SelectItem>
                            <SelectItem value="high">
                              High (Enhanced Protection)
                            </SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                          <Label
                            htmlFor="block-incoming"
                            className="text-sm cursor-pointer"
                          >
                            Block Incoming Connections
                          </Label>
                          <Switch
                            id="block-incoming"
                            checked={networkSettings.firewall.blockIncoming}
                            onCheckedChange={(checked) =>
                              setNetworkSettings({
                                ...networkSettings,
                                firewall: {
                                  ...networkSettings.firewall,
                                  blockIncoming: checked,
                                },
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                          <Label
                            htmlFor="allow-outgoing"
                            className="text-sm cursor-pointer"
                          >
                            Allow Outgoing Connections
                          </Label>
                          <Switch
                            id="allow-outgoing"
                            checked={networkSettings.firewall.allowOutgoing}
                            onCheckedChange={(checked) =>
                              setNetworkSettings({
                                ...networkSettings,
                                firewall: {
                                  ...networkSettings.firewall,
                                  allowOutgoing: checked,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="text-xs h-8 border-white/10"
                      >
                        <Shield className="h-3.5 w-3.5 mr-1.5" />
                        Configure Firewall Rules
                      </Button>
                    </div>
                  )}
                </div>

                {/* Network Diagnostics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Network Diagnostics</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Run Speed Test
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Ping Test
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security Scan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Storage & Backup Settings */}
          {activeTab === "storage" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-cyan-400" />
                  Storage & Backup
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage storage usage and backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Storage Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Storage Overview</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <HardDrive className="h-5 w-5 text-cyan-400 mr-2" />
                            <div className="text-sm font-medium">
                              System Drive (C:)
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-black/30 text-slate-400 border-slate-500/30"
                          >
                            SSD
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>324 GB used of 512 GB</span>
                            <span>63%</span>
                          </div>
                          <Progress value={63} className="h-2 bg-slate-700">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                          </Progress>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <HardDrive className="h-5 w-5 text-purple-400 mr-2" />
                            <div className="text-sm font-medium">
                              Data Drive (D:)
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-black/30 text-slate-400 border-slate-500/30"
                          >
                            HDD
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>1.8 TB used of 4 TB</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2 bg-slate-700">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                          </Progress>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center mb-3">
                          <Layers className="h-5 w-5 text-cyan-400 mr-2" />
                          <div className="text-sm font-medium">
                            Storage Distribution
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm bg-cyan-500 mr-2"></div>
                              <span className="text-xs text-slate-400">
                                System Files
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">
                              125 GB
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm bg-blue-500 mr-2"></div>
                              <span className="text-xs text-slate-400">
                                Applications
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">
                              95 GB
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm bg-purple-500 mr-2"></div>
                              <span className="text-xs text-slate-400">
                                User Data
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">
                              1.2 TB
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm bg-green-500 mr-2"></div>
                              <span className="text-xs text-slate-400">
                                Media
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">
                              650 GB
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm bg-amber-500 mr-2"></div>
                              <span className="text-xs text-slate-400">
                                Other
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">
                              85 GB
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center">
                          <Trash2 className="h-5 w-5 text-red-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium">
                              Auto Cleanup
                            </div>
                            <div className="text-xs text-slate-400">
                              Automatically clean temporary files when storage
                              is low
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={storageSettings.autoCleanup}
                          onCheckedChange={(checked) =>
                            setStorageSettings({
                              ...storageSettings,
                              autoCleanup: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backup Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Backup Settings</h3>
                    <Switch
                      checked={storageSettings.backupEnabled}
                      onCheckedChange={(checked) =>
                        setStorageSettings({
                          ...storageSettings,
                          backupEnabled: checked,
                        })
                      }
                    />
                  </div>

                  {storageSettings.backupEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="backup-frequency"
                            className="text-slate-400"
                          >
                            Backup Frequency
                          </Label>
                          <Select
                            value={storageSettings.backupFrequency}
                            onValueChange={(
                              value: "daily" | "weekly" | "monthly"
                            ) =>
                              setStorageSettings({
                                ...storageSettings,
                                backupFrequency: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id="backup-frequency"
                              className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                            >
                              <SelectValue placeholder="Select backup frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="backup-location"
                            className="text-slate-400"
                          >
                            Backup Location
                          </Label>
                          <Select
                            value={storageSettings.backupLocation}
                            onValueChange={(
                              value: "local" | "network" | "cloud"
                            ) =>
                              setStorageSettings({
                                ...storageSettings,
                                backupLocation: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id="backup-location"
                              className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                            >
                              <SelectValue placeholder="Select backup location" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="local">
                                Local Storage
                              </SelectItem>
                              <SelectItem value="network">
                                Network Storage
                              </SelectItem>
                              <SelectItem value="cloud">
                                Cloud Storage
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="compression-level"
                            className="text-slate-400"
                          >
                            Compression Level
                          </Label>
                          <Select
                            value={storageSettings.compressionLevel}
                            onValueChange={(
                              value: "none" | "low" | "medium" | "high"
                            ) =>
                              setStorageSettings({
                                ...storageSettings,
                                compressionLevel: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id="compression-level"
                              className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                            >
                              <SelectValue placeholder="Select compression level" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                          <Label
                            htmlFor="backup-encryption"
                            className="text-sm cursor-pointer"
                          >
                            Backup Encryption
                          </Label>
                          <Switch
                            id="backup-encryption"
                            checked={storageSettings.backupEncryption}
                            onCheckedChange={(checked) =>
                              setStorageSettings({
                                ...storageSettings,
                                backupEncryption: checked,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="retention-period"
                              className="text-slate-400"
                            >
                              Retention Period (days)
                            </Label>
                            <span className="text-sm text-slate-400">
                              {storageSettings.retentionPeriod} days
                            </span>
                          </div>
                          <Slider
                            id="retention-period"
                            value={[storageSettings.retentionPeriod]}
                            min={7}
                            max={365}
                            step={7}
                            onValueChange={(value) =>
                              setStorageSettings({
                                ...storageSettings,
                                retentionPeriod: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>7 days</span>
                            <span>1 year</span>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-cyan-400 mr-2" />
                            <div className="text-sm font-medium">
                              Next Scheduled Backup
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            Tomorrow, 02:00 AM
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Storage Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Storage Management</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cleanup System
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <HardDrive className="h-4 w-4 mr-2" />
                      Disk Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  System Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  View system details and manage system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* System Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              OS Version
                            </span>
                            <span className="text-sm text-white">
                              {systemInfo.platform} {systemInfo.version}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Build Number
                            </span>
                            <span className="text-sm text-white">
                              {systemInfo.buildNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Architecture
                            </span>
                            <span className="text-sm text-white">
                              {systemInfo.architecture}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Last Updated
                            </span>
                            <span className="text-sm text-white">
                              {systemInfo.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center mb-3">
                          <Cpu className="h-5 w-5 text-cyan-400 mr-2" />
                          <div className="text-sm font-medium">
                            Hardware Information
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Processor
                            </span>
                            <span className="text-sm text-white">
                              Quantum Core i9-13900K
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Memory
                            </span>
                            <span className="text-sm text-white">
                              64 GB DDR5
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Graphics
                            </span>
                            <span className="text-sm text-white">
                              NVIDIA RTX 4090
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Storage
                            </span>
                            <span className="text-sm text-white">
                              4.5 TB (SSD + HDD)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center mb-3">
                          <Activity className="h-5 w-5 text-cyan-400 mr-2" />
                          <div className="text-sm font-medium">
                            System Status
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Status
                            </span>
                            <Badge
                              className={
                                systemInfo.status === "stable"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : systemInfo.status === "beta"
                                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {systemInfo.status === "stable"
                                ? "Stable"
                                : systemInfo.status === "beta"
                                ? "Beta"
                                : "Experimental"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Uptime
                            </span>
                            <span className="text-sm text-white">
                              {systemInfo.uptime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">
                              Last Boot
                            </span>
                            <span className="text-sm text-white">
                              2023-05-01 08:00:01
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Download className="h-5 w-5 text-cyan-400 mr-2" />
                            <div className="text-sm font-medium">
                              System Updates
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-black/30 text-green-400 border-green-400/30"
                          >
                            Up to date
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-400 mb-3">
                          Your system is up to date with the latest updates
                        </div>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                          Check for Updates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Management</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center mb-3">
                        <Power className="h-5 w-5 text-red-400 mr-2" />
                        <div className="text-sm font-medium">Power Options</div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          Restart
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          Shutdown
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          Sleep
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center mb-3">
                        <Zap className="h-5 w-5 text-amber-400 mr-2" />
                        <div className="text-sm font-medium">Performance</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="power-mode"
                            className="text-xs text-slate-400"
                          >
                            Power Mode
                          </Label>
                          <Select defaultValue="balanced">
                            <SelectTrigger
                              id="power-mode"
                              className="w-24 h-7 text-xs bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="efficiency">
                                Efficiency
                              </SelectItem>
                              <SelectItem value="balanced">Balanced</SelectItem>
                              <SelectItem value="performance">
                                Performance
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          Optimize System
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center mb-3">
                        <Terminal className="h-5 w-5 text-cyan-400 mr-2" />
                        <div className="text-sm font-medium">Advanced</div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          System Diagnostics
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          Event Viewer
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          Task Manager
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Devices */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Connected Devices</h3>
                    <Button
                      variant="outline"
                      className="h-8 text-xs border-white/10"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Refresh
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <Bluetooth className="h-4 w-4 text-blue-400 mr-2" />
                        <div className="text-sm">Bluetooth Headset</div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 text-cyan-400 mr-2" />
                        <div className="text-sm">Wireless Mouse</div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 text-purple-400 mr-2" />
                        <div className="text-sm">External SSD</div>
                      </div>
                      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                        Disconnected
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Advanced Settings */}
          {activeTab === "advanced" && (
            <Card className="bg-black/40 border-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-cyan-400" />
                  Advanced Settings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure advanced system settings and developer options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Developer Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Developer Options</h3>
                    <Switch
                      checked={advancedSettings.developerMode}
                      onCheckedChange={(checked) =>
                        setAdvancedSettings({
                          ...advancedSettings,
                          developerMode: checked,
                        })
                      }
                    />
                  </div>

                  {advancedSettings.developerMode && (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-950/30 border border-amber-500/20 rounded-md">
                        <div className="flex items-center mb-2">
                          <AlertCircle className="h-5 w-5 text-amber-400 mr-2" />
                          <div className="text-sm font-medium text-amber-400">
                            Warning
                          </div>
                        </div>
                        <div className="text-xs text-amber-400/80">
                          Developer mode enables advanced features that may
                          affect system stability. Only use these settings if
                          you know what you're doing.
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                            <Label
                              htmlFor="experimental-features"
                              className="text-sm cursor-pointer"
                            >
                              Experimental Features
                            </Label>
                            <Switch
                              id="experimental-features"
                              checked={advancedSettings.experimentalFeatures}
                              onCheckedChange={(checked) =>
                                setAdvancedSettings({
                                  ...advancedSettings,
                                  experimentalFeatures: checked,
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                            <Label
                              htmlFor="debug-logging"
                              className="text-sm cursor-pointer"
                            >
                              Debug Logging
                            </Label>
                            <Switch
                              id="debug-logging"
                              checked={
                                advancedSettings.loggingLevel === "debug" ||
                                advancedSettings.loggingLevel === "verbose"
                              }
                              onCheckedChange={(checked) =>
                                setAdvancedSettings({
                                  ...advancedSettings,
                                  loggingLevel: checked ? "debug" : "warning",
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="logging-level"
                              className="text-slate-400"
                            >
                              Logging Level
                            </Label>
                            <Select
                              value={advancedSettings.loggingLevel}
                              onValueChange={(
                                value:
                                  | "error"
                                  | "warning"
                                  | "info"
                                  | "debug"
                                  | "verbose"
                              ) =>
                                setAdvancedSettings({
                                  ...advancedSettings,
                                  loggingLevel: value,
                                })
                              }
                            >
                              <SelectTrigger
                                id="logging-level"
                                className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                              >
                                <SelectValue placeholder="Select logging level" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="error">Error</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                                <SelectItem value="debug">Debug</SelectItem>
                                <SelectItem value="verbose">Verbose</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button
                            variant="outline"
                            className="w-full text-xs h-8 border-white/10"
                          >
                            <Terminal className="h-3.5 w-3.5 mr-1.5" />
                            Open Developer Console
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* System Updates */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Updates</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div>
                          <Label
                            htmlFor="auto-updates"
                            className="text-sm cursor-pointer"
                          >
                            Automatic Updates
                          </Label>
                          <p className="text-xs text-slate-400 mt-1">
                            Automatically download and install updates
                          </p>
                        </div>
                        <Switch
                          id="auto-updates"
                          checked={advancedSettings.autoUpdates}
                          onCheckedChange={(checked) =>
                            setAdvancedSettings({
                              ...advancedSettings,
                              autoUpdates: checked,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="update-channel"
                          className="text-slate-400"
                        >
                          Update Channel
                        </Label>
                        <Select
                          value={advancedSettings.updateChannel}
                          onValueChange={(
                            value: "stable" | "beta" | "experimental"
                          ) =>
                            setAdvancedSettings({
                              ...advancedSettings,
                              updateChannel: value,
                            })
                          }
                        >
                          <SelectTrigger
                            id="update-channel"
                            className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                          >
                            <SelectValue placeholder="Select update channel" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="stable">
                              Stable (Recommended)
                            </SelectItem>
                            <SelectItem value="beta">Beta</SelectItem>
                            <SelectItem value="experimental">
                              Experimental
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Download className="h-5 w-5 text-cyan-400 mr-2" />
                            <div className="text-sm font-medium">
                              System Updates
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-black/30 text-green-400 border-green-400/30"
                          >
                            Up to date
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-400 mb-3">
                          Current Version: {systemInfo.version} (Build{" "}
                          {systemInfo.buildNumber})
                        </div>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8 border-white/10"
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                          Check for Updates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry & Privacy */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Telemetry & Privacy</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div>
                          <Label
                            htmlFor="telemetry"
                            className="text-sm cursor-pointer"
                          >
                            Usage Data Collection
                          </Label>
                          <p className="text-xs text-slate-400 mt-1">
                            Send anonymous usage data to help improve the system
                          </p>
                        </div>
                        <Switch
                          id="telemetry"
                          checked={advancedSettings.telemetry}
                          onCheckedChange={(checked) =>
                            setAdvancedSettings({
                              ...advancedSettings,
                              telemetry: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div>
                          <Label
                            htmlFor="crash-reporting"
                            className="text-sm cursor-pointer"
                          >
                            Crash Reporting
                          </Label>
                          <p className="text-xs text-slate-400 mt-1">
                            Automatically send crash reports to help fix issues
                          </p>
                        </div>
                        <Switch
                          id="crash-reporting"
                          checked={advancedSettings.crashReporting}
                          onCheckedChange={(checked) =>
                            setAdvancedSettings({
                              ...advancedSettings,
                              crashReporting: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div className="flex items-center mb-3">
                          <Eye className="h-5 w-5 text-cyan-400 mr-2" />
                          <div className="text-sm font-medium">
                            Privacy Settings
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="location-services"
                              className="text-xs cursor-pointer"
                            >
                              Location Services
                            </Label>
                            <Switch
                              id="location-services"
                              defaultChecked={false}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="personalized-ads"
                              className="text-xs cursor-pointer"
                            >
                              Personalized Content
                            </Label>
                            <Switch
                              id="personalized-ads"
                              defaultChecked={false}
                            />
                          </div>
                          <Button
                            variant="outline"
                            className="w-full text-xs h-8 border-white/10 mt-2"
                          >
                            <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                            Privacy Dashboard
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Maintenance */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Maintenance</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      System Diagnostics
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset System
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/10"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Command Console
                    </Button>
                  </div>
                </div>

                {/* Startup & Recovery */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Startup & Recovery</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="startup-mode" className="text-slate-400">
                        Startup Mode
                      </Label>
                      <Select
                        value={advancedSettings.startupMode}
                        onValueChange={(
                          value: "normal" | "safe" | "diagnostic"
                        ) =>
                          setAdvancedSettings({
                            ...advancedSettings,
                            startupMode: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="startup-mode"
                          className="bg-slate-800/50 border-slate-700/50 focus:ring-cyan-500"
                        >
                          <SelectValue placeholder="Select startup mode" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="normal">Normal Startup</SelectItem>
                          <SelectItem value="safe">Safe Mode</SelectItem>
                          <SelectItem value="diagnostic">
                            Diagnostic Startup
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                      <div className="flex items-center mb-3">
                        <Power className="h-5 w-5 text-cyan-400 mr-2" />
                        <div className="text-sm font-medium">
                          System Recovery
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 mb-3">
                        Create a system restore point or reset the system to
                        factory settings
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 text-xs h-8 border-white/10"
                        >
                          Create Restore Point
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 text-xs h-8 border-white/10"
                        >
                          Factory Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Settings navigation item component
function SettingsNavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${
        active
          ? "bg-slate-800/90 text-cyan-400"
          : "hover:bg-slate-800/50 text-slate-300"
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
      {active && <ChevronRight className="h-4 w-4 ml-auto" />}
    </button>
  );
}

// Color option component
function ColorOption({
  color,
  name,
  selected,
  onClick,
}: {
  color: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-2 rounded-lg border cursor-pointer transition-all ${
        selected
          ? "bg-slate-800 border-cyan-500"
          : "bg-slate-800/50 border-white/10 hover:border-white/30"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-medium">{name}</div>
        {selected && <Check className="h-3 w-3 text-cyan-400" />}
      </div>
      <div className="h-8 rounded-md" style={{ backgroundColor: color }}></div>
    </div>
  );
}
