import './navbar.css';
import $ from '../core/utils.js'

export default class NavBar {
    constructor(parent, items, activeIndex) {
        this.activeIndex = activeIndex;

        this.parent = parent;

        this.container = document.createElement('div');
        this.container.classList.add('topnav');

        this.parent.appendChild(this.container);

        // 左侧容器（按钮 + 标题）
        this.leftContainer = document.createElement('div');
        this.leftContainer.classList.add('topnav-left');
        this.container.appendChild(this.leftContainer);

        // 右侧容器（菜单项）
        this.rightContainer = document.createElement('div');
        this.rightContainer.classList.add('topnav-right');
        this.container.appendChild(this.rightContainer);

        // Toggle Primary Side Bar 按钮（放在左侧）
        this.toggleSidebarButton = document.createElement('button');
        this.toggleSidebarButton.id = 'toggle-sidebar-button';
        this.toggleSidebarButton.type = 'button';
        this.toggleSidebarButton.title = 'Toggle Primary Side Bar';
        this.toggleSidebarButton.setAttribute('aria-label', 'Toggle Primary Side Bar');
        this.toggleSidebarButton.innerHTML = `
            <svg class="toggle-sidebar-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="6" height="16" rx="1.5"></rect>
                <rect x="10.5" y="6" width="10.5" height="2" rx="1"></rect>
                <rect x="10.5" y="11" width="10.5" height="2" rx="1"></rect>
                <rect x="10.5" y="16" width="10.5" height="2" rx="1"></rect>
            </svg>`;
        this.leftContainer.appendChild(this.toggleSidebarButton);

        // 标题
        {
            let title = document.createElement('a');
            title.innerText = "Tianyu";
            title.style.fontWeight = "bold"
            title.href = "https://weakknight.github.io/";
            this.leftContainer.appendChild(title);
        }

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

            this.rightContainer.appendChild(a);
        })
    }

    setSelectionByIndex(targetIndex) {
        for (let child of this.children) {
            $(child).disableClass('active');
        }
        this.items.forEach((item, index) => {
            let a = this.children[index];
            if (index === targetIndex){
                this.activeIndex = index;
                $(a).enableClass('active');
                item[1]();
            }
        })
    }
}