//const card = require("../models/card")

const toCUrrency = price=>{
    return new Intl.NumberFormat('ru-RU',{
        currency:'rub',
        style: 'currency'
    }).format(price)
}


const toDate=date=>{
    return new Intl.DateTimeFormat('ru_RU',{
        day:'2-digit',
        month: 'long',
        year:'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

    })
    .format(new Date(date))

}
document.querySelectorAll('.price').forEach(node=>{
    node.textContent=toCUrrency(node.textContent)
})

document.querySelectorAll('.date').forEach(node=>{
    node.textContent = toDate(node.textContent)
})

let $card = document.querySelector('#card')

if ($card){
  $card.addEventListener('click', event=>{
     if (event.target.classList.contains('js-remove'))
       {
           let id = event.target.dataset.id
           fetch('/card/remove/'+id, {
               method: 'delete'
           }).then(res=>res.json())
             .then(card=>{
                 if(card.courses.length)
                 {
                     let html=card.courses.map(
                         c=>{
                             return `
                             <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${c.id}" >
                                    Удалить
                                </button>
                            </td>
                            </tr>
                             `
                         }
                     ).join('')
                     $card.querySelector('tbody').innerHTML=html
                     $card.querySelector('.price').textContent=toCUrrency(card.price)
                 }
                 else {
                     $card.innerHTML= "<p>Корзина пуста</p>"
                 }
             })
       }
  })  
}

M.Tabs.init(document.querySelectorAll('.tabs'));