console.log('clientg side js file loaded...');

// fetch('http://puzzle.mead.io/puzzle').then(
//     (response) =>{
//         response.json().then( (data)=> {
//             console.log('response', data);
//         })
//     });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const errordiv = document.getElementById('input');
const messagediv = document.getElementById('message');

weatherForm.addEventListener('submit', (event) => {
    console.log('submitted', search.value);
    event.preventDefault();
    fetch(`http://localhost:3000/forecast?address=${search.value}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                    errordiv.innerHTML = JSON.stringify(data.error);
                } else {
                    console.log('response', data);
                    messagediv.innerHTML = JSON.stringify(data);
                }
            })
        });    
});

