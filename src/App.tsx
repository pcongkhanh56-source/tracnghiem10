import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Award, Clock, ChevronRight, ChevronLeft, CheckCircle, XCircle, Menu, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { mcqQuestions, tfQuestions, saQuestions } from './data';
import { cn } from './lib/utils';

type Screen = 'start' | 'playing' | 'result';
type Part = 'mcq' | 'tf' | 'sa';

interface Answers {
  mcq: Record<number, number>;
  tf: Record<number, Record<number, boolean>>;
  sa: Record<number, string>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentPart, setCurrentPart] = useState<Part>('mcq');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ mcq: {}, tf: {}, sa: {} });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (screen === 'playing') {
      timer = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [screen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    setScreen('playing');
    setAnswers({ mcq: {}, tf: {}, sa: {} });
    setTimeElapsed(0);
    setCurrentPart('mcq');
    setCurrentIndex(0);
  };

  const submitQuiz = () => {
    setScreen('result');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const calculateScore = () => {
    let mcqScore = 0;
    Object.entries(answers.mcq).forEach(([index, answer]) => {
      if (mcqQuestions[Number(index)].correctAnswer === answer) {
        mcqScore += 0.25;
      }
    });

    let tfScore = 0;
    Object.entries(answers.tf).forEach(([qIndex, statementAnswers]) => {
      let correctCount = 0;
      const q = tfQuestions[Number(qIndex)];
      q.statements.forEach((stmt, sIndex) => {
        if (statementAnswers[sIndex] === stmt.isTrue) {
          correctCount++;
        }
      });
      if (correctCount === 1) tfScore += 0.1;
      else if (correctCount === 2) tfScore += 0.25;
      else if (correctCount === 3) tfScore += 0.5;
      else if (correctCount === 4) tfScore += 1.0;
    });

    let saScore = 0;
    Object.entries(answers.sa).forEach(([index, answer]) => {
      if (saQuestions[Number(index)].correctAnswer === answer.trim()) {
        saScore += 0.5;
      }
    });

    const totalRaw = mcqScore + tfScore + saScore;
    const maxRaw = (24 * 0.25) + (4 * 1.0) + (8 * 0.5); // 6 + 4 + 4 = 14
    const scaledScore = (totalRaw / maxRaw) * 10;

    return {
      mcq: mcqScore,
      tf: tfScore,
      sa: saScore,
      totalRaw,
      maxRaw,
      scaledScore
    };
  };

  const handleNext = () => {
    if (currentPart === 'mcq') {
      if (currentIndex < mcqQuestions.length - 1) setCurrentIndex(i => i + 1);
      else { setCurrentPart('tf'); setCurrentIndex(0); }
    } else if (currentPart === 'tf') {
      if (currentIndex < tfQuestions.length - 1) setCurrentIndex(i => i + 1);
      else { setCurrentPart('sa'); setCurrentIndex(0); }
    } else if (currentPart === 'sa') {
      if (currentIndex < saQuestions.length - 1) setCurrentIndex(i => i + 1);
      else submitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentPart === 'sa') {
      if (currentIndex > 0) setCurrentIndex(i => i - 1);
      else { setCurrentPart('tf'); setCurrentIndex(tfQuestions.length - 1); }
    } else if (currentPart === 'tf') {
      if (currentIndex > 0) setCurrentIndex(i => i - 1);
      else { setCurrentPart('mcq'); setCurrentIndex(mcqQuestions.length - 1); }
    } else if (currentPart === 'mcq') {
      if (currentIndex > 0) setCurrentIndex(i => i - 1);
    }
  };

  const isAnswered = (part: Part, index: number) => {
    if (part === 'mcq') return answers.mcq[index] !== undefined;
    if (part === 'tf') return answers.tf[index] !== undefined && Object.keys(answers.tf[index]).length === 4;
    if (part === 'sa') return answers.sa[index] !== undefined && answers.sa[index].trim() !== '';
    return false;
  };

  const renderStart = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl text-center border border-slate-100"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
        <Award className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Ôn Tập Toán 10</h1>
      <p className="text-lg text-slate-600 mb-8">
        Chương 8: Đại số tổ hợp & Chương 9: Phương trình, Bất phương trình bậc hai
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
          <div className="font-semibold text-blue-800 mb-1">Phần 1</div>
          <div className="text-sm text-blue-600">24 câu trắc nghiệm</div>
          <div className="text-xs text-blue-400 mt-2">0.25 điểm / câu</div>
        </div>
        <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
          <div className="font-semibold text-emerald-800 mb-1">Phần 2</div>
          <div className="text-sm text-emerald-600">4 câu đúng/sai</div>
          <div className="text-xs text-emerald-400 mt-2">Tối đa 1.0 điểm / câu</div>
        </div>
        <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100">
          <div className="font-semibold text-purple-800 mb-1">Phần 3</div>
          <div className="text-sm text-purple-600">8 câu trả lời ngắn</div>
          <div className="text-xs text-purple-400 mt-2">0.5 điểm / câu</div>
        </div>
      </div>

      <button 
        onClick={startQuiz}
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5"
      >
        <Play className="w-5 h-5 mr-2 fill-current" />
        Bắt đầu làm bài
      </button>
    </motion.div>
  );

  const renderSidebar = () => (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-4 border-b flex justify-between items-center bg-slate-50">
        <h2 className="font-semibold text-slate-700">Danh sách câu hỏi</h2>
        <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Phần 1: Trắc nghiệm</h3>
          <div className="grid grid-cols-5 gap-2">
            {mcqQuestions.map((_, i) => (
              <button
                key={`mcq-${i}`}
                onClick={() => { setCurrentPart('mcq'); setCurrentIndex(i); setSidebarOpen(false); }}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors",
                  currentPart === 'mcq' && currentIndex === i ? "ring-2 ring-blue-600 ring-offset-2" : "",
                  isAnswered('mcq', i) ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Phần 2: Đúng/Sai</h3>
          <div className="grid grid-cols-5 gap-2">
            {tfQuestions.map((_, i) => (
              <button
                key={`tf-${i}`}
                onClick={() => { setCurrentPart('tf'); setCurrentIndex(i); setSidebarOpen(false); }}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors",
                  currentPart === 'tf' && currentIndex === i ? "ring-2 ring-emerald-600 ring-offset-2" : "",
                  isAnswered('tf', i) ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Phần 3: Trả lời ngắn</h3>
          <div className="grid grid-cols-5 gap-2">
            {saQuestions.map((_, i) => (
              <button
                key={`sa-${i}`}
                onClick={() => { setCurrentPart('sa'); setCurrentIndex(i); setSidebarOpen(false); }}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors",
                  currentPart === 'sa' && currentIndex === i ? "ring-2 ring-purple-600 ring-offset-2" : "",
                  isAnswered('sa', i) ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t bg-slate-50">
        <button
          onClick={submitQuiz}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
        >
          Nộp bài
        </button>
      </div>
    </div>
  );

  const renderPlaying = () => {
    const isLastQuestion = currentPart === 'sa' && currentIndex === saQuestions.length - 1;
    const isFirstQuestion = currentPart === 'mcq' && currentIndex === 0;

    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-medium text-slate-800 hidden sm:block">
              {currentPart === 'mcq' && 'Phần 1: Trắc nghiệm'}
              {currentPart === 'tf' && 'Phần 2: Đúng/Sai'}
              {currentPart === 'sa' && 'Phần 3: Trả lời ngắn'}
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-mono bg-slate-100 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4" />
            {formatTime(timeElapsed)}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPart}-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm">
                  {currentIndex + 1}
                </span>
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {currentPart === 'mcq' && 'Chọn 1 đáp án đúng'}
                  {currentPart === 'tf' && 'Chọn Đúng hoặc Sai cho mỗi ý'}
                  {currentPart === 'sa' && 'Điền đáp án'}
                </span>
              </div>

              {currentPart === 'mcq' && (
                <div>
                  <h2 className="text-xl text-slate-800 mb-8 leading-relaxed font-medium">
                    {mcqQuestions[currentIndex].text}
                  </h2>
                  <div className="space-y-3">
                    {mcqQuestions[currentIndex].options.map((opt, i) => {
                      const isSelected = answers.mcq[currentIndex] === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setAnswers(prev => ({ ...prev, mcq: { ...prev.mcq, [currentIndex]: i } }))}
                          className={cn(
                            "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group",
                            isSelected 
                              ? "border-blue-600 bg-blue-50/50" 
                              : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors shrink-0",
                            isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                          )}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={cn("text-lg", isSelected ? "text-blue-900 font-medium" : "text-slate-700")}>
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentPart === 'tf' && (
                <div>
                  <h2 className="text-xl text-slate-800 mb-8 leading-relaxed font-medium">
                    {tfQuestions[currentIndex].text}
                  </h2>
                  <div className="space-y-4">
                    {tfQuestions[currentIndex].statements.map((stmt, sIndex) => {
                      const currentAnswer = answers.tf[currentIndex]?.[sIndex];
                      return (
                        <div key={sIndex} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                          <div className="flex gap-3">
                            <span className="font-medium text-slate-400">{String.fromCharCode(97 + sIndex)})</span>
                            <span className="text-slate-700">{stmt.text}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setAnswers(prev => ({
                                ...prev,
                                tf: { ...prev.tf, [currentIndex]: { ...(prev.tf[currentIndex] || {}), [sIndex]: true } }
                              }))}
                              className={cn(
                                "px-6 py-2 rounded-lg font-medium transition-colors",
                                currentAnswer === true 
                                  ? "bg-emerald-600 text-white" 
                                  : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50"
                              )}
                            >
                              Đúng
                            </button>
                            <button
                              onClick={() => setAnswers(prev => ({
                                ...prev,
                                tf: { ...prev.tf, [currentIndex]: { ...(prev.tf[currentIndex] || {}), [sIndex]: false } }
                              }))}
                              className={cn(
                                "px-6 py-2 rounded-lg font-medium transition-colors",
                                currentAnswer === false 
                                  ? "bg-rose-600 text-white" 
                                  : "bg-white border border-slate-200 text-slate-600 hover:border-rose-200 hover:bg-rose-50"
                              )}
                            >
                              Sai
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentPart === 'sa' && (
                <div>
                  <h2 className="text-xl text-slate-800 mb-8 leading-relaxed font-medium">
                    {saQuestions[currentIndex].text}
                  </h2>
                  <div className="max-w-md">
                    <input
                      type="text"
                      placeholder="Nhập câu trả lời của bạn..."
                      value={answers.sa[currentIndex] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, sa: { ...prev.sa, [currentIndex]: e.target.value } }))}
                      className="w-full px-5 py-4 text-lg bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Navigation */}
        <footer className="bg-white border-t p-4 sticky bottom-0 z-40">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Câu trước
            </button>
            
            {isLastQuestion ? (
              <button
                onClick={submitQuiz}
                className="inline-flex items-center px-8 py-3 rounded-xl font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-lg"
              >
                Nộp bài
                <Check className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center px-8 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/25"
              >
                Câu tiếp
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </footer>

        {/* Overlay for sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {renderSidebar()}
      </div>
    );
  };

  const renderResult = () => {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100"
          >
            <div className="bg-slate-900 p-8 text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Kết Quả Bài Làm</h1>
              <p className="text-slate-400">Thời gian hoàn thành: {formatTime(timeElapsed)}</p>
              
              <div className="mt-8 flex items-center justify-center">
                <div className="relative">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="88" className="stroke-slate-800" strokeWidth="12" fill="none" />
                    <circle 
                      cx="96" cy="96" r="88" 
                      className={cn(
                        "transition-all duration-1000 ease-out",
                        score.scaledScore >= 8 ? "stroke-emerald-500" : score.scaledScore >= 5 ? "stroke-blue-500" : "stroke-rose-500"
                      )} 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - score.scaledScore / 10)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{score.scaledScore.toFixed(1)}</span>
                    <span className="text-slate-400 mt-1">/ 10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Chi tiết điểm số</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-600">Phần 1: Trắc nghiệm</span>
                  <span className="font-semibold text-slate-900">{score.mcq.toFixed(2)} / 6.0</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-600">Phần 2: Đúng/Sai</span>
                  <span className="font-semibold text-slate-900">{score.tf.toFixed(2)} / 4.0</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-600">Phần 3: Trả lời ngắn</span>
                  <span className="font-semibold text-slate-900">{score.sa.toFixed(2)} / 4.0</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setScreen('start')}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Làm lại bài
                </button>
              </div>
            </div>
          </motion.div>

          {/* Review Answers */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 px-2">Xem lại bài làm</h2>
            
            {/* MCQ Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 px-2">Phần 1: Trắc nghiệm</h3>
              {mcqQuestions.map((q, i) => {
                const userAnswer = answers.mcq[i];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex gap-3 mb-4">
                      <div className="mt-1 shrink-0">
                        {isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <XCircle className="w-6 h-6 text-rose-500" />}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 mb-1">Câu {i + 1}: {q.text}</div>
                        <div className="text-sm text-slate-500">
                          Bạn chọn: {userAnswer !== undefined ? q.options[userAnswer] : 'Chưa trả lời'}
                          {!isCorrect && (
                            <span className="ml-2 text-emerald-600 font-medium">
                              (Đáp án đúng: {q.options[q.correctAnswer]})
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100">
                          <span className="font-semibold">Giải thích: </span>{q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TF Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 px-2">Phần 2: Đúng/Sai</h3>
              {tfQuestions.map((q, i) => {
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="font-medium text-slate-800 mb-4">Câu {i + 1}: {q.text}</div>
                    <div className="space-y-2 pl-4">
                      {q.statements.map((stmt, sIndex) => {
                        const userAnswer = answers.tf[i]?.[sIndex];
                        const isCorrect = userAnswer === stmt.isTrue;
                        return (
                          <div key={sIndex} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="mt-0.5 shrink-0">
                              {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
                            </div>
                            <div>
                              <div className="text-slate-700">{String.fromCharCode(97 + sIndex)}) {stmt.text}</div>
                              <div className="text-sm mt-1">
                                <span className="text-slate-500">Bạn chọn: {userAnswer === true ? 'Đúng' : userAnswer === false ? 'Sai' : 'Chưa trả lời'}</span>
                                {!isCorrect && (
                                  <span className="ml-2 text-emerald-600 font-medium">
                                    (Đáp án đúng: {stmt.isTrue ? 'Đúng' : 'Sai'})
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 text-sm bg-blue-50 text-blue-800 p-2.5 rounded-lg border border-blue-100">
                                <span className="font-semibold">Giải thích: </span>{stmt.explanation}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SA Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 px-2">Phần 3: Trả lời ngắn</h3>
              {saQuestions.map((q, i) => {
                const userAnswer = answers.sa[i]?.trim();
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex gap-3">
                      <div className="mt-1 shrink-0">
                        {isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <XCircle className="w-6 h-6 text-rose-500" />}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 mb-2">Câu {i + 1}: {q.text}</div>
                        <div className="text-sm">
                          <span className="text-slate-500">Bạn trả lời: </span>
                          <span className={cn("font-medium", isCorrect ? "text-emerald-600" : "text-rose-600")}>
                            {userAnswer || 'Chưa trả lời'}
                          </span>
                          {!isCorrect && (
                            <span className="ml-3 text-emerald-600 font-medium">
                              (Đáp án đúng: {q.correctAnswer})
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100">
                          <span className="font-semibold">Giải thích: </span>{q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-slate-900 selection:bg-blue-200">
      {screen === 'start' && renderStart()}
      {screen === 'playing' && renderPlaying()}
      {screen === 'result' && renderResult()}
    </div>
  );
}
