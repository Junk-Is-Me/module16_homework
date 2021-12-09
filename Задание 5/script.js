const modal = document.querySelector('.modal');
const inputButton = document.querySelector('.button');
const inputName = document.querySelector('.input_name');
const greet = document.querySelector('.greet');
const contentBlock = document.querySelector('.content');

const dateBlock = document.createElement('p');
contentBlock.appendChild(dateBlock);

inputName.addEventListener('click', () => {
    inputName.placeholeder ="";
    inputName.value = "";
    inputName.classList.add("input_error");
})

const timeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

window.onload = function (){
    modal.style.display = 'block';

    inputButton.addEventListener('click', (event) => {
        event.preventDefault();

        if(!inputName.value){
            inputName.classList.add('input_error');
            inputName.value = 'Имя не введено';
        }
        else{
            if(!localStorage.getItem('userName')){
                modal.style.display = 'none';
                inputName.classList.remove('input_error');

                const userName = inputName.value;
                localStorage.setItem('userName', userName);
                let dateTime = new Date();
                let lastVisit = dateTime.toLocaleString('ru', timeOptions);
                localStorage.setItem('lastVisit', lastVisit);

                greet.innerHTML = `Привет ${localStorage.getItem("userName")}, это ваш первый визит к нам на сайт ${localStorage.getItem('lastVisit')}`;
            }

            else{
                modal.style.display = 'none';
                inputName.classList.remove('input_error');

                greet.innerHTML = `Здраствуйте ${localStorage.getItem("userName")}, последний раз вы были у нас на сайте ${localStorage.getItem('lastVisit')}`;
                let dateTime = new Date();
                let lastVisit = dateTime.toLocaleString('ru', timeOptions);
                localStorage.setItem('lastVisit', lastVisit);
            }
        }
    })
}

