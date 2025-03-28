// Form validation function
function validateForm() {
    const humanCheck = document.getElementById('humanCheck');
    if (!humanCheck.checked) {
        alert("Please confirm you're not a robot.");
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

// Contact form functions
function openContactForm() {
    const contactWrapper = document.querySelector('.contact-wrapper');
    contactWrapper.style.display = 'flex'; // Ensure the form is visible before starting animation
    setTimeout(() => {
        contactWrapper.classList.add('active');
        contactWrapper.classList.remove('closing');
    }, 10); // Slight delay to ensure the display is applied before the animation starts
}

// Toggle menu function
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}



// Typing animation function
function type() {
    const textElement = document.querySelector(".sec-text");
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, currentCharacterIndex - 1);
        currentCharacterIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, currentCharacterIndex + 1);
        currentCharacterIndex++;
    }

    if (!isDeleting && currentCharacterIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenPhrases); // Pause before deleting
    } else if (isDeleting && currentCharacterIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to next phrase
        setTimeout(type, typingSpeed); // Start typing the next phrase
    } else {
        const speed = isDeleting ? erasingSpeed : typingSpeed;
        setTimeout(type, speed);
    }
}





// Variables for typing animation
const phrases = [
    "Check Out Our Apps!",
    "Report Bugs Here!",
    "By: Xander Angulo"
];
let currentPhraseIndex = 0;
let currentCharacterIndex = 0;
let isDeleting = false;
const typingSpeed = 70; // Speed of typing
const erasingSpeed = 40; // Speed of erasing
const delayBetweenPhrases = 1500; // Delay before starting to erase

// Event Listeners - executed when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize typing animation
    setTimeout(type, typingSpeed);
    
    // Contact form event listeners
    const btnLoginPopup = document.querySelector('.btnLogin-popup');
    if (btnLoginPopup) {
        btnLoginPopup.addEventListener('click', openContactForm);
    }
    
    const topRightContact = document.querySelector('.top-right-contact');
    if (topRightContact) {
        topRightContact.addEventListener('click', openContactForm);
    }
    
    const iconClose = document.querySelector('.icon-close');
    if (iconClose) {
        iconClose.addEventListener('click', function() {
            const contactWrapper = document.querySelector('.contact-wrapper');
            contactWrapper.classList.add('closing');
            contactWrapper.classList.remove('active');

            // Wait for the animation to complete before hiding the element
            setTimeout(() => {
                contactWrapper.style.display = 'none';
            }, 500); // Duration matches the CSS transition duration
        });
    }
    
    // Close the mobile menu when an item is clicked
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Automatically adjust the height of the textarea based on content
    const textarea = document.querySelector('textarea[name="message"]');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto'; // Reset height to auto to calculate new height
            this.style.height = (this.scrollHeight) + 'px'; // Set height to match content
        });
    }
    



    // Scroll event handling for navbar and menu visibility
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const menuIcon = document.querySelector('.menu-icon');
        const heroSection = document.querySelector('.hero');
        const milliLifeSection = document.getElementById('milliLife');
        const navMenu = document.querySelector('.nav-menu');
        const topLeftContact = document.querySelector('.top-right-contact');

        if (heroSection && milliLifeSection) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const milliLifeTop = milliLifeSection.getBoundingClientRect().top;

            // Show the navbar when the user scrolls past the hero section
            if (heroBottom <= 0) {
                navbar.classList.add('full');
                menuIcon.classList.add('full');
                if (topLeftContact) {
                    topLeftContact.style.visibility = 'hidden';
                    topLeftContact.style.opacity = '0';
                }
            } else {
                navbar.classList.remove('full');
                menuIcon.classList.remove('full');
                if (topLeftContact) {
                    topLeftContact.style.visibility = 'visible';
                    topLeftContact.style.opacity = '1';
                }
            }

            // Show the menu icon only when the MilliLife section is reached
            if (milliLifeTop <= 0) {
                menuIcon.style.visibility = 'visible';
                menuIcon.style.opacity = '1';
            } else {
                menuIcon.style.visibility = 'hidden';
                menuIcon.style.opacity = '0';
            }

            // Ensure the menu closes when scrolling back up to the hero section
            if (heroBottom > 0 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
        
        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
});







// Projects popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all expand buttons
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-popup');
    
    // Add click event for each expand button
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const popup = document.getElementById(`popup-${projectId}`);
            
            if (popup) {
                // Add active class to show the popup
                popup.classList.add('active');
                
                // Prevent scrolling on the body
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Add click event for each close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent popup
            const popup = this.closest('.project-popup');
            
            if (popup) {
                // Remove active class to hide the popup
                popup.classList.remove('active');
                
                // Restore scrolling on the body
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close popup when clicking outside the content
    document.querySelectorAll('.project-popup').forEach(popup => {
        popup.addEventListener('click', function(event) {
            // Only close if the click was directly on the popup background
            if (event.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activePopup = document.querySelector('.project-popup.active');
            if (activePopup) {
                activePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Add this to your existing project popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add hover animation to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-animate');
            
            // Get the expand button inside this card
            const expandBtn = this.querySelector('.expand-btn');
            if (expandBtn) {
                expandBtn.classList.add('btn-pulse');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-animate');
            
            // Remove animation from expand button
            const expandBtn = this.querySelector('.expand-btn');
            if (expandBtn) {
                expandBtn.classList.remove('btn-pulse');
            }
        });
    });
});














// Space Warp Transition Animation
document.addEventListener("DOMContentLoaded", () => {
    // Create canvas for the space warp effect
    const warpCanvas = document.createElement('canvas');
    warpCanvas.id = 'warpCanvas';
    warpCanvas.style.position = 'fixed';
    warpCanvas.style.top = '0';
    warpCanvas.style.left = '0';
    warpCanvas.style.width = '100%';
    warpCanvas.style.height = '100%';
    warpCanvas.style.pointerEvents = 'none';
    warpCanvas.style.zIndex = '5'; // Lower z-index to ensure it doesn't obscure content
    // Start with canvas visible
    warpCanvas.style.opacity = '1';
    warpCanvas.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(warpCanvas);

    // Set canvas size
    const resizeCanvas = () => {
        warpCanvas.width = window.innerWidth;
        warpCanvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const ctx = warpCanvas.getContext('2d');
    const stars = [];
    const starCount = 500;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * warpCanvas.width,
            y: Math.random() * warpCanvas.height,
            z: Math.random() * 1500 + 500,
            radius: Math.random() * 1.5 + 0.5
        });
    }

    // Animation variables
    let animationFrameId;
    let warpSpeed = 2; // Initial warp speed for hero section
    let maxWarpSpeed = 15;
    let isWarping = true; // Start animation immediately
    
    // Draw stars
    function drawStars() {
        ctx.clearRect(0, 0, warpCanvas.width, warpCanvas.height);
        
        // Center coordinates
        const centerX = warpCanvas.width / 2;
        const centerY = warpCanvas.height / 2;
        
        // Draw each star
        for (let i = 0; i < starCount; i++) {
            const star = stars[i];
            
            // Move star closer (decrease z)
            star.z -= warpSpeed;
            
            // Reset star if it passes the screen
            if (star.z <= 0) {
                stars[i].x = Math.random() * warpCanvas.width;
                stars[i].y = Math.random() * warpCanvas.height;
                stars[i].z = 1500;
                stars[i].radius = Math.random() * 1.5 + 0.5;
            }
            
            // Calculate projected position (perspective division)
            const projectedX = (star.x - centerX) * (600 / star.z) + centerX;
            const projectedY = (star.y - centerY) * (600 / star.z) + centerY;
            
            // Calculate star size based on z distance
            const projectedRadius = star.radius * (800 / star.z);
            
            // Calculate previous position for trailing effect
            const prevX = (star.x - centerX) * (600 / (star.z + warpSpeed * 2)) + centerX;
            const prevY = (star.y - centerY) * (600 / (star.z + warpSpeed * 2)) + centerY;
            
            // Draw star trail
            if (warpSpeed > 3) {
                ctx.beginPath();
                ctx.moveTo(projectedX, projectedY);
                ctx.lineTo(prevX, prevY);
                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, warpSpeed/10)})`; 
                ctx.lineWidth = projectedRadius * (warpSpeed / 5);
                ctx.stroke();
            }
            
            // Draw star
            ctx.beginPath();
            ctx.arc(projectedX, projectedY, projectedRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        
        // Continue animation
        if (isWarping) {
            animationFrameId = requestAnimationFrame(drawStars);
        }
    }

    // Start animation immediately
    animationFrameId = requestAnimationFrame(drawStars);

    // Handle scroll transition
    let lastScrollTop = 0;
    const heroSection = document.querySelector('.hero');
    const milliLifeSection = document.getElementById('milliLife');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;
        
        // Determine if we're scrolling up or down
        const scrollingDown = scrollTop > lastScrollTop;
        
        // Check if we're still in the hero section
        if (heroBottom >= viewportHeight) {
            // We're fully in the hero section - maintain a steady warp speed
            warpSpeed = 5; // Constant speed for hero section
            
            // Make sure animation is running and canvas is visible
            if (!isWarping) {
                isWarping = true;
                warpCanvas.style.opacity = '1';
                animationFrameId = requestAnimationFrame(drawStars);
            } else {
                // Force full opacity when in hero section
                warpCanvas.style.opacity = '1';
            }
        }
        // Check if we're transitioning between hero and milliLife section
        else if (heroBottom > 0 && heroBottom < viewportHeight) {
            // Calculate transition progress (0 to 1)
            const transitionProgress = 1 - (heroBottom / viewportHeight);
            
            // Restart animation if we're scrolling back up into the transition zone
            if (!isWarping && !scrollingDown) {
                isWarping = true;
                warpCanvas.style.opacity = '1';
                animationFrameId = requestAnimationFrame(drawStars);
            }
            
            // Update warp speed based on progress
            if (transitionProgress < 0.5) {
                // First half of transition - speed up
                warpSpeed = 5 + (maxWarpSpeed - 5) * (transitionProgress * 2);
            } else {
                // Second half of transition - slow down to zero
                warpSpeed = maxWarpSpeed * ((1 - transitionProgress) * 2);
            }
            
            // Handle opacity based on transition progress
            if (transitionProgress > 0.8) {
                // Fading out when scrolling down near end of transition
                warpCanvas.style.opacity = String(1 - (transitionProgress - 0.8) * 5);
            } else if (transitionProgress < 0.2 && !scrollingDown) {
                // Fading in when scrolling back up at beginning of transition
                warpCanvas.style.opacity = String(transitionProgress * 5);
            } else {
                // Full opacity in middle of transition
                warpCanvas.style.opacity = '1';
            }
        } 
        // We've scrolled past the hero section
        else if (heroBottom <= 0) {
            // Outside transition zone, stop the animation
            if (isWarping) {
                isWarping = false;
                warpSpeed = 0;
                warpCanvas.style.opacity = '0';
                cancelAnimationFrame(animationFrameId);
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition for MilliLife section elements
    const milliContainer = document.querySelector('.milli-container');
    if (milliContainer) {
        // Initialize off-screen
        milliContainer.style.transform = 'translateY(50px)';
        milliContainer.style.opacity = '0';
        milliContainer.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        
        // Observe when MilliLife section enters viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        milliContainer.style.transform = 'translateY(0)';
                        milliContainer.style.opacity = '1';
                    }, 200); // Slight delay for better effect
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(milliLifeSection);
    }
});










// This is for the subtle background dots animation in the BrkrStudios section only
document.addEventListener("DOMContentLoaded", () => {
    // Target the BrkrStudios section
    const aboutBrkrSection = document.getElementById('aboutBrkrStudios');
    
    if (aboutBrkrSection) {
        // Create container for the background dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'background-dots-container';
        aboutBrkrSection.insertBefore(dotsContainer, aboutBrkrSection.firstChild);
        
        // Configuration for the dots
        const config = {
            numberOfDots: 1100,    // Further increased number of dots
            connectionLines: 22,  // Number of connection lines to create
            minSize: 2,           // Minimum dot size
            maxSize: 6,           // Maximum dot size
            minOpacity: 0.08,     // Minimum opacity
            maxOpacity: 0.3,      // Maximum opacity
            minSpeed: 0.15,       // Minimum upward movement speed
            maxSpeed: 0.7,        // Maximum upward movement speed
            minSideSpeed: -0.15,  // Minimum sideways movement (negative for left)
            maxSideSpeed: 0.15    // Maximum sideways movement (positive for right)
        };
        
        // Create and configure all dots
        const dots = [];
        for (let i = 0; i < config.numberOfDots; i++) {
            createDot(dotsContainer, config, dots);
        }
        
        // Create connection lines between some dots
        createConnectionLines(dotsContainer, dots, config.connectionLines);
        
        // Update dot positions on animation frame
        function updateDots() {
            // Get the container dimensions - they might change on resize
            const containerWidth = dotsContainer.offsetWidth;
            const containerHeight = dotsContainer.offsetHeight;
            
            // Update each dot position
            dots.forEach(dot => {
                // Update position based on speed
                dot.y -= dot.speed;
                dot.x += dot.sideSpeed;
                
                // Add slight wave motion to some dots
                if (dot.hasWave) {
                    dot.x += Math.sin(Date.now() * 0.001 + dot.waveOffset) * dot.waveAmplitude;
                }
                
                // Check if dot has gone off screen and reset it
                if (dot.y < -50) {
                    // Reset to bottom
                    dot.y = containerHeight + 20;
                    dot.x = Math.random() * containerWidth;
                }
                
                // Reset if dot goes off sides
                if (dot.x < -20) {
                    dot.x = containerWidth + 10;
                } else if (dot.x > containerWidth + 20) {
                    dot.x = -10;
                }
                
                // Apply the new position
                dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
                
                // Update any connections this dot has
                if (dot.connections) {
                    dot.connections.forEach(connection => {
                        updateConnection(connection, dot);
                    });
                }
            });
            
            // Continue animation
            requestAnimationFrame(updateDots);
        }
        
        // Start the animation
        requestAnimationFrame(updateDots);
        
        // Handle resize
        window.addEventListener('resize', () => {
            // Get new dimensions
            const containerWidth = dotsContainer.offsetWidth;
            const containerHeight = dotsContainer.offsetHeight;
            
            // Redistribute dots
            dots.forEach(dot => {
                dot.x = Math.random() * containerWidth;
                dot.y = Math.random() * containerHeight;
                dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
            });
            
            // Remove old connection lines
            document.querySelectorAll('.dot-connection').forEach(el => el.remove());
            
            // Create new connection lines
            createConnectionLines(dotsContainer, dots, config.connectionLines);
        });
        
        // Add intersection observer to only animate when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Make sure dots are visible
                    dotsContainer.style.opacity = 1;
                } else {
                    // Hide dots when section not visible
                    dotsContainer.style.opacity = 0;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(aboutBrkrSection);
    }
});




// Function to create a single dot
function createDot(container, config, dotsArray) {
    // Create dot element
    const dot = document.createElement('div');
    dot.className = 'background-dot';
    
    // Randomly select size class with distribution
    const sizeRandom = Math.random();
    if (sizeRandom < 0.45) {
        dot.classList.add('small');
    } else if (sizeRandom < 0.75) {
        dot.classList.add('medium');
    } else if (sizeRandom < 0.95) {
        dot.classList.add('large');
    } else {
        // Rare extra large dots
        dot.classList.add('xlarge');
    }
    
    // Randomly add brightness variation
    const brightnessRandom = Math.random();
    if (brightnessRandom < 0.15) {
        dot.classList.add('bright');
    } else if (brightnessRandom > 0.8) {
        dot.classList.add('dim');
    }
    
    // Randomly add color variation to some dots (blue tint)
    if (Math.random() < 0.2) {
        if (Math.random() < 0.7) {
            dot.classList.add('blue-tint');
        } else {
            dot.classList.add('blue-bright');
        }
    }
    
    // Randomly add animations to some dots
    const animationRandom = Math.random();
    if (animationRandom < 0.1) {
        dot.classList.add(Math.random() < 0.5 ? 'pulse' : 'pulse-slow');
    } else if (animationRandom > 0.9) {
        dot.classList.add(Math.random() < 0.5 ? 'twinkle-fast' : 'twinkle-slow');
    }
    
    // Create clusters in certain areas rather than uniform distribution
    let x, y;
    if (Math.random() < 0.3) {
        // Create clusters around certain points
        const clusterX = Math.random() * container.offsetWidth;
        const clusterY = Math.random() * container.offsetHeight;
        const offset = 50 + Math.random() * 100;
        
        x = clusterX + (Math.random() - 0.5) * offset;
        y = clusterY + (Math.random() - 0.5) * offset;
    } else {
        // Random position
        x = Math.random() * container.offsetWidth;
        y = Math.random() * container.offsetHeight;
    }
    
    dot.style.transform = `translate(${x}px, ${y}px)`;
    
    // Set random movement speeds
    const speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
    const sideSpeed = config.minSideSpeed + Math.random() * (config.maxSideSpeed - config.minSideSpeed);
    
    // Add some dots with wave motion
    const hasWave = Math.random() < 0.2;
    const waveAmplitude = hasWave ? 0.1 + Math.random() * 0.3 : 0;
    const waveOffset = Math.random() * Math.PI * 2;
    
    // Add dot to container
    container.appendChild(dot);
    
    // Store dot data for animation
    dotsArray.push({
        element: dot,
        x: x,
        y: y,
        speed: speed,
        sideSpeed: sideSpeed,
        hasWave: hasWave,
        waveAmplitude: waveAmplitude,
        waveOffset: waveOffset,
        connections: []
    });
}

// Function to create connection lines between dots
function createConnectionLines(container, dots, count) {
    // Only create connections if we have enough dots
    if (dots.length < 10) return;
    
    // Create a limited number of connections
    for (let i = 0; i < count; i++) {
        // Pick two random dots that are somewhat close to each other
        let found = false;
        let attempts = 0;
        let startDot, endDot, distance;
        
        // Try to find dots that are close enough but not too close
        while (!found && attempts < 30) {
            const index1 = Math.floor(Math.random() * dots.length);
            const index2 = Math.floor(Math.random() * dots.length);
            
            if (index1 !== index2) {
                startDot = dots[index1];
                endDot = dots[index2];
                
                // Calculate distance between dots
                const dx = startDot.x - endDot.x;
                const dy = startDot.y - endDot.y;
                distance = Math.sqrt(dx * dx + dy * dy);
                
                // Only connect dots that are relatively close (not too far, not too close)
                if (distance > 50 && distance < 200) {
                    found = true;
                }
            }
            
            attempts++;
        }
        
        if (found) {
            // Create connection line
            const connection = document.createElement('div');
            connection.className = 'dot-connection';
            container.appendChild(connection);
            
            // Set initial position and size
            updateConnection({
                element: connection,
                startDot: startDot,
                endDot: endDot
            }, startDot);
            
            // Add connection to both dots so it gets updated when they move
            startDot.connections.push({
                element: connection,
                startDot: startDot,
                endDot: endDot
            });
        }
    }
}

// Update connection line position and angle
function updateConnection(connection, updateFromDot) {
    const startDot = connection.startDot;
    const endDot = connection.endDot;
    
    // Calculate distance and angle
    const dx = endDot.x - startDot.x;
    const dy = endDot.y - startDot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // Position at startDot and set width to distance
    connection.element.style.width = `${distance}px`;
    connection.element.style.left = `${startDot.x}px`;
    connection.element.style.top = `${startDot.y}px`;
    connection.element.style.transform = `rotate(${angle}rad)`;
    
    // Fade out connections as dots get further apart
    const opacity = Math.max(0, 0.3 - (distance - 100) / 300);
    connection.element.style.opacity = `${opacity}`;
}




// // This code creates a one-time slide-in from left animation for all sections
// document.addEventListener("DOMContentLoaded", () => {
//     // Target all sections to animate
//     const sections = [
//         document.getElementById('aboutBrkrStudios'),
//         document.getElementById('partners'),
//         document.getElementById('meetTheCreator'),
//         document.getElementById('portfolio-section'),
//         document.getElementById('photography-section'),
//         document.getElementById('instagram-section'),
//         document.getElementById('resume-section'),
//         document.getElementById('linkedin-section')
//     ];
    
//     // Create a Set to keep track of which sections have been animated
//     const animatedSections = new Set();
    
//     sections.forEach(section => {
//         if (!section) return;
        
//         // Get main elements within each section to animate
//         const elements = [];
        
//         // For BrkrStudios section
//         if (section.id === 'aboutBrkrStudios') {
//             elements.push(
//                 section.querySelector('.about-container'),
//                 section.querySelector('.projects-showcase h2'),
//                 ...Array.from(section.querySelectorAll('.project-card'))
//             );
//         }
//         // For Partners section 
//         else if (section.id === 'partners') {
//             elements.push(
//                 section.querySelector('h2'),
//                 section.querySelector('.partner-container'),
//                 section.querySelector('.partner-text'),
//                 section.querySelector('.partner-image')
//             );
//         }
//         // For Meet the Creator section
//         else if (section.id === 'meetTheCreator') {
//             elements.push(
//                 section.querySelector('.creator-image'),
//                 section.querySelector('.creator-text')
//             );
//         }
//         // For Portfolio section
//         else if (section.id === 'portfolio-section') {
//             elements.push(
//                 section.querySelector('h2'),
//                 ...Array.from(section.querySelectorAll('.portfolio-item'))
//             );
//         }
//         // For Photography section
//         else if (section.id === 'photography-section') {
//             elements.push(
//                 section.querySelector('h2'),
//                 ...Array.from(section.querySelectorAll('.photo-item'))
//             );
//         }
//         // For Instagram section
//         else if (section.id === 'instagram-section') {
//             elements.push(
//                 section.querySelector('.insta-content')
//             );
//         }
//         // For Resume section
//         else if (section.id === 'resume-section') {
//             elements.push(
//                 section.querySelector('.resume-content')
//             );
//         }
//         // For LinkedIn section
//         else if (section.id === 'linkedin-section') {
//             elements.push(
//                 section.querySelector('.linkedin-content')
//             );
//         }
        
//         // Filter out any null elements
//         const elementsToAnimate = elements.filter(el => el);
        
//         // Apply initial styles for off-screen positioning
//         elementsToAnimate.forEach((element, index) => {
//             element.style.opacity = '0';
//             element.style.transform = 'translateX(-100px)';
//             element.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
//             element.style.transitionDelay = `${index * 0.1}s`; // Staggered delay
//         });
        
//         // Set up Intersection Observer for the section
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 // Only process if the section is coming into view and hasn't been animated yet
//                 if (entry.isIntersecting && !animatedSections.has(section.id)) {
//                     // Section coming into view for the first time
//                     elementsToAnimate.forEach(element => {
//                         element.style.opacity = '1';
//                         element.style.transform = 'translateX(0)';
//                     });
                    
//                     // Mark this section as animated
//                     animatedSections.add(section.id);
                    
//                     // Stop observing this section
//                     observer.unobserve(section);
//                 }
//             });
//         }, { threshold: 0.15 }); // Trigger when 15% of the section is visible
        
//         // Start observing the section
//         observer.observe(section);
        
//         // Handle initial state if already in view on page load
//         if (isInViewport(section)) {
//             elementsToAnimate.forEach(element => {
//                 element.style.opacity = '1';
//                 element.style.transform = 'translateX(0)';
//             });
            
//             // Mark as animated and stop observing
//             animatedSections.add(section.id);
//             observer.unobserve(section);
//         }
//     });
// });

// // Helper function to check if element is in viewport
// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }







// Update the footer underline animation
document.addEventListener("DOMContentLoaded", () => {
    // Target the underlined text in the footer
    const underlinedText = document.querySelector(".footer p u");
    
    if (underlinedText) {
      // Replace <u> with a span that we'll animate
      const textContent = underlinedText.textContent;
      const parentElement = underlinedText.parentElement;
      
      const newSpan = document.createElement("span");
      newSpan.textContent = textContent;
      newSpan.className = "animated-underline";
      
      parentElement.replaceChild(newSpan, underlinedText);
      
      // Set up intersection observer to trigger continuous animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            newSpan.classList.add("animate");
          } else {
            newSpan.classList.remove("animate");
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(newSpan);
    }
  });

  










  // Add this code to your existing scripts.js file
document.addEventListener("DOMContentLoaded", function() {
    // Get the milli-link element
    const milliLink = document.querySelector('.milli-link');
    
    if (milliLink) {
      // Create a container for the link
      const container = document.createElement('div');
      container.className = 'milli-link-container';
      
      // Create the animated blue box
      const blueBox = document.createElement('div');
      blueBox.className = 'blue-box-animation';
      
      // Get the parent of the milli-link
      const parent = milliLink.parentNode;
      
      // Insert the container before the link
      parent.insertBefore(container, milliLink);
      
      // Move the link into the container
      container.appendChild(milliLink);
      
      // Add the blue box to the container
      container.appendChild(blueBox);
    }
  });















  // Photo Modal/Lightbox functionality
function openPhotoModal(photoItem) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const img = photoItem.querySelector('img');
    
    // Set the image source to the clicked image
    modalImg.src = img.src;
    
    // Show the modal with animation
    modal.style.display = 'flex';
    
    // Use setTimeout to allow CSS transition to work
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
}

// Close the modal when clicking the × button
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    const closeBtn = document.querySelector('.close-photo-modal');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            closePhotoModal();
        });
        
        // Close the modal when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closePhotoModal();
            }
        });
        
        // Close modal when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closePhotoModal();
            }
        });
    }
});

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    
    // Remove the show class to trigger the fade-out animation
    modal.classList.remove('show');
    
    // Wait for the animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        // Restore scrolling on the body
        document.body.style.overflow = 'auto';
    }, 300); // Match to the CSS transition duration
}

















// Photography page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const galleryItems = document.querySelectorAll('.gallery-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-photo-modal');
    const prevBtn = document.querySelector('.modal-prev-btn');
    const nextBtn = document.querySelector('.modal-next-btn');
    
    let currentIndex = 0;
    let filteredItems = [...galleryItems]; // Start with all items
    
    // Initialize gallery with animation on load
    function initGallery() {
        galleryItems.forEach((item, index) => {
            // Add staggered animation on page load
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 * index);
            
            // Add click event for opening modal
            item.addEventListener('click', function() {
                openModal(this);
            });
        });
    }
    
    // Apply initial styles for animation
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize gallery after a short delay
    setTimeout(initGallery, 100);
    
    // Filter gallery based on category
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter items
            if (category === 'all') {
                // Show all items
                filteredItems = [...galleryItems];
                galleryItems.forEach(item => {
                    item.style.display = 'block';
                    // Animate items back in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                });
                
                // Show all sections
                document.querySelectorAll('.gallery-section').forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // Hide all items first
                galleryItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                });
                
                // Show sections relevant to the selected category
                document.querySelectorAll('.gallery-section').forEach(section => {
                    if (section.classList.contains(category + '-section')) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                // After a short delay, show matching items
                setTimeout(() => {
                    filteredItems = [];
                    galleryItems.forEach(item => {
                        if (item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            filteredItems.push(item);
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }, 300);
            }
        });
    });
    
    // Open the modal with selected image
    function openModal(item) {
        const img = item.querySelector('img');
        modalImg.src = img.src;
        
        // Calculate current index in filtered items for navigation
        currentIndex = filteredItems.indexOf(item);
        
        // Show the modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
    }
    
    // Close the modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Restore scrolling on the body
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(-1);
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(1);
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('show')) {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (event.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
    });
    
    // Navigate between images
    function navigateImage(direction) {
        currentIndex += direction;
        
        // Loop back to the start or end if needed
        if (currentIndex >= filteredItems.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = filteredItems.length - 1;
        }
        
        // Update modal with new image
        const newImg = filteredItems[currentIndex].querySelector('img');
        
        // Animate the image change
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = newImg.src;
            modalImg.style.opacity = '1';
        }, 200);
    }
    
    // Add transition for modal image
    modalImg.style.transition = 'opacity 0.2s ease';
});















// JavaScript for Meet The Creator Section Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add particle effects to background
    createParticles();
});

// Initialize skill progress bars with animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        
        // Use timeout to ensure the animation starts after page load
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 500);
    });
}

// Handle scroll-based animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check on load
    checkVisibility(animateElements);
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        checkVisibility(animateElements);
    });
}

// Check if elements are visible in viewport
function checkVisibility(elements) {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Create dynamic particles in the background
function createParticles() {
    const particlesContainer = document.querySelector('.creator-bg-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

// Create individual particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    particle.style.left = `${xPos}%`;
    particle.style.top = `${yPos}%`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 15 + 10;
    particle.style.animation = `floatParticle ${duration}s infinite ease-in-out`;
    
    // Random animation delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = `${delay}s`;
    
    // Add to container
    container.appendChild(particle);
}


// Add CSS particle styles dynamically
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            pointer-events: none;
        }
        
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(calc(20px + 5%), calc(-30px - 10%)); }
            50% { transform: translate(calc(40px + 20%), 0); }
            75% { transform: translate(calc(20px + 5%), calc(30px + 10%)); }
        }
    `;
    document.head.appendChild(style);
}

// Call to add particle styles
addParticleStyles();