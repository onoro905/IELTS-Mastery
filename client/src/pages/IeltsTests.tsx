import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  Mic,
  FileText,
  Clock,
  Target,
  Play,
} from "lucide-react";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function IeltsTests() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [selectedTest, setSelectedTest] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const testTypes = [
    {
      id: 1,
      type: "Reading",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      description: "اختبر مهارات القراءة والفهم",
      duration: "60 دقيقة",
      difficulty: "متوسط",
      tests: [
        {
          id: 1,
          title: "Reading Test 1",
          passages: 3,
          questions: 40,
          estimatedTime: 60,
        },
        {
          id: 2,
          title: "Reading Test 2",
          passages: 3,
          questions: 40,
          estimatedTime: 60,
        },
      ],
    },
    {
      id: 2,
      type: "Listening",
      icon: Headphones,
      color: "from-purple-500 to-purple-600",
      description: "اختبر مهارات الاستماع والفهم",
      duration: "40 دقيقة",
      difficulty: "متوسط",
      tests: [
        {
          id: 1,
          title: "Listening Test 1",
          sections: 4,
          questions: 40,
          estimatedTime: 40,
        },
        {
          id: 2,
          title: "Listening Test 2",
          sections: 4,
          questions: 40,
          estimatedTime: 40,
        },
      ],
    },
    {
      id: 3,
      type: "Writing",
      icon: FileText,
      color: "from-amber-500 to-amber-600",
      description: "اختبر مهارات الكتابة والتعبير",
      duration: "60 دقيقة",
      difficulty: "صعب",
      tests: [
        {
          id: 1,
          title: "Writing Test 1",
          tasks: 2,
          minWords: 250,
          estimatedTime: 60,
        },
        {
          id: 2,
          title: "Writing Test 2",
          tasks: 2,
          minWords: 250,
          estimatedTime: 60,
        },
      ],
    },
    {
      id: 4,
      type: "Speaking",
      icon: Mic,
      color: "from-pink-500 to-pink-600",
      description: "اختبر مهارات التحدث والنطق",
      duration: "15 دقيقة",
      difficulty: "صعب",
      tests: [
        {
          id: 1,
          title: "Speaking Test 1",
          parts: 3,
          estimatedTime: 15,
        },
        {
          id: 2,
          title: "Speaking Test 2",
          parts: 3,
          estimatedTime: 15,
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
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              اختبارات IELTS الكاملة 🎯
            </h1>
            <p className="text-muted-foreground mt-2">
              محاكاة حقيقية لاختبارات IELTS مع تقييم Band Score
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            العودة
          </Button>
        </motion.div>

        {/* Test Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {testTypes.map((testType) => {
            const Icon = testType.icon;
            return (
              <motion.div key={testType.id} variants={itemVariants}>
                <Card
                  className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    selectedTest?.id === testType.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedTest(testType)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${testType.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Target className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{testType.type}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {testType.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{testType.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-primary" />
                      <span>مستوى الصعوبة: {testType.difficulty}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    ابدأ الاختبار
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Test Details */}
        {selectedTest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                {selectedTest.type} - الاختبارات المتاحة
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {selectedTest.tests.map((test: any) => (
                  <Card key={test.id} className="p-6 border-primary/20">
                    <h3 className="font-bold text-lg mb-4">{test.title}</h3>

                    <div className="space-y-3 mb-6">
                      {selectedTest.type === "Reading" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {test.passages}
                            </span>{" "}
                            نصوص
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {test.questions}
                            </span>{" "}
                            سؤال
                          </p>
                        </>
                      )}
                      {selectedTest.type === "Listening" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {test.sections}
                            </span>{" "}
                            أقسام
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {test.questions}
                            </span>{" "}
                            سؤال
                          </p>
                        </>
                      )}
                      {selectedTest.type === "Writing" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {test.tasks}
                            </span>{" "}
                            مهام
                          </p>
                          <p className="text-sm text-muted-foreground">
                            الحد الأدنى:{" "}
                            <span className="font-medium text-foreground">
                              {test.minWords}
                            </span>{" "}
                            كلمة
                          </p>
                        </>
                      )}
                      {selectedTest.type === "Speaking" && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {test.parts}
                          </span>{" "}
                          أجزاء
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        الوقت المتوقع:{" "}
                        <span className="font-medium text-foreground">
                          {test.estimatedTime}
                        </span>{" "}
                        دقيقة
                      </p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      <Play className="w-4 h-4 mr-2" />
                      ابدأ {test.title}
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
