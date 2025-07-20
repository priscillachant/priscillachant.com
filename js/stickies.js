const stickies = document.querySelectorAll('.sticky');

stickies.forEach(sticky => {
  sticky.draggable = false;
  // Random position and rotation
  sticky.addEventListener('load', () => {
    const maxLeft = window.innerWidth - sticky.offsetWidth;
    const maxTop = window.innerHeight - sticky.offsetHeight;
    const randomLeft = Math.floor(Math.random() * (maxLeft + 1));
    const randomTop = Math.floor(Math.random() * (maxTop + 1));
    const randomRotate = (Math.random() * 10) - 5;

    sticky.style.position = 'absolute';
    sticky.style.left = `${randomLeft}px`;
    sticky.style.top = `${randomTop}px`;
    sticky.style.transform = `rotate(${randomRotate}deg)`;
  });

  // For cached images
  if (sticky.complete) {
    sticky.dispatchEvent(new Event('load'));
  }

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  sticky.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - sticky.offsetLeft;
    offsetY = e.clientY - sticky.offsetTop;
    console.log('mousedown:', {
      clientX: e.clientX,
      clientY: e.clientY,
      offsetLeft: sticky.offsetLeft,
      offsetTop: sticky.offsetTop,
      offsetX,
      offsetY
    });
    sticky.style.zIndex = 1000;

    const onMouseMove = (e) => {
      if (isDragging) {
        const newLeft = Math.min(
          Math.max(0, e.clientX - offsetX),
          window.innerWidth - sticky.offsetWidth
        );
        const newTop = Math.min(
          Math.max(0, e.clientY - offsetY),
          window.innerHeight - sticky.offsetHeight
        );
        console.log('mousemove:', {
          clientX: e.clientX,
          clientY: e.clientY,
          newLeft,
          newTop,
          offsetX,
          offsetY
        });
        sticky.style.left = `${newLeft}px`;
        sticky.style.top = `${newTop}px`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      sticky.style.zIndex = 1;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // LIGHTBOX
  sticky.addEventListener('dblclick', () => {
    if (!isDragging) {
      const lightbox = document.querySelector('.lightbox');
      const lightboxImg = lightbox.querySelector('img');
      lightboxImg.src = sticky.src;
      lightbox.style.display = 'flex';
    }
  });
});

// Close lightbox
document.querySelector('.lightbox').addEventListener('click', () => {
  document.querySelector('.lightbox').style.display = 'none';
});

window.addEventListener('resize', () => {
  stickies.forEach(sticky => {
    const left = parseFloat(sticky.style.left) || 0;
    const top = parseFloat(sticky.style.top) || 0;

    const maxLeft = window.innerWidth - sticky.offsetWidth;
    const maxTop = window.innerHeight - sticky.offsetHeight;

    sticky.style.left = `${Math.min(left, maxLeft)}px`;
    sticky.style.top = `${Math.min(top, maxTop)}px`;
  });
});

// Debug font loading
window.addEventListener('load', () => {
  const testEl = document.querySelector('.breadcrumb');
  const computedFont = window.getComputedStyle(testEl).fontFamily;
  console.log('Breadcrumb font family:', computedFont);
})
document.fonts.ready.then(() => {
  document.fonts.forEach(font => {
    console.log(font.family, font.status);
  });
});
;