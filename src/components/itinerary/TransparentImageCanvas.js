"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TransparentImageCanvas
 * Renders an image on an HTML5 canvas and removes any added
 * opaque background (solid black or solid white) while preserving
 * transparency, interior details, and smooth anti-aliased edges.
 */
export default function TransparentImageCanvas({
  src,
  alt = "",
  className = "",
  style = {},
  fill = false,
}) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!src) return;

    let isMounted = true;
    setIsLoaded(false);
    setLoadError(false);

    const imageUrl = typeof src === "string" ? src : src?.url;
    if (!imageUrl) return;

    const processImage = (img) => {
      const canvas = canvasRef.current;
      if (!canvas || !isMounted) return;

      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // 1. Maintain transparency & draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Check 4 corner pixels to determine background type
        const corners = [
          0, // Top-Left
          (w - 1) * 4, // Top-Right
          (h - 1) * w * 4, // Bottom-Left
          ((h - 1) * w + (w - 1)) * 4, // Bottom-Right
        ];

        // Helper to trim transparent borders tightly around the image content
        const trimTransparentBorders = (pixelData, curW, curH) => {
          let minX = curW, minY = curH, maxX = 0, maxY = 0;
          let hasVisible = false;
          for (let y = 0; y < curH; y++) {
            for (let x = 0; x < curW; x++) {
              if (pixelData[(y * curW + x) * 4 + 3] > 10) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
                hasVisible = true;
              }
            }
          }

          if (hasVisible && (minY > 1 || minX > 1 || maxY < curH - 2 || maxX < curW - 2)) {
            const pad = 4;
            const cropX = Math.max(0, minX - pad);
            const cropY = Math.max(0, minY - pad);
            const cropMaxX = Math.min(curW - 1, maxX + pad);
            const cropMaxY = Math.min(curH - 1, maxY + pad);
            const cropW = cropMaxX - cropX + 1;
            const cropH = cropMaxY - cropY + 1;

            const croppedData = ctx.getImageData(cropX, cropY, cropW, cropH);
            canvas.width = cropW;
            canvas.height = cropH;
            ctx.putImageData(croppedData, 0, 0);
          }
        };

        // If all 4 corners are already transparent, trim any empty boundary and finish
        const alreadyTransparent = corners.every((c) => data[c + 3] < 15);
        if (alreadyTransparent) {
          trimTransparentBorders(data, w, h);
          if (isMounted) setIsLoaded(true);
          return;
        }

        // Calculate average corner RGB
        let avgR = 0, avgG = 0, avgB = 0;
        corners.forEach((c) => {
          avgR += data[c];
          avgG += data[c + 1];
          avgB += data[c + 2];
        });
        avgR /= corners.length;
        avgG /= corners.length;
        avgB /= corners.length;

        const isDarkBg = Math.max(avgR, avgG, avgB) < 60;
        const isLightBg = Math.min(avgR, avgG, avgB) > 195;

        if (isDarkBg || isLightBg) {
          // BFS Flood-fill from borders to clear external background
          const visited = new Uint8Array(w * h);
          const queue = new Int32Array(w * h);
          let head = 0;
          let tail = 0;

          const DARK_THRESHOLD = 50;
          const PURE_DARK_THRESHOLD = 25;
          const LIGHT_THRESHOLD = 200;
          const PURE_LIGHT_THRESHOLD = 235;

          const isBackgroundPixel = (x, y) => {
            const idx = (y * w + x) * 4;
            const a = data[idx + 3];
            if (a < 10) return false;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            if (isDarkBg) {
              return Math.max(r, g, b) <= DARK_THRESHOLD;
            } else if (isLightBg) {
              return Math.min(r, g, b) >= LIGHT_THRESHOLD;
            }
            return false;
          };

          const enqueue = (x, y) => {
            const pixelIndex = y * w + x;
            if (!visited[pixelIndex] && isBackgroundPixel(x, y)) {
              visited[pixelIndex] = 1;
              queue[tail++] = pixelIndex;
            }
          };

          // Seed queue from all 4 boundaries (top, bottom, left, right)
          for (let x = 0; x < w; x++) {
            enqueue(x, 0);
            enqueue(x, h - 1);
          }
          for (let y = 0; y < h; y++) {
            enqueue(0, y);
            enqueue(w - 1, y);
          }

          // Run BFS flood fill
          while (head < tail) {
            const curr = queue[head++];
            const cx = curr % w;
            const cy = (curr / w) | 0;

            const p = curr * 4;
            if (isDarkBg) {
              const maxVal = Math.max(data[p], data[p + 1], data[p + 2]);
              if (maxVal <= PURE_DARK_THRESHOLD) {
                data[p + 3] = 0; // 100% transparent
              } else {
                // Soft feathering at border edges for smooth anti-aliased look
                const ratio = (maxVal - PURE_DARK_THRESHOLD) / (DARK_THRESHOLD - PURE_DARK_THRESHOLD);
                data[p + 3] = Math.round(data[p + 3] * ratio);
              }
            } else if (isLightBg) {
              const minVal = Math.min(data[p], data[p + 1], data[p + 2]);
              if (minVal >= PURE_LIGHT_THRESHOLD) {
                data[p + 3] = 0;
              } else {
                const ratio = (PURE_LIGHT_THRESHOLD - minVal) / (PURE_LIGHT_THRESHOLD - LIGHT_THRESHOLD);
                data[p + 3] = Math.round(data[p + 3] * ratio);
              }
            }

            // 4-way connectivity
            if (cx > 0) enqueue(cx - 1, cy);
            if (cx < w - 1) enqueue(cx + 1, cy);
            if (cy > 0) enqueue(cx, cy - 1);
            if (cy < h - 1) enqueue(cx, cy + 1);
          }

          // Write back processed pixels to canvas
          ctx.putImageData(imgData, 0, 0);

          // Tightly trim transparent margins to eliminate top and bottom gaps
          trimTransparentBorders(imgData.data, w, h);
        }

        if (isMounted) setIsLoaded(true);
      } catch (err) {
        console.warn("Canvas getImageData tainted/failed, attempting proxy fallback:", err);
        throw err;
      }
    };

    // Attempt direct load first
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        processImage(img);
      } catch {
        loadViaProxy(imageUrl);
      }
    };

    img.onerror = () => {
      loadViaProxy(imageUrl);
    };

    img.src = imageUrl;

    const loadViaProxy = (targetUrl) => {
      if (targetUrl.startsWith("/") || targetUrl.startsWith("data:")) {
        if (isMounted) setLoadError(true);
        return;
      }

      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`;
      const proxyImg = new window.Image();
      proxyImg.onload = () => {
        try {
          processImage(proxyImg);
        } catch {
          if (isMounted) setLoadError(true);
        }
      };
      proxyImg.onerror = () => {
        if (isMounted) setLoadError(true);
      };
      proxyImg.src = proxyUrl;
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  const containerStyle = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : { position: "relative", width: "100%", ...style };

  return (
    <div className="flex items-center justify-center pointer-events-none" style={containerStyle}>
      <canvas
        ref={canvasRef}
        className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={
          fill
            ? { width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%" }
            : { width: "100%", height: "auto", maxWidth: "100%" }
        }
        role="img"
        aria-label={alt}
      />

      {loadError && (
        <img
          src={typeof src === "string" ? src : src?.url}
          alt={alt}
          className={`${className} ${fill ? "w-full h-full" : ""}`}
        />
      )}
    </div>
  );
}
