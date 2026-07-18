/* ==========================================================================
   MOTI JPN GG Premium JavaScript Code
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerClose = document.getElementById('mobile-drawer-close');
    
    // Copy IP Buttons
    const btnCopyIpNav = document.getElementById('btn-copy-ip-nav');
    const btnCopyIpHero = document.getElementById('btn-copy-ip-hero');
    const btnCopyIpDrawer = document.getElementById('btn-copy-ip-drawer');
    const toast = document.getElementById('toast');
    
    // Live Stats Elements
    const heroStatusBadge = document.getElementById('hero-status-badge');
    const statusBadgeText = document.getElementById('status-badge-text');
    const heroOnlineCount = document.getElementById('hero-online-count');
    const statusRing = document.getElementById('status-ring');
    const statusTextLarge = document.getElementById('status-text-large');
    const statusVersion = document.getElementById('status-version');
    const statusPlayers = document.getElementById('status-players');
    const statusPing = document.getElementById('status-ping');

    const SERVER_IP = 'moti.jpn.gg';

    // 1. Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Active Section Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            let targetHref = `#${current}`;
            if (current === 'victorydances') {
                targetHref = '#cosmetics';
            }
            if (link.getAttribute('href') === targetHref) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Navigation Drawer
    mobileMenuToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
    });

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
    };

    mobileDrawerClose.addEventListener('click', closeDrawer);
    
    // Close drawer when clicking links
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 4. Clipboard copy function with Toast notification
    const copyIPAddress = () => {
        navigator.clipboard.writeText(SERVER_IP).then(() => {
            // Show Success Toast
            toast.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('IPアドレスのコピーに失敗しました: ', err);
        });
    };

    // Attach clipboard click events
    if (btnCopyIpNav) btnCopyIpNav.addEventListener('click', copyIPAddress);
    if (btnCopyIpHero) btnCopyIpHero.addEventListener('click', copyIPAddress);
    if (btnCopyIpDrawer) btnCopyIpDrawer.addEventListener('click', copyIPAddress);

    // 5. Fetch Minecraft Server Status
    const updateServerStatus = () => {
        const startTime = Date.now();
        fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`)
            .then(res => res.json())
            .then(data => {
                const pingTime = Date.now() - startTime;
                
                if (data.online) {
                    // Update badges
                    heroStatusBadge.classList.add('online');
                    statusBadgeText.textContent = `${data.players.online} 人がオンライン`;
                    
                    // Animate online count in hero section
                    animateCount(heroOnlineCount, data.players.online);
                    
                    // Update status card
                    statusRing.className = 'indicator-ring online';
                    statusTextLarge.textContent = 'ONLINE';
                    statusTextLarge.style.color = 'var(--success-color)';
                    
                    // Use cleaner version name if available
                    let verName = '1.21.11';
                    if (data.version && data.version.name_clean) {
                        verName = data.version.name_clean;
                    }
                    statusVersion.textContent = verName;
                    statusPlayers.textContent = `${data.players.online} / ${data.players.max}`;
                    
                    statusPing.textContent = `${pingTime} ms`;
                } else {
                    handleOffline();
                }
            })
            .catch(err => {
                console.error('ステータスAPIの取得エラー:', err);
                handleOffline();
            });
    };

    const handleOffline = () => {
        heroStatusBadge.classList.remove('online');
        statusBadgeText.textContent = 'オフライン';
        
        statusRing.className = 'indicator-ring offline';
        statusTextLarge.textContent = 'OFFLINE';
        statusTextLarge.style.color = '#ff4b4b';
        
        statusPlayers.textContent = '0 / 0';
        statusPing.textContent = '-- ms';
    };

    // Helper count up animation function
    const animateCount = (element, target) => {
        if (target === 0) {
            element.textContent = '0';
            return;
        }
        let current = 0;
        const duration = 1200; // milliseconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
            current += Math.ceil(target / 40);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, stepTime);
    };

    // 6. Sakura Falling Leaves Effect
    const sakuraContainer = document.getElementById('sakura-container');
    if (sakuraContainer) {
        const createPetal = () => {
            const petal = document.createElement('div');
            petal.classList.add('sakura-petal');
            
            // Random properties
            const size = Math.random() * 8 + 6; // 6px to 14px
            const left = Math.random() * window.innerWidth;
            const duration = Math.random() * 6 + 5; // 5s to 11s
            const delay = Math.random() * 5; // up to 5s
            
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}px`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            
            sakuraContainer.appendChild(petal);
            
            // Remove petal after animation ends
            setTimeout(() => {
                petal.remove();
            }, (duration + delay) * 1000);
        };
        
        // Spawn 25 initial petals
        for (let i = 0; i < 25; i++) {
            createPetal();
        }
        
        // Spawn new petals periodically
        setInterval(createPetal, 400);
    }

    // Fetch on page load
    updateServerStatus();

    // 6. Real-time Firebase Leaderboard
    const leaderboardBody = document.getElementById('leaderboard-body');
    const leaderboardSearchInput = document.getElementById('leaderboard-search-input');
    let allPlayers = [];

    async function initLeaderboard() {
        if (!leaderboardBody) return;

        try {
            // Step 1: Read the dynamically generated web_config.json
            const configRes = await fetch('assets/web_config.json');
            if (!configRes.ok) {
                showLeaderboardError('設定ファイル (web_config.json) が見つかりません。');
                return;
            }
            const configData = await configRes.json();
            let firebaseDbUrl = configData.firebase_url;

            if (!firebaseDbUrl || firebaseDbUrl.trim() === '' || firebaseDbUrl.includes('YOUR-PROJECT-ID')) {
                showLeaderboardError('Firebaseが有効になっていないか、設定されていません。<br><span style="font-size:0.85rem;color:var(--text-muted);">Spigotプラグインの config.yml を設定してサーバーを起動してください。</span>');
                return;
            }

            // Ensure URL ends with a slash and points to players.json
            if (!firebaseDbUrl.endsWith('/')) {
                firebaseDbUrl += '/';
            }
            const playersUrl = `${firebaseDbUrl}players.json`;

            // Step 2: Fetch the players list from Firebase
            const playersRes = await fetch(playersUrl);
            if (!playersRes.ok) {
                showLeaderboardError('Firebaseからのデータ取得に失敗しました。');
                return;
            }
            const playersData = await playersRes.json();

            if (!playersData) {
                showLeaderboardError('ランキングデータがありません。サーバーでプレイヤーがプレイすると自動更新されます。');
                return;
            }

            // Convert map to array and filter out empty entries
            allPlayers = Object.keys(playersData).map(key => {
                const p = playersData[key];
                return {
                    uuid: key,
                    username: p.username || 'Unknown',
                    elo: p.elo || 1000,
                    wins: p.wins || 0,
                    losses: p.losses || 0,
                    kills: p.kills || 0,
                    shortId: p.shortId || ''
                };
            });

            // Sort by ELO rating descending
            allPlayers.sort((a, b) => b.elo - a.elo);

            // Render initial table
            renderLeaderboard(allPlayers);

            // Setup search listener
            if (leaderboardSearchInput) {
                leaderboardSearchInput.addEventListener('input', (e) => {
                    const query = e.target.value.trim().toLowerCase();
                    const filtered = allPlayers.filter(p => 
                        p.username.toLowerCase().includes(query) || 
                        p.shortId.toLowerCase().includes(query)
                    );
                    renderLeaderboard(filtered);
                });
            }

        } catch (error) {
            console.error('Leaderboard error:', error);
            showLeaderboardError('データの接続エラーが発生しました。');
        }
    }

    function renderLeaderboard(players) {
        if (!leaderboardBody) return;
        leaderboardBody.innerHTML = '';

        if (players.length === 0) {
            leaderboardBody.innerHTML = `
                <tr>
                    <td colspan="5" class="leaderboard-empty">プレイヤーが見つかりませんでした。</td>
                </tr>
            `;
            return;
        }

        players.forEach((p, index) => {
            const rank = index + 1;
            let rankClass = 'rank-normal';
            let rankDisplay = `<span class="rank-badge">${rank}</span>`;

            if (rank === 1) {
                rankClass = 'rank-1';
                rankDisplay = `<span class="rank-badge">🥇</span>`;
            } else if (rank === 2) {
                rankClass = 'rank-2';
                rankDisplay = `<span class="rank-badge">🥈</span>`;
            } else if (rank === 3) {
                rankClass = 'rank-3';
                rankDisplay = `<span class="rank-badge">🥉</span>`;
            }

            const tr = document.createElement('tr');
            tr.className = rankClass;

            // Generate avatar URL from Cravatar (Helm avatar)
            const avatarUrl = `https://cravatar.eu/helmavatar/${p.username}/32.png`;

            tr.innerHTML = `
                <td>${rankDisplay}</td>
                <td>
                    <div class="player-info-cell">
                        <img class="player-avatar" src="${avatarUrl}" alt="${p.username}" onerror="this.src='https://cravatar.eu/helmavatar/Steve/32.png'">
                        <div class="player-name-wrapper">
                            <span class="player-name">${p.username}</span>
                            <span class="player-id">#${p.shortId}</span>
                        </div>
                    </div>
                </td>
                <td><span class="player-elo-val">${p.elo}</span></td>
                <td>${p.kills}</td>
                <td>${p.wins}</td>
            `;
            leaderboardBody.appendChild(tr);
        });
    }

    function showLeaderboardError(message) {
        if (!leaderboardBody) return;
        leaderboardBody.innerHTML = `
            <tr>
                <td colspan="5" class="leaderboard-empty">${message}</td>
            </tr>
        `;
    }

    // Initialize leaderboard
    initLeaderboard();
    
    // Auto refresh status every 60 seconds
    setInterval(updateServerStatus, 60000);
});
