export default class BlogHelper {
    // https://github.com/WeakKnight/weakknight.github.io/raw/master/src/blogs/helloworld.md
    static getBlogContent(relativePath) {

        return new Promise((resolve) => {
            let url = "https://raw.github.com/WeakKnight/weakknight.github.io/master/src/blogs/" + relativePath;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            // xhr.withCredentials = true;
            xhr.onload = () => {
                resolve(xhr.responseText);
            };

            xhr.send();
        });
    }
}