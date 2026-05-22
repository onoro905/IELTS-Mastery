import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Zap,
  Volume2,
  Copy,
  ChevronRight,
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

export default function PhrasalVerbs() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVerb, setSelectedVerb] = useState<any>(null);
  const [filterType, setFilterType] = useState<"all" | "phrasal" | "collocations">("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const phrasalVerbs = [
    {
      id: 1,
      verb: "Break down",
      type: "phrasal",
      meaning: "يتفكك / يتحلل / يشرح",
      arabicMeaning: "تقسيم شيء إلى أجزاء أصغر",
      examples: [
        "The car broke down on the highway.",
        "Let me break down the problem for you.",
      ],
      difficulty: 1,
      frequency: "عالية جداً",
    },
    {
      id: 2,
      verb: "Bring up",
      type: "phrasal",
      meaning: "يربي / يذكر / يطرح",
      arabicMeaning: "تربية طفل أو طرح موضوع للنقاش",
      examples: [
        "She was brought up in London.",
        "He brought up the issue at the meeting.",
      ],
      difficulty: 1,
      frequency: "عالية جداً",
    },
    {
      id: 3,
      verb: "Carry on",
      type: "phrasal",
      meaning: "يستمر / يواصل",
      arabicMeaning: "الاستمرار في فعل شيء",
      examples: [
        "Carry on with your work.",
        "The show must carry on.",
      ],
      difficulty: 1,
      frequency: "عالية جداً",
    },
    {
      id: 4,
      verb: "Come across",
      type: "phrasal",
      meaning: "يصادف / يواجه",
      arabicMeaning: "الصدفة في مقابلة شيء أو شخص",
      examples: [
        "I came across an old friend yesterday.",
        "This information came across in the news.",
      ],
      difficulty: 2,
      frequency: "عالية",
    },
    {
      id: 5,
      verb: "Strong collocation",
      type: "collocations",
      meaning: "تصرف قوي / إجراء حاسم",
      arabicMeaning: "كلمات تذهب معاً بشكل طبيعي",
      examples: [
        "Take strong action",
        "Make a strong impression",
        "Have a strong influence",
      ],
      difficulty: 2,
      frequency: "عالية",
    },
  ];

  const filteredVerbs = phrasalVerbs.filter((verb) => {
    const matchesSearch =
      verb.verb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verb.arabicMeaning.includes(searchQuery);
    const matchesFilter =
      filterType === "all" || verb.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
              Phrasal Verbs & Collocations 🔗
            </h1>
            <p className="text-muted-foreground mt-2">
              أهم 1000 Phrasal Verb و Collocation مع تمارين تفاعلية
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            العودة
          </Button>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن Phrasal Verb أو Collocation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {[
              { id: "all", label: "الكل" },
              { id: "phrasal", label: "Phrasal Verbs" },
              { id: "collocations", label: "Collocations" },
            ].map((filter) => (
              <Button
                key={filter.id}
                onClick={() =>
                  setFilterType(
                    filter.id as "all" | "phrasal" | "collocations"
                  )
                }
                variant={
                  filterType === filter.id ? "default" : "outline"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Verbs List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-3"
          >
            {filteredVerbs.length > 0 ? (
              filteredVerbs.map((verb) => (
                <motion.div key={verb.id} variants={itemVariants}>
                  <Card
                    className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                      selectedVerb?.id === verb.id
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
                    onClick={() => setSelectedVerb(verb)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">
                            {verb.verb}
                          </h3>
                          <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                            {verb.type === "phrasal"
                              ? "Phrasal Verb"
                              : "Collocation"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {verb.arabicMeaning}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            المستوى: {verb.difficulty}
                          </span>
                          <span>
                            التكرار: {verb.frequency}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  لم يتم العثور على نتائج
                </p>
              </Card>
            )}
          </motion.div>

          {/* Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {selectedVerb ? (
              <Card className="p-6 space-y-6 sticky top-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">
                      {selectedVerb.verb}
                    </h2>
                    <Volume2 className="w-5 h-5 text-primary cursor-pointer hover:text-primary/80" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedVerb.arabicMeaning}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    الأمثلة
                  </h3>
                  <div className="space-y-3">
                    {selectedVerb.examples.map(
                      (example: string, i: number) => (
                        <div
                          key={i}
                          className="p-3 bg-primary/5 rounded-lg text-sm"
                        >
                          <p className="text-foreground mb-2">
                            {example}
                          </p>
                          <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                            <Copy className="w-3 h-3" />
                            نسخ
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold mb-3">معلومات إضافية</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        مستوى الصعوبة
                      </span>
                      <span className="font-medium">
                        {selectedVerb.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        التكرار
                      </span>
                      <span className="font-medium">
                        {selectedVerb.frequency}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Zap className="w-4 h-4 mr-2" />
                  تمرين على هذا
                </Button>
              </Card>
            ) : (
              <Card className="p-6 flex items-center justify-center h-96">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    اختر Phrasal Verb لتبدأ
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
