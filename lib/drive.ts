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

/** High-resolution logo URLs for client marks */
export function driveLogoUrls(driveId: string): string[] {
  return [
    `https://lh3.googleusercontent.com/d/${driveId}=w1920-rw`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1920`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280-h720`,
    `https://drive.google.com/uc?export=view&id=${driveId}`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w800-h600`,
  ];
}

