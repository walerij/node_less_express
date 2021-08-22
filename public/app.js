//const card = require("../models/card")

const toCUrrency = price=>{
    return new Intl.NumberFormat('ru-RU',{
        currency:'rub',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node=>{
    node.textContent=toCUrrency(node.textContent)
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
                                <bouutn class="btn btn-small js-remove" data-id="${c.id}" >
                                    Удалить
                                </bouutn>
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