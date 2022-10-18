const createComment = (author, text) => {
   const comment = document.createElement('div');
   comment.className = 'post-comment';

   const commentAuthor = document.createElement('span');
   commentAuthor.className = 'post-comment__author';
   commentAuthor.innerText = author;

   const commentText = document.createElement('span');
   commentText.className = 'post-comment__text';
   commentText.innerText = text;

   comment.append(commentAuthor, commentText);

   return comment;
}

const createPost = (postName, text) => {
   const post = document.createElement('div');
   post.id = 'post';
   post.className = 'post';

   const postTitle = document.createElement('h1');
   postTitle.className = 'post__title';
   postTitle.innerText = postName;

   const postText = document.createElement('p');
   postText.className = 'post__text';
   postText.innerText = text;

   const commentsText = document.createElement('b');
   commentsText.className = 'post__comments-text';
   commentsText.innerText = 'Комментарии';

   const commentsBlock = document.createElement('div');
   commentsBlock.className = 'post__comments';


   post.append(postTitle, postText, commentsText, commentsBlock);

   return post;
}

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments?postId=';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function renderPost(postId) {
   fetch(`${POSTS_URL}/${postId}`)
      .then((response) => response.json())
      .then((post) => {
         if (!post.title) {
            document.body.textContent = 'Post is not found'
            throw new Error('Post is not found')
         }

         document.body.append(createPost(post.title, post.body))

         fetch(`${COMMENTS_URL}${postId}`)
            .then((response) => response.json())
            .then((comments) => {
               comments.forEach(comment => {
                  document.querySelector('.post__comments')
                     .append(createComment(comment.email, comment.body))
               });
            })
      })
      .catch((err) => console.log('error', err))
}

document.querySelector('button').addEventListener('click', () => {
   renderPost(+document.querySelector('input').value);
})