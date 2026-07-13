"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectText, type ProjectItem } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { drivePreviewUrl } from "@/lib/drive";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectThumbnail } from "@/components/sections/ProjectThumbnail";
import { SectionWatermark } from "@/components/SectionWatermark";

type Project = ProjectItem;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
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
  project: Project;
  title: string;
  category: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-deep/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-200/70">
              {category}
            </p>
            <h3 className="mt-1 font-display text-xl text-white sm:text-2xl md:text-3xl">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-gold-300/60 hover:text-gold-200 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth={1.8} fill="none">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-plum">
          <iframe
            src={drivePreviewUrl(project.driveId)}
            className="absolute inset-0 h-full w-full"
            allow="autoplay"
            allowFullScreen
            title={title}
          />
        </div>

        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-white/25">
          Tap outside to close
        </p>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  title,
  category,
}: {
  project: Project;
  index: number;
  title: string;
  category: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative"
    >
      <ProjectThumbnail driveId={project.driveId} title={title} priority={index < 3} />

      <span className="pointer-events-none absolute inset-x-0 top-0 flex aspect-video items-center justify-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-ink-deep/60 text-white backdrop-blur-sm transition-all duration-400 group-hover:scale-110 group-hover:border-gold-300 group-hover:bg-gold-300/20 group-hover:text-gold-100 group-hover:shadow-gold sm:h-14 sm:w-14">
          <PlayIcon />
        </span>
      </span>

      {/* Title / category */}
      <div className="flex flex-col gap-1 p-3 text-left sm:p-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold-200/65 sm:text-[10px]">
          {category}
        </p>
        <h3 className="font-display text-base leading-tight text-white transition-colors duration-300 group-hover:text-gold-100 sm:text-lg">
          {title}
        </h3>
      </div>

      <span className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-300 via-gold-200 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const { locale } = useLanguage();

  return (
    <section id="projects" className="relative overflow-hidden bg-ink-deep py-24 md:py-36 lg:py-44">
      <SectionWatermark position="center" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-plum-700/20 blur-[160px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute right-1/4 top-2/3 h-64 w-64 rounded-full bg-gold-600/10 blur-[120px] sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold-200/80 sm:text-xs">
                Our Work
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Selected
                <br />
                <span className="bg-gold-sheen bg-clip-text italic text-transparent">
                  Projects
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              A selection of campaigns, films, and branded content we are proud to have brought to life.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => {
            const title = projectText(project, locale, "title");
            const category = projectText(project, locale, "category");

            return (
            <motion.li key={project.id}>
              <button
                onClick={() => setActive(project)}
                className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-soft/70 transition-all duration-500 hover:border-gold-300/40 hover:shadow-gold sm:rounded-2xl"
                aria-label={`Play ${title}`}
              >
                <ProjectCard project={project} index={i} title={title} category={category} />
              </button>
            </motion.li>
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
