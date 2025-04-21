// Main JavaScript file for FineFish website

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }
});

// Search functionality
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

if (searchBar && searchInput && searchButton) {
  // Focus effect
  searchInput.addEventListener("focus", function () {
    searchBar.classList.add("focused");
  });

  searchInput.addEventListener("blur", function () {
    searchBar.classList.remove("focused");
  });

  // Search functionality
  searchButton.addEventListener("click", function () {
    performSearch();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });

  // Search function
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm !== "") {
      // Show search in progress
      searchButton.textContent = "Searching...";

      // Simulate search delay
      setTimeout(() => {
        // For demo purposes: if search contains "salmon", "tuna", or "fish", show success
        if (
          searchTerm.includes("salmon") ||
          searchTerm.includes("tuna") ||
          searchTerm.includes("fish")
        ) {
          // Reset and show a success message
          alert(`Found products matching "${searchTerm}"`);
          searchButton.textContent = "Search";
        } else {
          // Reset and show no results
          alert(`No products found matching "${searchTerm}"`);
          searchButton.textContent = "Search";
        }
      }, 800);
    }
  }
}

// Cart badge display
const cartCount = 3; // This would normally come from your cart system
const cartBadge = document.querySelector(".cart-badge");

if (cartBadge) {
  cartBadge.textContent = cartCount;
}

// Add to cart buttons
const addToCartButtons = document.querySelectorAll(".btn-secondary");

addToCartButtons.forEach((button) => {
  // Only target buttons with "Add to Cart" text
  if (button.textContent.trim() === "Add to Cart") {
    button.addEventListener("click", function () {
      // Store original text
      const originalText = this.textContent;

      // Animation effect when adding to cart
      this.innerHTML = "Added ✓";

      // Simulate adding to cart
      if (cartBadge) {
        const currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + 1;
      }

      // Disable button temporarily
      this.disabled = true;

      // Reset button after animation
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 1500);
    });
  }
});

// Handle newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = this.querySelector("input[type='email']");
    const submitBtn = this.querySelector("button[type='submit']");

    if (emailInput && emailInput.value.trim() !== "") {
      // Store original button text
      const originalBtnText = submitBtn.textContent;

      // Show success state
      submitBtn.textContent = "Subscribed!";
      submitBtn.style.backgroundColor = "#4CAF50";
      emailInput.value = "";

      // Reset button after delay
      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.style.backgroundColor = "";
      }, 3000);
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideMenu = navMenu.contains(event.target);
  const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

  if (
    navMenu.classList.contains("show") &&
    !isClickInsideMenu &&
    !isClickOnMenuBtn
  ) {
    navMenu.classList.remove("show");
  }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for fixed header
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
      }
    }
  });
});

// Add scroll effect for navbar
const navbar = document.querySelector(".navbar");

if (navbar) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      navbar.style.padding = "0.75rem 0";
    } else {
      navbar.style.boxShadow = "";
      navbar.style.padding = "1rem 0";
    }
  });
}

