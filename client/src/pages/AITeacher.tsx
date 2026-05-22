import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

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

export default function AITeacher() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [userText, setUserText] = useState("");
  const [feedbackType, setFeedbackType] = useState<"writing" | "speaking" | "grammar" | "vocabulary">("writing");
  
  const utils = trpc.useContext();
  const historyQuery = trpc.aiFeedback.history.useQuery(
    { limit: 20 },
    { enabled: isAuthenticated }
  );
  
  const createFeedbackMutation = trpc.aiFeedback.create.useMutation({
    onSuccess: () => {
      utils.aiFeedback.history.invalidate();
      setUserText("");
    }
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async () => {
    if (!userText.trim()) return;
    
    const mockResponses = {
      writing: "كتابتك جيدة! حاول تحسين الربط بين الجمل.",
      speaking: "نطقك واضح، لكن ركز على مخارج الحروف.",
      grammar: "استخدامك للأزمنة صحيح بنسبة كبيرة.",
      vocabulary: "مفرداتك متنوعة، جرب استخدام كلمات أكاديمية أكثر."
    };

    createFeedbackMutation.mutate({
      feedbackType: feedbackType as any,
      userContent: userText,
      aiFeedback: mockResponses[feedbackType as keyof typeof mockResponses],
      score: 7.0,
      suggestions: {
        strengths: ["وضوح الفكرة", "بساطة الأسلوب"],
        improvements: ["استخدام أدوات الربط", "تنوع المفردات"]
      }
    });
  };

  const feedbacks = historyQuery.data || [];
  const isLoading = createFeedbackMutation.isLoading;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              المعلم الذكي 🤖
            </h1>
            <p className="text-muted-foreground mt-2">
              احصل على تغذية راجعة فورية وشخصية من معلم ذكي
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            العودة
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">ما الذي تريد تحسينه؟</h2>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: "writing", label: "الكتابة", icon: "✍️" },
                  { id: "speaking", label: "التحدث", icon: "🎤" },
                  { id: "grammar", label: "القواعد", icon: "📖" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() =>
                      setFeedbackType(
                        type.id as "writing" | "speaking" | "grammar"
                      )
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      feedbackType === type.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  {feedbackType === "writing"
                    ? "أدخل النص الذي تريد تحسينه"
                    : feedbackType === "speaking"
                    ? "أدخل ما قلته"
                    : "أدخل الجملة التي تريد فحصها"}
                </label>
                <Textarea
                  placeholder="اكتب هنا..."
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!userText.trim() || isLoading}
                className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    جاري التحليل...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    احصل على تغذية راجعة
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                نصائح للحصول على أفضل تغذية راجعة
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• اكتب نصوصاً طويلة نسبياً لتحصل على تحليل أعمق</li>
                <li>• استخدم علامات الترقيم بشكل صحيح</li>
                <li>• تجنب نسخ النصوص من الإنترنت</li>
                <li>• كن واضحاً في ما تريد تحسينه</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 sticky top-4">
              <h3 className="font-bold mb-4">إحصائيات التقدم</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      الكتابة
                    </span>
                    <span className="font-bold text-primary">7.5/9</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: "83%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      التحدث
                    </span>
                    <span className="font-bold text-primary">6.5/9</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      القواعس
                    </span>
                    <span className="font-bold text-primary">8.0/9</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: "89%" }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {feedbacks.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold mb-4">سجل التغذية الراجعة</h2>
            <div className="space-y-4">
              {feedbacks.map((feedback: any) => (
                <motion.div key={feedback.id} variants={itemVariants}>
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">
                          {feedback.feedbackType === "writing"
                            ? "تقييم الكتابة"
                            : feedback.feedbackType === "speaking"
                            ? "تقييم التحدث"
                            : feedback.feedbackType === "grammar"
                            ? "تقييم القواعد"
                            : "تقييم المفردات"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(feedback.createdAt).toLocaleDateString(
                            "ar-SA"
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          {feedback.score}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          من 9
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-primary" />
                          التعليق
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {feedback.aiFeedback}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            نقاط القوة
                          </p>
                          <ul className="space-y-1">
                            {feedback.suggestions?.strengths?.map((s: string, i: number) => (
                              <li
                                key={i}
                                className="text-xs text-muted-foreground"
                              >
                                ✓ {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            نقاط التحسين
                          </p>
                          <ul className="space-y-1">
                            {feedback.suggestions?.improvements?.map(
                              (imp: string, i: number) => (
                                <li
                                  key={i}
                                  className="text-xs text-muted-foreground"
                                >
                                  • {imp}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
