// content/ui/bubble.js
function createBubbleControl(controlPanel) {
  const bubble = document.createElement('div');
  bubble.id = 'bubble-control';
  bubble.textContent = '+';

  let isOpen = false;
  bubble.addEventListener('mouseover', () => bubble.style.transform = 'scale(1.1)');
  bubble.addEventListener('mouseout', () => bubble.style.transform = 'scale(1)');
  bubble.addEventListener('click', () => {
    isOpen = !isOpen;
    controlPanel.style.display = isOpen ? 'block' : 'none';
    bubble.textContent = isOpen ? '关' : '+';
  });

  makeDraggable(bubble);
  document.body.appendChild(bubble);
}