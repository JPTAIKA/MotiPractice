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
    const statusMotd = document.getElementById('status-motd');
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
            if (link.getAttribute('href') === `#${current}`) {
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
        fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
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
                    
                    statusVersion.textContent = data.version || '1.8.9 - 1.20+';
                    statusPlayers.textContent = `${data.players.online} / ${data.players.max}`;
                    
                    let motdText = 'Moti.jpn.gg | PvP Practice';
                    if (data.motd && data.motd.clean && data.motd.clean.length > 0) {
                        motdText = data.motd.clean.join('\n');
                    }
                    statusMotd.textContent = motdText;
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
        statusMotd.textContent = 'サーバーへの接続がタイムアウトしました。';
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
    
    // Auto refresh status every 60 seconds
    setInterval(updateServerStatus, 60000);
});
