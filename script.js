document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');
    const subreddits = ['Amoledbackgrounds', 'wallpapers'];
    const images = [];

    for (const subreddit of subreddits) {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=150`);
        const data = await response.json();
        const posts = data.data.children;

        posts.forEach(post => {
            const image = post.data.url;
            if (image.endsWith('.jpg') || image.endsWith('.png')) {
                const img = new Image();
                img.src = image;
                img.onload = () => {
                    if (img.width === 1920 && img.height === 1080) {
                        images.push(image);
                        if (images.length === 300) {
                            displayImages(images);
                        }
                    }
                };
            }
        });
    }

    function displayImages(images) {
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.onclick = () => window.open(image, '_blank');
            gallery.appendChild(imgElement);
        });
    }
});