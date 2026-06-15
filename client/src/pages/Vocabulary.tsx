import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Volume2,
  Heart,
  CheckCircle2,
  Zap,
  ArrowRight,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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

export default function Vocabulary() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(1);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const utils = trpc.useUtils();

  const wordsQuery = trpc.vocabulary.list.useQuery(
    { difficulty: selectedDifficulty || 1, limit: 20 },
    { enabled: isAuthenticated }
  );

  const updateProgressMutation = trpc.vocabulary.updateProgress.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث التقدم بنجاح");
      utils.vocabulary.userProgress.invalidate();
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const searchQueryResults = trpc.vocabulary.search.useQuery(
    { query: searchQuery, limit: 10 },
    { enabled: isAuthenticated && searchQuery.length > 1 }
  );

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const displayedWords = searchQuery.length > 1 
    ? searchQueryResults.data || [] 
    : wordsQuery.data || [];

  const handlePlayAudio = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord?.word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleLearnWord = (word: any) => {
    setCurrentWord(word);
    setIsFlipped(false);
  };

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
              نظام الكلمات الذكي 📚
            </h1>
            <p className="text-muted-foreground mt-2">
              تعلم أهم 5000 كلمة IELTS مع نطق وأمثلة
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
            >
              العودة
            </Button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن كلمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <Button
                key={level}
                variant={selectedDifficulty === level ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedDifficulty(
                    selectedDifficulty === level ? null : level
                  )
                }
                className="flex-1"
              >
                المستوى {level}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Word Card - Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            {currentWord ? (
              <Card className="p-8 min-h-96 flex flex-col justify-between bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <motion.div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="cursor-pointer perspective"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center space-y-6">
                    {!isFlipped ? (
                      <>
                        <h2 className="text-5xl font-bold text-primary">
                          {currentWord.word}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                          {currentWord.partOfSpeech}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          اضغط لقلب البطاقة
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-4xl font-bold text-secondary">
                          {currentWord.arabicMeaning}
                        </h2>
                        <p className="text-lg text-foreground">
                          {currentWord.englishDefinition}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>

                <div className="flex gap-3 justify-center pt-6">
                  <Button
                    onClick={handlePlayAudio}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    استمع
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary"
                    disabled={updateProgressMutation.isPending}
                    onClick={() => {
                      if (currentWord) {
                        updateProgressMutation.mutate({
                          vocabularyId: currentWord.id,
                          leitnerBox: 1,
                        });
                      }
                    }}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    حفظ
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-8 min-h-96 flex items-center justify-center bg-muted/50">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    اختر كلمة لتبدأ التعلم
                  </p>
                </div>
              </Card>
            )}
          </motion.div>

          {/* Word Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {currentWord && (
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    مثال الاستخدام
                  </h3>
                  <p className="text-sm text-foreground mb-2">
                    {currentWord.exampleSentence}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentWord.exampleSentenceArabic}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold mb-3">المرادفات</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentWord.synonyms?.map((syn: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1"
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold mb-3">التجميعات الشهيرة</h3>
                  <div className="space-y-2">
                    {currentWord.collocations?.map(
                      (coll: string, i: number) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          • {coll}
                        </p>
                      )
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                  disabled={updateProgressMutation.isPending}
                  onClick={() => {
                    if (currentWord) {
                      updateProgressMutation.mutate({
                        vocabularyId: currentWord.id,
                        isLearned: true,
                      });
                    }
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  تم تعلم هذه الكلمة
                </Button>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Words List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold mb-4">الكلمات المتاحة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedWords.map((word: any) => (
              <motion.div key={word.id} variants={itemVariants}>
                <Card
                  className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    currentWord?.id === word.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => handleLearnWord(word)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{word.word}</h3>
                      <p className="text-sm text-muted-foreground">
                        {word.arabicMeaning}
                      </p>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                      المستوى {word.difficultyLevel}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Volume2 className="w-3 h-3" />
                    <span>اضغط للاستماع</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
