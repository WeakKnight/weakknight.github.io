import $ from './core/utils.js';
import StateMachine from './core/statemachine.js';
import NavBar from './components/navbar.js';
import SideBar from './components/sidebar.js';
import BlogHelper from './core/bloghelper.js';

import './styles.css';
import './highlight.css';

const marked = require("marked");
marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
});

const renderer = new marked.Renderer();
let originParagraph = renderer.paragraph.bind(renderer)
renderer.paragraph = (text) => {
    const blockRegex = /\$\$[^\$]*\$\$/g
    const inlineRegex = /\$[^\$]*\$/g
    let blockExprArray = text.match(blockRegex)
    let inlineExprArray = text.match(inlineRegex)
    for (let i in blockExprArray) {
        const expr = blockExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
    }
    for (let i in inlineExprArray) {
        const expr = inlineExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
    }
    return originParagraph(text)
};

function renderMathsExpression(expr) {
    if (expr[0] === '$' && expr[expr.length - 1] === '$') {
        let displayStyle = false
        expr = expr.substr(1, expr.length - 2)
        if (expr[0] === '$' && expr[expr.length - 1] === '$') {
            displayStyle = true
            expr = expr.substr(1, expr.length - 2)
        }
        let html = null
        try {
            html = katex.renderToString(expr)
        } catch (e) {
            console.err(e)
        }
        if (displayStyle && html) {
            html = html.replace(/class="katex"/g, 'class="katex katex-block" style="display: block;"')
        }
        return html
    } else {
        return null
    }
}

marked.setOptions({ renderer: renderer });

const STATE_NONE = -1;
const STATE_HOME = 0;
const STATE_PUBLICATIONS = 1;
const STATE_RESUME = 2;

let currentBlogPath = "";
let currentBlogTitle = "";

let clearContent = () => {
    $("content").html("");
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

let onChange = (previous, current) => {
    clearContent();

    if (current === STATE_HOME) {
        $("topnav").disableClass("sidebar-off");
        $("sidebar").disableClass("sidebar-off");
        $("content").disableClass("noSideBar");

        BlogHelper.getBlogContent(currentBlogPath).then((content) => {
            document.title = currentBlogTitle;
            $("blog").html(marked(content, { renderer: renderer }));
        });
    }
    else {
        $("topnav").enableClass("sidebar-off");
        $("sidebar").enableClass("sidebar-off");
        $("content").enableClass("noSideBar");

        if (current === STATE_RESUME) {
            BlogHelper.getBlogContent('resume.md').then((content) => {
                $("blog").html(marked(content, { renderer: renderer }));
            });
        }
        else if (current === STATE_PUBLICATIONS) {
            BlogHelper.getBlogContent('publications.md').then((content) => {
                $("blog").html(marked(content, { renderer: renderer }));
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
                    $("blog").html(marked(content, { renderer: renderer }));
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

