export function getResizedImage(canvasEl: HTMLCanvasElement, w: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.background = '#ffffff';
    // canvas.width = canvasEl.width;
    // canvas.height = canvasEl.height;
    const aspect = canvasEl.width / canvasEl.height;
    canvas.width = w;
    canvas.height = w * aspect;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(canvasEl, 0, 0, w, w*aspect);
    }
    resolve(canvas.toDataURL('image/png'));
  });
}