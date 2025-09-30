// Modified photographyscript.js

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const categoryButtons = document.querySelectorAll('.category-btn');
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-photo-modal');
    const prevBtn = document.querySelector('.modal-prev-btn');
    const nextBtn = document.querySelector('.modal-next-btn');
  
    let filteredItems = galleryItems.slice();
    let currentIndex = 0;
    
    // Create low-quality thumbnails for all gallery images
    function setupLowQualityPreviews() {
      galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const originalSrc = img.src;
        
        // Store original high-quality image path in data-high attribute
        img.setAttribute('data-high', originalSrc);
        
        // Create a low-quality version of the image using canvas
        createLowQualityThumb(img, originalSrc);
        
        // Add loading="lazy" attribute to defer image loading
        img.setAttribute('loading', 'lazy');
      });
    }
    
    // Function to create a low-quality thumbnail using canvas
    function createLowQualityThumb(imgElement, originalSrc) {
      // Create a temporary image to get the original dimensions
      const tempImg = new Image();
      tempImg.crossOrigin = "Anonymous";
      
      tempImg.onload = function() {
        // Create canvas for thumbnail generation
        const canvas = document.createElement('canvas');
        // Reduced size - approximately 10-20% of original dimensions
        const scaleFactor = 0.15;
        canvas.width = tempImg.width * scaleFactor;
        canvas.height = tempImg.height * scaleFactor;
        
        // Draw reduced image to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
        
        // Get low-quality image as data URL (low quality JPEG)
        const lowQualitySrc = canvas.toDataURL('image/jpeg', 0.1);
        
        // Set the low-quality source
        imgElement.src = lowQualitySrc;
      };
      
      // Set source to trigger loading
      tempImg.src = originalSrc;
      
      // For images that fail to load (e.g., due to CORS), keep original with blur
      tempImg.onerror = function() {
        console.log('Could not create thumbnail for: ' + originalSrc);
        imgElement.style.filter = 'blur(5px)';
        imgElement.classList.add('loading');
        
        // Attempt to load actual image with reduced quality
        const actualImg = new Image();
        actualImg.onload = function() {
          imgElement.style.filter = 'none';
          imgElement.classList.remove('loading');
        };
        actualImg.src = originalSrc;
      };
    }
    
    // Initial state: add fade-out effect & attach modal open event
    galleryItems.forEach(item => {
      item.classList.add('fade-out');
      item.addEventListener('click', () => openModal(item));
    });
  
    // Staggered fade-in animation
    function initGallery() {
      setupLowQualityPreviews(); // Initialize low-quality previews
      
      galleryItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('fade-out');
          item.classList.add('fade-in');
        }, 30 * index);
      });
    }
    initGallery();
  
    // Filter gallery items
    function filterGallery(category) {
      filteredItems = [];
      galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.classList.remove('hidden');
          filteredItems.push(item);
        } else {
          item.classList.add('hidden');
        }
      });
    }
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-category');
        filterGallery(category);
      });
    });
  
    // Open modal with low-res to high-res image transition
    function openModal(item) {
      const img = item.querySelector('img');
      currentIndex = filteredItems.indexOf(item);
      modal.style.display = 'flex';
      requestAnimationFrame(() => {
        modal.classList.add('show');
      });
      document.body.style.overflow = 'hidden';
  
      // Always show low-quality image first (from the thumbnail)
      modalImg.src = img.src;
      modalImg.style.filter = 'blur(5px)';
      
      // Get high-res source from data-high attribute
      const highResSrc = img.getAttribute('data-high');
      
      if (highResSrc) {
        // Load high-res image in background
        const highResImg = new Image();
        highResImg.src = highResSrc;
        highResImg.onload = function() {
          // Replace with high quality once loaded
          modalImg.src = highResSrc;
          modalImg.style.filter = 'none';
        };
      } else {
        // Fallback if no high-res specified
        modalImg.style.filter = 'none';
      }
    }
  
    function closeModal() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  
    // Navigate between images with the same low-to-high res swap
    function navigateImage(direction) {
      currentIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
      const newImg = filteredItems[currentIndex].querySelector('img');
      modalImg.style.opacity = '0';
      
      setTimeout(() => {
        // Show low-quality version first
        modalImg.src = newImg.src;
        modalImg.style.filter = 'blur(5px)';
        
        // Get high-res source and load it
        const highResSrc = newImg.getAttribute('data-high');
        
        if (highResSrc) {
          const highResImg = new Image();
          highResImg.src = highResSrc;
          highResImg.onload = function() {
            modalImg.src = highResSrc;
            modalImg.style.filter = 'none';
          };
        } else {
          modalImg.style.filter = 'none';
        }
        
        modalImg.style.opacity = '1';
      }, 200);
    }
  
    prevBtn.addEventListener('click', e => {
      e.stopPropagation();
      navigateImage(-1);
    });
    
    nextBtn.addEventListener('click', e => {
      e.stopPropagation();
      navigateImage(1);
    });
  
    document.addEventListener('keydown', e => {
      if (modal.classList.contains('show')) {
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowLeft') navigateImage(-1);
        else if (e.key === 'ArrowRight') navigateImage(1);
      }
    });
  
    // Smooth opacity transition for modal image
    modalImg.style.transition = 'opacity 0.2s ease';
  });