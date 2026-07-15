const field = document.querySelector<SVGElement>('[data-signal-field]');
const root = document.documentElement;

if (field && root.dataset.motion !== 'reduced') {
  const wrap = field.parentElement;
  let frame = 0;

  const updatePosition = (event: PointerEvent) => {
    if (!wrap) return;
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      wrap.style.setProperty('--signal-x', `${x}px`);
      wrap.style.setProperty('--signal-y', `${y}px`);
    });
  };

  const updateProgress = () => {
    const progress = Math.min(1, 0.72 + window.scrollY / window.innerHeight / 3);
    field.style.setProperty('--signal-progress', `${progress}`);
  };

  window.addEventListener('pointermove', updatePosition, { passive: true });
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
