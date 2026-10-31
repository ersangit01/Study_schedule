/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Circle,
  Clock, 
  ChevronRight, 
  Award,
  AlertCircle,
  Menu,
  X,
  ClipboardList,
  Zap,
  Search,
  CheckCheck,
  RotateCcw,
  Sparkles,
  Layers,
  ShieldCheck,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { syllabusTopics, schedule, actsAndBylaws, type StudyTopic, type WeeklySchedule } from './data/syllabus';

type ViewMode = 'dashboard' | 'schedule' | 'reference' | 'strategy';

const STORAGE_KEY = 'nea_level8_prep_tasks';

export default function App() {
  const [view, setView] = useState<ViewMode>('dashboard');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roadmapSearch, setRoadmapSearch] = useState('');
  const [paperFilter, setPaperFilter] = useState<'All' | 'Paper I' | 'Paper II'>('All');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
    } catch {
      // ignore storage errors
    }
  }, [completedTasks]);

  const totalTasks = useMemo(() => {
    return schedule.reduce((acc, week) => {
      return acc + week.days.reduce((dAcc, day) => dAcc + day.tasks.length, 0);
    }, 0);
  }, []);

  const completedCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length;
  }, [completedTasks]);

  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const toggleTask = (weekNumber: number, dayIndex: number, taskIndex: number) => {
    const key = `${weekNumber}-${dayIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const markAllInWeek = (weekNumber: number) => {
    const weekData = schedule.find(w => w.week === weekNumber);
    if (!weekData) return;
    
    setCompletedTasks(prev => {
      const next = { ...prev };
      weekData.days.forEach((day, dIdx) => {
        day.tasks.forEach((_, tIdx) => {
          next[`${weekNumber}-${dIdx}-${tIdx}`] = true;
        });
      });
      return next;
    });
  };

  const resetWeek = (weekNumber: number) => {
    const weekData = schedule.find(w => w.week === weekNumber);
    if (!weekData) return;

    setCompletedTasks(prev => {
      const next = { ...prev };
      weekData.days.forEach((day, dIdx) => {
        day.tasks.forEach((_, tIdx) => {
          delete next[`${weekNumber}-${dIdx}-${tIdx}`];
        });
      });
      return next;
    });
  };

  const jumpToPhase = (phaseNum: number) => {
    const targetWeek = (phaseNum - 1) * 3 + 1;
    setSelectedWeek(targetWeek);
    setView('schedule');
    setIsSidebarOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'schedule', label: '12-Week Roadmap', icon: Calendar },
    { id: 'reference', label: 'Acts & Policies', icon: FileText },
    { id: 'strategy', label: 'Exam Strategy', icon: Award },
  ];

  const currentPhase = Math.ceil(selectedWeek / 3);

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header Bar - Professional Polish style */}
      <header className="h-20 bg-slate-900 text-white flex items-center justify-between px-6 lg:px-8 shrink-0 shadow-lg z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-inner text-white">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base lg:text-lg font-bold leading-tight tracking-tight">NEA Level 8 Assistant Manager</h1>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-500/30">Electrical Group</span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">12-Week Intensive Competitive Exam Master Roadmap</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Overall Progress</p>
            <p className="text-sm font-bold text-slate-100">{completedCount} <span className="text-xs font-normal text-slate-400">/ {totalTasks} tasks</span> ({progressPercent}%)</p>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-slate-400 font-medium">Readiness Velocity</span>
              <span className="text-xs font-bold text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-44 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-emerald-500" 
              />
            </div>
          </div>
        </div>

        <button 
          id="btn-sidebar-toggle"
          onClick={() => setIsSidebarOpen(true)} 
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform lg:relative lg:translate-x-0 ${!isSidebarOpen ? 'hidden lg:flex' : 'flex'}`}
            >
              <div className="p-4 lg:hidden flex justify-between items-center border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 px-3 tracking-widest pt-2">Navigation</p>
                {navItems.map(item => (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => { setView(item.id as ViewMode); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-150 text-left ${view === item.id ? 'bg-slate-100 border border-slate-200 text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                  >
                    <item.icon className={`w-4 h-4 ${view === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}

                {/* 4-Phase Curriculum Plan */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between px-3 mb-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">12-Week Phases</p>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">4 Phases</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {[
                      { num: 1, name: 'Governance & Basics', weeks: 'W1 - W3', color: 'emerald' },
                      { num: 2, name: 'Machines & Plants', weeks: 'W4 - W6', color: 'indigo' },
                      { num: 3, name: 'Analysis & Economics', weeks: 'W7 - W9', color: 'amber' },
                      { num: 4, name: 'Law, Reliability & Mocks', weeks: 'W10 - W12', color: 'rose' },
                    ].map(ph => {
                      const isActivePhase = currentPhase === ph.num && view === 'schedule';
                      return (
                        <button
                          key={ph.num}
                          onClick={() => jumpToPhase(ph.num)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${isActivePhase ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-semibold' : 'hover:bg-slate-50 text-slate-600'}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${ph.num === 1 ? 'bg-emerald-100 text-emerald-700' : ph.num === 2 ? 'bg-indigo-100 text-indigo-700' : ph.num === 3 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                              P{ph.num}
                            </span>
                            <span className="text-xs truncate max-w-[110px]">{ph.name}</span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400">{ph.weeks}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>

              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-xs">
                  <div className="flex items-center justify-between font-bold text-slate-700 mb-1">
                    <span>Curriculum Coverage</span>
                    <span className="text-indigo-600">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">84 Daily Action Plans ready</p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <section className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
          <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  {view === 'dashboard' && "Preparation Command Center"}
                  {view === 'schedule' && "12-Week Day-by-Day Study Roadmap"}
                  {view === 'reference' && "Official Legal Acts & Reference Library"}
                  {view === 'strategy' && "Exam Scoring & High-Yield Strategy"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  NEA Level 8 Assistant Manager (Electrical Group) • 200 Marks Comprehensive Syllabus
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-xs font-semibold">
                  Paper I: 100 Marks (3 Hrs)
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                  Paper II: 100 Marks (3 Hrs)
                </span>
              </div>
            </header>

            {view === 'dashboard' && (
              <Dashboard 
                topics={syllabusTopics} 
                progressPercent={progressPercent} 
                completedCount={completedCount}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                onContinue={() => setView('schedule')}
                onSelectWeek={(w) => { setSelectedWeek(w); setView('schedule'); }}
              />
            )}

            {view === 'schedule' && (
              <Roadmap 
                selectedWeek={selectedWeek} 
                setSelectedWeek={setSelectedWeek} 
                toggleTask={toggleTask}
                completedTasks={completedTasks}
                markAllInWeek={markAllInWeek}
                resetWeek={resetWeek}
                roadmapSearch={roadmapSearch}
                setRoadmapSearch={setRoadmapSearch}
                paperFilter={paperFilter}
                setPaperFilter={setPaperFilter}
              />
            )}

            {view === 'reference' && <Reference acts={actsAndBylaws} />}

            {view === 'strategy' && <Strategy />}
          </div>
        </section>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-9 bg-slate-100 border-t border-slate-200 flex items-center justify-between px-6 lg:px-8 text-[11px] text-slate-500 font-medium shrink-0">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Program: <strong className="text-slate-700 font-semibold">NEA Level 8 (Electrical)</strong>
          </span>
          <span className="hidden sm:inline">12 Weeks • 84 Days • 24 Core Modules</span>
        </div>
        <div className="flex gap-4 items-center">
          <span>Active Week: <strong className="text-slate-800">Week {selectedWeek < 10 ? `0${selectedWeek}` : selectedWeek}</strong></span>
          <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-semibold text-[10px]">2026 EDITION</span>
        </div>
      </footer>
    </div>
  );
}

function Dashboard({ 
  topics, 
  progressPercent, 
  completedCount, 
  totalTasks,
  completedTasks,
  onContinue,
  onSelectWeek
}: { 
  topics: Record<string, StudyTopic>; 
  progressPercent: number;
  completedCount: number;
  totalTasks: number;
  completedTasks: Record<string, boolean>;
  onContinue: () => void;
  onSelectWeek: (w: number) => void;
}) {
  const highImportance = Object.values(topics).filter(t => t.importance === 'High').length;
  
  // Calculate Paper I vs Paper II task completion
  const paperStats = useMemo(() => {
    let p1Total = 0;
    let p1Done = 0;
    let p2Total = 0;
    let p2Done = 0;

    schedule.forEach(w => {
      w.days.forEach((d, dIdx) => {
        const topic = topics[d.topicId];
        const isP1 = topic?.source === 'Paper I' || (!topic && d.day <= 21);
        d.tasks.forEach((_, tIdx) => {
          const isDone = Boolean(completedTasks[`${w.week}-${dIdx}-${tIdx}`]);
          if (isP1) {
            p1Total++;
            if (isDone) p1Done++;
          } else {
            p2Total++;
            if (isDone) p2Done++;
          }
        });
      });
    });

    return {
      p1Total,
      p1Done,
      p1Percent: p1Total > 0 ? Math.round((p1Done / p1Total) * 100) : 0,
      p2Total,
      p2Done,
      p2Percent: p2Total > 0 ? Math.round((p2Done / p2Total) * 100) : 0,
    };
  }, [topics, completedTasks]);

  return (
    <div className="space-y-8">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Curriculum Breadth</span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{Object.keys(topics).length} <span className="text-xs font-normal text-slate-400">Modules</span></div>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">84 Daily structured lesson plans</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-red-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">High Weightage Focus</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-3xl font-extrabold text-red-600 tracking-tight">{highImportance} <span className="text-xs font-normal text-slate-400">Critical Topics</span></div>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Direct scoring topics in Paper I & II</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 tracking-tight">{completedCount} <span className="text-xs font-normal text-slate-400">/ {totalTasks}</span></div>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">{totalTasks - completedCount} tasks remaining</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Readiness Score</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{progressPercent}%</div>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">12-Week target velocity</p>
        </div>
      </div>

      {/* Continue Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 lg:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold tracking-wide border border-indigo-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            12-Week Comprehensive Roadmap Ready
          </div>
          <h3 className="text-xl lg:text-2xl font-bold tracking-tight">Master all 84 days of NEA Level 8 Syllabus</h3>
          <p className="text-slate-300 text-xs lg:text-sm max-w-2xl font-normal leading-relaxed">
            Covers Governance, Project Management, Public Procurement, Electrical Machines, Hydro Turbines, Fault Analysis, High Voltage, Engineering Economics, Reliability, Nepali Acts & Bilateral Water Treaties.
          </p>
        </div>
        <button 
          onClick={onContinue}
          className="shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 justify-center"
        >
          <span>Open 12-Week Roadmap</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Paper Breakdown Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-indigo-600" />
              Paper I: Governance, Management & Law
            </h3>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {paperStats.p1Done} / {paperStats.p1Total} done ({paperStats.p1Percent}%)
            </span>
          </div>
          <div className="p-6 space-y-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${paperStats.p1Percent}%` }} />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-xs">
                <div>
                  <div className="font-bold text-slate-800">Section A (50 Marks)</div>
                  <div className="text-slate-500 text-[11px]">Governance, Admin, Ethics, Project Management</div>
                </div>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 font-bold rounded text-[10px]">WEEKS 1 - 3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-xs">
                <div>
                  <div className="font-bold text-slate-800">Section B (50 Marks)</div>
                  <div className="text-slate-500 text-[11px]">Nepali Constitution, Acts, Bylaws, Power Sector Trends</div>
                </div>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 font-bold rounded text-[10px]">WEEKS 11 - 12</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Paper II: Electrical Engineering Knowledge
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              {paperStats.p2Done} / {paperStats.p2Total} done ({paperStats.p2Percent}%)
            </span>
          </div>
          <div className="p-6 space-y-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${paperStats.p2Percent}%` }} />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-xs">
                <div>
                  <div className="font-bold text-slate-800">Section A (50 Marks)</div>
                  <div className="text-slate-500 text-[11px]">Machines, Power Plants, T&D Lines, Fault Analysis</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px]">WEEKS 3 - 8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-xs">
                <div>
                  <div className="font-bold text-slate-800">Section B (50 Marks)</div>
                  <div className="text-slate-500 text-[11px]">High Voltage, Economics, Reliability, Contracts & Treaties</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px]">WEEKS 8 - 11</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Week Grid Fast Access */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            12-Week Schedule Navigation Matrix
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click any week to view daily plan</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {schedule.map(w => {
            const weekTasks = w.days.reduce((a, d) => a + d.tasks.length, 0);
            let weekDone = 0;
            w.days.forEach((d, dIdx) => {
              d.tasks.forEach((_, tIdx) => {
                if (completedTasks[`${w.week}-${dIdx}-${tIdx}`]) weekDone++;
              });
            });
            const isCompleted = weekDone === weekTasks && weekTasks > 0;
            const weekPercent = weekTasks > 0 ? Math.round((weekDone / weekTasks) * 100) : 0;

            return (
              <button
                key={w.week}
                onClick={() => onSelectWeek(w.week)}
                className={`p-3.5 rounded-xl border text-left transition-all hover:shadow-sm ${isCompleted ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50/50 border-slate-200 hover:border-indigo-300'}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">Week {w.week < 10 ? `0${w.week}` : w.week}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">{weekPercent}%</span>
                  )}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 truncate">{w.title}</div>
                <div className="mt-2 w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`} style={{ width: `${weekPercent}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Roadmap({ 
  selectedWeek, 
  setSelectedWeek, 
  toggleTask, 
  completedTasks,
  markAllInWeek,
  resetWeek,
  roadmapSearch,
  setRoadmapSearch,
  paperFilter,
  setPaperFilter
}: { 
  selectedWeek: number; 
  setSelectedWeek: (w: number) => void;
  toggleTask: (wI: number, dI: number, tI: number) => void;
  completedTasks: Record<string, boolean>;
  markAllInWeek: (w: number) => void;
  resetWeek: (w: number) => void;
  roadmapSearch: string;
  setRoadmapSearch: (s: string) => void;
  paperFilter: 'All' | 'Paper I' | 'Paper II';
  setPaperFilter: (f: 'All' | 'Paper I' | 'Paper II') => void;
}) {
  const currentWeekData = schedule.find(w => w.week === selectedWeek) || schedule[0];

  const weekTasksTotal = useMemo(() => {
    return currentWeekData.days.reduce((acc, d) => acc + d.tasks.length, 0);
  }, [currentWeekData]);

  const weekTasksDone = useMemo(() => {
    let count = 0;
    currentWeekData.days.forEach((d, dIdx) => {
      d.tasks.forEach((_, tIdx) => {
        if (completedTasks[`${selectedWeek}-${dIdx}-${tIdx}`]) count++;
      });
    });
    return count;
  }, [currentWeekData, selectedWeek, completedTasks]);

  const weekPercent = weekTasksTotal > 0 ? Math.round((weekTasksDone / weekTasksTotal) * 100) : 0;

  // Filter days based on search and paper filter
  const filteredDays = useMemo(() => {
    return currentWeekData.days.filter(d => {
      const topic = syllabusTopics[d.topicId];
      if (paperFilter !== 'All') {
        if (paperFilter === 'Paper I' && topic?.source !== 'Paper I') return false;
        if (paperFilter === 'Paper II' && topic?.source !== 'Paper II') return false;
      }
      if (roadmapSearch.trim()) {
        const query = roadmapSearch.toLowerCase();
        const matchesTopic = topic?.title.toLowerCase().includes(query) || topic?.description.toLowerCase().includes(query);
        const matchesTasks = d.tasks.some(t => t.toLowerCase().includes(query));
        return matchesTopic || matchesTasks;
      }
      return true;
    });
  }, [currentWeekData, roadmapSearch, paperFilter]);

  return (
    <div className="space-y-6">
      {/* Week Selector Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Phase {currentWeekData.phase}:</span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {currentWeekData.phaseName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search topics or tasks..."
                value={roadmapSearch}
                onChange={(e) => setRoadmapSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 sm:w-56"
              />
              {roadmapSearch && (
                <button onClick={() => setRoadmapSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              {(['All', 'Paper I', 'Paper II'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPaperFilter(p)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${paperFilter === p ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 12 Week Buttons Scroll Container */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {schedule.map(w => {
            const isSelected = selectedWeek === w.week;
            let countDone = 0;
            let countTotal = 0;
            w.days.forEach((d, dIdx) => {
              countTotal += d.tasks.length;
              d.tasks.forEach((_, tIdx) => {
                if (completedTasks[`${w.week}-${dIdx}-${tIdx}`]) countDone++;
              });
            });
            const isWeekFullyDone = countDone === countTotal && countTotal > 0;

            return (
              <button
                key={w.week}
                onClick={() => setSelectedWeek(w.week)}
                className={`shrink-0 px-3.5 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${isSelected ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/30' : isWeekFullyDone ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'}`}
              >
                <span>WK {w.week < 10 ? `0${w.week}` : w.week}</span>
                {isWeekFullyDone && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Week Header & Overview */}
      <motion.div
        key={selectedWeek}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden"
      >
        <div className="p-6 bg-slate-50/80 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded uppercase tracking-wider">
                  Week {selectedWeek < 10 ? `0${selectedWeek}` : selectedWeek} of 12
                </span>
                <span className="text-xs text-slate-400 font-medium">• 7-Day Plan (Day {(selectedWeek - 1) * 7 + 1} to Day {selectedWeek * 7})</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                {currentWeekData.title}
              </h3>
              <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
                {currentWeekData.focus}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-700">{weekTasksDone} / {weekTasksTotal} Done</div>
                  <div className="text-[10px] text-slate-400 font-medium">{weekPercent}% Week Complete</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                  <span className="text-[11px] font-extrabold text-slate-800">{weekPercent}%</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => markAllInWeek(selectedWeek)}
                  title="Mark all tasks in this week as completed"
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Mark All</span>
                </button>
                <button
                  onClick={() => resetWeek(selectedWeek)}
                  title="Reset week progress"
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="p-6 lg:p-8 space-y-8">
          {filteredDays.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">No days matched your search filter in Week {selectedWeek}.</p>
              <button 
                onClick={() => { setRoadmapSearch(''); setPaperFilter('All'); }}
                className="mt-2 text-xs text-indigo-600 font-bold hover:underline"
              >
                Clear search filters
              </button>
            </div>
          ) : (
            filteredDays.map((day, dIdx) => {
              const topic = syllabusTopics[day.topicId];
              const dayTasksTotal = day.tasks.length;
              let dayDoneCount = 0;
              day.tasks.forEach((_, tIdx) => {
                if (completedTasks[`${selectedWeek}-${dIdx}-${tIdx}`]) dayDoneCount++;
              });
              const isDayComplete = dayDoneCount === dayTasksTotal && dayTasksTotal > 0;

              return (
                <div key={day.day} className="flex gap-4 lg:gap-6 group">
                  {/* Day Indicator Badge */}
                  <div className="w-14 lg:w-16 shrink-0 flex flex-col items-center pt-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider leading-none">DAY</span>
                    <span className={`text-2xl font-black mt-0.5 tracking-tight transition-colors ${isDayComplete ? 'text-emerald-600' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                      {day.day < 10 ? `0${day.day}` : day.day}
                    </span>
                    {isDayComplete && (
                      <span className="mt-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                        DONE
                      </span>
                    )}
                  </div>

                  {/* Day Content Timeline Box */}
                  <div className="flex-1 pb-8 border-l-2 border-slate-100 pl-5 lg:pl-6 relative last:pb-0">
                    <div className={`absolute top-2 -left-[9px] w-4 h-4 bg-white border-2 rounded-full transition-colors ${isDayComplete ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 group-hover:border-indigo-500'}`} />
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-base lg:text-lg text-slate-900">
                          {topic?.title || (day.day % 7 === 0 ? 'Weekly Review & Numerical Mock Practice' : 'Consolidation & Assessment')}
                        </h4>
                        {topic && (
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded tracking-wider ${topic.source === 'Paper I' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                            {topic.source} • Sec {topic.section}
                          </span>
                        )}
                        {topic?.importance === 'High' && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-red-50 text-red-600 border border-red-100 rounded">
                            High Yield
                          </span>
                        )}
                      </div>
                      {topic && (
                        <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                          {topic.description}
                        </p>
                      )}
                    </div>

                    {/* Task Checkboxes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {day.tasks.map((task, tIdx) => {
                        const taskId = `${selectedWeek}-${dIdx}-${tIdx}`;
                        const isDone = Boolean(completedTasks[taskId]);

                        return (
                          <div
                            key={tIdx}
                            onClick={() => toggleTask(selectedWeek, dIdx, tIdx)}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none group/task ${isDone ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs text-slate-800'}`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 border-slate-300 group-hover/task:border-indigo-500'}`}>
                              {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 text-transparent" />}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className={`text-xs lg:text-sm font-medium leading-snug ${isDone ? 'line-through opacity-70 text-emerald-900' : 'text-slate-800'}`}>
                                {task}
                              </p>
                              <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 block ${isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {isDone ? 'Goal Completed' : 'Action Item'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Reference({ acts }: { acts: typeof actsAndBylaws }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Acts' | 'Bylaws' | 'Policies & Treaties'>('All');

  const filteredActs = useMemo(() => {
    return acts.filter(act => {
      if (selectedCategory === 'Acts' && !act.title.includes('Act')) return false;
      if (selectedCategory === 'Bylaws' && !act.title.includes('Bylaws') && !act.title.includes('Rules')) return false;
      if (selectedCategory === 'Policies & Treaties' && !act.title.includes('Policy') && !act.title.includes('Treaty') && !act.title.includes('FIDIC')) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return act.title.toLowerCase().includes(q) || act.role.toLowerCase().includes(q) || act.section.toLowerCase().includes(q);
      }
      return true;
    });
  }, [acts, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/20 px-2.5 py-1 rounded border border-indigo-400/20">
            Paper I & II Legal Repository
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold mt-3 mb-2 tracking-tight">Essential Acts, Bylaws & Treaties</h2>
          <p className="opacity-80 text-xs lg:text-sm font-normal leading-relaxed">
            Consolidated collection of Nepal Electricity Authority Acts, Civil Service regulations, Procurement rules, Environment laws and Bilateral River treaties for Level 8 scoring.
          </p>
        </div>
        <FileText className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-5 rotate-12 pointer-events-none" />
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex gap-1.5 flex-wrap">
          {(['All', 'Acts', 'Bylaws', 'Policies & Treaties'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search act by title or clause..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Acts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActs.map(act => (
          <div 
            key={act.id} 
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{act.title}</h4>
                <span className="shrink-0 text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {act.section}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{act.role}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mandatory Syllabus Doc</span>
              <span className="text-indigo-600 font-semibold flex items-center gap-1 text-[11px]">
                High-Yield Scope
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Strategy() {
  const tips = [
    { title: 'Question Pattern & Structure', content: 'In Paper I, structure answers with Point-wise definitions, Constitutional basis, NEA organizational role, and realistic implementation challenges.', status: 'PAPER I CRITICAL', color: 'indigo' },
    { title: 'Numericals & Circuit Schematics', content: 'In Paper II Section B, numericals on fault calculation, load flow, and engineering economics (IRR/NPV) carry full marks. Always draw clear Single Line Diagrams.', status: 'PAPER II CRITICAL', color: 'emerald' },
    { title: 'Strict Time Allocation Rule', content: '100 Marks in 180 Minutes gives exactly 1.8 mins per mark. For 5-mark short questions, limit to 8 mins (1 page). For 10-mark long questions, limit to 17 mins.', status: 'TIME DISCIPLINE', color: 'amber' },
  ];

  return (
    <div className="space-y-8">
      {/* 3 Strategy Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className={`h-1.5 w-full ${idx === 0 ? 'bg-indigo-600' : idx === 1 ? 'bg-emerald-600' : 'bg-amber-500'}`} />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${idx === 0 ? 'bg-indigo-100 text-indigo-800' : idx === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {tip.status}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2.5">{tip.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">{tip.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Examination Blueprint */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            NEA Level 8 Assistant Manager Examination Blueprint
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Written Examination Scheme (2 Papers • 200 Marks Total)</p>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Paper I */}
          <div className="space-y-5 lg:pr-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Paper I</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">Governance, Management & Law</h4>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">100 Marks • 3 Hrs</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                  <span>Section A: Governance & Management</span>
                  <span className="text-indigo-600">50 Marks</span>
                </div>
                <p className="text-[11px] text-slate-500">4 Short Questions (4x5M = 20M) + 3 Long Questions (3x10M = 30M)</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                  <span>Section B: Acts, Policies & Power Sector</span>
                  <span className="text-indigo-600">50 Marks</span>
                </div>
                <p className="text-[11px] text-slate-500">4 Short Questions (4x5M = 20M) + 3 Long Questions (3x10M = 30M)</p>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 font-medium">
              💡 <strong>Paper I Pro-Tip:</strong> Cite exact Section numbers of the NEA Act 2041, Electricity Act 2049, and Public Procurement Act 2063 for maximum examiner credit.
            </div>
          </div>

          {/* Paper II */}
          <div className="space-y-5 pt-6 lg:pt-0 lg:pl-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Paper II</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">Electrical Engineering Knowledge</h4>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">100 Marks • 3 Hrs</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                  <span>Section A: Electrical Hardware & Analysis</span>
                  <span className="text-emerald-600">50 Marks</span>
                </div>
                <p className="text-[11px] text-slate-500">Circuits, Machines, Hydro Turbines, Transmission, Faults & Stability</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                  <span>Section B: HV, Economics & Reliability</span>
                  <span className="text-emerald-600">50 Marks</span>
                </div>
                <p className="text-[11px] text-slate-500">High Voltage, Engineering Economics, Reliability, FIDIC Contracts & Treaties</p>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-medium">
              ⚡ <strong>Paper II Pro-Tip:</strong> Solve load flow (N-R), fault analysis (symmetrical components), and IRR/NPV project feasibility numericals with step-by-step units.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
