export default class BlogHelper {
    // https://github.com/WeakKnight/weakknight.github.io/raw/master/src/blogs/helloworld.md
    static getBlogContent(relativePath) {
        return new Promise((resolve) => {
            if (BlogHelper.cache[relativePath] !== undefined) {
                resolve(BlogHelper.cache[relativePath]);
            }

            let url = "https://raw.githubusercontent.com/WeakKnight/weakknight.github.io/master/src/blogs/" + relativePath;

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            // xhr.withCredentials = true;
            xhr.onload = () => {
                if (xhr.status == 200) {
                    BlogHelper.cache[relativePath] = xhr.responseText;
                    resolve(xhr.responseText);
                }
            };

            xhr.send();
        });
    }

    static getBlogList() {
        return new Promise((resolve) => {
            let url = "https://raw.githubusercontent.com/WeakKnight/weakknight.github.io/master/src/blogs/blog.json";

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            // xhr.withCredentials = true;
            xhr.onload = () => {
                console.log("status is" + xhr.status);
                if (xhr.status == 200) {
                    this.blogSettings = JSON.parse(xhr.responseText);
                    resolve(this.blogSettings.articles);
                    
                    console.log("articles is " + xhr.responseText);
                    console.log("length is " + this.blogSettings.articles.length);
                }
            };

            xhr.send();
        });
    }
}

BlogHelper.cache = [];