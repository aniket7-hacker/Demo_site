/**
 * TALK TO TIME (TTT) NEWS — CORE APPLICATION ENGINE
 * State management, dynamic renderers, channel profile, AI modals, audio player & event handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    theme: localStorage.getItem('talktotime_theme') || 'dark',
    activeCategory: 'all',
    bookmarks: JSON.parse(localStorage.getItem('talktotime_bookmarks') || '[]'),
    currentTickerIndex: 0,
    tickerPaused: false,
    tickerInterval: null,
    audioState: {
      isPlaying: false,
      currentArticleId: null,
      currentTime: 0,
      duration: 165,
      playbackRate: 1.0,
      timer: null
    },
    pollVoted: localStorage.getItem('talktotime_poll_voted') || false,
    pollCounts: { opt1: 64, opt2: 28, opt3: 8 },
    readerFontSize: 18,
    activeArticle: null,
    isOwner: localStorage.getItem('talktotime_is_owner') === 'true'
  };

  const OWNER_CONFIG = {
    email: 'talktotime1947@gmail.com',
    passcode: 'ttt1947'
  };

  // DOM Cache
  const body = document.body;
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const marketTickerEl = document.getElementById('marketTicker');
  const liveClockEl = document.getElementById('liveClock');
  const breakingTickerEl = document.getElementById('breakingTickerContent');
  const heroContainer = document.getElementById('heroContainer');
  const topStoriesContainer = document.getElementById('topStoriesContainer');
  const articleFeedContainer = document.getElementById('articleFeedContainer');
  const trendingListContainer = document.getElementById('trendingListContainer');
  const filterTabsContainer = document.getElementById('filterTabsContainer');
  const bookmarkCountBadges = document.querySelectorAll('.bookmark-count-badge');
  const toastContainer = document.getElementById('toastContainer');

  // Modals
  const readerModal = document.getElementById('readerModal');
  const aiModal = document.getElementById('aiModal');
  const searchModal = document.getElementById('searchModal');
  const bookmarksModal = document.getElementById('bookmarksModal');
  const channelModal = document.getElementById('channelModal');

  // Audio Player Elements
  const audioPlayer = document.getElementById('audioBriefPlayer');
  const audioTitle = document.getElementById('audioCurrentTitle');
  const audioPlayBtn = document.getElementById('audioPlayBtn');
  const audioTimeCurrent = document.getElementById('audioTimeCurrent');
  const audioTimeTotal = document.getElementById('audioTimeTotal');
  const audioScrubberFill = document.getElementById('audioScrubberFill');
  const audioSpeedBtn = document.getElementById('audioSpeedBtn');

  // Initialize
  initTheme();
  initLiveClock();
  initMarketTicker();
  initBreakingTicker();
  renderHeroStory();
  renderTopStories();
  renderCategoryFilterTabs();
  renderArticleFeed();
  renderTrendingSidebar();
  updateBookmarkBadges();
  initPollWidget();
  updateOwnerUI();
  setupEventListeners();

  /* ==========================================================================
     THEME MANAGEMENT
     ========================================================================== */
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcons();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('talktotime_theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcons();
    showToast(`Switched to ${state.theme === 'dark' ? 'Obsidian Dark' : 'Editorial Light'} mode`);
  }

  function updateThemeIcons() {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      if (state.theme === 'dark') {
        btn.innerHTML = `
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        btn.setAttribute('title', 'Switch to Light Mode');
      } else {
        btn.innerHTML = `
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        btn.setAttribute('title', 'Switch to Dark Mode');
      }
    });
  }

  /* ==========================================================================
     LIVE CLOCK & MARKETS
     ========================================================================== */
  function initLiveClock() {
    const topbarClockEl = document.getElementById('topbarDigitalClock');
    const topbarZoneEl = document.getElementById('topbarClockZone');
    const headerClockEl = document.getElementById('headerDigitalClock');
    const breakingClockEl = document.getElementById('breakingDigitalClock');
    const breakingZoneEl = document.getElementById('breakingClockZone');

    state.clock24h = localStorage.getItem('talktotime_clock_24h') === 'true';

    function update() {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      if (liveClockEl) {
        liveClockEl.textContent = now.toLocaleDateString('en-US', options);
      }
      if (headerClockEl) {
        headerClockEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      }
      const timeStr = state.clock24h
        ? now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
        : now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const zoneStr = state.clock24h ? '24H' : 'IST';

      if (topbarClockEl) topbarClockEl.textContent = timeStr;
      if (topbarZoneEl) topbarZoneEl.textContent = zoneStr;
      if (breakingClockEl) breakingClockEl.textContent = timeStr;
      if (breakingZoneEl) breakingZoneEl.textContent = zoneStr;
    }

    window.toggleClockFormat = function() {
      state.clock24h = !state.clock24h;
      localStorage.setItem('talktotime_clock_24h', state.clock24h);
      update();
      showToast(state.clock24h ? 'Clock format: 24-Hour Military Time' : 'Clock format: 12-Hour AM/PM (IST)');
    };

    update();
    setInterval(update, 1000);
  }

  function initMarketTicker() {
    if (!marketTickerEl) return;
    const doubled = [...MARKET_DATA, ...MARKET_DATA];
    marketTickerEl.innerHTML = doubled.map(item => `
      <div class="market-item">
        <span class="symbol">${item.symbol}</span>
        <span class="val">${item.value}</span>
        <span class="${item.up ? 'pos' : 'neg'}">${item.up ? '▲' : '▼'} ${item.change}</span>
      </div>
    `).join('');
  }

  /* ==========================================================================
     BREAKING TICKER
     ========================================================================== */
  function initBreakingTicker() {
    if (!breakingTickerEl) return;
    updateTickerDisplay();

    state.tickerInterval = setInterval(() => {
      if (!state.tickerPaused) {
        nextTickerHeadline();
      }
    }, 4500);

    const container = document.querySelector('.breaking-news-bar');
    if (container) {
      container.addEventListener('mouseenter', () => { state.tickerPaused = true; });
      container.addEventListener('mouseleave', () => { state.tickerPaused = false; });
    }

    const prevBtn = document.getElementById('tickerPrevBtn');
    const nextBtn = document.getElementById('tickerNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', prevTickerHeadline);
    if (nextBtn) nextBtn.addEventListener('click', nextTickerHeadline);
  }

  function updateTickerDisplay() {
    if (!breakingTickerEl) return;
    const text = BREAKING_TICKER[state.currentTickerIndex];
    breakingTickerEl.innerHTML = `
      <span class="ticker-item-active" onclick="window.openArticleById('art-1')">
        ${text}
      </span>
    `;
  }

  function nextTickerHeadline() {
    state.currentTickerIndex = (state.currentTickerIndex + 1) % BREAKING_TICKER.length;
    updateTickerDisplay();
  }

  function prevTickerHeadline() {
    state.currentTickerIndex = (state.currentTickerIndex - 1 + BREAKING_TICKER.length) % BREAKING_TICKER.length;
    updateTickerDisplay();
  }

  /* ==========================================================================
     HERO STORY RENDERER
     ========================================================================== */
  function renderHeroStory() {
    if (!heroContainer) return;
    // Always pick hero or the newest top story
    const hero = NEWS_DATA.find(a => a.isHero) || NEWS_DATA[0];
    if (!hero) return;
    const isSaved = state.bookmarks.includes(hero.id);

    // If hero is a video broadcast, render full interactive video player or poster
    const mediaHtml = (hero.isVideo && hero.videoUrl) ? `
      <div class="hero-video-box">
        <video controls playsinline poster="${hero.image || ''}" class="hero-video-player" id="heroMainVideo">
          <source src="${hero.videoUrl}" type="video/mp4">
          <source src="${hero.videoUrl}" type="video/webm">
          Your browser does not support the video tag.
        </video>
        <div class="hero-badge-floating">
          <span class="pulse-dot"></span>
          <span>▶ TTT LIVE VIDEO BROADCAST</span>
        </div>
      </div>
    ` : `
      <div class="hero-media-wrapper" onclick="window.openArticleById('${hero.id}')" style="cursor: pointer;">
        <img src="${hero.image}" alt="${hero.title}" class="hero-media-img" loading="eager">
        <div class="hero-media-overlay"></div>
        <div class="hero-badge-floating">
          <span class="pulse-dot"></span>
          <span>TALK TO TIME EXCLUSIVE</span>
        </div>
      </div>
    `;

    heroContainer.innerHTML = `
      <div class="hero-grid">
        <div class="hero-media-col">
          ${mediaHtml}
        </div>
        <div class="hero-content-wrapper">
          <div>
            <div class="hero-meta-top">
              <span class="category-tag ${hero.isVideo ? 'category-video-tag' : ''}">${hero.categoryBadge || (hero.isVideo ? '▶ Video Broadcast' : hero.category)}</span>
              <span class="reading-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${hero.readTime || '5 min'}
              </span>
              <span class="reading-time">• ${hero.publishedAt}</span>
            </div>
            <h1 class="hero-headline" onclick="window.openArticleById('${hero.id}')">${hero.title}</h1>
            <p class="hero-description">${hero.summary}</p>
            
            <div class="hero-ai-teaser">
              <div class="hero-ai-teaser-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                <span><strong>AI Key Takeaway:</strong> ${hero.aiInsights?.summaryPoints?.[0] || 'Multi-source verified executive intelligence brief.'}</span>
              </div>
              <button class="ai-btn-sm" onclick="window.openAiModal('${hero.id}')">
                <span>View Summary</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div class="hero-footer">
            <div class="author-block">
              <img src="${hero.author.avatar}" alt="${hero.author.name}" class="author-avatar">
              <div>
                <div class="author-info-name">${hero.author.name}</div>
                <div class="author-info-date">${hero.author.role}</div>
              </div>
            </div>
            <div class="hero-action-group">
              <button class="action-btn ${isSaved ? 'saved' : ''}" onclick="window.toggleBookmark('${hero.id}')" title="Save Story">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
              <button class="action-btn" onclick="window.playAudioBrief('${hero.id}')" title="Listen with AI Audio">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
              </button>
              <button class="btn-primary" onclick="window.openArticleById('${hero.id}')">
                <span>${hero.isVideo ? 'Watch & Read Dispatch' : 'Read Full Story'}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     TOP STORIES RENDERER (Sorted by Timestamp descending)
     ========================================================================== */
  function renderTopStories() {
    if (!topStoriesContainer) return;
    const hero = NEWS_DATA.find(a => a.isHero) || NEWS_DATA[0];
    // Exclude hero, take the next 3 newest dispatches
    const topStories = NEWS_DATA.filter(a => a.id !== hero?.id).slice(0, 3);

    topStoriesContainer.innerHTML = topStories.map(story => {
      const isSaved = state.bookmarks.includes(story.id);
      return `
        <article class="magazine-card ${story.isVideo ? 'magazine-card-video' : ''}">
          <div class="card-media" onclick="window.openArticleById('${story.id}')" style="cursor: pointer;">
            <img src="${story.image}" alt="${story.title}" loading="lazy">
            <span class="card-category-floating ${story.isVideo ? 'category-video-tag' : ''}">
              ${story.isVideo ? '▶ VIDEO' : (story.categoryBadge || story.category)}
            </span>
            ${story.isVideo ? `
              <div class="card-video-play-hint">
                <div class="play-circle-glow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
              </div>
            ` : ''}
            <button class="card-bookmark-btn ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); window.toggleBookmark('${story.id}')" title="Bookmark Article">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            </button>
          </div>
          <div class="card-body">
            <div class="card-meta-row">
              <span>${story.publishedAt}</span>
              <span>${story.readTime}</span>
            </div>
            <h3 class="card-headline" onclick="window.openArticleById('${story.id}')">${story.title}</h3>
            <p class="card-excerpt">${story.summary}</p>
            <div class="card-footer">
              <div class="card-author-micro">
                <img src="${story.author.avatar}" alt="${story.author.name}">
                <span class="card-author-name">${story.author.name}</span>
              </div>
              <button class="card-ai-btn" onclick="window.openAiModal('${story.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                <span>AI Brief</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     CATEGORY FILTER & MAIN FEED (Reverse Chronological: Newest on Top)
     ========================================================================== */
  function renderCategoryFilterTabs() {
    if (!filterTabsContainer) return;
    filterTabsContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="filter-tab-btn ${state.activeCategory === cat.id ? 'active' : ''}" onclick="window.setCategory('${cat.id}')">
        ${cat.name}
      </button>
    `).join('');
  }

  function renderArticleFeed() {
    if (!articleFeedContainer) return;

    let list = NEWS_DATA;
    if (state.activeCategory !== 'all') {
      list = NEWS_DATA.filter(a => a.category.toLowerCase() === state.activeCategory.toLowerCase());
    }

    if (list.length === 0) {
      articleFeedContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1rem;">No articles or videos currently found in this category.</p>
          <button class="btn-secondary" onclick="window.setCategory('all')">View All Dispatches</button>
        </div>
      `;
      return;
    }

    articleFeedContainer.innerHTML = list.map(story => {
      const isSaved = state.bookmarks.includes(story.id);
      return `
        <article class="feed-article-item ${story.isVideo ? 'feed-item-video' : ''}">
          <div class="feed-thumb" onclick="window.openArticleById('${story.id}')" style="cursor: pointer;">
            <img src="${story.image}" alt="${story.title}" loading="lazy">
            <span class="card-category-floating ${story.isVideo ? 'category-video-tag' : ''}">
              ${story.isVideo ? '▶ VIDEO' : story.category}
            </span>
            ${story.isVideo ? `
              <div class="thumb-video-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>WATCH</span>
              </div>
            ` : ''}
          </div>
          <div class="feed-content">
            <div>
              <div class="card-meta-row" style="margin-bottom: 0.35rem;">
                <span style="color: ${story.isVideo ? 'var(--brand-red)' : 'var(--accent-blue)'}; font-weight: 700;">
                  ${story.categoryBadge || (story.isVideo ? '▶ Video Dispatch' : story.category)}
                </span>
                <span>${story.publishedAt} • ${story.readTime}</span>
              </div>
              <h3 class="feed-headline" onclick="window.openArticleById('${story.id}')">${story.title}</h3>
              <p class="feed-desc">${story.summary}</p>
            </div>
            <div class="feed-meta-bottom">
              <div class="card-author-micro">
                <img src="${story.author.avatar}" alt="${story.author.name}">
                <span>${story.author.name}</span>
              </div>
              <div class="feed-actions">
                <button class="card-ai-btn" onclick="window.openAiModal('${story.id}')">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                  <span>AI Takeaways</span>
                </button>
                <button class="action-btn" style="width: 30px; height: 30px;" onclick="window.playAudioBrief('${story.id}')" title="Audio Brief">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                </button>
                <button class="action-btn ${isSaved ? 'saved' : ''}" style="width: 30px; height: 30px;" onclick="window.toggleBookmark('${story.id}')" title="Save">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     TRENDING SIDEBAR
     ========================================================================== */
  function renderTrendingSidebar() {
    if (!trendingListContainer) return;
    const trending = [...NEWS_DATA].sort((a, b) => a.trendingRank - b.trendingRank).slice(0, 5);

    trendingListContainer.innerHTML = trending.map((item, index) => `
      <div class="trending-item" onclick="window.openArticleById('${item.id}')">
        <span class="trending-rank">0${index + 1}</span>
        <div class="trending-info">
          <span style="font-size: 0.7rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase;">${item.category}</span>
          <h4 class="trending-title">${item.title}</h4>
          <span class="trending-meta">${item.views} readers • ${item.readTime}</span>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     OPINION POLL WIDGET
     ========================================================================== */
  function initPollWidget() {
    const pollContainer = document.getElementById('pollWidgetContainer');
    if (!pollContainer) return;

    renderPoll();

    window.votePoll = function(opt) {
      if (state.pollVoted) {
        showToast('You have already voted in today\'s poll!');
        return;
      }
      state.pollCounts[opt] += 1;
      state.pollVoted = true;
      localStorage.setItem('talktotime_poll_voted', 'true');
      renderPoll();
      showToast('Thank you for voting on Talk To Time!');
    };

    function renderPoll() {
      const total = state.pollCounts.opt1 + state.pollCounts.opt2 + state.pollCounts.opt3;
      const p1 = Math.round((state.pollCounts.opt1 / total) * 100);
      const p2 = Math.round((state.pollCounts.opt2 / total) * 100);
      const p3 = Math.round((state.pollCounts.opt3 / total) * 100);

      pollContainer.innerHTML = `
        <div class="poll-question">Will open-weight AI models achieve reasoning parity with proprietary labs by 2027?</div>
        <div class="poll-options">
          <button class="poll-option-btn" onclick="window.votePoll('opt1')">
            <div class="poll-bar" style="width: ${state.pollVoted ? p1 : 0}%"></div>
            <span class="poll-text">Yes, open ecosystem pace is unstoppable</span>
            ${state.pollVoted ? `<span class="poll-percentage">${p1}%</span>` : ''}
          </button>
          <button class="poll-option-btn" onclick="window.votePoll('opt2')">
            <div class="poll-bar" style="width: ${state.pollVoted ? p2 : 0}%"></div>
            <span class="poll-text">No, proprietary compute scale will dominate</span>
            ${state.pollVoted ? `<span class="poll-percentage">${p2}%</span>` : ''}
          </button>
          <button class="poll-option-btn" onclick="window.votePoll('opt3')">
            <div class="poll-bar" style="width: ${state.pollVoted ? p3 : 0}%"></div>
            <span class="poll-text">Hybrid / Parity across domains</span>
            ${state.pollVoted ? `<span class="poll-percentage">${p3}%</span>` : ''}
          </button>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.74rem; color: var(--text-muted);">
          <span>Total Votes: ${total.toLocaleString()}</span>
          <span>${state.pollVoted ? '✓ Recorded' : 'Live Reader Poll'}</span>
        </div>
      `;
    }
  }

  /* ==========================================================================
     GLOBAL MODAL CONTROLS & EXPOSURES
     ========================================================================== */

  // Channel Profile / About Us Modal
  window.openChannelModal = function() {
    openModal('channelModal');
  };

  // Privacy Policy Modal
  window.openPrivacyModal = function() {
    openModal('privacyModal');
  };

  // Terms and Conditions Modal
  window.openTermsModal = function() {
    openModal('termsModal');
  };

  // Disclaimer Modal
  window.openDisclaimerModal = function() {
    openModal('disclaimerModal');
  };

  // Global Category Setter
  window.setCategory = function(catId) {
    state.activeCategory = catId || 'all';
    renderCategoryFilterTabs();
    renderArticleFeed();

    // Set glowing active class on the selected desktop nav link
    document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
      const onclickAttr = link.getAttribute('onclick') || '';
      const text = link.textContent.trim().toLowerCase();
      const match = onclickAttr.match(/setCategory\('([^']+)'\)/);
      const linkCat = (match ? match[1] : text).toLowerCase();
      const targetCat = (catId || 'all').toLowerCase();

      if (linkCat === targetCat || (targetCat === 'all' && (linkCat === 'all' || text === 'home'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Also update mobile drawer nav links
    document.querySelectorAll('.mobile-drawer-box .nav-link').forEach(link => {
      const onclickAttr = link.getAttribute('onclick') || '';
      const text = link.textContent.trim().toLowerCase();
      const match = onclickAttr.match(/setCategory\('([^']+)'\)/);
      const linkCat = (match ? match[1] : text).toLowerCase();
      const targetCat = (catId || 'all').toLowerCase();

      if (linkCat === targetCat || (targetCat === 'all' && (linkCat === 'all' || text === 'home'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Article Reader Modal
  window.openArticleById = function(id) {
    const article = NEWS_DATA.find(a => a.id === id);
    if (!article) return;
    state.activeArticle = article;

    const isSaved = state.bookmarks.includes(article.id);
    const contentBox = document.getElementById('readerModalContent');
    if (!contentBox) return;

    const mediaElement = (article.isVideo && article.videoUrl) ? `
      <div class="reader-video-wrapper">
        <video controls autoplay playsinline poster="${article.image || ''}" class="reader-video-player">
          <source src="${article.videoUrl}" type="video/mp4">
          <source src="${article.videoUrl}" type="video/webm">
          Your browser does not support HTML5 video.
        </video>
        <div class="video-broadcast-indicator">
          <span class="pulse-dot"></span>
          <span>TALK TO TIME VIDEO STREAM</span>
        </div>
      </div>
    ` : `
      <img src="${article.image}" alt="${article.title}" class="reader-hero-img">
    `;

    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-toolbar">
          <span class="category-tag ${article.isVideo ? 'category-video-tag' : ''}">${article.isVideo ? '▶ Video Broadcast' : article.category}</span>
          <button class="font-size-btn" onclick="window.changeReaderFontSize(-1)" title="Decrease font">A-</button>
          <button class="font-size-btn" onclick="window.changeReaderFontSize(1)" title="Increase font">A+</button>
        </div>
        <div style="display: flex; align-items: center; gap: 0.45rem;">
          <button class="action-btn" onclick="window.playAudioBrief('${article.id}')" title="Listen Audio">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
          </button>
          <button class="action-btn ${isSaved ? 'saved' : ''}" onclick="window.toggleBookmark('${article.id}');" title="Bookmark">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
          <button class="action-btn" onclick="window.copyShareLink('${article.title}')" title="Share Story">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
          <button class="action-btn" onclick="window.closeModal('readerModal')" title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      <div class="reader-body-scroll" id="readerTextContainer" style="font-size: ${state.readerFontSize}px">
        <h1 style="font-family: var(--font-serif); font-size: 2.2rem; line-height: 1.25; margin-bottom: 1.15rem;">${article.title}</h1>
        <div class="reader-meta-row">
          <div class="card-author-micro">
            <img src="${article.author.avatar}" alt="${article.author.name}" style="width: 36px; height: 36px;">
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">${article.author.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${article.author.role}</div>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Published ${article.date} • ${article.readTime}
          </div>
        </div>

        ${mediaElement}

        <div class="article-rich-text" id="readerTextContainer">
          ${article.content}
        </div>

        <div style="margin-top: 2.5rem; padding: 1.35rem; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.65rem; color: var(--accent-violet);">✦ TALK TO TIME (TTT) Key Takeaways</h4>
          <ul style="list-style: disc; padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-secondary);">
            ${article.aiInsights?.summaryPoints?.map(p => `<li style="margin-bottom: 0.45rem;">${p}</li>`).join('') || '<li>Verified independent journalism by Talk To Time correspondents.</li>'}
          </ul>
        </div>
      </div>
    `;

    openModal('readerModal');
  };

  window.changeReaderFontSize = function(delta) {
    state.readerFontSize = Math.max(14, Math.min(26, state.readerFontSize + delta * 2));
    const textContainer = document.getElementById('readerTextContainer');
    if (textContainer) {
      textContainer.style.fontSize = `${state.readerFontSize}px`;
    }
  };

  // AI Insights Modal
  window.openAiModal = function(id) {
    const article = NEWS_DATA.find(a => a.id === id);
    if (!article) return;

    const contentBox = document.getElementById('aiModalContent');
    if (!contentBox) return;

    contentBox.innerHTML = `
      <div class="ai-modal-header">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--accent-gradient); display: flex; align-items: center; justify-content: center; color: #fff;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
          </div>
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); line-height: 1.2;">TTT Executive Intelligence</h3>
            <span style="font-size: 0.72rem; color: var(--accent-violet); font-weight: 600;">Talk To Time Cognitive Synthesis</span>
          </div>
        </div>
        <button class="action-btn" onclick="window.closeModal('aiModal')" title="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 1.15rem; color: var(--text-primary);">${article.title}</h4>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 1.25rem;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Fact-Verification Index</div>
            <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: #10b981; margin: 0.2rem 0;">${article.aiInsights.factCheckScore}%</div>
            <span style="font-size: 0.68rem; color: #10b981; font-weight: 700; background: rgba(16, 185, 129, 0.1); padding: 2px 5px; border-radius: 3px;">VERIFIED SOURCE</span>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Market Impact Score</div>
            <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: var(--accent-blue); margin: 0.2rem 0;">${article.aiInsights.sentimentScore}/100</div>
            <span style="font-size: 0.68rem; color: var(--accent-blue); font-weight: 700; background: rgba(37, 99, 235, 0.1); padding: 2px 5px; border-radius: 3px;">${article.aiInsights.sentiment}</span>
          </div>
        </div>

        <h5 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.75rem;">Executive Takeaways</h5>
        ${article.aiInsights.summaryPoints.map((point, i) => `
          <div class="ai-takeaway-item">
            <span class="ai-takeaway-num">${i + 1}</span>
            <p style="color: var(--text-secondary); line-height: 1.45;">${point}</p>
          </div>
        `).join('')}

        <div style="margin-top: 1.25rem; display: flex; gap: 0.65rem;">
          <button class="btn-primary" style="flex: 1; justify-content: center;" onclick="window.playAudioBrief('${article.id}'); window.closeModal('aiModal');">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            <span>Play Audio Synthesis</span>
          </button>
          <button class="btn-secondary" onclick="window.openArticleById('${article.id}'); window.closeModal('aiModal');">
            Read Full Dispatch
          </button>
        </div>
      </div>
    `;

    openModal('aiModal');
  };

  // Bookmarks Toggle & View
  window.toggleBookmark = function(id) {
    const index = state.bookmarks.indexOf(id);
    if (index > -1) {
      state.bookmarks.splice(index, 1);
      showToast('Story removed from saved library');
    } else {
      state.bookmarks.push(id);
      showToast('Story saved to Talk To Time library');
    }
    localStorage.setItem('talktotime_bookmarks', JSON.stringify(state.bookmarks));
    updateBookmarkBadges();
    renderHeroStory();
    renderTopStories();
    renderArticleFeed();
    if (bookmarksModal && bookmarksModal.classList.contains('active')) {
      window.openBookmarksModal();
    }
  };

  function updateBookmarkBadges() {
    bookmarkCountBadges.forEach(badge => {
      badge.textContent = state.bookmarks.length;
      badge.style.display = state.bookmarks.length > 0 ? 'flex' : 'none';
    });
  }

  window.openBookmarksModal = function() {
    const contentBox = document.getElementById('bookmarksModalContent');
    if (!contentBox) return;

    const savedArticles = NEWS_DATA.filter(a => state.bookmarks.includes(a.id));

    contentBox.innerHTML = `
      <div class="reader-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">Saved Library (${savedArticles.length})</h3>
        </div>
        <button class="action-btn" onclick="window.closeModal('bookmarksModal')" title="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div style="padding: 1.25rem; max-height: 70vh; overflow-y: auto;">
        ${savedArticles.length === 0 ? `
          <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.75rem; opacity: 0.4;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            <p style="font-size: 0.9rem;">Your library is empty. Click the bookmark icon on any dispatch to save it.</p>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${savedArticles.map(art => `
              <div style="display: flex; gap: 0.85rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.75rem; align-items: center;">
                <img src="${art.image}" alt="${art.title}" style="width: 76px; height: 56px; object-fit: cover; border-radius: var(--radius-xs);">
                <div style="flex-grow: 1;">
                  <span style="font-size: 0.7rem; color: var(--accent-blue); font-weight: 700; text-transform: uppercase;">${art.category}</span>
                  <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); cursor: pointer; line-height: 1.3;" onclick="window.openArticleById('${art.id}'); window.closeModal('bookmarksModal');">${art.title}</h4>
                </div>
                <button class="action-btn" style="width: 30px; height: 30px; color: #ef4444;" onclick="window.toggleBookmark('${art.id}')" title="Remove">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    openModal('bookmarksModal');
  };

  // Search Modal
  function openSearchModal() {
    const input = document.getElementById('searchModalInput');
    const resultsContainer = document.getElementById('searchResultsContainer');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 120);
    }
    renderSearchResults('');
    openModal('searchModal');
  }
  window.openSearchModal = openSearchModal;

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById('searchResultsContainer');
    if (!resultsContainer) return;

    const data = (window.getSortedNewsData ? window.getSortedNewsData() : NEWS_DATA) || [];
    const q = (query || '').trim().toLowerCase();
    const filtered = q === '' ? data.slice(0, 5) : data.filter(a => {
      const title = (a.title || '').toLowerCase();
      const summary = (a.summary || '').toLowerCase();
      const cat = (a.category || '').toLowerCase();
      return title.includes(q) || summary.includes(q) || cat.includes(q);
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.9rem;">
          No stories found matching "${query}"
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <div class="search-result-item" onclick="window.openArticleById('${item.id}'); window.closeModal('searchModal');">
        <div>
          <span style="font-size: 0.7rem; color: var(--accent-blue); font-weight: 700; text-transform: uppercase;">${item.category || 'News'}</span>
          <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${item.title}</h4>
          <span style="font-size: 0.74rem; color: var(--text-muted);">${item.publishedAt || 'Recent'} • ${item.readTime || '3 min'}</span>
        </div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    `).join('');
  }
  window.renderSearchResults = renderSearchResults;

  // Audio Player
  window.playAudioBrief = function(id) {
    const article = NEWS_DATA.find(a => a.id === id) || NEWS_DATA[0];
    state.audioState.currentArticleId = article.id;
    state.audioState.currentTime = 0;
    state.audioState.isPlaying = true;

    if (audioTitle) audioTitle.textContent = article.title;
    if (audioPlayer) audioPlayer.classList.add('visible');

    startAudioSimulation();
    showToast(`Streaming TTT AI voice: "${article.title.substring(0, 30)}..."`);
  };

  function startAudioSimulation() {
    clearInterval(state.audioState.timer);
    updateAudioUI();

    state.audioState.timer = setInterval(() => {
      if (state.audioState.isPlaying) {
        state.audioState.currentTime += 1 * state.audioState.playbackRate;
        if (state.audioState.currentTime >= state.audioState.duration) {
          state.audioState.currentTime = state.audioState.duration;
          state.audioState.isPlaying = false;
          clearInterval(state.audioState.timer);
          showToast('Talk To Time audio broadcast complete');
        }
        updateAudioUI();
      }
    }, 1000);
  }

  function updateAudioUI() {
    if (!audioPlayBtn) return;
    audioPlayBtn.innerHTML = state.audioState.isPlaying ? `
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
    ` : `
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
    `;

    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (audioTimeCurrent) audioTimeCurrent.textContent = formatTime(state.audioState.currentTime);
    if (audioTimeTotal) audioTimeTotal.textContent = formatTime(state.audioState.duration);
    if (audioScrubberFill) {
      const pct = (state.audioState.currentTime / state.audioState.duration) * 100;
      audioScrubberFill.style.width = `${pct}%`;
    }
  }

  window.toggleAudioPlay = function() {
    state.audioState.isPlaying = !state.audioState.isPlaying;
    updateAudioUI();
  };

  window.cycleAudioSpeed = function() {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(state.audioState.playbackRate);
    state.audioState.playbackRate = speeds[(currentIndex + 1) % speeds.length];
    if (audioSpeedBtn) audioSpeedBtn.textContent = `${state.audioState.playbackRate}x`;
    showToast(`Playback speed set to ${state.audioState.playbackRate}x`);
  };

  window.closeAudioPlayer = function() {
    state.audioState.isPlaying = false;
    clearInterval(state.audioState.timer);
    if (audioPlayer) audioPlayer.classList.remove('visible');
  };

  // Toast
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="pulse-dot"></span>
      <span>${msg}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  window.copyShareLink = function(title) {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Copied dispatch link to clipboard!`);
  };

  // Modal helpers
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      body.style.overflow = 'hidden';
    }
  }

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      body.style.overflow = '';
    }
  };

  // ==========================================================================
  // 9. BROADCAST STUDIO / UPLOAD VIDEO & ARTICLE ENGINE (CHANNEL OWNER ONLY)
  // ==========================================================================
  let studioVideoSrc = '';
  let studioImageSrc = '';

  window.openPublishModal = function() {
    // SECURITY CHECK: Only the channel owner can upload or publish
    if (!state.isOwner) {
      const errEl = document.getElementById('ownerAuthError');
      if (errEl) errEl.style.display = 'none';
      const passInput = document.getElementById('ownerAuthPasscode');
      if (passInput) passInput.value = '';
      openModal('ownerAuthModal');
      setTimeout(() => {
        if (passInput) passInput.focus();
      }, 150);
      return;
    }

    openModal('publishModal');
    // Set focus to title
    setTimeout(() => {
      const titleInput = document.getElementById('pubTitle');
      if (titleInput) titleInput.focus();
    }, 150);
  };

  window.handleOwnerAuthSubmit = function(e) {
    e.preventDefault();
    const passInput = document.getElementById('ownerAuthPasscode');
    const errEl = document.getElementById('ownerAuthError');
    const enteredPass = passInput?.value.trim();

    if (enteredPass === OWNER_CONFIG.passcode) {
      state.isOwner = true;
      localStorage.setItem('talktotime_is_owner', 'true');
      if (errEl) errEl.style.display = 'none';
      closeModal('ownerAuthModal');
      updateOwnerUI();
      openModal('publishModal');
      showToast('✓ Welcome Channel Owner! Studio broadcast console unlocked.');
    } else {
      if (errEl) {
        errEl.textContent = '✗ Access Denied: Incorrect passcode. Only the Talk to TIME channel owner can upload news or videos.';
        errEl.style.display = 'block';
      }
      showToast('Access Denied: Only the verified channel owner can upload.');
    }
  };

  window.togglePasscodeVisibility = function() {
    const input = document.getElementById('ownerAuthPasscode');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  window.logoutOwner = function() {
    state.isOwner = false;
    localStorage.removeItem('talktotime_is_owner');
    updateOwnerUI();
    closeModal('publishModal');
    showToast('Channel Owner logged out. Upload access locked.');
  };

  window.openOwnerAuthModal = function() {
    const errEl = document.getElementById('ownerAuthError');
    if (errEl) errEl.style.display = 'none';
    const passInput = document.getElementById('ownerAuthPasscode');
    if (passInput) passInput.value = '';
    openModal('ownerAuthModal');
    setTimeout(() => {
      if (passInput) passInput.focus();
    }, 150);
  };

  function updateOwnerUI() {
    // 1. Toggle body class for strict CSS display isolation:
    if (state.isOwner) {
      document.body.classList.add('is-channel-owner');
    } else {
      document.body.classList.remove('is-channel-owner');
    }

    // 2. Control visibility and content of all Studio buttons:
    const pubBtns = document.querySelectorAll('.publish-trigger-btn');
    pubBtns.forEach(btn => {
      if (state.isOwner) {
        btn.style.display = 'inline-flex';
        btn.innerHTML = `
          <span class="pulse-dot" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span>
          <span>✦ Owner Studio</span>
        `;
        btn.setAttribute('title', 'Channel Owner Studio (Click to Broadcast Video or News)');
      } else {
        // STRICT PRIVACY: 100% hidden for all regular viewers
        btn.style.display = 'none';
      }
    });

    // 3. Update footer owner login/studio link:
    const ownerLinks = document.querySelectorAll('.footer-owner-link');
    ownerLinks.forEach(link => {
      if (state.isOwner) {
        link.innerHTML = '🔒 Owner Studio (Active)';
        link.onclick = (e) => {
          e.preventDefault();
          window.openPublishModal();
        };
      } else {
        link.innerHTML = '🔒 Owner Login';
        link.onclick = (e) => {
          e.preventDefault();
          window.openOwnerAuthModal();
        };
      }
    });
  }

  window.handleContentTypeChange = function(type) {
    const videoSection = document.getElementById('videoSourceSection');
    const videoOpt = document.getElementById('formatVideoOption');
    const articleOpt = document.getElementById('formatArticleOption');
    const pubTitle = document.getElementById('pubTitle');

    if (type === 'video') {
      if (videoSection) videoSection.style.display = 'block';
      if (videoOpt) videoOpt.classList.add('active');
      if (articleOpt) articleOpt.classList.remove('active');
      if (pubTitle) pubTitle.placeholder = 'e.g. BREAKING: Exclusive Video Dispatch on Quantum Coherence Breakthrough';
    } else {
      if (videoSection) videoSection.style.display = 'none';
      if (videoOpt) videoOpt.classList.remove('active');
      if (articleOpt) articleOpt.classList.add('active');
      if (pubTitle) pubTitle.placeholder = 'e.g. In-Depth Investigation: Autonomous Agent Workflows in Enterprise Infrastructure';
    }
  };

  window.switchVideoTab = function(tab) {
    const tabUpload = document.getElementById('videoTabUpload');
    const tabUrl = document.getElementById('videoTabUrl');
    const fileWrap = document.getElementById('videoFileInputWrap');
    const urlWrap = document.getElementById('videoUrlInputWrap');

    if (tab === 'file') {
      if (tabUpload) tabUpload.classList.add('active');
      if (tabUrl) tabUrl.classList.remove('active');
      if (fileWrap) fileWrap.style.display = 'block';
      if (urlWrap) urlWrap.style.display = 'none';
    } else {
      if (tabUpload) tabUpload.classList.remove('active');
      if (tabUrl) tabUrl.classList.add('active');
      if (fileWrap) fileWrap.style.display = 'none';
      if (urlWrap) urlWrap.style.display = 'block';
    }
  };

  window.handleVideoFileUpload = function(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const statusEl = document.getElementById('videoFileStatus');
    const previewContainer = document.getElementById('videoPreviewContainer');
    const previewVideo = document.getElementById('pubVideoPreview');

    // Create an object URL or DataURL for instant local streaming
    const videoUrl = URL.createObjectURL(file);
    studioVideoSrc = videoUrl;

    if (statusEl) {
      statusEl.textContent = `✓ Selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
      statusEl.style.display = 'block';
    }

    if (previewVideo && previewContainer) {
      previewVideo.src = videoUrl;
      previewContainer.style.display = 'block';
      previewVideo.load();
    }
    showToast(`Video loaded: ${file.name}`);
  };

  window.handleVideoUrlInput = function(event) {
    const url = event.target.value.trim();
    studioVideoSrc = url;
    const previewContainer = document.getElementById('videoPreviewContainer');
    const previewVideo = document.getElementById('pubVideoPreview');

    if (url && previewVideo && previewContainer) {
      previewVideo.src = url;
      previewContainer.style.display = 'block';
      previewVideo.load();
    }
  };

  window.handleImageFileUpload = function(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      studioImageSrc = e.target.result;
      const imgPreview = document.getElementById('pubImagePreview');
      const imgPreviewContainer = document.getElementById('imagePreviewContainer');
      const pubImageUrl = document.getElementById('pubImageUrl');
      if (imgPreview && imgPreviewContainer) {
        imgPreview.src = studioImageSrc;
        imgPreviewContainer.style.display = 'block';
      }
      if (pubImageUrl) {
        pubImageUrl.value = file.name;
      }
      showToast(`Thumbnail uploaded: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Setup Event Listeners
  function setupEventListeners() {
    // Brand Logo click -> open Talk To Time Channel Modal
    const brandLogoTrigger = document.getElementById('brandLogoTrigger');
    if (brandLogoTrigger) {
      brandLogoTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        window.openChannelModal();
      });
    }

    // Studio Publish Form Submission
    const publishForm = document.getElementById('publishArticleForm');
    if (publishForm) {
      publishForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // STRICT SECURITY GUARD: Only the verified channel owner can publish news or video
        if (!state.isOwner) {
          showToast('Access Denied: Only the Talk to TIME channel owner can broadcast content!');
          window.closeModal('publishModal');
          window.openPublishModal();
          return;
        }

        const title = document.getElementById('pubTitle')?.value.trim();
        const category = document.getElementById('pubCategory')?.value || 'AI';
        const authorName = document.getElementById('pubAuthorName')?.value.trim() || 'Talk To Time Bureau';
        const summary = document.getElementById('pubSummary')?.value.trim();
        const content = document.getElementById('pubContent')?.value.trim();
        const isHero = document.getElementById('pubIsHero')?.checked ?? true;
        const contentType = document.querySelector('input[name="contentType"]:checked')?.value || 'video';
        const isVideo = contentType === 'video';
        
        let videoUrl = studioVideoSrc || document.getElementById('pubVideoUrl')?.value.trim();
        // If it's a video and no video was uploaded/entered, supply high compatibility sample stream
        if (isVideo && !videoUrl) {
          videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
        }

        let imageUrl = studioImageSrc || document.getElementById('pubImageUrl')?.value.trim();
        if (!imageUrl || imageUrl.includes('.mp4') || imageUrl.includes('.webm')) {
          // Category-specific high-resolution default image
          const defaultImages = {
            'Science': 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
            'AI': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
            'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
            'India': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
            'World': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
            'Politics': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
            'Business': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
            'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
            'Entertainment': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
          };
          imageUrl = defaultImages[category] || defaultImages['AI'];
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        const newArticle = {
          id: 'dispatch-' + Date.now(),
          title: title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          category: category,
          categoryBadge: isVideo ? '▶ Video Broadcast' : category,
          isBreaking: true,
          isFeatured: true,
          isHero: isHero,
          isVideo: isVideo,
          videoUrl: isVideo ? videoUrl : null,
          trendingRank: 1,
          image: imageUrl,
          author: {
            name: authorName,
            role: "TTT Field Correspondent",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
          },
          publishedAt: "Just Now",
          date: dateStr,
          timestamp: Date.now(), // High timestamp guarantees top placement!
          readTime: isVideo ? "4 min watch" : "5 min read",
          views: "1.4k",
          summary: summary,
          content: content ? `<p class="lead">${summary}</p>` + content.split('\n\n').map(p => `<p>${p}</p>`).join('') : `<p class="lead">${summary}</p><p>Live coverage and updates provided by the Talk To Time Global Bureau.</p>`,
          aiInsights: {
            summaryPoints: [
              `Broadcast Topic: ${title}`,
              `Real-time verified report from the ${category} desk.`,
              `Instant video synthesis streamed on the Talk To Time Network.`
            ],
            sentiment: "Verified Dispatch",
            sentimentScore: 95,
            factCheckScore: 99.6,
            keyEntities: ["Talk To Time", category, "Live Dispatch"],
            audioSummaryUrl: "#"
          }
        };

        // Save and get newly sorted news data (guaranteed newest at index 0)
        window.saveCustomNewsItem(newArticle);

        // Re-render whole site
        renderHeroStory();
        renderTopStories();
        renderArticleFeed();
        renderTrendingSidebar();

        // Reset studio state & close modal
        publishForm.reset();
        studioVideoSrc = '';
        studioImageSrc = '';
        const previewContainer = document.getElementById('videoPreviewContainer');
        if (previewContainer) previewContainer.style.display = 'none';
        const imgPreviewContainer = document.getElementById('imagePreviewContainer');
        if (imgPreviewContainer) imgPreviewContainer.style.display = 'none';
        const videoStatus = document.getElementById('videoFileStatus');
        if (videoStatus) videoStatus.style.display = 'none';

        window.closeModal('publishModal');
        showToast(isVideo ? '✓ Video Broadcast Published at the TOP of Talk To Time!' : '✓ News Dispatch Published at the TOP of Talk To Time!');

        // Smooth scroll to top so user sees the newly published story immediately!
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Theme switchers (Desktop header & mobile drawer)
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => btn.addEventListener('click', toggleTheme));

    // Search trigger
    const searchTrigger = document.getElementById('searchModalTrigger');
    if (searchTrigger) {
      searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        window.openSearchModal();
      });
    }

    const searchInput = document.getElementById('searchModalInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
    }

    // Hotkey Ctrl+K / Cmd+K and Owner Hotkey Ctrl+Shift+O / Ctrl+Alt+O
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        window.openSearchModal();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'o' || e.key === 'O') && (e.altKey || e.shiftKey)) {
        e.preventDefault();
        window.openOwnerAuthModal();
      }
      if (e.key === 'Escape') {
        ['readerModal', 'aiModal', 'searchModal', 'bookmarksModal', 'channelModal', 'privacyModal', 'termsModal', 'disclaimerModal', 'ownerAuthModal', 'publishModal', 'mobileDrawer'].forEach(window.closeModal);
      }
    });

    // Close modals on clicking backdrop
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
          body.style.overflow = '';
        }
      });
    });

    // Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        if (input && input.value) {
          showToast(`Subscribed ${input.value} to Talk To Time Daily Brief!`);
          input.value = '';
        }
      });
    }

    // Header scroll background effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile drawer
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');

    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.add('active');
        body.style.overflow = 'hidden';
      });
    }

    if (mobileDrawerClose && mobileDrawer) {
      mobileDrawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        body.style.overflow = '';
      });
    }
  }
});
