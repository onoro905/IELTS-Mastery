import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Zap, 
  Target, 
  Users, 
  Trophy, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      window.location.href = getLoginUrl();
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "نظام كلمات ذكي",
      description: "5000+ كلمة IELTS مع معاني عربية وأمثلة وصور توضيحية",
    },
    {
      icon: Zap,
      title: "تكرار متباعد ذكي",
      description: "خوارزمية Spaced Repetition لحفظ دائم وفعال",
    },
    {
      icon: Target,
      title: "قواعس تفاعلية",
      description: "شرح مبسط للقواعس مع أخطاء شائعة للعرب",
    },
    {
      icon: Trophy,
      title: "اختبارات IELTS",
      description: "محاكاة كاملة لاختبارات Reading, Listening, Speaking, Writing",
    },
    {
      icon: Sparkles,
      title: "معلم ذكي بـ AI",
      description: "تصحيح فوري للكتابة والنطق مع تقييم Band Score",
    },
    {
      icon: Users,
      title: "نظام Gamification",
      description: "نقاط XP، شارات، مستويات، وتحديات يومية",
    },
  ];

  const roadmap = [
    { band: "Band 5", level: "مبتدئ", weeks: "4-6 أسابيع" },
    { band: "Band 6", level: "متوسط", weeks: "8-10 أسابيع" },
    { band: "Band 7", level: "متقدم", weeks: "12-16 أسبوع" },
    { band: "Band 8", level: "احترافي", weeks: "18-24 أسبوع" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              IELTS Mastery
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  مرحباً، {user?.name}
                </span>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  لوحة التحكم
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                ابدأ الآن
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              وصل إلى{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IELTS Band 8
              </span>
              {" "}بسرعة وكفاءة
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              منصة تعليمية متقدمة تجمع بين الذكاء الاصطناعي والتكرار الذكي لمساعدتك على إتقان اللغة الإنجليزية والتحضير المثالي لاختبار IELTS.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartLearning}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
              >
                ابدأ التعلم المجاني
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                اعرف المزيد
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground">كلمة IELTS</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Phrasal Verbs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">نسبة النجاح</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20 backdrop-blur-sm">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="bg-white/50 dark:bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full" />
                      <div className="h-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded flex-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ميزات قوية لتعلم فعال
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              كل ما تحتاجه للوصول إلى Band 8 في منصة واحدة
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              خطتك نحو Band 8
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مسار تعليمي منظم يأخذك من المبتدئ إلى الاحترافي
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {roadmap.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.band}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.level}
                  </p>
                  <p className="text-xs bg-primary/10 text-primary rounded-full py-2 px-3 inline-block">
                    {item.weeks}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل أنت مستعد للبدء؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              انضم إلى آلاف المتعلمين الذين وصلوا إلى Band 8 مع IELTS Mastery
            </p>
            <Button
              onClick={handleStartLearning}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
            >
              ابدأ رحلتك الآن
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 IELTS Mastery. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
