/** Google Drive file id → thumbnail / stream URLs */

export function drivePreviewUrl(driveId: string) {
  return `https://drive.google.com/file/d/${driveId}/preview`;
}

/** Static poster URLs — Drive-generated frame (usually early in the video) */
export function driveThumbnailUrls(driveId: string): string[] {
  return [
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280-h720`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280`,
    `https://lh3.googleusercontent.com/d/${driveId}=w1280-h720-rw`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w640`,
  ];
}

/** Direct download / stream URLs for off-screen frame capture */
export function driveVideoStreamUrls(driveId: string): string[] {
  return [
    `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${driveId}`,
  ];
}

/** @deprecated Use driveVideoStreamUrls */
export function driveVideoStreamUrl(driveId: string) {
  return driveVideoStreamUrls(driveId)[0];
}
