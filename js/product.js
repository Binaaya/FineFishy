// Product page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Sample data for products and categories
  const categories = [
    { id: "all", name: "All Products", count: 12 },
    { id: "fresh-fish", name: "Fresh Fish", count: 5 },
    { id: "shellfish", name: "Shellfish", count: 4 },
    { id: "premium", name: "Premium Selection", count: 3 },
    { id: "seasonal", name: "Seasonal Catches", count: 2 },
  ];

  const products = [
    {
      id: 1,
      name: "Wild Alaskan Salmon",
      description: "Sustainably caught in Alaska",
      price: 24.99,
      image: "assets/images/products/salmon.jpg",
      category: "fresh-fish",
      tag: "bestseller",
      unit: "/lb",
    },
    {
      id: 2,
      name: "Maine Lobster Tails",
      description: "Fresh from the Atlantic",
      price: 39.99,
      image: "assets/images/products/lobster.jpg",
      category: "shellfish",
      unit: " each",
    },
    {
      id: 3,
      name: "Diver Scallops",
      description: "Hand-harvested, dayboat scallops",
      price: 29.99,
      image: "assets/images/products/scallops.jpg",
      category: "shellfish",
      tag: "new",
      unit: "/lb",
    },
    {
      id: 4,
      name: "Sushi-Grade Tuna",
      description: "Premium yellowfin tuna",
      price: 34.99,
      image: "assets/images/products/tuna.jpg",
      category: "premium",
      unit: "/lb",
    },
    {
      id: 5,
      name: "Pacific Cod",
      description: "Mild, flaky white fish",
      price: 18.99,
      image: "assets/images/products/salmon.jpg",
      category: "fresh-fish",
      unit: "/lb",
    },
    {
      id: 6,
      name: "King Crab Legs",
      description: "Sweet and succulent Alaskan crab",
      price: 49.99,
      image: "assets/images/products/lobster.jpg",
      category: "shellfish",
      tag: "premium",
      unit: "/lb",
    },
    {
      id: 7,
      name: "Halibut Fillet",
      description: "Lean and firm white fish",
      price: 32.99,
      image: "assets/images/products/tuna.jpg",
      category: "fresh-fish",
      unit: "/lb",
    },
    {
      id: 8,
      name: "Jumbo Shrimp",
      description: "Perfect for grilling or cocktails",
      price: 26.99,
      image: "assets/images/products/scallops.jpg",
      category: "shellfish",
      unit: "/lb",
    },
    {
      id: 9,
      name: "Scottish Salmon",
      description: "Farm-raised in pristine waters",
      price: 22.99,
      image: "assets/images/products/salmon.jpg",
      category: "fresh-fish",
      unit: "/lb",
    },
  ];

  // DOM elements
  const categoryList = document.getElementById("categoryList");
  const productsGrid = document.getElementById("productsGrid");
  const productsTitle = document.getElementById("productsTitle");
  const sortOptions = document.querySelector(".sort-options");

  // Current state
  let currentCategory = "all";
  let currentSort = "featured";

  // Initialize the page
  function init() {
    renderCategories();
    renderProducts();
    setupEventListeners();
  }

  // Render category sidebar
  function renderCategories() {
    categoryList.innerHTML = "";

    categories.forEach((category) => {
      const li = document.createElement("li");
      li.className = "category-item";
      const isActive = category.id === currentCategory;

      li.innerHTML = `
          <a href="#" data-category="${category.id}" class="category-link ${
        isActive ? "active" : ""
      }">
            ${category.name} <span class="category-count">(${
        category.count
      })</span>
          </a>
        `;

      categoryList.appendChild(li);
    });
  }

  // Render products grid
  function renderProducts() {
    // Filter products by category
    let filteredProducts = products;
    if (currentCategory !== "all") {
      filteredProducts = products.filter(
        (product) => product.category === currentCategory
      );
    }

    // Sort products
    sortProducts(filteredProducts);

    // Update title
    const categoryObj = categories.find((cat) => cat.id === currentCategory);
    productsTitle.textContent = categoryObj ? categoryObj.name : "All Products";

    // Render product grid
    if (filteredProducts.length === 0) {
      renderEmptyState();
    } else {
      renderProductGrid(filteredProducts);
    }
  }

  // Sort products based on selected option
  function sortProducts(productList) {
    switch (currentSort) {
      case "price-asc":
        productList.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        productList.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // For demo purposes, just reverse the list
        productList.reverse();
        break;
      default:
        // Featured - no sort needed
        break;
    }

    return productList;
  }

  // Render the product grid
  function renderProductGrid(productList) {
    productsGrid.innerHTML = "";

    productList.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
            ${
              product.tag
                ? `<div class="product-tag ${
                    product.tag
                  }">${product.tag.toUpperCase()}</div>`
                : ""
            }
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
              <span class="product-price">${product.price}${product.unit}</span>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;

      productsGrid.appendChild(productCard);
    });
  }

  // Render empty state when no products match
  function renderEmptyState() {
    productsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-fish"></i>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your criteria. Try a different category or search term.</p>
        </div>
      `;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Category selection
    categoryList.addEventListener("click", function (e) {
      e.preventDefault();

      const categoryLink = e.target.closest("a[data-category]");
      if (categoryLink) {
        currentCategory = categoryLink.dataset.category;
        renderCategories();
        renderProducts();
      }
    });

    // Sort options
    sortOptions.addEventListener("change", function () {
      const selectedOption = this.value;

      switch (selectedOption) {
        case "Price: Low to High":
          currentSort = "price-asc";
          break;
        case "Price: High to Low":
          currentSort = "price-desc";
          break;
        case "Newest First":
          currentSort = "newest";
          break;
        default:
          currentSort = "featured";
          break;
      }

      renderProducts();
    });
  }

  // Initialize the page
  init();
});
