class HTMLElementWrapper {
    constructor(element) {
        this.element = element;
    }

    enableClass(className) {
        this.element.classList.add(className);
        return this;
    }

    disableClass(className) {
        this.element.classList.remove(className);
        return this;
    }

    html(content) {
        this.element.innerHTML = content;
        return this;
    }

    addElement(name){
        let newElement = document.createElement(name);
        this.element.appendChild(newElement);
        return new HTMLElementWrapper(newElement);
    }

    onClick(func)
    {
        this.element.onclick = func;
    }
}

export default function $(element) {
    if ((element instanceof String) || (typeof (element) === 'string')) {
        if (element.indexOf('#') !== -1) {
            let dom = document.getElementById(element.substr(1));
            return new HTMLElementWrapper(dom);
        } else {
            let dom = document.getElementsByClassName(element)[0];
            return new HTMLElementWrapper(dom);
        }
    } else {
        return new HTMLElementWrapper(element);
    }
}