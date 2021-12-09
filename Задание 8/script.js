const inputPage = document.querySelector('.page_input');
const inputLimit = document.querySelector('.limit_input');
const button = document.querySelector('.button');
const imageBlock = document.querySelector('.image_block');
const section = document.querySelector('section');
const errorMessage = document.querySelector('.error_message');


inputPage.addEventListener('focus', () => {
    inputPage.value = "";
    inputPage.placeholder = "";
    inputPage.classList.remove('input_error');
})

inputLimit.addEventListener('focus', () => {
    inputLimit.value = "";
    inputPage.placeholder = "";
    inputLimit.classList.remove('input_error');
})

window.addEventListener('load', () => {
    inputLimit.value = "";
    inputPage.value = "";
    const lastImageBlock = localStorage.getItem('imageBlock');

    if(lastImageBlock){
        imageBlock.innerHTML = lastImageBlock;        
        document.querySelector('body').appendChild(imageBlock);
        mainSection.style.height = '50vh';
    }      
})    


button.addEventListener('click', (event) => {
    event.preventDefault();

    let page = inputPage.value;
    let limit = inputLimit.value;

    if(isNaN(page) || page === '') {
        inputPage.value = 'введите номер'
        inputPage.classList.add('input_error');
    }
    else if(isNaN(limit) || limit === ''){
        inputLimit.value = 'введите лимит'
        inputPage.classList.add('input_error');
    }
    else {
        let limitRange = true;
        let pageRange = true;
        let allRange = false;

        (page > 10 || page < 1) ? pageRange = false : pageRange = true;

        (limit > 10 || limit < 1) ? limitRange = false : limitRange = true;

        if(!pageRange && !limitRange){
            errorMessage.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
            errorMessage.style.display = 'block'
        }
        else if(!pageRange && limitRange){
            errorMessage.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
            errorMessage.style.display = 'block'
        }
        else if(pageRange && !limitRange){
            errorMessage.innerHTML = 'Лимит вне диапазона от 1 до 10';
            errorMessage.style.display = 'block'
        }
        else {
            allRange = true;
            errorMessage.style.display = 'none';
        }

        if(allRange){
            fetch(`https://picsum.photos/v2/list?${page}1&limit=${limit}`)
            .then((respone) => {
                const jsonByPage = respone.json();
                return jsonByPage
            })
            .then((jsonByPage) => {
                for (i = 0; i < limit; i++){
                    let img = document.createElement('img');
                    img.classList.add('img');
                    img.src = jsonByPage[i].download_url;
                    imageBlock.appendChild(img);
                }

                document.querySelector('body').appendChild(imageBlock);
                mainSection.style.height = '50hv';
                localStorage.setItem('imageBlock', imageBlock.innerHTML);

                console.log(imageBlock);
                console.log(localStorage.getItem('imageBlock'));
            })
        }
    }

})
