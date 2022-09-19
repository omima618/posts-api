var editForm = document.getElementById('edit-form');
var titleInp = editForm.querySelector('#title');
var contentInp = editForm.querySelector('#content');
var cancelBtn = document.querySelector('.prev-page');

// get selected post data
var postId = location.search.slice(4);
var request = new XMLHttpRequest();
request.open('GET', `https://jsonplaceholder.typicode.com/posts/${postId}`);
request.send();
request.addEventListener('load', () => {
    if (request.status === 200 && request.readyState === 4) {
        var data = JSON.parse(request.responseText);
        titleInp.value = data.title;
        contentInp.value = data.body;
    } else if (request.status !== 200 || request.readyState !== 4) {
        alert('Something went wrong!');
    }
});

// cancel handler
cancelBtn.addEventListener('click', () => {
    confirm(`changes won't be saved, are you sure you want to cancel?`)
        ? window.history.back()
        : 0;
});

// submit handler
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (titleInp.value === '' || contentInp.value === '')
        alert(`can't save changes you should fill all form fields`);
    else {
        var editRequest = new XMLHttpRequest();
        editRequest.open(
            'Put',
            `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        editRequest.send();
        editRequest.addEventListener('load', () => {
            if (request.status === 200 && request.readyState === 4) {
                alert('your changes saved successfully');
                window.history.back();
            } else if (request.status !== 200 || request.readyState !== 4)
                alert('something went wrong! try again');
        });
    }
});
