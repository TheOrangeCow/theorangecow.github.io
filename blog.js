function fetchPosts() {
    fetch('https://house-778.org/blog/blog.php')
        .then(response => response.json())
        .then(posts => {
            const blogContainer = document.getElementById('blog-container');
            blogContainer.innerHTML = ''; 
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
                    <div class="title">${post.title}</div>
                    <div class="author">By ${post.author}</div>
                    <div class="content">${post.content}</div>
                    <div class="date">Date: ${post.date}</div>
                    <div class="timestamp">Posted at: ${post.timestamp}</div>
                `;
                blogContainer.appendChild(postDiv);
            });
        });
}

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    fetch('https://house-778.org/blog/blog.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            fetchPosts(); 
            document.getElementById('postForm').reset();
        } else {
            alert('Failed to submit the post');
        }
    });
});


fetchPosts();



fetch('https://house-778.org/get_ip.php')
    .then(response => response.text())
    .then(ip => {
        if (ip.trim() != "no") {
            document.getElementById("post-blog").remove();
        }
    })
    .catch(error => {
        console.error(error);
    }
);

