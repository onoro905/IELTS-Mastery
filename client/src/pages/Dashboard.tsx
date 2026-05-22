import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Zap,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  const progressQuery = trpc.userProgress.get.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || progressQuery.isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin">
            <Zap className="w-8 h-8 text-primary" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const progress = progressQuery.data;

  const stats = [
    {
      icon: BookOpen,
      label: "الكلمات المحفوظة",
      value: progress?.totalWordsLearned || "0",
      change: "تقدم مستمر",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Target,
      label: "مستوى القواعد",
      value: progress?.grammarLevel || "0",
      change: "مستوى " + (progress?.level || 1),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Trophy,
      label: "تقدم IELTS",
      value: progress?.ieltsScore ? `Band ${progress.ieltsScore}` : "N/A",
      change: "الهدف Band 8",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Flame,
      label: "Streak اليومي",
      value: progress?.currentStreak || "0",
      change: "أيام متتالية",
      color: "from-red-500 to-red-600",
    },
  ];

  const recentActivities = [
    {
      title: "تعلم 10 كلمات جديدة",
      time: "منذ ساعة",
      xp: "+50 XP",
    },
    {
      title: "أكملت درس Grammar",
      time: "منذ 3 ساعات",
      xp: "+30 XP",
    },
    {
      title: "حققت شارة 'المتعلم المثابر'",
      time: "منذ يوم",
      xp: "+100 XP",
    },
    {
      title: "أكملت اختبار Reading",
      time: "منذ يومين",
      xp: "+75 XP",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              مرحباً بعودتك، {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              استمر في رحلتك نحو Band 8
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/vocabulary")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              تعلم كلمات جديدة
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {stat.label}
                      </p>
                      <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                      <p className="text-xs text-primary font-medium">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Learning Progress */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">تقدمك اليومي</h2>

              <div className="space-y-4">
                {[
                  { label: "الكلمات", current: progress?.totalWordsLearned || 0, total: 5000, color: "from-blue-500" },
                  { label: "القواعد", current: progress?.grammarLevel || 0, total: 30, color: "from-purple-500" },
                  { label: "النقاط (XP)", current: progress?.totalXP || 0, total: 1000, color: "from-pink-500" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.current}/{item.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.current / item.total) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${item.color} to-secondary`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      النقاط الإجمالية اليوم
                    </p>
                    <p className="text-3xl font-bold text-primary">{progress?.totalXP || 0} XP</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-primary/20" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 h-full">
              <h2 className="text-xl font-bold mb-4">الإجراءات السريعة</h2>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => navigate("/vocabulary")}
                >
                  <BookOpen className="w-4 h-4 mr-3 text-primary" />
                  <span>تعلم كلمات جديدة</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => navigate("/grammar")}
                >
                  <Target className="w-4 h-4 mr-3 text-primary" />
                  <span>درس القواعس</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => navigate("/ielts")}
                >
                  <Trophy className="w-4 h-4 mr-3 text-primary" />
                  <span>اختبر نفسك</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => navigate("/ai-teacher")}
                >
                  <Zap className="w-4 h-4 mr-3 text-primary" />
                  <span>المعلم الذكي</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">النشاطات الأخيرة</h2>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <span className="text-primary font-bold">{activity.xp}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
