
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down: hide header
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up: show header
    header.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});



document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    // Open the sidebar when hamburger is clicked
    menuToggle.addEventListener('click', function () {
        // console.log("sidebar is clicked")
        navMenu.classList.toggle('open');
        navMenu.style.flexDirection = "column";
    });

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', function (event) {
        // console.log("clicked out of the sidebar")
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('open');
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.expand-btn').forEach((expandBtn, index) => {
        const shrinkBtn = document.querySelectorAll('.shrink-btn')[index]; // Get corresponding shrink button
        const p = expandBtn.previousElementSibling; // Select the previous <p> element

        const fullText = p.getAttribute('data-full-text'); // Full text from data attribute
        const shortText = fullText.substring(0, 80) + "..."; // Shortened version

        // Expand button click
        expandBtn.onclick = () => {
            p.classList.add('expanded');
            p.innerHTML = fullText; // Expand to full text

            // Hide expand button, show shrink button
            expandBtn.style.display = 'none';
            shrinkBtn.style.display = 'block';
        };

        // Shrink button click
        shrinkBtn.onclick = () => {
            p.classList.remove('expanded');
            p.innerHTML = shortText; // Collapse to short text

            // Hide shrink button, show expand button
            shrinkBtn.style.display = 'none';
            expandBtn.style.display = 'block';
        };
    });
});



const videos = document.querySelectorAll('.video');

videos.forEach((video) => {
    const playBtnContainer = video.nextElementSibling; 
    const playIcon = playBtnContainer.querySelector('.play-icon');
    const pauseIcon = playBtnContainer.querySelector('.pause-icon');

    // At starting, the video is paused and the play icon appears to provide its funvtionality:
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';

    // Play button logic
    playBtnContainer.addEventListener('click', function () {
        if (video.paused) {
            // Pause all other videos
            videos.forEach((vid) => {
                vid.pause();
                // Reset other 👇 videos to start:
                vid.currentTime = 0; 
                const btnContainer = vid.nextElementSibling;
                btnContainer.querySelector('.play-icon').style.display = 'block';
                btnContainer.querySelector('.pause-icon').style.display = 'none';
            });

            // Play the clicked video
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // Hovering over video or play/pause button
    video.addEventListener('mouseenter', function () {
        if (!video.paused) {
            pauseIcon.style.display = 'block'; 
        }
    });

    playBtnContainer.addEventListener('mouseenter', function () {
        if (!video.paused) {
            pauseIcon.style.display = 'block'; 
        }
    });

    // Hiding the pause button when leaving both the video & button
    video.addEventListener('mouseleave', function () {
        if (!video.paused) {
            pauseIcon.style.display = 'none'; 
        }
    });

    playBtnContainer.addEventListener('mouseleave', function () {
        if (!video.paused) {
            pauseIcon.style.display = 'none'; 
        }
    });

    // Resetting the play button and video time stamp to zero(0) when video ends:
    video.addEventListener('ended', function () {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        video.currentTime = 0; 
    });
});
