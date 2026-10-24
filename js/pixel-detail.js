(() => {
  document.querySelectorAll('[data-pixelate-src]').forEach(element => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const buffer = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const bufferContext = buffer.getContext('2d');
    let frame = 0;

    if (!context || !bufferContext) return;

    canvas.className = 'pixel-canvas';
    canvas.setAttribute('aria-hidden', 'true');

    function paint() {
      frame = 0;
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!image.naturalWidth || !width || !height) return;

      try {
        const cropWidth = image.naturalWidth / 3.5;
        const cropHeight = cropWidth * height / width;
        const cropX = (image.naturalWidth - cropWidth) * 0.7;
        const cropY = (image.naturalHeight - cropHeight) * 0.35;
        const ratio = window.devicePixelRatio || 1;

        buffer.width = Math.max(1, Math.ceil(width / 8));
        buffer.height = Math.max(1, Math.ceil(height / 8));
        bufferContext.drawImage(image, cropX, cropY, cropWidth, cropHeight,
          0, 0, buffer.width, buffer.height);

        canvas.width = Math.max(1, Math.round(width * ratio));
        canvas.height = Math.max(1, Math.round(height * ratio));
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, 0, 0, canvas.width, canvas.height);
        if (!canvas.parentNode) element.appendChild(canvas);
        element.classList.add('has-pixels');
      } catch {
        element.classList.remove('has-pixels');
        canvas.remove();
      }
    }

    function schedulePaint() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    image.decoding = 'async';
    image.addEventListener('load', schedulePaint, { once: true });
    image.src = element.dataset.pixelateSrc;

    if ('ResizeObserver' in window) {
      new ResizeObserver(schedulePaint).observe(element);
    }
    window.addEventListener('resize', schedulePaint, { passive: true });
  });
})();
