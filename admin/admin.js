// Проверяем наличие формы на странице перед ее использованием
const addProductForm = document.getElementById('addProductForm');
if (addProductForm) {
    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Получаем данные с формы
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').value;
        const productDescription = document.getElementById('productDescription').value;

        // Проверяем, что все поля заполнены
        if (productName && productPrice && productImage && productDescription) {
            // Создаем новый товар
            const newProduct = {
                id: products.length + 1,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                description: productDescription
            };

            // Добавляем новый товар в массив продуктов
            products.push(newProduct);

            // Сохраняем обновленный список товаров в localStorage
            localStorage.setItem('products', JSON.stringify(products));

            // Обновляем отображение товаров на странице
            displayProducts();

            // Очищаем форму
            addProductForm.reset();
        } else {
            alert('Заполните все поля!');
        }
    });
} else {
    console.error('Форма с id "addProductForm" не найдена');
}

// Проверка на наличие данных в localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

function displayProducts() {
    let productsBox = document.querySelector(".products");
    productsBox.innerHTML = "";

    products.forEach(product => {
        productsBox.innerHTML += `
            <div class="elem">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p><b>${product.price}$</b></p>
                <p>${product.description}</p>
            </div>
        `;
    });
}

displayProducts(); // Отображаем товары при загрузке страницы
