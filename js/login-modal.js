// Login Modal JavaScript for Cart Integration

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in (using localStorage for demo)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(
    ".add-to-cart, .btn-secondary"
  );

  // Add event listeners to all "Add to Cart" buttons
  if (addToCartButtons) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        // If not logged in, show login modal
        if (!isLoggedIn) {
          e.preventDefault();
          showLoginModal();
        } else {
          // User is logged in, proceed with adding to cart
          // This will be handled by your normal cart functionality
          handleAddToCart(this);
        }
      });
    });
  }

  // Function to show login modal
  function showLoginModal() {
    // Check if modal already exists
    let loginModal = document.getElementById("login-modal");

    // If not, create it
    if (!loginModal) {
      loginModal = createLoginModal();
    }

    // Show the modal
    loginModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  // Function to create login modal
  function createLoginModal() {
    // Create modal container
    const modal = document.createElement("div");
    modal.id = "login-modal";
    modal.className = "login-modal";

    // Create modal content
    modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <h2 class="modal-title">Login to Continue</h2>
                    
                    <div class="form-toggles">
                        <button id="modal-login-toggle" class="form-toggle active">Login</button>
                        <button id="modal-register-toggle" class="form-toggle">Register</button>
                    </div>
                    
                    <!-- Login Form -->
                    <form id="modal-login-form" class="auth-form">
                        <div class="form-group">
                            <label for="modal-login-email">Email</label>
                            <input type="email" id="modal-login-email" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal-login-password">Password</label>
                            <input type="password" id="modal-login-password" class="form-input" required>
                            <div class="forgot-password">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn-primary btn-full">
                            Login
                        </button>
                        
                        <div class="form-divider">
                            <span>or</span>
                        </div>
                        
                        <button type="button" class="btn-google">
                            <i class="fab fa-google"></i>
                            <span>Continue with Google</span>
                        </button>
                    </form>
                    
                    <!-- Register Form -->
                    <form id="modal-register-form" class="auth-form hidden">
                        <div class="form-group">
                            <label for="modal-register-name">Full Name</label>
                            <input type="text" id="modal-register-name" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal-register-email">Email</label>
                            <input type="email" id="modal-register-email" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal-register-password">Password</label>
                            <input type="password" id="modal-register-password" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal-register-confirm-password">Confirm Password</label>
                            <input type="password" id="modal-register-confirm-password" class="form-input" required>
                        </div>
                        
                        <div class="form-checkbox">
                            <input type="checkbox" id="modal-register-terms" required>
                            <label for="modal-register-terms">
                                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </label>
                        </div>
                        
                        <button type="submit" class="btn-primary btn-full">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        `;

    // Add modal to body
    document.body.appendChild(modal);

    // Close button event listener
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", function () {
      closeLoginModal(modal);
    });

    // Close when clicking outside
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeLoginModal(modal);
      }
    });

    // Toggle between login and register forms
    const modalLoginToggle = document.getElementById("modal-login-toggle");
    const modalRegisterToggle = document.getElementById(
      "modal-register-toggle"
    );
    const modalLoginForm = document.getElementById("modal-login-form");
    const modalRegisterForm = document.getElementById("modal-register-form");

    modalLoginToggle.addEventListener("click", function () {
      modalLoginToggle.classList.add("active");
      modalRegisterToggle.classList.remove("active");
      modalLoginForm.classList.remove("hidden");
      modalRegisterForm.classList.add("hidden");
    });

    modalRegisterToggle.addEventListener("click", function () {
      modalRegisterToggle.classList.add("active");
      modalLoginToggle.classList.remove("active");
      modalRegisterForm.classList.remove("hidden");
      modalLoginForm.classList.add("hidden");
    });

    // Login form submission
    modalLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("modal-login-email").value;
      const password = document.getElementById("modal-login-password").value;

      // Validate input
      if (!email || !password) {
        showModalMessage(modal, "Please fill in all fields", "error");
        return;
      }

      // Here you would normally send data to your Java backend
      // For demo, we'll simulate a successful login

      // Example of data to send to server
      const loginData = {
        email: email,
        password: password,
      };

      console.log("Login data to send to server:", loginData);

      // Simulate successful login
      simulateModalLogin(email, modal);
    });

    // Register form submission
    modalRegisterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("modal-register-name").value;
      const email = document.getElementById("modal-register-email").value;
      const password = document.getElementById("modal-register-password").value;
      const confirmPassword = document.getElementById(
        "modal-register-confirm-password"
      ).value;
      const terms = document.getElementById("modal-register-terms").checked;

      // Validate input
      if (!name || !email || !password || !confirmPassword) {
        showModalMessage(modal, "Please fill in all fields", "error");
        return;
      }

      if (password !== confirmPassword) {
        showModalMessage(modal, "Passwords do not match", "error");
        return;
      }

      if (!terms) {
        showModalMessage(
          modal,
          "Please agree to the terms and conditions",
          "error"
        );
        return;
      }

      // Here you would normally send data to your Java backend
      // For demo, we'll simulate a successful registration

      // Example of data to send to server
      const registerData = {
        name: name,
        email: email,
        password: password,
      };

      console.log("Registration data to send to server:", registerData);

      // Simulate successful registration
      showModalMessage(modal, "Registration successful!", "success");

      // Reset form
      modalRegisterForm.reset();

      // Switch to login form
      modalLoginToggle.click();
    });

    return modal;
  }

  // Function to close login modal
  function closeLoginModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Function to simulate login from modal
  function simulateModalLogin(email, modal) {
    // Save user info to localStorage (just for demo purposes)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // Show success message
    showModalMessage(modal, "Login successful!", "success");

    // Close modal after 1.5 seconds
    setTimeout(function () {
      closeLoginModal(modal);

      // Refresh the page to update login state
      // In a real app, you might handle this differently
      location.reload();
    }, 1500);
  }

  // Function to show messages in modal
  function showModalMessage(modal, message, type) {
    // Create or get message element in modal
    let messageElement = modal.querySelector(".modal-message");

    if (!messageElement) {
      messageElement = document.createElement("div");
      messageElement.className = "modal-message";

      // Style the message
      messageElement.style.padding = "0.75rem";
      messageElement.style.marginBottom = "1rem";
      messageElement.style.borderRadius = "0.25rem";
      messageElement.style.textAlign = "center";
      messageElement.style.fontWeight = "500";

      // Insert at the top of the modal body
      const modalBody = modal.querySelector(".modal-body");
      modalBody.insertBefore(messageElement, modalBody.firstChild);
    }

    // Set message and type
    messageElement.textContent = message;

    if (type === "error") {
      messageElement.style.backgroundColor = "#fee2e2";
      messageElement.style.color = "#b91c1c";
    } else if (type === "success") {
      messageElement.style.backgroundColor = "#dcfce7";
      messageElement.style.color = "#15803d";
    }

    // Show the message
    messageElement.style.display = "block";

    // Hide after 3 seconds
    setTimeout(function () {
      messageElement.style.display = "none";
    }, 3000);
  }

  // Function to handle adding to cart (after login)
  function handleAddToCart(button) {
    // Get product info from button's parent elements
    const productCard = button.closest(".product-card");

    if (!productCard) return;

    // Find product details
    const productName = productCard.querySelector("h3")
      ? productCard.querySelector("h3").textContent
      : "Product";

    // Store original button text
    const originalText = button.textContent;

    // Visual feedback
    button.textContent = "Added ✓";

    // Update cart count in navbar
    updateCartCount(1);

    // Disable button temporarily
    button.disabled = true;

    // Reset button after animation
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);

    console.log(`Added to cart: ${productName}`);

    // In a real application, you would send this data to your Java backend
    const productData = {
      productId: productCard.dataset.id || Math.floor(Math.random() * 1000),
      name: productName,
      quantity: 1,
    };

    console.log("Product data to send to server:", productData);
  }

  // Function to update cart count in navbar
  function updateCartCount(increment = 0) {
    const cartBadge = document.querySelector(".cart-badge");

    if (cartBadge) {
      let count = parseInt(cartBadge.textContent || "0");
      count += increment;
      cartBadge.textContent = count;

      // Add a little animation
      cartBadge.classList.add("pulse");
      setTimeout(() => {
        cartBadge.classList.remove("pulse");
      }, 300);
    }
  }

  // Check if we should display logged-in user info
  function updateUserInterface() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userEmail = localStorage.getItem("userEmail");

    // Find login/register button (if any)
    const loginButton = document.querySelector(".btn-login");

    if (isLoggedIn && loginButton) {
      // Replace login button with user info
      loginButton.innerHTML = `
                <i class="fas fa-user"></i>
                <span class="user-email">${userEmail}</span>
            `;

      // Add dropdown menu for logout
      loginButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Create dropdown if it doesn't exist
        let dropdown = document.querySelector(".user-dropdown");

        if (!dropdown) {
          dropdown = document.createElement("div");
          dropdown.className = "user-dropdown";
          dropdown.innerHTML = `
                        <ul>
                            <li><a href="#"><i class="fas fa-user-circle"></i> My Account</a></li>
                            <li><a href="#"><i class="fas fa-shopping-bag"></i> My Orders</a></li>
                            <li><a href="#" id="logout-button"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                        </ul>
                    `;

          // Style the dropdown
          dropdown.style.position = "absolute";
          dropdown.style.top = "100%";
          dropdown.style.right = "0";
          dropdown.style.backgroundColor = "white";
          dropdown.style.borderRadius = "0.5rem";
          dropdown.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
          dropdown.style.minWidth = "200px";
          dropdown.style.marginTop = "0.5rem";
          dropdown.style.zIndex = "100";
          dropdown.style.overflow = "hidden";

          // Style the list
          const ul = dropdown.querySelector("ul");
          ul.style.listStyle = "none";
          ul.style.padding = "0";
          ul.style.margin = "0";

          // Style the list items
          const lis = dropdown.querySelectorAll("li");
          lis.forEach((li) => {
            li.style.borderBottom = "1px solid #f3f4f6";
            li.style.margin = "0";

            const a = li.querySelector("a");
            a.style.display = "block";
            a.style.padding = "0.75rem 1rem";
            a.style.color = "#4b5563";
            a.style.textDecoration = "none";
            a.style.transition = "background-color 0.2s";

            // Hover effect
            a.addEventListener("mouseenter", function () {
              a.style.backgroundColor = "#f3f4f6";
            });

            a.addEventListener("mouseleave", function () {
              a.style.backgroundColor = "";
            });
          });

          // Remove bottom border from last item
          lis[lis.length - 1].style.borderBottom = "none";

          // Add logout functionality
          const logoutButton = dropdown.querySelector("#logout-button");
          logoutButton.addEventListener("click", function (e) {
            e.preventDefault();

            // Clear localStorage
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");

            // Refresh the page to update UI
            location.reload();
          });

          // Add dropdown to button
          loginButton.parentNode.style.position = "relative";
          loginButton.parentNode.appendChild(dropdown);

          // Close dropdown when clicking outside
          document.addEventListener("click", function (e) {
            if (
              !loginButton.contains(e.target) &&
              !dropdown.contains(e.target)
            ) {
              dropdown.style.display = "none";
            }
          });

          // Show dropdown
          dropdown.style.display = "block";
        } else {
          // Toggle dropdown visibility
          dropdown.style.display =
            dropdown.style.display === "none" ? "block" : "none";
        }
      });
    }
  }

  // Call updateUserInterface when the page loads
  updateUserInterface();
});

// Add a pulse animation for the cart badge
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .cart-badge.pulse {
        animation: pulse 0.3s ease-in-out;
    }
    
    .user-email {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
document.head.appendChild(style);
