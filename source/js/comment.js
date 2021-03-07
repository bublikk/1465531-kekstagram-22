const COMMENT_LIMIT = 5;

const downloadButton = document.querySelector('.comments-loader');

const cutComments = () => {
  const comments = document.querySelectorAll('.social__comment');

  if (comments.length > COMMENT_LIMIT) {
    downloadButton.classList.remove('hidden');
  }

  for (let i = COMMENT_LIMIT; i < comments.length; i++) {
    const comment = comments[i];
    comment.classList.add('hidden');
  }
};

downloadButton.addEventListener('click', () => {
  const comments = document.querySelectorAll('.social__comment');
  let hiddenComments = [];

  comments.forEach(element => {
    if (element.classList.contains('hidden')) {
      hiddenComments.push(element);
    }
  });

  for (let i = 0; i < Math.min(hiddenComments.length, COMMENT_LIMIT); i++) {
    const hiddenComment = hiddenComments[i];
    hiddenComment.classList.remove('hidden');
  }

  if (hiddenComments.length <= COMMENT_LIMIT) {
    downloadButton.classList.add('hidden');
  }
});

export {cutComments};
