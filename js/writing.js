const writings = [
  {
    title: "Spider",
    pages: ["../assets/images/writing-pages/spider-page.png"],
    transcripts: ["The stillness of life revealed the movement of death.<br>The ruins of my home laid the foundation of a cemetery.<br>A cemetery that no one visits.<br><br>Everything I know in life is being tested at every second.<br>Come to me…come to me. I have prepared my home for you.<br>Dance with me in the stars if you so long to be twirled within the night.<br>Only the shadows will know the truth.<br><br>Once you are devoured by my arms, subject to the engulfing of my web.<br>Strings of sadism produce a cocoon of desire.<br>But will it ever end?<br>String or desire, both are finite in my infinite life."]
  },
  {
    title: "Reflection of Revival",
    pages: ["../assets/images/writing-pages/ROR-pg-1.png", "../assets/images/writing-pages/ROR-pg-2.png"],
    transcripts: ["This story is about a girl who dreamed. A girl who dreamed for so long that she forgot how to live. Life, both inane and innumerable, has the ability to create you and destroy. You watch as your expectations become dismantled and dismembered by the insatiable dogs of reality. But we are what we are and all beings must live.\n\nLife begins with a cry… and then we cry less, and less, and less until we are able to hide it from the judges. I was 14 when I learned how to stop my tears. Crying is a lot like shivering. Once it stops, you only have a few moments before the worst becomes true. I would enter this hypothermic state frequently and with the resignation of the already dead.\n\nBut what does death feel like?\n\nDeath is like a slow motion car crash with Dies Irae playing on the radio. Grand and tragic. Your book lands on the final chapter. The last page. The rolling credits. But unlike a movie, life is not rewindable. It is understood backwards, but we must live it forwards.\n\nSecond chances only come to those who believe in them… and so… here I am…\n\nI washed away my trauma like a dirty plate left in the sink by the indolent roommate. Trauma changes you, but you go back to your room and everything’s exactly the same.\n\nHow does one live posthumously? How does one resurrect itself like nothing happened? The questions of the damned seeded in their souls, like fixating on a plant’s cyclical revival, only to realise that even flowers grow in graveyards."
    ]
  },
  {
    title: "Caterpillar",
    pages: ["../assets/images/writing-pages/caterpillar-pg-1.png", "../assets/images/writing-pages/caterpillar-pg-2.png"],
    transcripts: [
      "Every night I dream for the day I could graze the clouds. To place my feet amongst every plant and drink the sweetness. But I am bound to the birthing land. I walk on my food, tearing away fibers until I become immobile.",
      "I close my eyes when I eat because I like to imagine I’m drinking sweets. I dangle off edges because I like the feeling of the wind amongst my limbs.",
      "^—------------------------------------------------wtf is this—-----------------------------------------------------^",
      "I digest life until it digests me. The brevity doesn’t scare me. My feet kiss the fibres that tear away until I am complete…but not, yet. Everytime I close my eyes, I dream of the day I lose some. At the core of my ugly body writhes a soul that grows fatter everyday until I cannot. The desperation eats at me. I lock myself away, an inevitable fate. Is this punishment or is it the way it was meant to be?",
      "Don’t speak with me until I am resigned. From then on, the remaining ugliness will be the pretentious window to my heart. Awaken, a new body, unfrozen and desperation melting away, dripping down to Earth and evaporating into the sky to meet with me again.",
      "Seduction mélangé with mesmerisation bleeds into desire and spills into your mouth. It tastes like aster, sweet like the sun. Take my hand and be my reflection. When the mirror of life looks at me, I will see you. When it speaks to me, I will hear the pulse of your wings. Reverberations of air on skin like waves that echo the smashing waters. Drown me in your nectar and succumb to the pleasure.",    ]
  },
];

const gridContainer = document.querySelector('.writing-grid');
const lightbox = document.querySelector('.lightbox');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const closeBtn = lightbox.querySelector('.close-lightbox');
const transcriptBox = lightbox.querySelector('.lightbox-transcript');
const transcriptText = lightbox.querySelector('.transcript-text');
const lightboxMain = lightbox.querySelector('.lightbox-main');
const lightboxImg = lightboxMain.querySelector('.lightbox-img');
const prevBtn = lightboxMain.querySelector('.prev-page');
const nextBtn = lightboxMain.querySelector('.next-page');
const thumbnailsContainer = lightbox.querySelector('.lightbox-thumbnails');

let currentWritingIndex = 0;
// currentPageIndex can be an integer (image index) or the string 'transcript'
let currentPageIndex = 0;

// Create grid items
writings.forEach((entry, index) => {
  const div = document.createElement('div');
  div.classList.add('writing-entry');
  div.dataset.index = index;

  const img = document.createElement('img');
  img.src = entry.pages[0];
  img.alt = entry.title;

  const overlay = document.createElement('div');
  overlay.classList.add('title-overlay');
  overlay.textContent = entry.title;

  div.appendChild(img);
  div.appendChild(overlay);
  gridContainer.appendChild(div);
});

// Open lightbox
document.querySelectorAll('.writing-entry').forEach(entry => {
  entry.addEventListener('click', () => {
    currentWritingIndex = parseInt(entry.dataset.index);
    currentPageIndex = 0;
    showLightbox();
  });
});

// Show lightbox with correct image and thumbnails
function showLightbox() {
  const entry = writings[currentWritingIndex];
  lightbox.style.display = 'flex';
  lightboxTitle.textContent = entry.title;
  updateLightboxImage();
  populateThumbnails();
  updateTranscript();
  transcriptBox.classList.add('hidden');
}

// Update image in lightbox
function updateLightboxImage() {
  const entry = writings[currentWritingIndex];
  if (currentPageIndex === 'transcript') {
    lightboxImg.src = "";
    lightboxImg.style.display = 'none';
  } else {
    lightboxImg.src = entry.pages[currentPageIndex];
    lightboxImg.style.display = 'block';
  }
}

// Create thumbnails for lightbox
function populateThumbnails() {
  const entry = writings[currentWritingIndex];
  thumbnailsContainer.innerHTML = '';

  // Image page thumbnails
  entry.pages.forEach((page, i) => {
    const thumb = document.createElement('img');
    thumb.src = page;
    thumb.classList.add('thumbnail');
    if (i === currentPageIndex && currentPageIndex !== 'transcript') thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      currentPageIndex = i;
      updateLightboxImage();
      populateThumbnails();
      updateTranscript();
    });
    thumbnailsContainer.appendChild(thumb);
  });

  // Transcript "page" thumbnail
  const transcriptThumb = document.createElement('div');
  transcriptThumb.textContent = "transcript";
  transcriptThumb.classList.add('thumbnail', 'transcript-thumb');
  if (currentPageIndex === 'transcript') transcriptThumb.classList.add('active');
  transcriptThumb.addEventListener('click', () => {
    currentPageIndex = 'transcript';
    updateLightboxImage();
    populateThumbnails();
    updateTranscript();
  });
  thumbnailsContainer.appendChild(transcriptThumb);
}

function updateTranscript() {
  const entry = writings[currentWritingIndex];
  if (currentPageIndex === 'transcript') {
    // Show all transcript pages joined
    const transcript = entry.transcripts?.join('\n\n') || "No transcript available.";
    transcriptText.innerHTML = transcript.replace(/\n/g, '<br>');
    transcriptBox.classList.remove('hidden');
  } else {
    transcriptBox.classList.add('hidden');
    // Show only the current page's transcript if you want to display it elsewhere
    // (currently, transcriptBox is hidden in this case)
    // transcriptText.textContent = entry.transcripts?.[currentPageIndex] || "No transcript available.";
  }
}

// Navigation arrows
prevBtn.addEventListener('click', () => {
  console.log('Prev clicked. Current index before:', currentPageIndex);
  const entry = writings[currentWritingIndex];
  const numPages = entry.pages.length;
  // Determine current index: image indices 0..n-1, transcript is n
  let idx;
  if (currentPageIndex === 'transcript') {
    idx = numPages;
  } else {
    idx = currentPageIndex;
  }
  idx = (idx - 1 + numPages + 1) % (numPages + 1);
  if (idx === numPages) {
    currentPageIndex = 'transcript';
  } else {
    currentPageIndex = idx;
  }
  console.log('New index after prev:', currentPageIndex);
  updateLightboxImage();
  populateThumbnails();
  updateTranscript();
});

nextBtn.addEventListener('click', () => {
  console.log('Next clicked. Current index before:', currentPageIndex);
  const entry = writings[currentWritingIndex];
  const numPages = entry.pages.length;
  let idx;
  if (currentPageIndex === 'transcript') {
    idx = numPages;
  } else {
    idx = currentPageIndex;
  }
  idx = (idx + 1) % (numPages + 1);
  if (idx === numPages) {
    currentPageIndex = 'transcript';
  } else {
    currentPageIndex = idx;
  }
  console.log('New index after next:', currentPageIndex);
  updateLightboxImage();
  populateThumbnails();
  updateTranscript();
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  console.log('Close button clicked.');
  lightbox.style.display = 'none';
});