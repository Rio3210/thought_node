const form=document.querySelector('form');

const loading=document.querySelector('.loading');

const api_url='http://localhost:5000/tot'
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

    form.style.display='none'
    loading.style.display=''
    fetch(api_url,{
        method:'POST',
        body:JSON.stringify(pos),
        headers:{
            'content-type':'application/json'
        }
    }).then(response =>response.json()).
    then(createdTot=>{
        console.log(createdTot)
        form.reset()
        form.style.display='';
        loading.style.display='none'
    })
}) 