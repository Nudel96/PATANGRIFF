import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  LogOut,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Download,
  Settings,
  Camera,
  Mail,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Trash2,
  Upload,
  Save,
  RefreshCw,
  Key,
  Monitor,
  Moon,
  Sun,
  Languages,
  Database,
  Link,
  Zap,
  Activity,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Star,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';

interface UserSettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

interface UserProfile {
  displayName: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  phone: string;
  joinDate: string;
  profileImage: string | null;
  isProfilePublic: boolean;
  showEmail: boolean;
  showLocation: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  passwordLastChanged: string;
  activeSessions: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  tradeAlerts: boolean;
  communityUpdates: boolean;
  weeklyReports: boolean;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User data state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    displayName: 'Elite Warrior',
    username: 'warrior_trader',
    email: 'warrior@example.com',
    bio: 'Professional trader focused on systematic approaches and disciplined execution. Member of the warrior brotherhood.',
    location: 'New York, NY',
    website: 'https://mytrading.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-06-15',
    profileImage: null,
    isProfilePublic: true,
    showEmail: false,
    showLocation: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginNotifications: true,
    passwordLastChanged: '2024-01-15',
    activeSessions: 3
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    tradeAlerts: true,
    communityUpdates: true,
    weeklyReports: false
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/New_York');

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1500);
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return; // Show error
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      // Show success message
    }, 1500);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 50) return 'bg-destructive';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-primary';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Settings className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Account Settings</h1>
                  <p className="text-sm text-foreground/70">Manage your profile and preferences</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Award className="w-4 h-4 mr-2" />
                Elite Member
              </Badge>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/20">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {userProfile.profileImage ? (
                        <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                          {userProfile.displayName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{userProfile.displayName}</h3>
                    <p className="text-muted-foreground">@{userProfile.username}</p>
                    <p className="text-sm text-muted-foreground">Member since {new Date(userProfile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={userProfile.displayName}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, displayName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={userProfile.username}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={userProfile.website}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-muted-foreground">{userProfile.bio.length}/500 characters</p>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profilePublic"
                        checked={userProfile.isProfilePublic}
                        onCheckedChange={(checked) => setUserProfile(prev => ({ ...prev, isProfilePublic: checked as boolean }))}
                      />
                      <Label htmlFor="profilePublic">Make profile public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showEmail"
                        checked={userProfile.showEmail}
                        onCheckedChange={(checked) => setUserProfile(prev => ({ ...prev, showEmail: checked as boolean }))}
                      />
                      <Label htmlFor="showEmail">Show email address on profile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showLocation"
                        checked={userProfile.showLocation}
                        onCheckedChange={(checked) => setUserProfile(prev => ({ ...prev, showLocation: checked as boolean }))}
                      />
                      <Label htmlFor="showLocation">Show location on profile</Label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            {/* Password Change */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>Change Password</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {passwordForm.newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Password Strength:</span>
                        <span className={`font-medium ${
                          passwordStrength < 50 ? 'text-destructive' : 
                          passwordStrength < 75 ? 'text-yellow-500' : 'text-primary'
                        }`}>
                          {getPasswordStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <Progress 
                        value={passwordStrength} 
                        className={`h-2 ${getPasswordStrengthColor(passwordStrength)}`}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-sm text-destructive">Passwords do not match</p>
                  )}
                </div>

                <Button 
                  onClick={handleChangePassword} 
                  disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-secondary" />
                  <span>Two-Factor Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-sm text-muted-foreground">
                      {securitySettings.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security to your account'}
                    </p>
                  </div>
                  <Button 
                    variant={securitySettings.twoFactorEnabled ? "destructive" : "default"}
                    onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                  >
                    {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="loginNotifications"
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, loginNotifications: checked as boolean }))}
                  />
                  <Label htmlFor="loginNotifications">Send email notifications for new logins</Label>
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  <span>Active Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Current Sessions</h4>
                    <p className="text-sm text-muted-foreground">
                      You have {securitySettings.activeSessions} active sessions
                    </p>
                  </div>
                  <Button variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    View All Sessions
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • New York, NY</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Deletion */}
            <Card className="military-card border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Danger Zone</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-secondary" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked as boolean }))}
                      />
                      <Label htmlFor="emailNotifications">Enable email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="securityAlerts"
                        checked={notificationSettings.securityAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, securityAlerts: checked as boolean }))}
                      />
                      <Label htmlFor="securityAlerts">Security alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tradeAlerts"
                        checked={notificationSettings.tradeAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, tradeAlerts: checked as boolean }))}
                      />
                      <Label htmlFor="tradeAlerts">Trade alerts and updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="communityUpdates"
                        checked={notificationSettings.communityUpdates}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, communityUpdates: checked as boolean }))}
                      />
                      <Label htmlFor="communityUpdates">Community updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="weeklyReports"
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyReports: checked as boolean }))}
                      />
                      <Label htmlFor="weeklyReports">Weekly performance reports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, marketingEmails: checked as boolean }))}
                      />
                      <Label htmlFor="marketingEmails">Marketing and promotional emails</Label>
                    </div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked as boolean }))}
                      />
                      <Label htmlFor="pushNotifications">Enable push notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inAppNotifications"
                        checked={notificationSettings.inAppNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, inAppNotifications: checked as boolean }))}
                      />
                      <Label htmlFor="inAppNotifications">In-app notifications</Label>
                    </div>
                  </div>
                </div>

                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <span>Appearance & Localization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        theme === 'dark' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Moon className="w-4 h-4" />
                        <span className="font-medium">Dark</span>
                      </div>
                      <div className="w-full h-8 bg-background rounded border"></div>
                    </div>
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        theme === 'light' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme('light')}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Sun className="w-4 h-4" />
                        <span className="font-medium">Light</span>
                      </div>
                      <div className="w-full h-8 bg-white rounded border"></div>
                    </div>
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        theme === 'system' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme('system')}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Monitor className="w-4 h-4" />
                        <span className="font-medium">System</span>
                      </div>
                      <div className="w-full h-8 bg-gradient-to-r from-background to-white rounded border"></div>
                    </div>
                  </div>
                </div>

                {/* Language Selection */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Language</h4>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone Selection */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Timezone</h4>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Data */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-secondary" />
                  <span>Privacy & Data Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Data Export */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Data Export</h4>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your data including profile information, trading history, and settings.
                  </p>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                </div>

                {/* Data Retention */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Data Retention</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                      <div>
                        <p className="font-medium">Trading History</p>
                        <p className="text-sm text-muted-foreground">Keep for 7 years (regulatory requirement)</p>
                      </div>
                      <Badge variant="outline">Required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                      <div>
                        <p className="font-medium">Activity Logs</p>
                        <p className="text-sm text-muted-foreground">Keep for 1 year</p>
                      </div>
                      <Select defaultValue="1year">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3months">3 months</SelectItem>
                          <SelectItem value="6months">6 months</SelectItem>
                          <SelectItem value="1year">1 year</SelectItem>
                          <SelectItem value="2years">2 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Privacy Controls */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Privacy Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="analyticsOptOut" />
                      <Label htmlFor="analyticsOptOut">Opt out of analytics tracking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketingOptOut" />
                      <Label htmlFor="marketingOptOut">Opt out of marketing communications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dataSharing" />
                      <Label htmlFor="dataSharing">Allow data sharing with partners</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5 text-primary" />
                  <span>Third-Party Integrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connected Services */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Connected Services</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">TradingView</p>
                          <p className="text-sm text-muted-foreground">Chart analysis and alerts</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-primary/10 text-primary">Connected</Badge>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">Discord</p>
                          <p className="text-sm text-muted-foreground">Community notifications</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Zapier</p>
                          <p className="text-sm text-muted-foreground">Workflow automation</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                {/* API Access */}
                <div className="space-y-4">
                  <h4 className="font-semibold">API Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate API keys to access your data programmatically.
                  </p>
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Manage API Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};