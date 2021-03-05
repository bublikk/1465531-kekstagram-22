const downloadButton = document.querySelector('.comments-loader');
const COMMENT_LIMIT = 5;

const cutComments = function () {

  const comments = document.querySelectorAll('.social__comment');

  if (comments.length > COMMENT_LIMIT) {
    downloadButton.classList.remove('hidden');
  }

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (i >= COMMENT_LIMIT) {
      comment.classList.add('hidden');
    }
  }

};

downloadButton.addEventListener('click', function () {

  const comments = document.querySelectorAll('.social__comment');
  let hiddenComments = [];

  comments.forEach(element => {
    if (element.classList.contains('hidden')) {
      hiddenComments.push(element);
    }
  });

  for (let i = 0; i < hiddenComments.length; i++) {
    const hiddenComment = hiddenComments[i];
    if (i < COMMENT_LIMIT) {
      hiddenComment.classList.remove('hidden');
    }
  }

  if (hiddenComments.length <= COMMENT_LIMIT) {
    downloadButton.classList.add('hidden');
  }

});

export {cutComments};
