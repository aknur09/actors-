     //25.01.2024

const root=document.querySelector('#root')
const inputs=document.querySelectorAll('input')
const bntPost=document.querySelector('button')

const url='https://65b2533d9bfb12f6eafd7555.mockapi.io/api/1/actor/all/actors'

async function getAktery(){
        const res=await fetch(url)
        const data= await res.json() 
        console.log(data); 
        renderAktery(data)
  
}

getAktery()



function renderAktery(arr) {
    root.innerHTML=''
    for (const obj of arr) {
      root.innerHTML+=`            
    <div class='card'>
       <h3>${obj.name}  </h3>
       <img src=${obj.avatar} width='30%' />
       <h4>${obj.age} лет</h4>
       <p>${obj.createdAt}</p>
      <button onclick='deleteAktery(${obj.id})'>Delete</button>
      <button onclick='editAktery(${obj.id})'>Edit</button>
    </div>
       ` 
}    
}


async function deleteAktery(id) {
    const res=await fetch(url+'/'+id,{
        method:'DELETE',
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        }  
    })
    const data=await res.json() 
    alert('удалить')
    getAktery()
  
}


async function editAktery(id) {

    const name=prompt('имя')
    const imgUrl=prompt('фото')
    const age=prompt('возраст')
    const bio=prompt('.....')

    const res=await fetch(url+'/'+id,{
        method:'PUT',
        body: JSON.stringify({name:name, avatar:imgUrl, age:age, createdAt:bio}),
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        }  
    })
    const data=await res.json() 
    console.log(data);
      getAktery()
}

bntPost.onclick=async()=>{
    const res=await fetch(url,{
        method:'POST',
        body: JSON.stringify({name:inputs[0].value, avatar:inputs[1].value,age:inputs[2].value,createdAt:inputs[3].value }),
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        }  
    })

    getAktery()
}
