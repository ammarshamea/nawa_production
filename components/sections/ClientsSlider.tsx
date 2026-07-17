"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { clientsList } from "@/lib/content";
import { driveLogoUrls } from "@/lib/drive";

type ClientRow = (typeof clientsList)[number];

const TARGET_FILL = 0.68;
const MAX_LOGO_SCALE = 1.38;

function ClientLogoImage({ name, driveId }: { name: string; driveId: string }) {
  const sources = driveLogoUrls(driveId);
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const normalizeScale = useCallback((img: HTMLImageElement) => {
    const frame = frameRef.current;
    if (!frame) return;

    const fh = frame.clientHeight;
    const fw = frame.clientWidth;
    const rh = img.offsetHeight;
    const rw = img.offsetWidth;
    if (!fh || !fw || !rh || !rw) return;

    const targetH = fh * TARGET_FILL;
    const targetW = fw * TARGET_FILL;
    const scale = Math.min(Math.max(targetH / rh, targetW / rw, 1), MAX_LOGO_SCALE);
    img.style.setProperty("--logo-scale", scale > 1.01 ? String(scale) : "1");
  }, []);

  if (failed) {
    return (
      <span className="px-2 text-center text-[10px] font-medium leading-tight text-white/40">
        {name}
      </span>
    );
  }

  return (
    <div ref={frameRef} className="nawa-clients-ring-inner">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sources[srcIndex]}
        alt={name}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        draggable={false}
        onLoad={(e) => normalizeScale(e.currentTarget)}
        onError={() => {
          if (srcIndex < sources.length - 1) {
            setSrcIndex((i) => i + 1);
          } else {
            setFailed(true);
          }
        }}
        className="nawa-clients-logo"
      />
    </div>
  );
}

function ClientRing({ client, decorative = false }: { client: ClientRow; decorative?: boolean }) {
  return (
    <div className="nawa-clients-ring" aria-hidden={decorative || undefined}>
      {client.driveId ? (
        <ClientLogoImage name={client.name} driveId={client.driveId} />
      ) : (
        <div className="nawa-clients-ring-inner">
          <span className="px-2 text-center text-[10px] font-medium leading-tight text-white/40">
            {client.name}
          </span>
        </div>
      )}
    </div>
  );
}

export function ClientsMarquee({ reverse = false }: { reverse?: boolean }) {
  const trackItems = useMemo(() => [...clientsList, ...clientsList, ...clientsList], []);

  return (
    <div className="nawa-clients-marquee-wrap" dir="ltr">
      <div className="nawa-clients-edge-fade nawa-clients-edge-fade--left" aria-hidden />
      <div className="nawa-clients-edge-fade nawa-clients-edge-fade--right" aria-hidden />
      <div className="nawa-clients-marquee-viewport">
        <div
          className={`nawa-clients-track ${reverse ? "nawa-clients-track--rev" : "nawa-clients-track--fwd"}`}
          aria-hidden
        >
          {trackItems.map((client, i) => (
            <ClientRing key={`${client.driveId ?? client.name}-${i}`} client={client} decorative />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientsStaticGrid() {
  return (
    <div className="nawa-clients-static-grid">
      {clientsList.map((client) => (
        <ClientRing key={client.driveId ?? client.name} client={client} />
      ))}
    </div>
  );
}
