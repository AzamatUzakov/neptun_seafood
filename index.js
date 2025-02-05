const products = [
    {
        id: 1,
        name: "Черная икра",
        price: 10,
        image: "https://i.ibb.co/VcGd4GT2/black-Ikra.png",
        description: "Свежие красные яблоки, богатые витаминами."
    },
    {
        id: 2,
        image: "https://i.ibb.co/zHVHm6VN/red-ikra.png",
        name: "Красная икра",
        price: 10,
        description: "Спелые и сладкие бананы, идеальны для перекуса."
    },
    {
        id: 3,
        name: "Ласось",
        price: 10,
        image: "https://i.ibb.co/fYJ1Qqrc/Myaso-lososya.png",
        description: "Сочные мандарины с тонкой кожурой."
    },
    {
        id: 4,
        name: "Форель",
        price: 10,
        image: "https://i.ibb.co/zH6HQWqS/forelS.png",
        description: "Ароматные груши с нежной текстурой."
    },
    {
        id: 5,
        name: "Черная икра",
        price: 10,
        image: "https://i.ibb.co/VcGd4GT2/black-Ikra.png",
        description: "Свежие красные яблоки, богатые витаминами."
    },
    {
        id: 6,
        name: "Красная икра",
        price: 10,
        image: "https://i.ibb.co/zHVHm6VN/red-ikra.png",
        description: "Спелые и сладкие бананы, идеальны для перекуса."
    },
    {
        id: 7,
        name: "Ласось",
        price: 10,
        image: "https://i.ibb.co/fYJ1Qqrc/Myaso-lososya.png",
        description: "Сочные мандарины с тонкой кожурой."
    },
    {
        id: 8,
        name: "Форель",
        price: 10,
        image: "https://i.ibb.co/zH6HQWqS/forelS.png",
        description: "Ароматные груши с нежной текстурой."
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".supIndex p").textContent = totalQuantity;
}

function addToCart(product, quantity) {
    if (quantity <= 0) return;

    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

function displayProducts() {
    let productsBox = document.querySelector(".products");
    productsBox.innerHTML = "";

    products.forEach(product => {
        productsBox.innerHTML += `
            <div class="elem">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p><b>${product.price}$</b></p>
                   <div class="bottoms">
                  <div class="calck">
                        <p class="minus"><img src="./img/free-icon-minus-2550003.png" alt=""></p>
                        <p class="nums">0</p>
                        <p class="plusBtn"><img src="./img/free-icon-plus-2549959.png" alt=""></p>
                    </div>
             
                    <div class="AddBassket" data-id="${product.id}">В корзину</div>
                </div>
            </div>
        `;
    });

    let plusBtns = document.querySelectorAll(".plusBtn");
    let minusBtns = document.querySelectorAll(".minus");
    let nums = document.querySelectorAll(".nums");
    let addButtons = document.querySelectorAll(".AddBassket");

    plusBtns.forEach((btn, index) => {
        btn.onclick = () => {
            nums[index].textContent = Number(nums[index].textContent) + 1;
        };
    });

    minusBtns.forEach((btn, index) => {
        btn.onclick = () => {
            let count = Number(nums[index].textContent);
            if (count > 1) {
                nums[index].textContent = count - 1;
            }
        };
    });

    addButtons.forEach((button, index) => {
        button.onclick = () => {
            let productId = Number(button.dataset.id);
            let selectedProduct = products.find(p => p.id === productId);
            let quantity = Number(nums[index].textContent);
            addToCart(selectedProduct, quantity);

            // Обнуляем счетчик после добавления
            nums[index].textContent = 1;
        };
    });

    updateCartCounter();
}

displayProducts();
