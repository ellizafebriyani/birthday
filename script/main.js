// =============================================
// PARTICLES
// =============================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#f472b6', '#a855f7', '#60a5fa', '#fbbf24', '#34d399'];
  const count = window.innerWidth < 600 ? 18 : 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

// =============================================
// INIT ON LOAD
// =============================================
window.addEventListener('load', () => {
  createParticles();

  Swal.fire({
    title: '🎵 Play the music?',
    text: 'For the best experience',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#a855f7',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, play it!',
    cancelButtonText: 'No thanks',
    background: '#2d1b4e',
    color: '#ffffff',
    borderRadius: '20px',
    customClass: {
      popup: 'swal-custom'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const song = document.querySelector('.song');
      song.play().catch(() => {});
    }
    animationTimeline();
  });
});


// =============================================
// ANIMATION TIMELINE
// =============================================
const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.6, { visibility: "visible" })

    // --- Greeting ---
    .from(".one", 0.7, { opacity: 0, y: 20 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=0.5")

    // --- Today ---
    .from(".three", 0.7, { opacity: 0, y: 20, scale: 0.95 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2.5")

    // --- Chat bubble ---
    .from(".four", 0.6, { scale: 0.85, opacity: 0, y: 20 })
    .from(".fake-btn", 0.3, { scale: 0.5, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.04)
    .to(".fake-btn", 0.15, { background: "linear-gradient(135deg, #db2777, #7c3aed)" }, "+=1.5")
    .to(".four", 0.5, { scale: 0.85, opacity: 0, y: -80 }, "+=1.2")

    // --- Story ---
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")

    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")

    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.1,
      x: 6,
      backgroundColor: "#f472b6",
      color: "#fff",
      padding: "4px 12px",
      borderRadius: "8px"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")

    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")

    .from(".idea-5", 0.7, {
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      opacity: 0,
    }, "+=1.5")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 6 }, "+=1.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")

    // --- S O ---
    .staggerFrom(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: 15,
      ease: Expo.easeOut,
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: -15,
      ease: Expo.easeOut,
    }, 0.2, "+=1.5")

    // --- Balloons + Profile Card ---
    .staggerFromTo(".baloons img", 2.5,
      { opacity: 0.9, y: 1400 },
      { opacity: 1, y: -1000 },
      0.15
    )
    .from(".profile-card", 0.7, {
      scale: 0.8,
      opacity: 0,
      y: 30,
    }, "-=2")
    .from(".hat", 0.5, {
      x: -80,
      y: 250,
      rotation: -180,
      opacity: 0,
    }, "-=0.3")
    .staggerFrom(".wish-hbd span", 0.6, {
      opacity: 0,
      y: -40,
      rotation: 120,
      skewX: "25deg",
      ease: Elastic.easeOut.config(1, 0.5),
    }, 0.08)
    .staggerFromTo(".wish-hbd span", 0.6, {
      scale: 1.4,
      rotationY: 150,
    }, {
      scale: 1,
      rotationY: 0,
      color: "#f472b6",
      ease: Expo.easeOut,
    }, 0.08, "party")
    .from("#wishText", 0.5, {
      opacity: 0,
      y: 10,
      skewX: "-10deg",
    }, "party")

    // --- Confetti explosion ---
    .staggerTo(".eight svg", 1.5, {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.2,
    }, 0.3)

    // --- Fade out profile ---
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })

    // --- Ending ---
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  // Replay button
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};
