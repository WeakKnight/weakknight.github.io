import $ from './core/utils.js';
import StateMachine from './core/statemachine.js';
import NavBar from './components/navbar.js';
import SideBar from './components/sidebar.js';
import BlogHelper from './core/bloghelper.js';

import Scrollbar from 'smooth-scrollbar';

import './styles.css';
import './highlight.css';

const { marked } = require("marked");
const markedKatex = require("marked-katex-extension");
const options = {
    throwOnError: false
};

marked.use(markedKatex(options));

marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
});

const renderer = new marked.Renderer();
marked.setOptions({ renderer: renderer });

const STATE_NONE = -1;
const STATE_HOME = 0;
const STATE_PUBLICATIONS = 1;
const STATE_RESUME = 2;

let currentBlogPath = "";
let currentBlogTitle = "";

let clearContent = () => {
    $("scroll-content").html("");
};

let sidebarOverlay = $("#sidebar-overlay");

// ===== 侧边栏控制函数 =====
const isMobile = () => {
    const coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const hasTouch = (navigator.maxTouchPoints || 0) > 0;
    return (window.innerWidth <= 768) && (coarsePointer || hasTouch);
};

const openMobileSidebar = () => {
    $("sidebar").enableClass("mobile-open");
    sidebarOverlay.enableClass("active");
};

const closeMobileSidebar = () => {
    $("sidebar").disableClass("mobile-open");
    sidebarOverlay.disableClass("active");
};

const toggleMobileSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('mobile-open')) {
        closeMobileSidebar();
    } else {
        openMobileSidebar();
    }
};

// ===== 侧边栏切换按钮（Nav Menu 左侧） =====
const closeDesktopSidebar = () => {
    $("topnav").enableClass("sidebar-off");
    $("sidebar").enableClass("sidebar-off");
    $("content").enableClass("sidebar-off");
};

const openDesktopSidebar = () => {
    $("topnav").disableClass("sidebar-off");
    $("sidebar").disableClass("sidebar-off");
    $("content").disableClass("sidebar-off");
};

const toggleSidebar = () => {
    if (isMobile()) {
        toggleMobileSidebar();
        return;
    }

    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('sidebar-off')) {
        openDesktopSidebar();
    } else {
        closeDesktopSidebar();
    }
};


// ===== 移动端：遮罩层点击关闭 =====
sidebarOverlay.onClick(() => {
    closeMobileSidebar();
});

// ===== 移动端：滑动手势 =====
let touchStartX = 0;
let touchStartY = 0;
let isSwiping = false;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!isSwiping || !isMobile()) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const diffX = touchCurrentX - touchStartX;
    const diffY = touchCurrentY - touchStartY;
    
    // 如果垂直滑动更多，不处理
    if (Math.abs(diffY) > Math.abs(diffX)) {
        isSwiping = false;
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!isSwiping || !isMobile()) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    const sidebar = document.querySelector('.sidebar');
    const isOpen = sidebar.classList.contains('mobile-open');
    
    // 从左边缘向右滑动 → 打开侧边栏
    if (touchStartX < 40 && diffX > 60 && !isOpen) {
        openMobileSidebar();
    }
    // 向左滑动 → 关闭侧边栏
    else if (diffX < -60 && isOpen) {
        closeMobileSidebar();
    }
    
    isSwiping = false;
}, { passive: true });

// ===== 移动端：点击侧边栏链接后自动关闭 =====
document.addEventListener('click', (e) => {
    if (!isMobile()) return;
    
    const sidebar = document.querySelector('.sidebar');
    if (e.target.closest('.sidebar a') && sidebar.classList.contains('mobile-open')) {
        setTimeout(closeMobileSidebar, 150);
    }
});

let globalStateMahine = new StateMachine(STATE_HOME);

let home = () => {
    globalStateMahine.changeState(STATE_HOME);
}

let publications = () => {
    globalStateMahine.changeState(STATE_PUBLICATIONS);
}

let resume = () => {
    globalStateMahine.changeState(STATE_RESUME);
}

Scrollbar.init($("blog").element);

let onChange = (previous, current) => {
    clearContent();
    
    const navBarHeight = $("topnav").element.offsetHeight; // 替换`.navbar`为你的导航栏选择器
    const blogBody = document.querySelector('.content');
    blogBody.style.height = `calc(100vh - ${navBarHeight}px)`; // 计算并设置<body>的最小高度
    
    if (toggleSidebarButton) {
        if (current === STATE_HOME) {
            toggleSidebarButton.classList.remove('hidden');
        } else {
            toggleSidebarButton.classList.add('hidden');
        }
    }
    
    if (current === STATE_HOME) {
        $("topnav").disableClass("sidebar-off");
        $("sidebar").disableClass("sidebar-off");
        $("content").disableClass("noSideBar");
        $("content").disableClass("miscs");

        // 只有当 currentBlogPath 有值时才请求内容
        if (currentBlogPath && currentBlogPath.length > 0) {
            BlogHelper.getBlogContent(currentBlogPath).then((content) => {
                document.title = currentBlogTitle;
                try {
                    $("scroll-content").html(marked(content, { renderer: renderer }));
                    pseudocode.renderClass("pseudocode");
                } catch (error) {
                    console.log(error);
                }
            });
        }
    }
    else {
        $("topnav").enableClass("sidebar-off");
        $("sidebar").enableClass("sidebar-off");
        $("content").enableClass("noSideBar");
        $("content").enableClass("miscs");

        if (current === STATE_RESUME) {
            BlogHelper.getBlogContent('resume.md').then((content) => {
                $("scroll-content").html(marked(content, { renderer: renderer }));
            });
        }
        else if (current === STATE_PUBLICATIONS) {
            BlogHelper.getBlogContent('publications.md').then((content) => {
                $("scroll-content").html(marked(content, { renderer: renderer }));
            });
        }
    }
};

let sideBar = new SideBar(document.getElementById("side"), [], 0);
let navBarItems = [
    // ["Contact", contact], 
    ["Resumé", resume],
    ["Publications", publications],
    ["Home", home]
];
let navBar = new NavBar(document.getElementById("header"),
    navBarItems,
    navBarItems.length - 1);

// 绑定导航栏侧边栏切换按钮（Nav Menu 左侧）
const toggleSidebarButton = document.getElementById('toggle-sidebar-button');
if (toggleSidebarButton) {
    toggleSidebarButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSidebar();
    });
}

globalStateMahine.onChange(onChange);

BlogHelper.getBlogList().then((articles) => {

    let hashBlogName = "";
    if (window.location.hash != "") {
        hashBlogName = decodeURIComponent(window.location.hash);
    }

    console.log("hashBlogName Is " + hashBlogName);

    for (let article of articles) {
        let isDefault = false;

        if (hashBlogName != "") {
            if (("#" + article.title) == hashBlogName) {
                console.log("find hashed default");
                isDefault = true;
            }
        }
        else if (!isDefault) {
            if (article["default"] === true) {
                console.log(article["default"]);
                isDefault = true;
            }
        }

        sideBar.addItem(article.title,
            () => {
                currentBlogPath = article.path;
                currentBlogTitle = article.title + "----Tianyu Li's Blog";
                document.title = currentBlogTitle;

                BlogHelper.getBlogContent(article.path).then((content) => {
                    try {
                        $("scroll-content").html(marked(content, { renderer: renderer }));
                        pseudocode.renderClass("pseudocode");
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            },
            isDefault);

        if (window.location.hash !== "#Publications" && window.location.hash !== "#Resum%C3%A9" && isDefault) {
            currentBlogPath = article.path;
            currentBlogTitle = article.title + "----Tianyu Li's Blog";
            document.title = currentBlogTitle;
        }
    }

    if (window.location.hash === "#Publications") {
        navBar.setSelectionByIndex(1);
    }
    else if (window.location.hash === "#Resum%C3%A9") {
        navBar.setSelectionByIndex(0);
    }
    else {
        navBar.setSelectionByIndex(2);
    }
})

