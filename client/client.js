const form=document.querySelector('form');
const displayall=document.querySelector('.display-all');
const getAll=document.getElementById('getall');
const loading=document.querySelector('.loading');

const api_url='http://localhost:5000/tot';
const url='http://localhost:5000/';
loading.style.display='none'
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData=new FormData(form);
    const name= formData.get('name');
    const thought=formData.get('thought')

    const pos={
        name,
        thought
    }

    // form.style.display='none'
    // loading.style.display=''
    fetch(api_url,{
        method:'POST',
        body:JSON.stringify(pos),
        headers:{
            'content-type':'application/json'
        }
    }).then(response =>response.json()).
    then(createdTot=>{
        form.reset();
        console.log(createdTot)
        
        
        // loading.style.display='none'
    })
    
}) 

async function getapi() {
    
    // Storing response
    const response = await fetch('http://localhost:5000/');
    displayall.innerHTML=""
    // Storing data in form of JSON
    var data = await response.json();
    data.forEach(element => {
        console.log(element.name,element.thought)
        html=`<div class="inner-display">
                <h2>${element.name}</h2>
                <p>${element.thought}</p>
            </div>`
            displayall.innerHTML+=html;
    });
    
    // to do for tommorow including the css 
}

getAll.addEventListener('click',getapi)