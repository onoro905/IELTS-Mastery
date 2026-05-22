import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  Star,
  Target,
  Zap,
  Medal,
  Crown,
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
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Gamification() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"leaderboard" | "badges" | "challenges">("leaderboard");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const leaderboardData = [
    {
      rank: 1,
      name: "أحمد محمد",
      xp: 15420,
      level: 25,
      streak: 45,
      badge: "🏆",
    },
    {
      rank: 2,
      name: "فاطمة علي",
      xp: 14850,
      level: 24,
      streak: 38,
      badge: "🥈",
    },
    {
      rank: 3,
      name: "محمود حسن",
      xp: 13920,
      level: 23,
      streak: 32,
      badge: "🥉",
    },
    {
      rank: 4,
      name: "أنت",
      xp: 8750,
      level: 18,
      streak: 12,
      badge: "⭐",
    },
    {
      rank: 5,
      name: "سارة إبراهيم",
      xp: 8200,
      level: 17,
      streak: 8,
      badge: "✨",
    },
  ];

  const badges = [
    {
      id: 1,
      name: "البداية الرائعة",
      icon: "🌟",
      description: "أكمل أول 10 كلمات",
      unlocked: true,
      progress: 100,
    },
    {
      id: 2,
      name: "معلم اللغة",
      icon: "📚",
      description: "تعلم 100 كلمة",
      unlocked: true,
      progress: 100,
    },
    {
      id: 3,
      name: "الاستمرارية الذهبية",
      icon: "🔥",
      description: "حافظ على Streak لمدة 30 يوم",
      unlocked: false,
      progress: 40,
    },
    {
      id: 4,
      name: "خبير القواعس",
      icon: "📖",
      description: "أكمل جميع دروس القواعس",
      unlocked: false,
      progress: 65,
    },
    {
      id: 5,
      name: "نجم IELTS",
      icon: "⭐",
      description: "حقق Band 8 في اختبار IELTS",
      unlocked: false,
      progress: 50,
    },
    {
      id: 6,
      name: "الماستر",
      icon: "👑",
      description: "وصل إلى المستوى 30",
      unlocked: false,
      progress: 60,
    },
  ];

  const dailyChallenges = [
    {
      id: 1,
      title: "تحدي الكلمات اليومي",
      description: "تعلم 10 كلمات جديدة",
      reward: 100,
      completed: true,
      icon: "📚",
    },
    {
      id: 2,
      title: "تحدي القواعس",
      description: "أكمل 5 تمارين قواعس",
      reward: 150,
      completed: false,
      icon: "📖",
    },
    {
      id: 3,
      title: "تحدي الكتابة",
      description: "اكتب فقرة واحصل على تقييم",
      reward: 200,
      completed: false,
      icon: "✍️",
    },
    {
      id: 4,
      title: "تحدي Phrasal Verbs",
      description: "تعلم 5 Phrasal Verbs جديدة",
      reward: 120,
      completed: false,
      icon: "🔗",
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
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Trophy className="w-8 h-8 text-primary" />
              Gamification & Leaderboard 🎮
            </h1>
            <p className="text-muted-foreground mt-2">
              تنافس مع المتعلمين الآخرين واحصل على شارات وجوائز
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            العودة
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-4 gap-4"
        >
          {[
            { icon: Zap, label: "XP Points", value: "8,750", color: "from-yellow-500 to-orange-500" },
            { icon: Flame, label: "Current Streak", value: "12 أيام", color: "from-red-500 to-pink-500" },
            { icon: Star, label: "Level", value: "18", color: "from-purple-500 to-indigo-500" },
            { icon: Medal, label: "Rank", value: "#4", color: "from-blue-500 to-cyan-500" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} variants={itemVariants}>
                <Card className={`p-6 bg-gradient-to-br ${stat.color}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-white/50" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {[
            { id: "leaderboard", label: "🏆 Leaderboard" },
            { id: "badges", label: "🎖️ Badges" },
            { id: "challenges", label: "⚡ Daily Challenges" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "leaderboard" | "badges" | "challenges"
                )
              }
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Leaderboard */}
          {activeTab === "leaderboard" && (
            <div className="space-y-4">
              {leaderboardData.map((user, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card
                    className={`p-4 ${
                      user.rank <= 3
                        ? "border-primary/50 bg-primary/5"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-2xl font-bold text-primary w-8">
                          {user.badge}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            المستوى {user.level}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-bold text-lg">
                          {user.xp.toLocaleString()} XP
                        </div>
                        <div className="flex items-center gap-1 text-sm text-orange-500">
                          <Flame className="w-4 h-4" />
                          {user.streak} يوم
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Badges */}
          {activeTab === "badges" && (
            <div className="grid md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <motion.div key={badge.id} variants={itemVariants}>
                  <Card
                    className={`p-6 text-center ${
                      badge.unlocked
                        ? "border-primary/50 bg-primary/5"
                        : "opacity-60"
                    }`}
                  >
                    <div className="text-5xl mb-3">{badge.icon}</div>
                    <h3 className="font-bold mb-2">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {badge.description}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${badge.progress}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {badge.progress}% مكتمل
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Daily Challenges */}
          {activeTab === "challenges" && (
            <div className="space-y-4">
              {dailyChallenges.map((challenge) => (
                <motion.div key={challenge.id} variants={itemVariants}>
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{challenge.icon}</div>
                        <div>
                          <h3 className="font-bold">{challenge.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-1 text-lg font-bold text-yellow-500">
                          <Zap className="w-5 h-5" />
                          +{challenge.reward}
                        </div>
                        <Button
                          size="sm"
                          variant={
                            challenge.completed
                              ? "secondary"
                              : "default"
                          }
                          disabled={challenge.completed}
                        >
                          {challenge.completed
                            ? "✓ مكتمل"
                            : "ابدأ"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
