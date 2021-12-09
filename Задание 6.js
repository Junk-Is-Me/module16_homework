let number = Math.floor(Math.random() * 100);

let myPromise = new Promise((resolve, reject) =>{
    if(number % 2 === 0){
    resolve("Завершено успешно.");
    }
    else{
        reject("Завершено неуспешно.");
    }
})

myPromise
.then((result) => {
    console.log(`Сгенерированное число — ${number}`, result);
})
.catch((error)=>{
    console.log(`Сгенерированное число — ${number}`, error);
})