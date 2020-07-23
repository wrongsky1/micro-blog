// создаёт разметку для поста
function createPostMarkup(post) {
  return `
    <div class="post">
      <p class="post__title">${post.title}</p>
      <p class="post__text">${post.body}</p>
    </div>
  `;
}

// вставляет разметку в DOM
function addPostToDOM(container, markup) {
  container.insertAdjacentHTML('afterbegin', markup);
}

function createPost(newPost) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST', // нужно указать метод запроса
    // тело запроса
    body: JSON.stringify({
      title: newPost.title,
      body: newPost.text
    }),
    // и заголовки
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
.then((res) => {
    return res.json(); // возвращаем результат работы метода и идём в следующий then
  })
  .then((post) => {
      addPostToDOM(document.querySelector('.container'), createPostMarkup(post)); // если мы попали в этот then, data — это объект
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
  });
}

// обработчик сабмита формы
document.forms.post.addEventListener('submit', function (event) {
  event.preventDefault();

  const { title, text } = event.currentTarget.elements;

  createPost({
    title: title.value,
    text: text.value
  });
});
