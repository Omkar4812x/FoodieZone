document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // Global Interactive Gold Star Particle System (Website-wide)
  // ==========================================
  const globalCanvas = document.getElementById('globalStarCanvas');
  if (globalCanvas) {
    const ctx = globalCanvas.getContext('2d');
    let width = (globalCanvas.width = window.innerWidth);
    let height = (globalCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = globalCanvas.width = window.innerWidth;
      height = globalCanvas.height = window.innerHeight;
    });

    const stars = [];
    const numStars = 85;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        isSparkle: Math.random() > 0.6,
      });
    }

    function drawSparkleStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }

    function animateGlobalStars() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;

        // Twinkle
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }

        // Screen wrap
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        ctx.save();
        if (s.isSparkle) {
          drawSparkleStar(
            ctx,
            s.x,
            s.y,
            4,
            s.radius * 2.2,
            s.radius * 0.7,
            `rgba(201, 160, 95, ${s.alpha})`
          );
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 125, 47, ${s.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#c9a05f';
          ctx.fill();
        }
        ctx.restore();
      });

      requestAnimationFrame(animateGlobalStars);
    }
    animateGlobalStars();
  }

  // ==========================================
  // 0. Full-Screen Gourmet Food Background Loader
  // ==========================================
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('gourmetProgressBar');

  if (preloader) {
    if (progressBar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;

        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            preloader.classList.add('loaded');
          }, 300);
        }
      }, 25);
    } else {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 500);
    }

    // Failsafe: Ensure preloader always dismisses even if delayed
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 2200);
  }
  // ==========================================
  // Automatic Hero Video Audio Handler (ON on Home, OFF on Scroll)
  // ==========================================
  const heroBgVideo = document.querySelector('.hero-bg-video');
  const heroSection = document.getElementById('home');

  if (heroBgVideo) {
    function tryUnmuteAudio() {
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      const isAtHome = window.scrollY < heroHeight - 150;

      if (isAtHome) {
        heroBgVideo.muted = false;
        heroBgVideo.play().catch(() => {
          heroBgVideo.muted = true;
          heroBgVideo.play().catch(() => {});
        });
      } else {
        heroBgVideo.muted = true;
      }
    }

    tryUnmuteAudio();

    const unlockSound = () => {
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      if (window.scrollY < heroHeight - 150) {
        heroBgVideo.muted = false;
        heroBgVideo.play().catch(() => {});
      }
    };
    window.addEventListener('click', unlockSound, { once: true });
    window.addEventListener('touchstart', unlockSound, { once: true });

    window.addEventListener('scroll', () => {
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      const isAtHome = window.scrollY < heroHeight - 150;

      if (!isAtHome) {
        heroBgVideo.muted = true;
      } else {
        heroBgVideo.muted = false;
        heroBgVideo.play().catch(() => {});
      }
    });
  }



  // ==========================================
  // 1. Glassmorphic Navbar on Scroll & Active Link Highlight
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // Smooth Scroll with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Close mobile navbar if open
        const navMenu = document.querySelector('.nav-menu');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        }

        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Active Link Indicator on Scroll
  function updateActiveNavLink() {
    let scrollY = window.pageYOffset;
    const navbarHeight = navbar ? navbar.offsetHeight : 80;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navbarHeight - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);

  // ==========================================
  // 2. Catering Menu & Dynamic Featured Dish Image Switcher
  // ==========================================
  const categoryDefaultImages = {
    Breakfast: './img/breakfast-dish.png',
    Brunch: './img/footer-4.jpg',
    Lunch: './img/burger.webp',
    Dinner: './img/lamb-shank.webp',
  };

  const featuredMenuImg = document.getElementById('featuredMenuImg');

  function updateFeaturedImage(imageSrc, altText) {
    if (!featuredMenuImg || !imageSrc) return;
    featuredMenuImg.style.opacity = '0';
    featuredMenuImg.style.transform = 'scale(0.95)';
    featuredMenuImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      featuredMenuImg.src = imageSrc;
      if (altText) featuredMenuImg.alt = altText;
      featuredMenuImg.style.opacity = '1';
      featuredMenuImg.style.transform = 'scale(1)';
    }, 300);
  }

  const menuData = {
    Breakfast: [
      {
        id: 'b1',
        name: 'Garlic Butter Grilled Salmon',
        description:
          'Tender salmon fillet flame-grilled to perfection, brushed with house-infused garlic butter and paired with sautéed seasonal greens.',
        price: 'Rs.950.00',
        tags: ['🔥 Chef Choice', '🍷 Pinot Noir Pairing', '🌾 Gluten-Free'],
        pairing: 'Pairs elegantly with chilled Pinot Noir or Crisp Chardonnay.',
        image: './img/breakfast-dish.png',
      },
      {
        id: 'b2',
        name: 'Tropical Coconut Chia Parfait',
        description:
          'Layers of organic chia seed pudding, fresh ripe mangos, toasted coconut flakes, artisan granola, and raw organic honey.',
        price: 'Rs.580.00',
        tags: ['🌱 Superfood', '🍯 Organic Sweetened', '🌿 Vegetarian'],
        pairing:
          'Recommended with Fresh Press Green Juice or Sparkling Mimosa.',
        image: './img/footer-2.jpg',
      },
      {
        id: 'b3',
        name: 'Truffle Mushroom Egg Omelette',
        description:
          'Fluffy three-egg omelette stuffed with sautéed wild porcini mushrooms, white truffle oil, fresh tarragon, and aged Gruyère.',
        price: 'Rs.650.00',
        tags: ['✨ House Special', '🧀 Aged Gruyère', '🌱 Vegetarian'],
        pairing: 'Pairs beautifully with French Press Coffee or Champagne.',
        image: './img/food-dish.webp',
      },
      {
        id: 'b4',
        name: 'Summer Garden Pesto Pasta',
        description:
          'Al dente tagliatelle tossed with fresh sweet basil pesto, vine-ripened cherry tomatoes, pine nuts, and aged parmesan shavings.',
        price: 'Rs.500.00',
        tags: ['🌿 Vegetarian', '🇮🇹 Italian Artisan', '🥜 Contains Nuts'],
        pairing: 'Pairs wonderfully with Sauvignon Blanc or Pinot Grigio.',
        image: './img/pasta.webp',
      },
      {
        id: 'b5',
        name: 'Crispy Herb Chicken Supreme',
        description:
          'Golden pan-roasted chicken breast with crispy skin, served over pancetta potato salad and finished with a rich red wine reduction.',
        price: 'Rs.480.00',
        tags: ['🍗 Farm Raised', '🍷 Red Wine Glaze', '🔥 Guest Favorite'],
        pairing: 'Complements a medium-bodied Cabernet Sauvignon.',
        image: './img/menu-dish.webp',
      },
    ],
    Brunch: [
      {
        id: 'br1',
        name: 'Avocado Tartine & Poached Eggs',
        description:
          'Artisan sourdough toast topped with creamy smashed avocado, heirloom tomatoes, organic poached eggs, and chili flakes.',
        price: 'Rs.720.00',
        tags: ['🥑 Fresh Avocado', '🥚 Organic Eggs', '🌱 Healthy Choice'],
        pairing: 'Pairs with Fresh Citrus Cold Brew or Prosecco.',
        image: './img/footer-4.jpg',
      },
      {
        id: 'br2',
        name: 'Belgian Waffle Delight',
        description:
          'Golden crispy Belgian waffles served with wild berry compote, Chantilly cream, toasted pecans, and pure Canadian maple syrup.',
        price: 'Rs.590.00',
        tags: ['🍓 Fresh Berries', '🍁 Pure Maple Syrup', ' Sweet Selection'],
        pairing: 'Pairs with Cappuccino or Sparkling Rosé.',
        image: './img/donut.webp',
      },
      {
        id: 'br3',
        name: 'Smoked Salmon Benedict',
        description:
          'Toasted English muffins layered with Norwegian smoked salmon, poached eggs, and silky lemon-infused hollandaise sauce.',
        price: 'Rs.890.00',
        tags: ['🐟 Norwegian Salmon', '👑 Signature Dish', '🍳 Hollandaise'],
        pairing: 'Pairs with Classic Mimosa or Bloody Mary.',
        image: './img/food-dish.webp',
      },
      {
        id: 'br4',
        name: 'Mediterranean Shakshuka',
        description:
          'Farm eggs gently poached in a rich spiced tomato, bell pepper, and cumin ragout, served with warm crusty sourdough.',
        price: 'Rs.640.00',
        tags: ['🌶️ Spiced Tomato', '🍞 Sourdough', '🌿 Vegetarian'],
        pairing: 'Pairs with Iced Mint Tea or Craft Lager.',
        image: './img/footer-1.jpg',
      },
      {
        id: 'br5',
        name: 'French Brioche Toast',
        description:
          'Thick-cut brioche soaked in vanilla bean custard, pan-fried to golden perfection, caramelized bananas, and roasted pecans.',
        price: 'Rs.550.00',
        tags: ['🍞 Artisan Brioche', '🍌 Caramelized', '✨ Chef Favorite'],
        pairing: 'Pairs with Caramel Macchiato or Dessert Wine.',
        image: './img/donut.webp',
      },
    ],
    Lunch: [
      {
        id: 'l1',
        name: 'Prime Wagyu Beef Burger',
        description:
          '200g Wagyu beef patty, aged truffle cheddar, caramelized balsamic onions, arugula, and truffle aioli on a toasted brioche bun.',
        price: 'Rs.1,100.00',
        tags: ['🥩 Prime Wagyu', '🧀 Truffle Cheddar', '🔥 Bestseller'],
        pairing: 'Pairs with Craft IPA or Full-Bodied Syrah.',
        image: './img/burger.webp',
      },
      {
        id: 'l2',
        name: 'Wood-Fired Margherita Pizza',
        description:
          'San Marzano tomato sauce, fresh mozzarella di bufala, organic basil leaves, and extra virgin olive oil baked in wood-fired oven.',
        price: 'Rs.780.00',
        tags: ['🍕 Wood-Fired', '🇮🇹 San Marzano', '🌿 Vegetarian'],
        pairing: 'Pairs with Chianti Classico or Italian Pilsner.',
        image: './img/food-platter.webp',
      },
      {
        id: 'l3',
        name: 'Seafood Paella Royale',
        description:
          'Saffron-infused bomba rice cooked with jumbo tiger prawns, calamari, blue mussels, chorizo, and fresh sweet peas.',
        price: 'Rs.1,250.00',
        tags: ['🦐 Seafood Deluxe', '🇪🇸 Spanish Saffron', '👑 Signature'],
        pairing: 'Pairs with Albariño or Sangria Blanca.',
        image: './img/footer-1.jpg',
      },
      {
        id: 'l4',
        name: 'Grilled Chicken Caesar Salad',
        description:
          'Crisp romaine heart leaves, herb-marinated grilled chicken breast, shaved Parmesan Reggiano, and garlic sourdough croutons.',
        price: 'Rs.620.00',
        tags: ['🥗 Fresh & Light', '🍗 Herb Marinated', '🌱 Low Carb'],
        pairing: 'Pairs with Crisp Sauvignon Blanc.',
        image: './img/footer-5.jpg',
      },
      {
        id: 'l5',
        name: 'Pan-Seared Sea Bass',
        description:
          'Wild Chilean sea bass served over lemon-asparagus risotto, cherry tomato confit, and caper beurre blanc.',
        price: 'Rs.1,150.00',
        tags: ['🐟 Wild Caught', '🍋 Lemon Beurre Blanc', '✨ Gourmet'],
        pairing: 'Pairs with Chablis or Sancerre Blanc.',
        image: './img/menu-dish.webp',
      },
    ],
    Dinner: [
      {
        id: 'd1',
        name: 'Filet Mignon with Red Wine Reduction',
        description:
          'Prime Black Angus beef tenderloin grilled to your liking, served with truffle mashed potatoes, grilled asparagus, and bordelaise sauce.',
        price: 'Rs.1,650.00',
        tags: ['🥩 Black Angus', '🍄 Truffle Mash', '👑 Luxury Cut'],
        pairing: 'Pairs with Vintage Cabernet Sauvignon or Bordeaux.',
        image: './img/food-dish.webp',
      },
      {
        id: 'd2',
        name: 'Herb Crust Braised Lamb Shank',
        description:
          'Slow 8-hour braised lamb shank in rosemary-thyme red wine jus, served over velvety garlic parmesan polenta.',
        price: 'Rs.1,450.00',
        tags: ['🍖 8-Hour Braised', '🍷 Red Wine Jus', '🔥 Chef Special'],
        pairing: 'Pairs with Rich Malbec or Rioja Gran Reserva.',
        image: './img/lamb-shank.webp',
      },
      {
        id: 'd3',
        name: 'Lobster Thermidor Deluxe',
        description:
          'Succulent Atlantic lobster tail meat tossed in cognac cream sauce, mustard, and tarragon, gratinéed with Gruyère cheese.',
        price: 'Rs.1,890.00',
        tags: ['🦞 Atlantic Lobster', 'Cognac Cream', '✨ Fine Dining'],
        pairing: 'Pairs with Vintage Dom Pérignon or Oaked Chardonnay.',
        image: './img/menu-dish.webp',
      },
      {
        id: 'd4',
        name: 'Wild Mushroom Truffle Risotto',
        description:
          'Carnaroli rice slow-cooked with porcini & chanterelle mushrooms, finished with 24-month aged Parmigiano and black truffle oil.',
        price: 'Rs.980.00',
        tags: ['🍄 Black Truffle', '🧀 Parmigiano 24-Mo', '🌿 Vegetarian'],
        pairing: 'Pairs with Barolo or Pinot Noir.',
        image: './img/pasta.webp',
      },
      {
        id: 'd5',
        name: 'Roasted Duck Breast',
        description:
          'Crispy skin duck breast served with dark cherry duck jus, roasted heirloom baby potatoes, and charred broccolini.',
        price: 'Rs.1,380.00',
        tags: ['🦆 Crispy Duck', '🍒 Dark Cherry Jus', '✨ Gourmet'],
        pairing: 'Pairs with Burgundy Pinot Noir.',
        image: './img/lamb-shank.webp',
      },
    ],
  };

  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuItemsList = document.querySelector('.menu-items-list');

  function renderMenuItems(category) {
    if (!menuItemsList || !menuData[category]) return;

    // 1. Update featured category image
    const categoryImg =
      categoryDefaultImages[category] || './img/breakfast-dish.png';
    updateFeaturedImage(categoryImg, `${category} Featured Dish`);

    menuItemsList.style.opacity = '0';
    menuItemsList.style.transform = 'translateY(10px)';
    menuItemsList.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      menuItemsList.innerHTML = menuData[category]
        .map(
          (item) => `
        <div class="menu-item" data-id="${item.id}" data-category="${category}">
          <div class="menu-item-info">
            <h3 class="menu-item-name">${item.name} <span class="view-dish-badge">View Details</span></h3>
            <p class="menu-item-description">${item.description}</p>
          </div>
          <div class="menu-item-price">${item.price}</div>
        </div>
      `
        )
        .join('');

      menuItemsList.style.opacity = '1';
      menuItemsList.style.transform = 'translateY(0)';

      // Attach click and hover listeners to each menu item
      document.querySelectorAll('.menu-item').forEach((element) => {
        const itemId = element.getAttribute('data-id');
        const itemCategory = element.getAttribute('data-category');
        const foundDish = menuData[itemCategory]?.find((d) => d.id === itemId);

        if (foundDish) {
          // Hover effect to preview dish image on left
          element.addEventListener('mouseenter', () => {
            if (foundDish.image) {
              updateFeaturedImage(foundDish.image, foundDish.name);
            }
          });

          // Click handler to select dish, update left featured image, & open modal
          element.addEventListener('click', () => {
            document
              .querySelectorAll('.menu-item')
              .forEach((i) => i.classList.remove('selected-dish'));
            element.classList.add('selected-dish');

            if (foundDish.image) {
              updateFeaturedImage(foundDish.image, foundDish.name);
            }
            openDishModal(foundDish);
          });
        }
      });
    }, 250);
  }

  // Initial render on page load
  renderMenuItems('Breakfast');

  menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      menuTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.textContent.trim();
      renderMenuItems(category);
    });
  });

  // Dish Details Modal Popup
  function openDishModal(dish) {
    let dishModal = document.getElementById('dish-modal-overlay');
    if (!dishModal) {
      dishModal = document.createElement('div');
      dishModal.id = 'dish-modal-overlay';
      dishModal.className = 'modal-overlay';
      document.body.appendChild(dishModal);
    }

    dishModal.innerHTML = `
      <div class="modal-card dish-modal-card">
        <button class="modal-close-icon" id="closeDishModal">&times;</button>
        <div class="dish-modal-header">
          <img src="${dish.image}" alt="${
      dish.name
    }" class="dish-modal-img" />
          <span class="dish-modal-price">${dish.price}</span>
        </div>
        <div class="dish-modal-body">
          <h2 class="dish-modal-title">${dish.name}</h2>
          <div class="dish-tags">
            ${dish.tags
              .map((t) => `<span class="dish-tag">${t}</span>`)
              .join('')}
          </div>
          <p class="dish-modal-desc">${dish.description}</p>
          <div class="sommelier-box">
            <p>🍷 <strong>Sommelier Note:</strong> ${dish.pairing}</p>
          </div>
          <a href="#reservation" class="btn-primary dish-modal-book-btn" id="bookDishBtn">BOOK A TABLE FOR THIS DISH</a>
        </div>
      </div>
    `;

    dishModal.classList.add('active');

    document
      .getElementById('closeDishModal')
      .addEventListener('click', () => {
        dishModal.classList.remove('active');
      });

    document.getElementById('bookDishBtn').addEventListener('click', () => {
      dishModal.classList.remove('active');
    });

    dishModal.addEventListener('click', (e) => {
      if (e.target === dishModal) {
        dishModal.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 3. Number Count-Up Animation for Statistics
  // ==========================================
  const statNumbers = document.querySelectorAll(
    '.stat-number, .stat-box-number'
  );

  function countUpNumbers() {
    statNumbers.forEach((stat) => {
      const text = stat.innerText.trim();
      const match = text.match(/([\d\.]+)([K\+]*)/);

      if (match && !stat.hasAttribute('data-counted')) {
        stat.setAttribute('data-counted', 'true');
        const targetValue = parseFloat(match[1]);
        const suffix = match[2] || '';
        const duration = 2000;
        const steps = 50;
        const stepTime = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const currentValue = Math.ceil(targetValue * progress);

          stat.innerText = currentValue + suffix;

          if (currentStep >= steps) {
            stat.innerText = text;
            clearInterval(timer);
          }
        }, stepTime);
      }
    });
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUpNumbers();
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.stats-grid, .menu-stats').forEach((el) => {
    statsObserver.observe(el);
  });

  // ==========================================
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.category-card, .feature-card, .stat-item, .stat-box, .testimonial-card, .about-content, .about-image, .why-choose-content, .why-choose-image, .event-content, .event-image'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // 5. Testimonials Interactive Slider
  // ==========================================
  const testimonials = [
    {
      text: `"FoodieZone Restaurant never fails to amaze. From the attentive service to the exceptionally fresh ingredients, every dish tells a culinary story. The grilled salmon is an absolute masterpiece!"`,
      name: 'Omkar Bhandalkar',
      position: 'CEO, Sangli Chef',
      image: './img/testimonial-1.png',
    },
    {
      text: `"Dining at FoodieZone is an absolute treat. The flavors are authentic, presentation is gorgeous, and the warm hospitality makes you feel right at home. Hands down the best gourmet experience in Pune!"`,
      name: 'Narendra Kharde',
      position: 'CEO, Nashik Chef',
      image: './img/testimonial-2.jpg',
    },
    {
      text: `"The Filet Mignon with truffle mash is perfection on a plate. The atmosphere, wine recommendations, and level of detail make FoodieZone our go-to restaurant for every celebration."`,
      name: 'Priya Sharma',
      position: 'Food & Wine Critic',
      image: './img/chef.webp',
    },
  ];

  let currentTestimonialIndex = 0;
  const testimonialsContainer = document.querySelector(
    '.testimonials-container'
  );

  if (testimonialsContainer) {
    let navControls = document.querySelector('.testimonials-navigation');
    if (!navControls) {
      navControls = document.createElement('div');
      navControls.className = 'testimonials-navigation';
      navControls.innerHTML = `
        <button class="nav-arrow" id="prevTestimonial" aria-label="Previous Testimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="testimonial-dots" id="testimonialDots"></div>
        <button class="nav-arrow" id="nextTestimonial" aria-label="Next Testimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      `;
      testimonialsContainer.appendChild(navControls);
    }

    const grid = document.querySelector('.testimonials-grid');

    function updateTestimonials(index) {
      if (!grid) return;
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(10px)';

      setTimeout(() => {
        const item1 = testimonials[index % testimonials.length];
        const item2 = testimonials[(index + 1) % testimonials.length];

        grid.innerHTML = `
          <div class="testimonial-card">
            <p class="testimonial-text">${item1.text}</p>
            <div class="testimonial-author">
              <img src="${item1.image}" alt="${item1.name}" class="author-image" />
              <div class="author-details">
                <h4 class="author-name">${item1.name}</h4>
                <p class="author-position">${item1.position}</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <p class="testimonial-text">${item2.text}</p>
            <div class="testimonial-author">
              <img src="${item2.image}" alt="${item2.name}" class="author-image" />
              <div class="author-details">
                <h4 class="author-name">${item2.name}</h4>
                <p class="author-position">${item2.position}</p>
              </div>
            </div>
          </div>
        `;

        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 300);
    }

    document
      .getElementById('prevTestimonial')
      ?.addEventListener('click', () => {
        currentTestimonialIndex =
          (currentTestimonialIndex - 1 + testimonials.length) %
          testimonials.length;
        updateTestimonials(currentTestimonialIndex);
      });

    document
      .getElementById('nextTestimonial')
      ?.addEventListener('click', () => {
        currentTestimonialIndex =
          (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonials(currentTestimonialIndex);
      });
  }

  // ==========================================
  // 6. Floating Back to Top Button & Progress Ring
  // ==========================================
  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('div');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = `
      <svg class="progress-ring" width="54" height="54">
        <circle class="progress-ring-bg" stroke="rgba(201,160,95,0.2)" stroke-width="3" fill="transparent" r="24" cx="27" cy="27"/>
        <circle class="progress-ring-circle" id="scrollProgress" stroke="#c9a05f" stroke-width="3" fill="transparent" r="24" cx="27" cy="27"/>
      </svg>
      <span class="top-arrow-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </span>
    `;
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const circle = document.getElementById('scrollProgress');
  if (circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const offset = circumference - scrollPercent * circumference;
      circle.style.strokeDashoffset = offset;

      if (scrollTop > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
  }

  // ==========================================
  // 7. Mobile Navigation Toggle
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // ==========================================
  // 8. Reservation Form Submission & Confirmation Modal
  // ==========================================
  // Seating Preference Chips Selector
  const seatingChips = document.querySelectorAll('#seatingChips .chip');
  seatingChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      seatingChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName')?.value.trim();
      const phone = document.getElementById('phoneNumber')?.value.trim();
      const date = document.getElementById('bookingDate')?.value;
      const time = document.getElementById('bookingTime')?.value;
      const guests = document.getElementById('personNumber')?.value;

      const activeChip = document.querySelector('#seatingChips .chip.active');
      const seating = activeChip ? (activeChip.getAttribute('data-seating') || activeChip.innerText.trim()) : 'Main Dining Room';

      if (!name || !phone || !date) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      showReservationModal({
        name,
        phone,
        date,
        time: time || '7:30 PM',
        guests: guests || '2',
        seating,
      });

      bookingForm.reset();
    });
  }

  // VIP Concierge Tasting Club Form
  const vipClubForm = document.getElementById('vipClubForm');
  if (vipClubForm) {
    vipClubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = vipClubForm.querySelector('.vip-club-input');
      const email = emailInput ? emailInput.value.trim() : '';
      if (email) {
        showToast('⭐ Welcome to FoodieZone VIP Club! Privileges sent to ' + email, 'success');
        vipClubForm.reset();
      }
    });
  }

  function showToast(message, type = 'info') {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'custom-toast';
      document.body.appendChild(toast);
    }
    toast.className = `toast ${type}`;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  function showReservationModal(details) {
    let overlay = document.getElementById('modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-card">
          <div class="modal-icon">🍷</div>
          <h3 class="modal-title">Reservation Confirmed!</h3>
          <p class="modal-text">Thank you, <strong id="modal-name"></strong>! Your table at <strong>FoodieZone</strong> has been reserved.</p>
          <div class="modal-details">
            <p>📅 <strong>Date:</strong> <span id="modal-date"></span></p>
            <p>⏰ <strong>Time:</strong> <span id="modal-time"></span></p>
            <p>👥 <strong>Guests:</strong> <span id="modal-guests"></span></p>
            <p>🪑 <strong>Atmosphere:</strong> <span id="modal-seating"></span></p>
            <p>📞 <strong>Phone:</strong> <span id="modal-phone"></span></p>
          </div>
          <button class="btn-primary modal-close-btn" id="closeModalBtn">CONFIRM & DONE</button>
        </div>
      `;
      document.body.appendChild(overlay);

      document
        .getElementById('closeModalBtn')
        .addEventListener('click', () => {
          overlay.classList.remove('active');
        });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    }

    document.getElementById('modal-name').innerText = details.name;
    document.getElementById('modal-date').innerText = details.date;
    document.getElementById('modal-time').innerText = details.time;
    document.getElementById('modal-guests').innerText = details.guests;
    if (document.getElementById('modal-seating')) {
      document.getElementById('modal-seating').innerText = details.seating || 'Main Dining Room';
    }
    document.getElementById('modal-phone').innerText = details.phone;

    overlay.classList.add('active');
  }

  // ==========================================
  // Executive Gold Custom Cursor & Magnetic Ring System
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Attach hover effects dynamically to interactive targets
    function attachCursorListeners() {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, .menu-item, .chip, .category-card, .feature-card, .stat-box, .stat-item, .nav-arrow, .back-to-top, .mouse-scroll-indicator'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }

    attachCursorListeners();

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
  }
});
