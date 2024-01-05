(function () {
  'use strict';
  const hambuger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.app__header-ul');
  const bookmark = document.querySelector('.app__bookmark');
  const backProjectBtn = document.querySelector('#app__button');
  const modal = document.querySelector('.app__modal');
  const modalClose = document.querySelector('.app__modal-heading img');

  function cardModal() {
    backProjectBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      modal.style.display = 'block';

      modalClose.addEventListener('click', (evt)=>{
        evt.preventDefault()
        modal.style.display = 'none'
      })

    });
  }
  cardModal();

  function BookmarkEnable() {
    bookmark.addEventListener('click', (evt) => {
      evt.preventDefault();
      let bookmarkText = document.querySelector('.bookmark');

      bookmark.classList.toggle('bookmarked');
      if (bookmark.classList.contains('bookmarked')) {
        bookmarkText.innerHTML = 'Bookmarked';
      } else {
        bookmarkText.innerHTML = 'Bookmark';
      }
    });
  }
  BookmarkEnable();

  function toggleNav() {
    hambuger.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (navMenu.style.display === 'none') {
        hambuger.src = './images/icon-close-menu.svg';
        navMenu.style.display = 'flex';
      } else {
        hambuger.src = './images/icon-hamburger.svg';
        navMenu.style.display = 'none';
      }
    });
  }
  toggleNav();
})();


(function () {
  'use strict';
  const appModal = document.querySelector('.app__modal');
  const selectedCard = document.querySelectorAll('.app__modal-card_name');
  const pledgeCard = document.querySelectorAll('.app__modal-card');
  const cardForm = document.querySelectorAll('.app__modal-card-form-container');
  const cardCircle = document.querySelectorAll('.circle div');
  const modal = document.querySelector('.app__modal');
  const formInput = document.querySelectorAll('.form__input');

  for (let i = 0; i < selectedCard.length; i++) {
    selectedCard[i].addEventListener('click', function (evt) {
      evt.preventDefault();

      const thisPledgeCard = this.parentElement.parentElement.parentElement.parentElement;
      const circleCheck = this.parentNode.parentNode.parentNode.querySelector('.circle div');
      const formContainer = this.parentElement.parentElement.parentElement.parentElement.querySelector('.app__modal-card-form-container');
      const thisInput = this.parentElement.parentElement.parentElement.parentElement.querySelector('.form__input');

      for (let i = 0; i < pledgeCard.length; i++) {
        pledgeCard[i].className = ('app__modal-card')
        circleCheck.className = '';
        formContainer.style.display = 'none';
      }
      for (let i = 0; i < cardForm.length; i++) {
        cardForm[i].style.display = 'none';
      }
      for (let i = 0; i < cardCircle.length; i++) {
        cardCircle[i].className = '';
      }
      for (let i = 0; i < formInput.length; i++) {
      formInput[i].className = 'form__input';
      }
      thisPledgeCard.className = 'selected';

      if (thisPledgeCard.classList.contains('selected')) {
        if (circleCheck) {
          circleCheck.className = 'circle__selected';
        };
        thisInput.className = 'form__input_active'
        formContainer.style.display = 'flex';

        formContainer.addEventListener('submit', (evt)=> {
          evt.preventDefault();

          const inputValue = parseInt(formContainer.querySelector('#amount').value);
          const plegdeValue = parseInt(this.parentNode.parentNode.querySelector('#pledgeValue').innerText);

          if (inputValue >= plegdeValue) {
            finishedModal();
          } else {
            alert(`amount entered is less than $${plegdeValue}`);
          }
        })
      }
    });
  }

  const modalFinish = document.createElement('section');
  function finishedModal() {
    modalFinish.className = 'app__modal-finished';

    modalFinish.innerHTML = `
    <img src="./images/icon-check.svg" alt="check">
    <h2 class="subheading" > Thanks for your support!</h2>
    <p class="modalParagraph">Your pledge brings us one step closer to sharing Mastercraft <br> Bamboo Monitor Riser worldwide. You will get  an email once <br> our campaign is completed.</p>
  `;
    const modalFinishBtn = document.createElement('button');
    modalFinishBtn.className = 'app__button';
    modalFinishBtn.type = 'button';
    modalFinishBtn.innerText = 'Got it!';
    modalFinishBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let i = 0; i < pledgeCard.length; i++) {
        pledgeCard[i].className = ('app__modal-card')
      }
      for (let i = 0; i < cardForm.length; i++) {
        cardForm[i].style.display = 'none';
      }
      for (let i = 0; i < cardCircle.length; i++) {
        cardCircle[i].className = '';
      }
      modalFinish.style.display = 'none';

      modal.style.display = 'none'
    });
    modalFinish.append(modalFinishBtn);

    appModal.append(modalFinish);
  }
})();
