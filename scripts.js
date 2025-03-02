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

// Add this to your scripts.js file

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