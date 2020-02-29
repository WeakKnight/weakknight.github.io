import $ from './core/utils.js';
import StateMachine from './core/statemachine.js';
import NavBar from './components/navbar.js';
import SideBar from './components/sidebar.js';
import BlogHelper from './core/bloghelper.js';

import './styles.css';

const marked = require("marked");
const renderer = new marked.Renderer();

const STATE_NONE = -1;
const STATE_HOME = 0;
const STATE_PORTFOLIO = 1;
const STATE_CONTACT = 2;

let currentBlogPath = "";
let currentBlogTitle = "";

let clearContent = () => {
    $("content").html("");
};

let sideCloseButton = $("#side-close-button");
let sideOpenButton = $("#side-open-button");

sideCloseButton.onClick((e)=>
{
    $("topnav").enableClass("sidebar-off");
    $("sidebar").enableClass("sidebar-off");
    $("content").enableClass("sidebar-off");
    sideOpenButton.enableClass("sidebar-off");
});

sideOpenButton.onClick((e)=>{
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

let onChange = (previous, current) => {
    if (previous !== current) {
        clearContent();
    }


    if (current === STATE_HOME && previous !== STATE_HOME) {
        // to blogs, open sidebar
        $("topnav").disableClass("sidebar-off");
        $("sidebar").disableClass("sidebar-off");

        // .html(mdhtml);
        BlogHelper.getBlogContent(currentBlogPath).then((content) => {
            document.title = currentBlogTitle;
            $("blog").html(marked(content, { renderer: renderer }));
        });
    }

    // from blogs to other, close sidebar
    if (current !== STATE_HOME && previous === STATE_HOME) {
        $("topnav").enableClass("sidebar-off");
        $("sidebar").enableClass("sidebar-off");

        if (current === STATE_CONTACT) {
            BlogHelper.getBlogContent('contact.md').then((content) => {
                $("blog").html(marked(content, { renderer: renderer }));
            });
        }
        if (current === STATE_PORTFOLIO) {
            BlogHelper.getBlogContent('portfolio.md').then((content) => {
                $("blog").html(marked(content, { renderer: renderer }));
            });
        }
    }
};

let sideBar = new SideBar(document.getElementById("side"), [], 0);
let navBar = new NavBar(document.getElementById("header"),
    [
        // ["Contact", contact], 
        // ["Portfolio", portfolio], 
        ["Home", home]
    ],
    0);

globalStateMahine.onChange(onChange);
onChange(STATE_NONE, STATE_HOME);

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
        else {
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
    }
})

