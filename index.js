const products = [
  {
    id: 1,
    name: "Черная икра",
    price: 10,
    image: "https://i.ibb.co/VcGd4GT2/black-Ikra.png",
    description: "Свежая черная икра.",
    category: "black_caviar",
  },
  {
    id: 2,
    name: "Черная икра",
    price: 10,
    image: "https://i.ibb.co/VcGd4GT2/black-Ikra.png",
    description: "Свежая черная икра.",
    category: "black_caviar",
  },
  {
    id: 3,
    name: "Черная икра",
    price: 10,
    image: "https://i.ibb.co/VcGd4GT2/black-Ikra.png",
    description: "Свежая черная икра.",
    category: "black_caviar",
  },
  {
    id: 4,
    name: "Черная икра",
    price: 10,
    image: "https://i.ibb.co/VcGd4GT2/black-Ikra.png",
    description: "Свежая черная икра.",
    category: "black_caviar",
  },
  {
    id: 5,
    name: "Красная икра",
    price: 10,
    image: "https://i.ibb.co/zHVHm6VN/red-ikra.png",
    description: "Натуральная красная икра.",
    category: "red_caviar",
  },
  {
    id: 6,
    name: "Красная икра",
    price: 10,
    image: "https://i.ibb.co/zHVHm6VN/red-ikra.png",
    description: "Натуральная красная икра.",
    category: "red_caviar",
  },
  {
    id: 7,
    name: "Красная икра",
    price: 10,
    image: "https://i.ibb.co/zHVHm6VN/red-ikra.png",
    description: "Натуральная красная икра.",
    category: "red_caviar",
  },
  {
    id: 8,
    name: "Красная икра",
    price: 10,
    image: "https://i.ibb.co/zHVHm6VN/red-ikra.png",
    description: "Натуральная красная икра.",
    category: "red_caviar",
  },
  {
    id: 9,
    name: "Лосось",
    price: 10,
    image: "https://i.ibb.co/fYJ1Qqrc/Myaso-lososya.png",
    description: "Свежий лосось.",
    category: "fresh_fish",
  },
  {
    id: 10,
    name: "Лосось",
    price: 10,
    image: "https://i.ibb.co/fYJ1Qqrc/Myaso-lososya.png",
    description: "Свежий лосось.",
    category: "fresh_fish",
  },
  {
    id: 11,
    name: "Форель",
    price: 10,
    image: "https://i.ibb.co/zH6HQWqS/forelS.png",
    description: "Отборная форель.",
    category: "fresh_fish",
  },
  {
    id: 12,
    name: "Форель",
    price: 10,
    image: "https://i.ibb.co/zH6HQWqS/forelS.png",
    description: "Отборная форель.",
    category: "fresh_fish",
  },

  {
    id: 13,
    name: "Форель",
    price: 10,
    image: "https://i.ibb.co/zH6HQWqS/forelS.png",
    description: "Отборная форель.",
    category: "smoked_fish",
  },

  {
    id: 14,
    name: "Форель",
    price: 10,
    image: "https://i.ibb.co/zH6HQWqS/forelS.png",
    description: "Отборная форель.",
    category: "smoked_fish",
  },

  {
    id: 15,
    name: "Форель",
    price: 10,
    image: "https://i.ibb.co/zH6HQWqS/forelS.png",
    description: "Отборная форель.",
    category: "smoked_fish",
  },

  {
    id: 16,
    name: "Форель",
    price: 10,
    image: "https://i.ibb.co/zH6HQWqS/forelS.png",
    description: "Отборная форель.",
    category: "smoked_fish",
  },
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".supIndex p").textContent = totalQuantity;
}

function addToCart(product, quantity) {
  if (quantity <= 0) return;

  let existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}

function displayProducts() {
  const sections = {
    fresh_fish: document.querySelector(".fresh_fish"),
    smoked_fish: document.querySelector(".smoked_fish"),
    black_caviar: document.querySelector(".black_caviar"),
    red_caviar: document.querySelector(".red_caviar"),
  };

  products.forEach((product) => {
    const productHTML = `
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

    // Добавляем продукт в соответствующую категорию
    sections[product.category].innerHTML += productHTML;
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
      let selectedProduct = products.find((p) => p.id === productId);
      let quantity = Number(nums[index].textContent);
      addToCart(selectedProduct, quantity);

      // Обнуляем счетчик после добавления
      nums[index].textContent = 1;
    };
  });

  updateCartCounter();
}

displayProducts();