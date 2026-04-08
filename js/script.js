const dropdownTriggers = document.querySelectorAll(".nav-item > a");
const dropdownMenus = document.querySelectorAll(".dropdown");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const searchTargets = [
    { label: "Home", url: "index.html", selector: ".index-hero", keywords: ["home", "index", "main"] },
    { label: "Demo 1", url: "index.html", selector: ".hero", keywords: ["demo 1", "demo1", "hospital", "detective", "puzzles"] },
    { label: "Demo 2", url: "demo2.html", selector: ".hero-dark", keywords: ["demo 2", "demo2", "dark room", "challenge"] },
    { label: "About Us", url: "about.html", selector: ".about-hero", keywords: ["about", "about us", "mission", "team"] },
    { label: "Offers", url: "offers.html", selector: ".offer-hero", keywords: ["offers", "discount", "member special", "early bird", "group deal"] },
    { label: "Login", url: "login.html", selector: ".login-page", keywords: ["login", "sign in", "member access"] },
    { label: "Game Features", url: "index.html", selector: ".demo-features", keywords: ["features", "timer", "hidden clues", "clues"] },
    { label: "Rooms", url: "index.html", selector: ".rooms", keywords: ["rooms", "prison", "haunted", "detective room"] }
    ,{ label: "Room 3", url: "room 3.html", selector: ".room-hero.lab", keywords: ["room 3", "secret lab", "lab", "science puzzles"] }
];

function setActiveMenu() {
    const pageMenuMap = {
        "index.html": "demos",
        "demo2.html": "demos",
        "about.html": "about",
        "faq.html": "about",
        "pricing.html": "about",
        "our story.html": "about",
        "testimonials.html": "about",
        "about us.html": "about",
        "contact us.html": "contact",
        "rooms.html": "rooms",
        "room 1.html": "rooms",
        "room 2.html": "rooms",
        "room 3.html": "rooms",
        "news.html": "news",
        "offers.html": "offers",
        "early bird.html": "offers",
        "group discount.html": "offers",
        "member special.html": "offers"
    };

    const activeMenu = pageMenuMap[currentPage];
    if (!activeMenu) {
        return;
    }

    document.querySelectorAll(".nav [data-menu]").forEach((link) => {
        link.classList.toggle("active", link.dataset.menu === activeMenu);
    });
}

function closeAllDropdowns(exceptMenu = null) {
    dropdownMenus.forEach((menu) => {
        if (menu !== exceptMenu) {
            menu.style.display = "none";
        }
    });
}

dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
        const dropdown = trigger.nextElementSibling;
        const href = trigger.getAttribute("href");
        const isHashLink = href && href.startsWith("#");

        if (dropdown && dropdown.classList.contains("dropdown")) {
            e.preventDefault();
            const shouldOpen = dropdown.style.display !== "block";
            closeAllDropdowns(shouldOpen ? dropdown : null);
            dropdown.style.display = shouldOpen ? "block" : "none";
            return;
        }

        if (isHashLink) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

document.querySelectorAll(".dropdown a").forEach((link) => {
    link.addEventListener("click", () => {
        closeAllDropdowns();
    });
});

document.querySelectorAll(".nav > a").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            closeAllDropdowns();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
        closeAllDropdowns();
    }
});

setActiveMenu();

function openLogin() {
    window.location.href = "login.html";
}

function ensureBookingModal() {
    const existingModal = document.querySelector(".booking-overlay");
    if (existingModal) {
        return existingModal;
    }

    const overlay = document.createElement("div");
    overlay.className = "booking-overlay";
    overlay.innerHTML = `
        <div class="booking-modal" role="dialog" aria-modal="true" aria-label="Book escape room">
            <div class="booking-modal-top">
                <div>
                    <p class="booking-modal-kicker">Reserve Your Slot</p>
                    <h3 class="booking-modal-title">Book This Room</h3>
                </div>
                <button type="button" class="booking-close" aria-label="Close booking">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
            <form class="booking-form">
                <div class="booking-field">
                    <label for="bookingRoom">Room</label>
                    <input id="bookingRoom" name="room" type="text" readonly>
                </div>
                <div class="booking-field">
                    <label for="bookingName">Your Name</label>
                    <input id="bookingName" name="name" type="text" placeholder="Enter your name" required>
                </div>
                <div class="booking-grid">
                    <div class="booking-field">
                        <label for="bookingDate">Date</label>
                        <input id="bookingDate" name="date" type="date" required>
                    </div>
                    <div class="booking-field">
                        <label for="bookingTeam">Team Size</label>
                        <select id="bookingTeam" name="team" required>
                            <option value="">Select</option>
                            <option>2 Players</option>
                            <option>3 Players</option>
                            <option>4 Players</option>
                            <option>5 Players</option>
                            <option>6 Players</option>
                        </select>
                    </div>
                </div>
                <button class="btn booking-confirm" type="submit">Confirm Booking</button>
                <p class="booking-status">Choose your date and team size to reserve this room.</p>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
}

function closeBookingModal() {
    const overlay = document.querySelector(".booking-overlay");
    if (overlay) {
        overlay.classList.remove("open");
    }
}

function openBookingModal(roomName = "MystIQ Room") {
    const overlay = ensureBookingModal();
    const roomInput = overlay.querySelector("#bookingRoom");
    const nameInput = overlay.querySelector("#bookingName");
    const dateInput = overlay.querySelector("#bookingDate");
    const status = overlay.querySelector(".booking-status");
    const title = overlay.querySelector(".booking-modal-title");

    roomInput.value = roomName;
    title.textContent = `Book ${roomName}`;
    status.textContent = "Choose your date and team size to reserve this room.";
    nameInput.value = "";
    dateInput.value = "";
    overlay.querySelector("#bookingTeam").value = "";
    overlay.classList.add("open");

    setTimeout(() => nameInput.focus(), 0);
}

function setupBookingModal() {
    const overlay = ensureBookingModal();
    const form = overlay.querySelector(".booking-form");
    const closeButton = overlay.querySelector(".booking-close");
    const status = overlay.querySelector(".booking-status");

    closeButton.addEventListener("click", closeBookingModal);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeBookingModal();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const room = formData.get("room");
        const name = formData.get("name");
        const date = formData.get("date");
        const team = formData.get("team");

        status.textContent = `${name}, your ${room} booking for ${date} with ${team} is confirmed.`;
        form.reset();

        setTimeout(() => {
            closeBookingModal();
        }, 1800);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeBookingModal();
        }
    });
}

function ensureSearchOverlay() {
    const existingOverlay = document.querySelector(".search-overlay");
    if (existingOverlay) {
        return existingOverlay;
    }

    const overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.innerHTML = `
        <div class="search-panel" role="dialog" aria-modal="true" aria-label="Site search">
            <div class="search-panel-top">
                <h3>Search MystIQ</h3>
                <button type="button" class="search-close" aria-label="Close search">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
            <form class="search-form">
                <input class="search-input" type="search" placeholder="Search pages, rooms, clues..." autocomplete="off">
                <button class="btn search-submit" type="submit">Search</button>
            </form>
            <div class="search-hints">
                <button type="button" class="search-chip">About Us</button>
                <button type="button" class="search-chip">Demo 1</button>
                <button type="button" class="search-chip">Game Features</button>
                <button type="button" class="search-chip">Login</button>
            </div>
            <p class="search-status">Try keywords like "about", "demo 1", "features", or "login".</p>
        </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
}

function closeSearchOverlay() {
    const overlay = document.querySelector(".search-overlay");
    if (overlay) {
        overlay.classList.remove("open");
    }
}

function openSearchOverlay(prefill = "") {
    const overlay = ensureSearchOverlay();
    const input = overlay.querySelector(".search-input");
    const status = overlay.querySelector(".search-status");

    overlay.classList.add("open");
    input.value = prefill;
    status.textContent = 'Try keywords like "about", "demo 1", "features", or "login".';
    setTimeout(() => input.focus(), 0);
}

function normalizeValue(value) {
    return value.trim().toLowerCase();
}

function findSearchTarget(query) {
    const normalizedQuery = normalizeValue(query);
    if (!normalizedQuery) {
        return null;
    }

    return searchTargets.find((target) => {
        const normalizedLabel = normalizeValue(target.label);
        const matchesLabel = normalizedLabel.includes(normalizedQuery) || normalizedQuery.includes(normalizedLabel);
        const matchesKeyword = target.keywords.some((keyword) => {
            const normalizedKeyword = normalizeValue(keyword);
            return normalizedKeyword.includes(normalizedQuery) || normalizedQuery.includes(normalizedKeyword);
        });
        return matchesLabel || matchesKeyword;
    });
}

function goToSearchTarget(target) {
    if (!target) {
        return false;
    }

    if (currentPage === target.url) {
        const targetElement = document.querySelector(target.selector);
        if (targetElement) {
            closeSearchOverlay();
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            return true;
        }
    }

    window.location.href = target.url;
    return true;
}

function setupSearch() {
    const searchButtons = document.querySelectorAll(".search");
    if (!searchButtons.length) {
        return;
    }

    const overlay = ensureSearchOverlay();
    const form = overlay.querySelector(".search-form");
    const input = overlay.querySelector(".search-input");
    const closeButton = overlay.querySelector(".search-close");
    const status = overlay.querySelector(".search-status");

    searchButtons.forEach((button) => {
        button.addEventListener("click", () => openSearchOverlay());
    });

    closeButton.addEventListener("click", closeSearchOverlay);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeSearchOverlay();
        }
    });

    overlay.querySelectorAll(".search-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            const query = chip.textContent || "";
            input.value = query;
            const target = findSearchTarget(query);

            if (!goToSearchTarget(target)) {
                status.textContent = "No matching page found for that quick search.";
            }
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = input.value;
        const target = findSearchTarget(query);

        if (goToSearchTarget(target)) {
            return;
        }

        status.textContent = `No result found for "${query}". Try "about", "demo 1", or "login".`;
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearchOverlay();
        }
    });
}

/* =============================================
   DARK MODE TOGGLE
   ============================================= */
function updateDarkBtn() {
    const btn = document.getElementById('darkModeToggle') || document.getElementById('mq-enable-btn');
    if (!btn) return;
    const isLight = document.body.classList.contains('light-mode');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('mystiq-theme', isLight ? 'light' : 'dark');
    updateDarkBtn();
}

function initDarkMode() {
    if (localStorage.getItem('mystiq-theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    updateDarkBtn();
}

/* =============================================
   LTR / RTL DIRECTION TOGGLE
   ============================================= */
function updateDirBtn() {
    const btn = document.getElementById('dirToggle') || document.getElementById('mq-dir-btn');
    if (!btn) return;
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const label = btn.querySelector('.dir-label');
    if (label) {
        label.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
    } else {
        btn.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
    }
    btn.title = currentDir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left';
}

function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('mystiq-dir', newDir);
    updateDirBtn();
}

function initDirection() {
    const savedDir = localStorage.getItem('mystiq-dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateDirBtn();
}

/* =============================================
   INJECT TOGGLE BUTTONS INTO ALL PAGES
   ============================================= */
function injectToggles() {
    const existingDarkBtn = document.getElementById('darkModeToggle') || document.getElementById('mq-enable-btn');
    const existingDirBtn = document.getElementById('dirToggle') || document.getElementById('mq-dir-btn');

    if (existingDarkBtn) {
        existingDarkBtn.id = 'darkModeToggle';
        existingDarkBtn.setAttribute('aria-label', 'Toggle dark/light mode');
        existingDarkBtn.onclick = null;
        existingDarkBtn.addEventListener('click', toggleDarkMode);
    }

    if (existingDirBtn) {
        existingDirBtn.id = 'dirToggle';
        existingDirBtn.setAttribute('aria-label', 'Toggle text direction');
        if (!existingDirBtn.querySelector('.dir-label')) {
            existingDirBtn.innerHTML = '<span class="dir-label"></span>';
        }
        existingDirBtn.onclick = null;
        existingDirBtn.addEventListener('click', toggleDirection);
    }

    if (existingDarkBtn && existingDirBtn) {
        updateDarkBtn();
        updateDirBtn();
        return;
    }

    const darkBtn = document.createElement('button');
    darkBtn.className = 'icon-btn';
    darkBtn.id = 'darkModeToggle';
    darkBtn.setAttribute('aria-label', 'Toggle dark/light mode');
    darkBtn.addEventListener('click', toggleDarkMode);

    const dirBtn = document.createElement('button');
    dirBtn.className = 'icon-btn dir-toggle';
    dirBtn.id = 'dirToggle';
    dirBtn.setAttribute('aria-label', 'Toggle text direction');
    dirBtn.innerHTML = '<span class="dir-label">RTL</span>';
    dirBtn.addEventListener('click', toggleDirection);

    const rightSection = document.querySelector('.right-section');
    if (rightSection) {
        const loginBtn = rightSection.querySelector('.login-btn');
        if (loginBtn) {
            rightSection.insertBefore(dirBtn, loginBtn);
            rightSection.insertBefore(darkBtn, dirBtn);
        } else {
            rightSection.appendChild(darkBtn);
            rightSection.appendChild(dirBtn);
        }
    } else {
        /* Pages without a header (e.g. login.html) — floating widget */
        const wrapper = document.createElement('div');
        wrapper.className = 'toggle-float';
        wrapper.appendChild(darkBtn);
        wrapper.appendChild(dirBtn);
        document.body.appendChild(wrapper);
    }

    /* Sync button states after injection */
    updateDarkBtn();
    updateDirBtn();
}

/* Apply preferences immediately to avoid flash, then inject buttons */
initDarkMode();
initDirection();
injectToggles();

setupSearch();
setupBookingModal();

function setupContactForm() {
    const form = document.querySelector(".contact-message-form");
    if (!form) {
        return;
    }

    const status = document.querySelector(".contact-form-status");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = (formData.get("name") || "").toString().trim() || "Your team";
        const room = (formData.get("room") || "").toString().trim();

        if (status) {
            status.textContent = room
                ? `${name}, your message about ${room} has been sent. Our team will contact you soon.`
                : `${name}, your message has been sent. Our team will contact you soon.`;
        }

        form.reset();
    });
}

setupContactForm();

function enhanceFooter() {
    document.querySelectorAll(".footer-left").forEach((footerBlock) => {
        footerBlock.querySelector(".footer-copy")?.remove();
    });
}

enhanceFooter();

function enhanceFooterColumns() {
    document.querySelectorAll(".footer-column").forEach((column) => {
        const heading = column.querySelector("h3");
        const list = column.querySelector("ul");
        if (!heading || !list) {
            return;
        }
    });
}

enhanceFooterColumns();

function reorganizeFooterColumns() {
    document.querySelectorAll(".footer-content").forEach((footerContent) => {
        const columns = Array.from(footerContent.querySelectorAll(".footer-column"));
        if (columns.length < 3) {
            return;
        }

        const demosColumn = columns.find((column) => {
            const heading = column.querySelector("h3");
            return heading && heading.textContent.trim().toLowerCase().includes("demos");
        });

        const roomsColumn = columns.find((column) => {
            const heading = column.querySelector("h3");
            return heading && heading.textContent.trim().toLowerCase().includes("rooms");
        });

        if (!demosColumn || !roomsColumn) {
            return;
        }

        const existingAddress = footerContent.querySelector(".footer-address-card");
        if (!existingAddress) {
            const addressCard = document.createElement("div");
            addressCard.className = "footer-column footer-address-card";
            addressCard.innerHTML = `
                <h3>Address</h3>
                <p>24, KK Nagar Main Road</p>
                <p>Near Mattuthavani Bus Stand</p>
                <p>Madurai, Tamil Nadu 625020</p>
            `;
            footerContent.appendChild(addressCard);
        }

        const usefulLinksColumn = columns.find((column) => {
            const heading = column.querySelector("h3");
            return heading && heading.textContent.trim().toLowerCase().includes("useful");
        });

        if (roomsColumn.nextElementSibling !== demosColumn) {
            roomsColumn.insertAdjacentElement("afterend", demosColumn);
        }

        if (usefulLinksColumn) {
            const addressColumn = footerContent.querySelector(".footer-address-card");
            if (addressColumn && usefulLinksColumn.nextElementSibling !== addressColumn) {
                usefulLinksColumn.insertAdjacentElement("afterend", addressColumn);
            }
        }
    });
}

reorganizeFooterColumns();

function getExtraSectionProfile() {
    const profiles = {
        "index.html": { name: "Home", theme: "first-glance discovery", focus: "room browsing", mood: "cinematic energy", audience: "new visitors", tone: "cyan", image: "./img/escape-showcase-main.jpg", alt: "MystIQ hero showcase", layouts: ["lead", "stats", "magazine", "cta"], cta: "Book Demo 1", secondaryHref: "rooms.html", secondaryLabel: "Explore Rooms" },
        "demo2.html": { name: "Demo 2", theme: "dark suspense", focus: "high-intensity play", mood: "late-night tension", audience: "thrill-seeking teams", tone: "ember", image: "./img/dark-room-challenge.jpg", alt: "Dark challenge room", layouts: ["quote", "lead", "timeline", "cta"], cta: "Book Demo 2", secondaryHref: "offers.html", secondaryLabel: "See Offers" },
        "about.html": { name: "About", theme: "brand trust", focus: "MystIQ identity", mood: "warm confidence", audience: "curious guests", tone: "gold", image: "./img/escape-showcase-brand.png", alt: "MystIQ brand visual", layouts: ["magazine", "duo", "lead", "cta"], cta: "Plan A Visit", secondaryHref: "pricing.html", secondaryLabel: "See Pricing" },
        "about us.html": { name: "Studio", theme: "people-first storytelling", focus: "behind-the-scenes detail", mood: "welcoming craft", audience: "first-time explorers", tone: "mint", image: "./img/escape-showcase-side.jpg", alt: "Behind the scenes visual", layouts: ["lead", "duo", "quote", "cta"], cta: "Visit MystIQ", secondaryHref: "about.html", secondaryLabel: "Main About" },
        "our story.html": { name: "Story", theme: "timeline depth", focus: "brand journey", mood: "reflective narrative", audience: "story-driven readers", tone: "rose", image: "./img/escape-showcase-brand.png", alt: "Story-inspired MystIQ visual", layouts: ["timeline", "quote", "magazine", "cta"], cta: "Continue The Story", secondaryHref: "about.html", secondaryLabel: "About MystIQ" },
        "pricing.html": { name: "Pricing", theme: "value clarity", focus: "smarter comparison", mood: "practical planning", audience: "budget-aware teams", tone: "cyan", image: "./img/demo1-gallery-detail.jpg", alt: "Pricing support visual", layouts: ["stats", "duo", "lead", "cta"], cta: "Check Best Price", secondaryHref: "offers.html", secondaryLabel: "See Offers" },
        "faq.html": { name: "FAQ", theme: "clear reassurance", focus: "question solving", mood: "calm guidance", audience: "hesitant visitors", tone: "mint", image: "./img/demo1-gallery-side.jpg", alt: "FAQ support visual", layouts: ["timeline", "duo", "magazine", "cta"], cta: "Ask A Question", secondaryHref: "contact us.html", secondaryLabel: "Contact Us" },
        "testimonials.html": { name: "Reviews", theme: "social proof", focus: "real reactions", mood: "trust-led excitement", audience: "decision-ready teams", tone: "rose", image: "./img/demo2-gallery-main.jpg", alt: "Guest experience visual", layouts: ["quote", "magazine", "stats", "cta"], cta: "Join The Reviews", secondaryHref: "news.html", secondaryLabel: "Latest News" },
        "rooms.html": { name: "Rooms", theme: "smart selection", focus: "challenge matching", mood: "confident exploration", audience: "groups choosing a mission", tone: "gold", image: "./img/room1.jpg", alt: "Room selection preview", layouts: ["lead", "magazine", "timeline", "cta"], cta: "Choose A Room", secondaryHref: "offers.html", secondaryLabel: "See Offers" },
        "room 1.html": { name: "Prison Escape", theme: "breakout urgency", focus: "lockdown strategy", mood: "escape pressure", audience: "strategy-driven teams", tone: "ember", image: "./img/prison-escape-room.jpg", alt: "Prison escape room", layouts: ["lead", "timeline", "quote", "cta"], cta: "Book Prison Escape", secondaryHref: "room 2.html", secondaryLabel: "View Room 2" },
        "room 2.html": { name: "Haunted House", theme: "spooky tension", focus: "fear and mystery", mood: "eerie suspense", audience: "horror-loving teams", tone: "rose", image: "./img/haunted-house-room.jpg", alt: "Haunted house room", layouts: ["quote", "lead", "duo", "cta"], cta: "Book Haunted House", secondaryHref: "room 3.html", secondaryLabel: "View Room 3" },
        "room 3.html": { name: "Secret Lab", theme: "science-puzzle intensity", focus: "logic-driven play", mood: "technical urgency", audience: "smart puzzle teams", tone: "cyan", image: "./img/secret-lab-challenge.jpg", alt: "Secret lab room", layouts: ["stats", "lead", "timeline", "cta"], cta: "Book Secret Lab", secondaryHref: "rooms.html", secondaryLabel: "All Rooms" },
        "news.html": { name: "News", theme: "fresh momentum", focus: "launch updates", mood: "editorial energy", audience: "returning followers", tone: "gold", image: "./img/news1.jpg", alt: "MystIQ news update", layouts: ["magazine", "quote", "timeline", "cta"], cta: "Book From News", secondaryHref: "offers.html", secondaryLabel: "Current Offers" },
        "contact us.html": { name: "Contact", theme: "easy communication", focus: "visit planning", mood: "helpful clarity", audience: "question-led visitors", tone: "mint", image: "./img/demo2-gallery-side.jpg", alt: "Contact support visual", layouts: ["duo", "stats", "lead", "cta"], cta: "Send An Enquiry", secondaryHref: "faq.html", secondaryLabel: "Read FAQ" },
        "login.html": { name: "Login", theme: "member-only access", focus: "account benefits", mood: "premium convenience", audience: "returning members", tone: "cyan", image: "./img/login-visual.jpg", alt: "MystIQ login visual", layouts: ["lead", "quote", "stats", "cta"], cta: "Member Access Session", secondaryHref: "offers.html", secondaryLabel: "Member Offers" },
        "offers.html": { name: "Offers", theme: "deal comparison", focus: "savings in one place", mood: "value-led action", audience: "discount-focused guests", tone: "gold", image: "./img/demo1-preview.jpg", alt: "Offers showcase", layouts: ["stats", "magazine", "duo", "cta"], cta: "Book With An Offer", secondaryHref: "pricing.html", secondaryLabel: "See Pricing" },
        "early bird.html": { name: "Offers", theme: "deal comparison", focus: "savings in one place", mood: "value-led action", audience: "discount-focused guests", tone: "gold", image: "./img/demo1-preview.jpg", alt: "Offers showcase", layouts: ["stats", "magazine", "duo", "cta"], cta: "Book With An Offer", secondaryHref: "pricing.html", secondaryLabel: "See Pricing" },
        "group discount.html": { name: "Offers", theme: "deal comparison", focus: "savings in one place", mood: "value-led action", audience: "discount-focused guests", tone: "gold", image: "./img/demo1-preview.jpg", alt: "Offers showcase", layouts: ["stats", "magazine", "duo", "cta"], cta: "Book With An Offer", secondaryHref: "pricing.html", secondaryLabel: "See Pricing" },
        "member special.html": { name: "Offers", theme: "deal comparison", focus: "savings in one place", mood: "value-led action", audience: "discount-focused guests", tone: "gold", image: "./img/demo1-preview.jpg", alt: "Offers showcase", layouts: ["stats", "magazine", "duo", "cta"], cta: "Book With An Offer", secondaryHref: "pricing.html", secondaryLabel: "See Pricing" }
    };

    return profiles[currentPage] || null;
}

function renderExtraSection(profile, layout, index) {
    if (layout === "lead") {
        return `
            <section class="site-section site-lead">
                <div class="site-lead-copy">
                    <p class="site-mini-label">${profile.name} perspective</p>
                    <h2>${profile.name} deserves a richer ${profile.theme} layout.</h2>
                    <p>This section gives the page a premium editorial feel with more space for ${profile.focus}, while keeping the mood rooted in ${profile.mood}.</p>
                    <div class="site-chip-row">
                        <span>${profile.focus}</span>
                        <span>${profile.mood}</span>
                        <span>${profile.audience}</span>
                    </div>
                </div>
                <figure class="site-media-card">
                    <img src="${profile.image}" alt="${profile.alt}">
                </figure>
            </section>
        `;
    }

    if (layout === "stats") {
        return `
            <section class="site-section site-stats">
                <div class="site-stats-head">
                    <p class="site-mini-label">What this page does</p>
                    <h3>${profile.name} now carries its own premium rhythm.</h3>
                </div>
                <div class="site-stat-grid">
                    <article><strong>${profile.name}</strong><span>Page identity</span></article>
                    <article><strong>${profile.focus}</strong><span>Primary direction</span></article>
                    <article><strong>${profile.audience}</strong><span>Ideal audience</span></article>
                </div>
            </section>
        `;
    }

    if (layout === "magazine") {
        return `
            <section class="site-section site-magazine">
                <article class="site-magazine-main">
                    <p class="site-mini-label">Editorial panel</p>
                    <h3>${profile.name} should feel curated, not copied.</h3>
                    <p>The structure here is deliberately more editorial so this page feels custom-built for ${profile.focus}.</p>
                </article>
                <article class="site-magazine-side">
                    <h4>${profile.theme}</h4>
                    <p>Sharper framing for the page tone.</p>
                </article>
                <article class="site-magazine-side">
                    <h4>${profile.mood}</h4>
                    <p>Premium styling without the same repeated heading block.</p>
                </article>
            </section>
        `;
    }

    if (layout === "timeline") {
        return `
            <section class="site-section site-timeline">
                <div class="site-timeline-head">
                    <p class="site-mini-label">Flow</p>
                    <h3>A cleaner journey through ${profile.name.toLowerCase()}.</h3>
                </div>
                <div class="site-rail">
                    <article><strong>01</strong><h4>Read the intent</h4><p>The page now explains itself faster.</p></article>
                    <article><strong>02</strong><h4>Feel the ${profile.theme}</h4><p>The layout supports ${profile.focus} instead of repeating generic copy.</p></article>
                    <article><strong>03</strong><h4>Move ahead</h4><p>Users can continue toward booking or the next related page naturally.</p></article>
                </div>
            </section>
        `;
    }

    if (layout === "quote") {
        return `
            <section class="site-section site-quote">
                <div class="site-quote-copy">
                    <p class="site-mini-label">Mood board</p>
                    <blockquote>"${profile.name} works best when the design carries ${profile.mood}, not just extra filler blocks."</blockquote>
                    <p>This pattern gives the page a more premium, dramatic pause between content sections.</p>
                </div>
                <div class="site-quote-image">
                    <img src="${profile.image}" alt="${profile.alt}">
                </div>
            </section>
        `;
    }

    if (layout === "duo") {
        return `
            <section class="site-section site-duo">
                <article class="site-duo-panel">
                    <p class="site-mini-label">Designed for</p>
                    <h3>${profile.audience}</h3>
                    <p>This side keeps the page focused on who it serves best.</p>
                </article>
                <article class="site-duo-panel accent">
                    <p class="site-mini-label">Built around</p>
                    <h3>${profile.focus}</h3>
                    <p>The second panel shifts the visual pattern so the page doesn't feel cloned.</p>
                </article>
            </section>
        `;
    }

    return `
        <section class="site-section site-cta-band">
            <div>
                <p class="site-mini-label">Next step</p>
                <h3>${profile.name} now ends on a cleaner premium note.</h3>
                <p>This final panel connects the page back to action without using the same oversized section heading style.</p>
            </div>
            <div class="site-cta-actions">
                <button type="button" class="btn" data-booking-room="${profile.cta}">Book Now</button>
                <a href="${profile.secondaryHref}" class="btn secondary">${profile.secondaryLabel}</a>
            </div>
        </section>
    `;
}

function injectGlobalSections() {
    if (document.querySelector(".site-extras") || document.body.classList.contains("has-custom-extras")) {
        return;
    }

    const profile = getExtraSectionProfile();
    if (!profile) {
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "site-extras";
    wrapper.dataset.tone = profile.tone;
    wrapper.innerHTML = profile.layouts.map((layout, index) => renderExtraSection(profile, layout, index)).join("");

    const footer = document.querySelector("footer");
    const main = document.querySelector("main");

    if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(wrapper, footer);
    } else if (main && main.parentNode) {
        main.insertAdjacentElement("afterend", wrapper);
    } else {
        document.body.appendChild(wrapper);
    }

    wrapper.querySelectorAll("[data-booking-room]").forEach((button) => {
        button.addEventListener("click", () => {
            openBookingModal(button.dataset.bookingRoom || "MystIQ Room");
        });
    });
}

injectGlobalSections();

function initSectionReveal() {
    const revealSections = document.querySelectorAll([
        ".reveal-section",
        ".home-premium-section",
        ".demo2-premium-section",
        ".aboutus-premium-section",
        ".pricing-premium-section",
        ".faq-premium-section",
        ".testimonial-premium-section",
        ".rooms-premium-section",
        ".room-custom-section",
        ".news-custom-section",
        ".offers-custom-section",
        ".contact-help",
        ".contact-trust"
    ].join(", "));
    if (!revealSections.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revealSections.forEach((section) => section.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -60px 0px"
    });

    revealSections.forEach((section) => observer.observe(section));
}

initSectionReveal();

function getAchievementCounterConfig(rawText) {
    const text = (rawText || "").trim();
    const numericValue = Number.parseFloat(text.replace(/[^0-9.]/g, ""));

    if (!Number.isFinite(numericValue)) {
        return null;
    }

    if (text.includes("K+")) {
        return {
            target: numericValue * 1000,
            format: (value) => `${Math.round(value / 1000)}K+`
        };
    }

    if (text.includes("\u2605") || text.includes("★") || text.includes("â˜…") || (numericValue < 10 && /[^\d.\s]/.test(text) && !text.includes("+") && !text.includes("K"))) {
        return {
            target: numericValue,
            format: (value, done) => `${value.toFixed(1)}${done ? "\u2605" : ""}`
        };
    }

    if (text.includes("+")) {
        return {
            target: numericValue,
            format: (value) => `${Math.round(value)}+`
        };
    }

    return {
        target: numericValue,
        format: (value) => `${Math.round(value)}`
    };
}

function initAchievementCounters() {
    const counters = document.querySelectorAll(".achieve-card h3");
    if (!counters.length) {
        return;
    }

    const animateCounter = (element) => {
        if (element.dataset.counted === "true") {
            return;
        }

        const config = getAchievementCounterConfig(element.textContent);
        if (!config) {
            return;
        }

        const duration = 1400;
        const startTime = performance.now();

        element.dataset.counted = "true";

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = config.target * eased;
            const isDone = progress >= 1;

            element.textContent = config.format(value, isDone);

            if (!isDone) {
                window.requestAnimationFrame(tick);
            }
        };

        window.requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.45
    });

    counters.forEach((counter) => observer.observe(counter));
}

initAchievementCounters();

function formatCountupValue(value, format) {
    if (format === "rating") {
        return value.toFixed(1);
    }

    if (format === "rating-star") {
        return `${value.toFixed(1)}\u2605`;
    }

    if (format === "comma-plus") {
        return `${Math.round(value).toLocaleString("en-IN")}+`;
    }

    if (format === "compact-plus") {
        return `${Math.round(value / 1000)}K+`;
    }

    if (format === "percent") {
        return `${Math.round(value)}%`;
    }

    if (format === "hours") {
        return `${Math.round(value)} Hrs`;
    }

    if (format === "minutes") {
        return `${Math.round(value)} Min`;
    }

    if (format === "plus") {
        return `${Math.round(value)}+`;
    }

    return `${Math.round(value)}`;
}

function initCountupElements() {
    const elements = document.querySelectorAll("[data-countup]");
    if (!elements.length) {
        return;
    }

    const animateElement = (element) => {
        if (element.dataset.counted === "true") {
            return;
        }

        const target = Number(element.dataset.countup || 0);
        if (!Number.isFinite(target) || target <= 0) {
            return;
        }

        const format = element.dataset.countupFormat || "";
        const duration = format === "rating" ? 1100 : 1400;
        const startTime = performance.now();

        element.dataset.counted = "true";

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            element.textContent = formatCountupValue(value, format);

            if (progress < 1) {
                window.requestAnimationFrame(tick);
            }
        };

        window.requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
        elements.forEach(animateElement);
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            animateElement(entry.target);
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.45
    });

    elements.forEach((element) => observer.observe(element));
}

initCountupElements();

function initProgressBars() {
    const bars = document.querySelectorAll("[data-progress-target]");
    if (!bars.length) {
        return;
    }

    const animateBar = (bar) => {
        if (bar.dataset.progressAnimated === "true") {
            return;
        }

        const target = Number(bar.dataset.progressTarget || 0);
        if (!Number.isFinite(target) || target < 0) {
            return;
        }

        bar.dataset.progressAnimated = "true";
        bar.style.width = `${Math.min(target, 100)}%`;
    };

    window.requestAnimationFrame(() => {
        bars.forEach(animateBar);
    });
}

initProgressBars();

function initCountdownTimer() {
    const timers = document.querySelectorAll("[data-countdown-seconds]");
    if (!timers.length) {
        return;
    }

    timers.forEach((timer) => {
        const totalSeconds = Number(timer.dataset.countdownSeconds || 0);
        if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
            return;
        }

        let remainingSeconds = totalSeconds;
        const hoursNode = timer.querySelector("[data-countdown-part='hours']");
        const minutesNode = timer.querySelector("[data-countdown-part='minutes']");
        const secondsNode = timer.querySelector("[data-countdown-part='seconds']");

        const renderTime = () => {
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;

            if (hoursNode || minutesNode || secondsNode) {
                if (hoursNode) {
                    hoursNode.textContent = String(hours).padStart(2, "0");
                }
                if (minutesNode) {
                    minutesNode.textContent = String(minutes).padStart(2, "0");
                }
                if (secondsNode) {
                    secondsNode.textContent = String(seconds).padStart(2, "0");
                }
            } else {
                const displayMinutes = Math.floor(remainingSeconds / 60);
                timer.textContent = `${String(displayMinutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }
        };

        renderTime();

        window.setInterval(() => {
            if (remainingSeconds <= 0) {
                return;
            }

            remainingSeconds -= 1;
            renderTime();
        }, 1000);
    });
}

initCountdownTimer();

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("loginPassword");
    const passwordIcon = document.querySelector(".password-toggle i");

    if (!passwordInput || !passwordIcon) {
        return;
    }

    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    passwordIcon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
}
