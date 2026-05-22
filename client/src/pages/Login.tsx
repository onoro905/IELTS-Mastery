import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Login() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="p-8 border-primary/20 shadow-2xl">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">IELTS Mastery</h1>
            </div>
            <p className="text-muted-foreground">
              تعلم اللغة الإنجليزية واجتياز IELTS Band 8
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                سيتم استخدام حسابك المسجل
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                سيتم التحقق من خلال Manus Auth
              </p>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity mb-4"
            size="lg"
          >
            <span>تسجيل الدخول عبر Manus</span>
            <ArrowRight className="w-4 h-4 mr-2" />
          </Button>

          {import.meta.env.DEV && (
            <Button
              onClick={() => window.location.href = "/api/auth/dev-login"}
              variant="outline"
              className="w-full mb-4 border-dashed"
              size="lg"
            >
              <span>تسجيل دخول تجريبي (Dev)</span>
            </Button>
          )}

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                أو
              </span>
            </div>
          </div>

          {/* Social Login */}
          <Button
            variant="outline"
            className="w-full mb-4"
            disabled
          >
            <span>تسجيل الدخول عبر Google</span>
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary hover:underline font-medium"
            >
              إنشاء حساب جديد
            </button>
          </p>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              المميزات:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                تعلم 5000+ كلمة IELTS
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                نظام تكرار ذكي
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                معلم ذكي بالذكاء الاصطناعي
              </li>
            </ul>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          بالتسجيل، أنت توافق على{" "}
          <button className="text-primary hover:underline">
            شروط الخدمة
          </button>
          {" "}و{" "}
          <button className="text-primary hover:underline">
            سياسة الخصوصية
          </button>
        </p>
      </motion.div>
    </div>
  );
}
