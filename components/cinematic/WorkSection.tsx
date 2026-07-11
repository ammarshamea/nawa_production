"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, workScene } from "@/lib/content";
import { en } from "@/lib/text";
import { ProjectThumbnail } from "@/components/sections/ProjectThumbnail";

type Project = (typeof projects)[number];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-studio-gold/80">{project.category}</p>
            <h3 className="mt-1 font-display text-2xl text-studio-white md:text-3xl">{project.title}</h3>
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
            src={`https://drive.google.com/file/d/${project.driveId}/preview`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay"
            allowFullScreen
            title={project.title}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorkSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden bg-ink-deep py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-purple-haze opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">{en(workScene.label)}</p>
        <h2 className="mt-4 font-display text-4xl text-studio-white md:text-6xl">{en(workScene.title)}</h2>
        <p className="mt-6 max-w-xl text-sm text-studio-muted">{en(workScene.intro)}</p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setActive(project)}
                className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-black text-left transition-all duration-500 hover:border-studio-gold/40"
                aria-label={`Play ${project.title}`}
              >
                <div className="relative">
                  <ProjectThumbnail driveId={project.driveId} title={project.title} priority={i < 3} />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-studio-gold/50 bg-black/60 text-studio-gold backdrop-blur-sm">
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-3 border border-white/0 transition-colors group-hover:border-studio-gold/30" />
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-studio-gold/70">{project.category}</p>
                  <h3 className="mt-2 font-display text-lg text-studio-white transition-colors group-hover:text-studio-gold md:text-xl">
                    {project.title}
                  </h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active && <VideoModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
