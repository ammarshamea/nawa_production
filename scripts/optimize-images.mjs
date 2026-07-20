/**
 * Build-time image optimizer for static export.
 * Converts PNG/JPG under public/assets to WebP + AVIF (same dimensions).
 * Skips outputs that are newer than the source (mtime check).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIRS = [
  path.join(ROOT, "public", "assets", "photos"),
  path.join(ROOT, "public", "assets", "brand"),
];

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 55;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (SOURCE_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function needsRebuild(src, dest) {
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dest)]);
    return s.mtimeMs > d.mtimeMs;
  } catch {
    return true;
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeOne(src) {
  const ext = path.extname(src);
  const base = src.slice(0, -ext.length);
  const webpPath = `${base}.webp`;
  const avifPath = `${base}.avif`;

  const srcStat = await fs.stat(src);
  let saved = 0;
  let wrote = false;

  if (await needsRebuild(src, webpPath)) {
    await sharp(src).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    wrote = true;
  }
  if (await needsRebuild(src, avifPath)) {
    await sharp(src).avif({ quality: AVIF_QUALITY }).toFile(avifPath);
    wrote = true;
  }

  const webpStat = await fs.stat(webpPath);
  saved += Math.max(0, srcStat.size - webpStat.size);

  return { src, webpPath, wrote, srcSize: srcStat.size, webpSize: webpStat.size, saved };
}

async function main() {
  console.log("[optimize-images] Scanning…");
  const all = [];
  for (const dir of DIRS) {
    all.push(...(await walk(dir)));
  }

  if (all.length === 0) {
    console.log("[optimize-images] No PNG/JPG sources found.");
    return;
  }

  let totalSrc = 0;
  let totalWebp = 0;
  let converted = 0;

  for (const file of all) {
    const result = await optimizeOne(file);
    totalSrc += result.srcSize;
    totalWebp += result.webpSize;
    if (result.wrote) converted += 1;
    const rel = path.relative(ROOT, result.src);
    console.log(
      `  ${result.wrote ? "✓" : "·"} ${rel}  ${formatBytes(result.srcSize)} → webp ${formatBytes(result.webpSize)}`
    );
  }

  console.log(
    `[optimize-images] Done. ${all.length} sources, ${converted} updated. ` +
      `PNG/JPG ${formatBytes(totalSrc)} → WebP ${formatBytes(totalWebp)} ` +
      `(saved ~${formatBytes(Math.max(0, totalSrc - totalWebp))})`
  );
}

main().catch((err) => {
  console.error("[optimize-images] Failed:", err);
  process.exit(1);
});
