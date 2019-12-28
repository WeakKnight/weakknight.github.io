import $ from './core/utils.js';
import StateMachine from './core/statemachine.js';
import NavBar from './components/navbar.js';
import SideBar from './components/sidebar.js';

import './styles.css';

var mdhtml = require("./blogs/helloworld.md");
console.log(mdhtml);

const STATE_NONE = -1;
const STATE_HOME = 0;
const STATE_PORTFOLIO = 1;
const STATE_CONTACT = 2;

let clearContent = () => {
    $("content").html("");
}

let globalStateMahine = new StateMachine(STATE_HOME);

let home = () => {
    globalStateMahine.changeState(STATE_HOME);
}
let portfolio = () => {
    globalStateMahine.changeState(STATE_PORTFOLIO);
}
let contact = () => {
    globalStateMahine.changeState(STATE_CONTACT);
}

let onChange = (previous, current) => {
    if (previous !== current) {
        clearContent();
    }


    if (current === STATE_HOME && previous !== STATE_HOME) {
        // to blogs, open sidebar
        $("topnav").disableClass("sidebar-off");
        $("sidebar").disableClass("sidebar-off");
        // render blogs
        //$("content").html(mdhtml);
        $("content")
            .addElement('div')
            .enableClass('blog')
            .html(mdhtml);
    }

    // from blogs to other, close sidebar
    if (current !== STATE_HOME && previous === STATE_HOME) {
        $("topnav").enableClass("sidebar-off");
        $("sidebar").enableClass("sidebar-off");
    }
};

let navBar = new NavBar(document.getElementById("header"), [["Contact", contact], ["Portfolio", portfolio], ["Home", home]], 2);

globalStateMahine.onChange(onChange);
onChange(STATE_NONE, STATE_HOME);