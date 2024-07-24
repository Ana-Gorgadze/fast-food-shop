function search() {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const foodItems = document.querySelectorAll(".menuprice .food");
    foodItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent || item.querySelector('h4').innerText;

        if (itemName.toUpperCase().indexOf(searchbox) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none"; 
        }
    });
}














// Variables
let cart = [];
const cartContent = document.querySelector('.cart-content');
const totalPriceElement = document.querySelector('.total-price');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartElement = document.querySelector('.cart');
const searchInput = document.getElementById('search-item');
const foodItems = document.querySelectorAll('.food');
const addCartButtons = document.querySelectorAll('.add-cart');

// Functions
function addToCart(item) {
    const cartItem = cart.find(cartItem => cartItem.title === item.title);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push(item);
    }
    renderCart();
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    renderCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.innerText = `${total}$`;
}

function renderCart() {
    cartContent.innerHTML = '';
    cart.forEach(item => {
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${item.imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${item.title}</div>
                <div class="cart-price">${item.price}$</div>
                <input type="number" value="${item.quantity}" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
        `;
        cartContent.appendChild(cartBox);

        cartBox.querySelector('.cart-remove').addEventListener('click', () => {
            removeFromCart(item.title);
        });

        cartBox.querySelector('.cart-quantity').addEventListener('change', (e) => {
            item.quantity = parseInt(e.target.value);
            updateTotal();
        });
    });
    updateTotal();
}

function search() {
    const searchValue = searchInput.value.toLowerCase();
    foodItems.forEach(item => {
        const title = item.querySelector('h4').innerText.toLowerCase();
        if (title.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Event Listeners
addCartButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const food = foodItems[index];
        const title = food.querySelector('h4').innerText;
        const price = parseInt(food.querySelector('label').innerText.replace('$', ''));
        const imgSrc = food.querySelector('img').src;
        addToCart({ title, price, imgSrc, quantity: 1 });
    });
});

cartIcon.addEventListener('click', () => {
    cartElement.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartElement.classList.remove('active');
});

searchInput.addEventListener('keyup', search);

// Initial call
renderCart();






