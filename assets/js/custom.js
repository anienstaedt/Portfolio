document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.style.opacity = "0";

  window.addEventListener("resize", centerLastRow);
  window.addEventListener("orientationchange", centerLastRow);

  setTimeout(function () {
    centerLastRow();
    gallery.style.transition = "opacity 0.3s ease";
    gallery.style.opacity = "1";
  }, 100);

  function centerLastRow() {
    if (document.fullscreenElement) return;

    const items = Array.from(gallery.querySelectorAll(".gallery-item"));
    if (!items.length) return;

    // Reset all items to their original left positions first
    items.forEach(item => {
      const originalLeft = item.getAttribute("data-original-left");
      if (originalLeft !== null) {
        item.style.left = originalLeft + "px";
      }
    });

    const lastTop = Math.max(...items.map(item => parseFloat(item.style.top) || 0));
    const lastRowItems = items.filter(item => (parseFloat(item.style.top) || 0) === lastTop);

    const totalWidth = lastRowItems.reduce((sum, item) => sum + (parseFloat(item.style.width) || 0), 0);
    const containerWidth = gallery.getBoundingClientRect().width;
    const offset = (containerWidth - totalWidth) / 2;

    if (offset > 1) {
      lastRowItems.forEach(item => {
        // Store original left position if not already stored
        if (item.getAttribute("data-original-left") === null) {
          item.setAttribute("data-original-left", parseFloat(item.style.left));
        }
        item.style.left = (parseFloat(item.style.left) + offset) + "px";
      });
    }
  }
});