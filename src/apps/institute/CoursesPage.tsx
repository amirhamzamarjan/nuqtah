import React, { useState, useEffect } from 'react';
import { BookOpen, User, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { store } from '../../lib/store';
import { Course } from '../../types';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>('mod-1');

  useEffect(() => {
    const update = () => {
      setCourses(store.getCourses());
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
            Structured Pathways
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1F1B17]">
            Course Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
            Modular learning pathways in Quranic Arabic, classical epistemology, and sacred ethics.
          </p>
        </div>

        <div className="space-y-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="surface-card bg-[#FDFBF8] rounded-sm p-6 sm:p-10 border border-[#322C26]/10 shadow-sm space-y-8"
            >
              {/* Course Header Banner */}
              <div className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-[#322C26]/10 pb-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center space-x-3 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-[#91713B]/15 text-[#91713B] border border-[#91713B]/30 uppercase tracking-wider font-semibold">
                      {course.status}
                    </span>
                    <span className="text-[#7E7467]">{course.level} Level</span>
                    {course.durationWeeks && (
                      <span className="text-[#7E7467]">• {course.durationWeeks} Weeks</span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F1B17]">{course.title}</h2>
                  <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
                    {course.description}
                  </p>

                  <div className="pt-2 flex items-center space-x-3 text-xs font-mono text-[#7E7467]">
                    <User className="w-4 h-4 text-[#91713B]" />
                    <span>
                      Instructor: <strong className="text-[#1F1B17]">{course.instructorName}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-[#FAF5EC] border border-[#322C26]/10 rounded-sm space-y-3 w-full md:w-64 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#91713B] block font-semibold">
                    Curriculum Status
                  </span>
                  <div className="text-sm font-serif text-[#1F1B17] font-semibold">
                    Architecture & Syllabus Initialized
                  </div>
                  <button
                    onClick={() => alert('Thank you for your interest. Enrollment notifications will be published as session dates open.')}
                    className="w-full py-2.5 bg-[#241F1B] hover:bg-[#352E28] text-[#FAF4EB] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md"
                  >
                    Register Interest
                  </button>
                </div>
              </div>

              {/* Modules & Lesson Architecture */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#544C41] font-semibold">
                  Course Modules & Lesson Plan
                </h4>

                {course.modules.map((mod) => {
                  const isExpanded = expandedModule === mod.id;
                  return (
                    <div
                      key={mod.id}
                      className="border border-[#322C26]/10 rounded-sm bg-[#EFE9DF] overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FAF5EC] transition-colors"
                      >
                        <div>
                          <h5 className="text-sm font-serif font-semibold text-[#1F1B17]">{mod.title}</h5>
                          {mod.description && (
                            <p className="text-xs text-[#544C41] font-light mt-0.5">
                              {mod.description}
                            </p>
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#544C41]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#544C41]" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 space-y-2 border-t border-[#322C26]/10 bg-white">
                          {mod.lessons.map((les) => (
                            <div
                              key={les.id}
                              className="p-3 bg-[#FAF5EC] rounded-sm flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center space-x-3">
                                <BookOpen className="w-4 h-4 text-[#91713B]" />
                                <span className="text-[#1F1B17] font-medium">{les.title}</span>
                              </div>
                              {les.durationMinutes && (
                                <span className="text-[#7E7467] font-mono text-[11px]">
                                  {les.durationMinutes} min
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
