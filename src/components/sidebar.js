import './sidebar.css';
import $ from '../core/utils.js'

export default class SideBar {
    constructor(parent, items, activeIndex) {
        this.activeIndex = activeIndex;

        this.parent = parent;

        this.parent.classList.add('sidebar');

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

            this.parent.appendChild(a);
        })
    }

    addItem(name, callback) {
        let a = document.createElement('a');
        this.children.push(a);

        a.innerText = name;
        a.href = "#" + name;
        a["index"] = this.children.length;
        a.onclick = () => {
            for (let child of this.children) {
                $(child).disableClass('active');
            }

            this.activeIndex = a.index;
            $(a).enableClass('active');

            callback();
        };

        if (index === this.activeIndex) {
            a.classList.add('active');
        }

        this.parent.appendChild(a);
    }
}