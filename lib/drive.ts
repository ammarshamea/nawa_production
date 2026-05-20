/** Google Drive file id → thumbnail / stream URLs */

export function drivePreviewUrl(driveId: string) {
  return `https://drive.google.com/file/d/${driveId}/preview`;
}

/** Thumbnail from Drive (frame from video — usually early in the timeline) */
export function driveThumbnailUrls(driveId: string): string[] {
  return [
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280-h720`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280`,
    `https://lh3.googleusercontent.com/d/${driveId}=w1280-h720-rw`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w640`,
  ];
}

/** Proxied through our API (avoids hotlink / CORS issues in the browser) */
export function driveThumbnailProxyUrl(driveId: string) {
  return `/api/drive-thumbnail?id=${encodeURIComponent(driveId)}`;
}

/** Direct download / stream URL (works when file is link-shared) */
export function driveVideoStreamUrl(driveId: string) {
  return `https://drive.google.com/uc?export=download&id=${driveId}`;
}
