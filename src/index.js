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

let sideCloseButton = $("#side-close-button");
let sideOpenButton = $("#side-open-button");

sideCloseButton.onClick((e) => {
    $("topnav").enableClass("sidebar-off");
    $("sidebar").enableClass("sidebar-off");
    $("content").enableClass("sidebar-off");
    sideOpenButton.enableClass("sidebar-off");
});

sideOpenButton.onClick((e) => {
    $("topnav").disableClass("sidebar-off");
    $("sidebar").disableClass("sidebar-off");
    $("content").disableClass("sidebar-off");
    sideCloseButton.disableClass("sidebar-off");
    sideOpenButton.disableClass("sidebar-off");
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
    
    if (current === STATE_HOME) {
        $("topnav").disableClass("sidebar-off");
        $("sidebar").disableClass("sidebar-off");
        $("content").disableClass("noSideBar");
        $("content").disableClass("miscs");

        BlogHelper.getBlogContent(currentBlogPath).then((content) => {
            document.title = currentBlogTitle;
            try {
                $("scroll-content").html(marked(content, { renderer: renderer }));
            } catch (error) {
                console.log(error);
            }
        });
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

