let url = ' http://localhost:3000/Product'

let form = document.querySelector('.form')
let btnsubmit = document.querySelector('.submit-btn')
let productsRow = document.querySelector('.products_row')

const getProducts = () => {
    productsRow.innerHTML = ''
    fetch(url )
    .then((res) => res.json())
    .then((res) =>{
        res.forEach((item) => {
            productsRow.innerHTML += `
            <div class="products__card">
            <img src="${item.image}" alt="" class="products__card-img">
            <h3 class="products__card-title">
                ${item.title}
            </h3>
            <p class="products__card-price">
                $${item.price}
            </p>
            <div class="products__card-btns">
                <button class="products__card-btn">
                    Buy
                </button>
                <button class="products__card-btn products_card-change">
                    Change
                </button>
                <button data-id = "${item.id}" type = 'button' class="products__card-btn products__card-delete">
                    Delete
                </button>
            </div>
        </div>
            `
        })
        let deleteBtns = document.querySelectorAll('.products__card-delete')
        Array.from(deleteBtns).forEach((btn) => {
            btn.addEventListener('click', () => {
                fetch(url + `/${btn.dataset.id}`, {
                    method: 'DELETE'
                }).then(() => {
                    getProducts()
                }).catch(() => alert('Ошибка при удалении'))
            })
        })      
    } ).catch((err) => alert(err))
}
getProducts()

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    fetch(url ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title:e.target[0].value,
            price:e.target[1].value,
            image:e.target[2].value
        })
    }).then(() => {
        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
    })
    .catch((err) => console.log(err))
})

