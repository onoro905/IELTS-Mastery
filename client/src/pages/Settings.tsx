import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Globe,
  Lock,
  LogOut,
  ChevronRight,
  Save,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

type SettingItem = 
  | { label: string; value: string; editable: boolean; toggle?: never; onChange?: never }
  | { label: string; toggle: boolean; value: boolean; onChange: (v: boolean) => void; editable?: never };

export default function Settings() {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const [, navigate] = useLocation();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const settingsSections: Array<{
    title: string;
    icon: typeof SettingsIcon;
    items: SettingItem[];
  }> = [
    {
      title: "الحساب",
      icon: SettingsIcon,
      items: [
        {
          label: "البريد الإلكتروني",
          value: user?.email || "user@example.com",
          editable: false,
        },
        {
          label: "الاسم",
          value: user?.name || "المستخدم",
          editable: true,
        },
      ],
    },
    {
      title: "الإشعارات",
      icon: Bell,
      items: [
        {
          label: "تفعيل الإشعارات",
          toggle: true,
          value: notifications,
          onChange: setNotifications,
        },
        {
          label: "رسائل البريد الإلكتروني",
          toggle: true,
          value: emailUpdates,
          onChange: setEmailUpdates,
        },
      ],
    },
    {
      title: "المظهر",
      icon: Moon,
      items: [
        {
          label: "الوضع الداكن",
          toggle: true,
          value: darkMode,
          onChange: setDarkMode,
        },
      ],
    },
    {
      title: "اللغة",
      icon: Globe,
      items: [
        {
          label: "اللغة",
          value: "العربية",
          editable: false,
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <SettingsIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">الإعدادات</h1>
            <p className="text-muted-foreground mt-1">
              إدارة حسابك والتفضيلات
            </p>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {settingsSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.label}</p>
                          {!item.toggle && !("editable" in item && item.editable) && (
                            <p className="text-sm text-muted-foreground">
                              {item.value}
                            </p>
                          )}
                        </div>

                        {item.toggle ? (
                          <Switch
                            checked={item.value}
                            onCheckedChange={item.onChange}
                          />
                        ) : "editable" in item && item.editable ? (
                          <Input
                            value={item.value as string}
                            className="w-32"
                            placeholder={item.label}
                          />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {/* Security Section */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h2 className="text-xl font-bold">الأمان</h2>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span>تغيير كلمة المرور</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span>المصادقة الثنائية</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-red-200 bg-red-50/50 dark:bg-red-950/20">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                منطقة الخطر
              </h2>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between text-red-600 hover:text-red-700"
                >
                  <span>حذف جميع البيانات</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white justify-between"
                >
                  <span>تسجيل الخروج</span>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          variants={itemVariants}
          className="flex gap-3"
        >
          <Button
            className="bg-gradient-to-r from-primary to-secondary"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            حفظ التغييرات
          </Button>
          <Button variant="outline" size="lg">
            إلغاء
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
