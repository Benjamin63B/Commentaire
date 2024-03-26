document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const firstNameField = document.querySelector('#first-name');
    const lastNameField = document.querySelector('#last-name');
    const messageField = document.querySelector('#message');
    const errorMessageContainer = document.querySelector('#error-message');
    const commentListContainer = document.querySelector('#comment-list');
    let commentCounter = 1;
  
    // Vérifiez les commentaires existants dans LocalStorage
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Afficher les commentaires enregistrés
    savedComments.forEach((comment) => {
      const newComment = displayComment(comment);
      commentListContainer.appendChild(newComment);
      commentCounter = Math.max(commentCounter, comment.id) + 1;
    });
  
    // Ajouter un champ masqué pour commentCounter
    form.insertAdjacentHTML('beforeend', `<input type="hidden" name="commentCounter" value="${commentCounter}">`);
  
    // Soumettre le formulaire
    function submitForm(event) {
      event.preventDefault();
  
      if (!firstNameField.value || !lastNameField.value || !messageField.value) {
        errorMessageContainer.style.display = 'block';
        return;
      }
  
      errorMessageContainer.style.display = 'none';
  
      const newComment = {
        id: commentCounter,
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        message: messageField.value,
      };
  
      const newCommentElement = displayComment(newComment);
  
      commentListContainer.appendChild(newCommentElement);
  
      form.reset();
  
      // Mettre à jour le compteur de commentaires
      commentCounter++;
      form.insertAdjacentHTML('beforeend', `<input type="hidden" name="commentCounter" value="${commentCounter}">`);
  
      // Enregistrez le commentaire dans LocalStorage
      savedComments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(savedComments));
    }
  
    // Ajouter un écouteur d'événement au formulaire
    form.addEventListener('submit', submitForm);
  
    // Fonction d'affichage des commentaires
    function displayComment(comment) {
      const newComment = document.createElement('div');
      newComment.classList.add(
        'flex',
        'space-x-4',
        'text-sm',
        'text-gray-500',
        'py-10',
        'border-t',
        'border-gray-200'
      );
  
      newComment.innerHTML = `
        <div class="flex-1">
          <h3 class="font-medium text-gray-900">${comment.firstName} ${comment.lastName}</h3>
          <div class="prose prose-sm mt-4 max-w-none text-gray-500">
            <p>${comment.message}</p>
          </div>
        </div>
      `;
  
      return newComment;
    }
  
    // Ajouter un écouteur d'événement pour le message d'erreur
    document.getElementById("comment-form").addEventListener("submit", function (event) {
      if (firstNameField.value.length === 0 || lastNameField.value.length === 0 || messageField.value.length === 0) {
        event.preventDefault();
        errorMessageContainer.style.display = 'block';
      }
    });
  });
