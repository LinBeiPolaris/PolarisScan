// content/ui/draggable.js
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  const onMouseDown = (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;

      newLeft = Math.max(0, Math.min(newLeft, windowWidth - elementWidth));
      newTop = Math.max(0, Math.min(newTop, windowHeight - elementHeight));

      element.style.left = newLeft + 'px';
      element.style.top = newTop + 'px';
    }
  };

  const onMouseUp = () => (isDragging = false);

  element.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  return () => {
    element.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
}