import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowRight, GraduationCap } from 'lucide-react';
import { store } from '../../lib/store';
import { InstituteAyah, InstituteArticle, InstituteTopic, InstituteResource, Course } from '../../types';
import { AyahViewer } from '../../components/arabic/AyahViewer';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { useTheme } from '../../context/ThemeContext';

export const InstituteHomePage: React.FC = () => {
  const { setTheme } = useTheme();
  const [ayat, setAyat] = useState<InstituteAyah[]>([]);
  const [articles, setArticles] = useState<InstituteArticle[]>([]);
  const [topics, setTopics] = useState<InstituteTopic[]>([]);
  const [resources, setResources] = useState<InstituteResource[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setTheme('institute');
    const update = () => {
      setAyat(store.getInstituteAyat());
      setArticles(store.getInstituteArticles());
      setTopics(store.getInstituteTopics());
      setResources(store.getInstituteResources());
      setCourses(store.getCourses());
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  const featuredAyah = ayat.find((a) => a.featured) || ayat[0];
  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] transition-colors duration-300">
      {/* 1. Institute Mid-Tone Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-[#322C26]/10 bg-gradient-to-b from-[#F8F3EA] via-[#EFE9DF] to-[#E4DCCE]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
          <div className="flex justify-center">
            <img
              src="/logo/nuqtah black.jfif"
              alt="Nuqtah Institute"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-sm rounded-sm"
            />
          </div>

          <div className="inline-block px-4 py-1 rounded-full bg-[#FAF5EC] border border-[#91713B]/30 text-xs font-mono text-[#91713B] uppercase tracking-widest font-semibold shadow-sm">
            The Knowledge Sanctuary
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#1F1B17] font-normal tracking-tight">
            Illuminating the Heart & Discerning the Text.
          </h1>

          <p className="text-sm sm:text-base text-[#544C41] font-light max-w-xl mx-auto leading-relaxed">
            A scholarly platform dedicated to Quranic contemplation, intellectual history, and grounded Islamic learning for the contemporary seeker.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/institute/ayat"
              className="px-6 py-3 bg-[#241F1B] text-[#FAF4EB] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#352E28] transition-all shadow-md"
            >
              Explore Quranic Ayat
            </Link>
            <Link
              to="/institute/articles"
              className="px-6 py-3 bg-[#FAF5EC] hover:bg-white text-[#1F1B17] border border-[#322C26]/15 text-xs tracking-widest uppercase rounded-sm transition-all font-semibold shadow-sm"
            >
              Read Research Articles
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Quranic Ayah of the Week */}
      {featuredAyah && (
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
              Tadabbur / Quranic Contemplation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1B17]">
              Featured Sacred Verse
            </h2>
          </div>

          <AyahViewer ayah={featuredAyah} showReflection={true} />
        </section>
      )}

      {/* 3. Knowledge Topics Grid */}
      <section className="py-16 bg-[#E4DCCE] border-y border-[#322C26]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
                Disciplines
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1B17] mt-1">
                Learning Topics
              </h2>
            </div>
            <Link
              to="/institute/topics"
              className="text-xs uppercase tracking-widest text-[#1F1B17] font-bold hover:text-[#91713B] flex items-center space-x-1"
            >
              <span>View All Topics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#91713B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {topics.map((top) => (
              <div
                key={top.id}
                className="surface-card bg-[#FDFBF8] rounded-sm p-6 border border-[#322C26]/10 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#91713B] font-semibold">
                    Topic Area
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-[#1F1B17]">{top.name}</h3>
                  <p className="text-xs text-[#544C41] font-light leading-relaxed">
                    {top.description}
                  </p>
                </div>
                <Link
                  to={`/institute/topics`}
                  className="text-xs uppercase tracking-widest text-[#1F1B17] hover:text-[#91713B] pt-2 font-mono font-bold flex items-center space-x-1"
                >
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3 h-3 text-[#91713B]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Articles & Essays */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end border-b border-[#322C26]/10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
              Publications
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1B17] mt-1">
              Latest Essays & Research
            </h2>
          </div>
          <Link
            to="/institute/articles"
            className="text-xs uppercase tracking-widest text-[#1F1B17] font-bold hover:text-[#91713B] flex items-center space-x-1"
          >
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#91713B]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* 5. Downloadable Study Resources */}
      {resources.length > 0 && (
        <section className="py-16 bg-[#E4DCCE] border-t border-[#322C26]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
                  Study Materials
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1B17] mt-1">
                  Downloadable Guides & Resources
                </h2>
              </div>
              <Link
                to="/institute/resources"
                className="text-xs uppercase tracking-widest text-[#1F1B17] font-bold hover:text-[#91713B] flex items-center space-x-1"
              >
                <span>All Resources</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#91713B]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="surface-card bg-[#FDFBF8] rounded-sm p-6 border border-[#322C26]/10 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-sm bg-[#EAE1D3] border border-[#322C26]/10 flex items-center justify-center text-[#91713B] flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#91713B] font-semibold">
                        {res.fileType} {res.fileSize && `• ${res.fileSize}`}
                      </span>
                      <h4 className="text-base font-serif font-semibold text-[#1F1B17]">{res.title}</h4>
                      <p className="text-xs text-[#544C41] font-light line-clamp-1">
                        {res.description}
                      </p>
                    </div>
                  </div>

                  <a
                    href={res.fileUrl}
                    download
                    className="p-2.5 rounded-sm bg-[#EAE1D3] hover:bg-[#FAF5EC] text-[#1F1B17] border border-[#322C26]/10 transition-colors shadow-sm"
                    title="Download Resource"
                  >
                    <Download className="w-5 h-5 text-[#91713B]" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Future Courses Foundation Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="surface-card bg-[#FDFBF8] rounded-sm p-8 sm:p-14 border border-[#322C26]/10 shadow-sm bg-gradient-to-r from-[#FDFBF8] to-[#FAF5EC] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#91713B] font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Structured Educational Pathways</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1B17] leading-tight">
              Future Course Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
              Nuqtah Institute is developing rigorous modular courses in Quranic Arabic, classical ethics, and sacred epistemology taught by accredited scholars.
            </p>
          </div>

          <Link
            to="/institute/courses"
            className="px-8 py-3.5 bg-[#241F1B] hover:bg-[#352E28] text-[#FAF4EB] font-bold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md whitespace-nowrap"
          >
            Explore Course Curriculum
          </Link>
        </div>
      </section>
    </div>
  );
};
