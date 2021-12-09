const input = document.querySelector('.input_name');
const button = document.querySelector('.button');
const responseBlock = document.querySelector('.response');
const mainSection = document.querySelector('section');

const userIdValue = document.querySelector('.userId_value');
const idValue = document.querySelector('.id_value');
const titleValue = document.querySelector('.title_value');
const completedValue = document.querySelector('.completed_value');

responseBlock.style.display = 'none';


input.addEventListener('focus', () => {
    input.value = '';
    input.placeholder = '';
    input.classList.remove('input_error');
})


window.addEventListener('load', () => {
    inputPage.value = '';
    inputLimit.value = '';
})

button.addEventListener('click', function(e){
    e.preventDefault();

   
    if(document.querySelector('.error_message')){
        document.querySelector('.error_message').remove();
    }

    let inputValue = input.value;
    
    // проверяем на ввод на число
    if(isNaN(inputValue)){
        input.value = 'Введите ID';
        input.classList.add('input_error');            
    } 
    else {
        fetch(`https://jsonplaceholder.typicode.com/users/${inputValue}/todos`)
        .then((response) => {
            const jsonById = response.json();
            return jsonById;
        })
        .then((jsonById) => {                                 
            const currentUserData = jsonById[inputValue - 1];            

            userIdValue.innerHTML = currentUserData.userId;
            idValue.innerHTML = currentUserData.id;
            titleValue.innerHTML = currentUserData.title;
            if(currentUserData.completed){
                completedValue.innerHTML = 'Выполнено';
                titleValue.style.textDecoration = 'line-through';            
            } else {
                completedValue.innerHTML = 'Невыполнено';                
            }

            responseBlock.style.display = 'block';
            mainSection.style.height = '100vh';
        })
        .catch((jsonById) => {
            // проверяем наличие пользователя с введенным id
            if(!jsonById.hasOwnProperty(inputValue)){
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error_message');
                errorMessage.innerHTML = 'Пользователь с указанным id не найден';
                mainSection.appendChild(errorMessage);
                mainSection.style.height = '100vh';
                // удаляем таблицу с данными, если была 
                if(responseBlock.style.display = 'block'){
                    responseBlock.style.display = 'none';
                }
            }
        })        
    }    
})