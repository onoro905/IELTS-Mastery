import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Zap,
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

export default function Grammar() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const lessonsQuery = trpc.grammar.lessons.useQuery(
    {},
    { enabled: isAuthenticated }
  );

  const exercisesQuery = trpc.grammar.exercises.useQuery(
    { lessonId: selectedLesson?.id },
    { enabled: !!selectedLesson }
  );

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const grammarLessons = lessonsQuery.data || [];
  const exercises = exercisesQuery.data || [];

  const mockExercises = [
    {
      id: 1,
      question: "She _____ to the gym every day.",
      options: ["goes", "is going", "go", "going"],
      correctAnswer: "goes",
      explanation: "نستخدم Present Simple للعادات والحقائق العامة.",
    },
    {
      id: 2,
      question: "The book _____ by Mark Twain.",
      options: ["wrote", "was written", "is written", "has written"],
      correctAnswer: "was written",
      explanation: "نستخدم Passive Voice لأن المؤلف هو الفاعل الحقيقي.",
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
              قسم القواعد النحوية 📖
            </h1>
            <p className="text-muted-foreground mt-2">
              تعلم القواعد الأساسية مع أمثلة وتمارين تفاعلية
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            العودة
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lessons List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4"
          >
            {grammarLessons.map((lesson) => (
              <motion.div key={lesson.id} variants={itemVariants}>
                <Card
                  className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    selectedLesson?.id === lesson.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                          {lesson.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          المستوى {lesson.difficulty}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lesson.progress}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {lesson.progress}% مكتمل
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground ml-4" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Lesson Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {selectedLesson ? (
              <Card className="p-6 space-y-6 sticky top-4">
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    {selectedLesson.title}
                  </h2>
                  <div className="space-y-3">
                    <h3 className="font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      الأخطاء الشائعة للعرب
                    </h3>
                    <ul className="space-y-2">
                      {selectedLesson.commonMistakes?.map(
                        (mistake: string, i: number) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex gap-2"
                          >
                            <span className="text-primary">•</span>
                            {mistake}
                          </li>
                        )
                      ) || <li className="text-sm text-muted-foreground">لا توجد أخطاء شائعة مسجلة حالياً.</li>}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    التمارين
                  </h3>
                    <div className="space-y-3">
                    {exercises.length > 0 ? exercises.map((ex: any, i: number) => (
                      <div key={i} className="text-sm">
                        <p className="font-medium mb-2">{ex.question}</p>
                        <div className="space-y-1">
                          {ex.options?.map((opt: string, j: number) => (
                            <button
                              key={j}
                              className={`w-full text-left p-2 rounded border transition-colors ${
                                opt === ex.correctAnswer
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : "border-border hover:border-primary"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-muted-foreground">لا توجد تمارين متاحة لهذا الدرس حالياً.</p>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  ابدأ الدرس
                </Button>
              </Card>
            ) : (
              <Card className="p-6 flex items-center justify-center h-96">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">اختر درساً لتبدأ</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
