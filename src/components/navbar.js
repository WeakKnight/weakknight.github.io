import './navbar.css';
import $ from '../core/utils.js'

export default class NavBar {
    constructor(parent, items, activeIndex) {
        this.activeIndex = activeIndex;

        this.parent = parent;

        this.container = document.createElement('div');
        this.container.classList.add('topnav');

        this.parent.appendChild(this.container);

        this.children = [];

        this.items = items;
        this.items.forEach((item, index) => {
            let a = document.createElement('a');

            this.children.push(a);

            a.innerText = item[0];
            a.href = "#" + item[0];
            a["index"] = index;
            a.onclick = () => {
                for (let child of this.children) {
                    $(child).disableClass('active');
                }

                this.activeIndex = a.index;
                $(a).enableClass('active');

                item[1]();
            };

            if (index === this.activeIndex) {
                a.classList.add('active');
            }

            this.container.appendChild(a);
        })
    }
}