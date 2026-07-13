"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectText, type ProjectItem } from "@/lib/content";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { drivePreviewUrl } from "@/lib/drive";
import { ProjectThumbnail } from "@/components/sections/ProjectThumbnail";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function VideoModal({
  project,
  title,
  category,
  onClose,
}: {
  project: ProjectItem;
  title: string;
  category: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-studio-gold/80">{category}</p>
            <h3 className="mt-1 font-display text-2xl text-studio-white md:text-3xl">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 hover:border-studio-gold/50 hover:text-studio-gold"
          >
            ✕
          </button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
          <iframe
            src={drivePreviewUrl(project.driveId)}
            className="absolute inset-0 h-full w-full"
            allow="autoplay"
            allowFullScreen
            title={title}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorkSection() {
  const [active, setActive] = useState<ProjectItem | null>(null);
  const { work } = useContent();
  const { locale } = useLanguage();

  return (
    <section id="projects" className="relative overflow-hidden bg-ink-deep py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-purple-haze opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">{work.label}</p>
        <h2 className="mt-4 font-display text-4xl text-studio-white md:text-6xl">{work.title}</h2>
        <p className="mt-6 max-w-xl text-sm text-studio-muted">{work.intro}</p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => {
            const title = projectText(project, locale, "title");
            const category = projectText(project, locale, "category");

            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-black text-start transition-all duration-500 hover:border-studio-gold/40"
                  aria-label={`Play ${title}`}
                >
                  <div className="relative">
                    <ProjectThumbnail driveId={project.driveId} title={title} priority={i < 3} />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-studio-gold/50 bg-black/60 text-studio-gold backdrop-blur-sm">
                        <PlayIcon />
                      </span>
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-studio-gold/70">{category}</p>
                    <h3 className="mt-2 font-display text-lg text-studio-white transition-colors group-hover:text-studio-gold md:text-xl">
                      {title}
                    </h3>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {active && (
          <VideoModal
            project={active}
            title={projectText(active, locale, "title")}
            category={projectText(active, locale, "category")}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
