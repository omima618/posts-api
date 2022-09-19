// get data
var postsWrapper = document.querySelector('.posts');

// create html structure & add post to the posts wrapper
function postStructure(data, postsWrapper) {
    var htmlStructure = `
        <article class="post-wrapper" id =${data.id}>
            <h2 class="post-title">
                ${data.title}
            </h2>
            <div class="post-content">
                ${data.body}
            </div>
            <div class="controls">
            <button class="edit"><a href ="form.html?id=${data.id}">Edit</a></button>
                <button class="delete">Delete</button>
            </div>
        </article>
    `;
    postsWrapper.insertAdjacentHTML('beforeend', htmlStructure);
}

// loop on data to get every post's data & render it in ui using the previous function
function renderData(data, postsWrapper) {
    // if the requested data is just one post 'one object' not array of objects
    if (!Array.isArray(data)) {
        postStructure(data, postsWrapper);
    }
    // if data is array of objects
    else {
        data.forEach((post) => {
            postStructure(post, postsWrapper);
        });
    }
}

// create & send request
function getRequest(url, id) {
    var request = new XMLHttpRequest();
    id ? (url = url + `/${id}`) : url;
    request.open('GET', url);
    request.send();
    request.addEventListener('load', () => {
        if (request.status === 200 && request.readyState === 4) {
            var data = JSON.parse(request.responseText);
            return data;
        } else if (request.status !== 200 || request.readyState !== 4) {
            alert('Some thing went wrong! reload page and try again');
        }
    });
}
function getData(url, id) {
    var request = new XMLHttpRequest();
    id ? (url = url + `/${id}`) : url;
    request.open('GET', url);
    request.send();
    request.addEventListener('load', () => {
        if (request.status === 200 && request.readyState === 4) {
            var data = JSON.parse(request.responseText);
            renderData(data, postsWrapper);
        } else if (request.status !== 200 || request.readyState !== 4) {
            alert('Some thing went wrong! reload page and try again');
        }
    });
}
getData('https://jsonplaceholder.typicode.com/posts');

// delete handller
function deleteHandler(deleteBtn) {
    var confirmMsg = confirm('Are you sure you want to delete this post ?');
    if (!confirmMsg) return;
    var postId = deleteBtn.closest('.post-wrapper').id;
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.open(
        'DELETE',
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    deleteRequest.send();
    deleteRequest.addEventListener('load', () => {
        deleteRequest.status === 200 && deleteRequest.readyState === 4
            ? deleteBtn.closest('.post-wrapper').remove()
            : alert('Something went wrong try again!');
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete') === false) return;
    deleteHandler(e.target);
});
