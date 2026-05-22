import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BookOpen, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { getLoginUrl } from "@/const";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Register() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = () => {
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
              انضم إلى آلاف المتعلمين العرب
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            {step >= 1 && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="أحمد محمد"
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>

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
                </div>
              </>
            )}

            {step >= 2 && (
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
              </div>
            )}

            {step >= 3 && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">المستوى الحالي</p>
                    <p className="text-xs text-muted-foreground">
                      سيتم تحديد مستواك من خلال اختبار تشخيصي
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">خطة التعلم</p>
                    <p className="text-xs text-muted-foreground">
                      ستحصل على خطة مخصصة لتحقيق Band 8
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">المعلم الذكي</p>
                    <p className="text-xs text-muted-foreground">
                      سيساعدك معلم ذكي بالذكاء الاصطناعي
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
              >
                <span>التالي</span>
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
              >
                <span>إنشاء الحساب</span>
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            )}

            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="w-full"
              >
                السابق
              </Button>
            )}
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            هل لديك حساب بالفعل؟{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              تسجيل الدخول
            </button>
          </p>

          {/* Terms */}
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
        </Card>
      </motion.div>
    </div>
  );
}
