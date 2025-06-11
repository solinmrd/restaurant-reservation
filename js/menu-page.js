const menuData = [
  {
    id: 1,
    title: "mixed grill",
    image: "images/menu/izgara-karisik.jpg",
    paragraph:
      "Chops, beef steak, meatballs, lamb shish, tenderloin, urfa and adana kebab",
    price: 60.0,
    category: "main dishes",
  },
  {
    id: 2,
    title: "Meat Burger",
    image: "images/menu/burger.jpg",
    paragraph:
      "Beef, Louisiana Sauce, Greens, Pickles, Caramelized Onion and Cheddar",
    price: 12.0,
    category: "fast food",
  },
  {
    id: 3,
    title: "Chicken Burger",
    image: "images/menu/tavuk-burger.jpg",
    paragraph: "Chicken Meat, Mayonnaise, Pickles and Greens",
    price: 10.0,
    category: "fast food",
  },
  {
    id: 4,
    title: "lahmacun",
    image: "images/menu/lahmacun.jpg",
    paragraph:
      "Lahmacun, Cheese Lahmacun, Garlic Lahmacun and Hazelnut Lahmacun",
    price: 15.0,
    category: "main dishes",
  },
  {
    id: 5,
    title: "Lentil Soup",
    image: "images/menu/mercimek-corbasi.jpg",
    paragraph: "Red lentils",
    price: 5.0,
    category: "soups",
  },
  {
    id: 6,
    title: "Tomato Soup",
    image: "images/menu/domates-corbasi.jpg",
    paragraph: "Tomato",
    price: 7.0,
    category: "soups",
  },
  {
    id: 7,
    title: "Mushroom Soup",
    image: "images/menu/mantar-corbasi.jpg",
    paragraph: "Mushroom",
    price: 9.0,
    category: "soups",
  },
  {
    id: 8,
    title: "Vegetable soup",
    image: "images/menu/sebze-corbasi.jpg",
    paragraph: "Potatoes, carrots, noodles, peas and onions",
    price: 12.0,
    category: "soups",
  },
  {
    id: 9,
    title: "Broccoli salad",
    image: "images/menu/broccoli-salad.jpg",
    paragraph: "Broccoli, red pepper, green pepper, red cabbage",
    price: 12.0,
    category: "salads",
  },
  {
    id: 10,
    title: "Vegetable Roka Salad",
    image: "images/menu/vegetable-roka-salad.jpg",
    paragraph: "Feta white cheese, green salad, tomatoes and olives.",
    price: 8.0,
    category: "salads",
  },
  {
    id: 11,
    title: "cabbage salad",
    image: "images/menu/cabbage-salad.jpg",
    paragraph: "Red cabbage, carrot, parsley, red and green peppers",
    price: 7.0,
    category: "salads",
  },
  {
    id: 12,
    title: "Choban shepherd salad",
    image: "images/menu/choban-shepherd-salad.jpg",
    paragraph: "Tomatoes, lettuce, cucumber and lemon",
    price: 6.0,
    category: "salads",
  },
  {
    id: 13,
    title: "Muhammara",
    image: "images/menu/muhammara.jpg",
    paragraph: "Red pepper and walnuts",
    price: 5.0,
    category: "appetizers",
  },
  {
    id: 14,
    title: "Hummus",
    image: "images/menu/humus.jpg",
    paragraph:
      "Pumpkin Hummus, Basil Hummus and Hummus with roasted eggplant",
    price: 8.0,
    category: "appetizers",
  },
  {
    id: 15,
    title: "Tzatziki",
    image: "images/menu/cacik.jpg",
    paragraph: "Purslane tzatziki, cucumber tzatziki and lettuce tzatziki",
    price: 4.0,
    category: "appetizers",
  },
  {
    id: 16,
    title: "pistachio Baklava",
    image: "images/menu/fistikli-baklava.jpg",
    paragraph: "Pistachio",
    price: 18.0,
    category: "sweets",
  },
  {
    id: 17,
    title: "Walnut baklava",
    image: "images/menu/cevizli-baklava.jpg",
    paragraph: "Walnut",
    price: 15.0,
    category: "sweets",
  },
  {
    id: 18,
    title: "Chesscake",
    image: "images/menu/raspberry-cheesecake.jpg",
    paragraph:
      "Fresh raspberry, lemon, chocolate, Käsekuchen and forest fruit cheesecake",
    price: 16.0,
    category: "sweets",
  },
  {
    id: 19,
    title: "rice pudding",
    image: "images/menu/rice-pudding.jpg",
    paragraph:
      "Starchy, Starch-free, Mastic gum, lemon and Caramel Rice Pudding",
    price: 13.0,
    category: "sweets",
  },
  {
    id: 20,
    title: "Cabbage Rolls",
    image: "images/menu/lahana-sarmasi.jpg",
    paragraph:
      " Cabbage, curl, onion, parsley",
    price: 16.00,
    category: "main dishes",
  },
  {
    id: 21,
    title: "Potato ground beef",
    image: "images/menu/dana-koftesi.jpg",
    paragraph:
      "Ground beef, onion, garlic, parsley, potatoes",
    price: 18.00,
    category: "main dishes",
  },
  {
    id: 22,
    title: "Mix Pizza",
    image: "images/menu/pizza1.jpg",
    paragraph:
      "Tomato slices, mushroom, olive",
    price: 14.00,
    category: "fast food",
  },
  {
    id: 23,
    title: "Eggplant Pizza",
    image: "images/menu/pizza2.jpg",
    paragraph:
      "Eggplant, cheese and tomato slices",
    price: 15.00,
    category: "fast food",
  },
  {
    id: 24,
    title: "sausage mix pizza",
    image: "images/menu/pizza3.jpg",
    paragraph:
      "Sausage, tomato slices, green and black olives",
    price: 14.00,
    category: "fast food",
  },
  {
    id: 25,
    title: "Super Taco",
    image: "images/menu/taco.jpg",
    paragraph:
      "Chicken, cheese, colorful peppers, iceberg lettuce, tomatoes, cheddar cheese",
    price: 16.00,
    category: "fast food",
  },
  {
    id: 26,
    title: "Eggplant Crackers",
    image: "images/menu/meze1.jpg",
    paragraph:
      "Tomato, eggplant, garlic, parsley, olive oil",
    price: 12.00,
    category: "appetizers",
  },
  {
    id: 27,
    title: "Sliced ​​Vegetable Platter",
    image: "images/menu/meze2.jpg",
    paragraph:
      "Cucumber, tomato, mint, iceberg marul, red cabbage and olives",
    price: 10.00,
    category: "appetizers",
  },
  {
    id: 28,
    title: "Çiğ Köfte",
    image: "images/menu/cigkofte.jpg",
    paragraph:
      "Meat, bulgur, onion, parsley, garlic, tomato paste, isot",
    price: 12.00,
    category: "appetizers",
  },
  {
    id: 29,
    title: "Curly lettuce salad",
    image: "images/menu/kivircik-salata.jpg",
    paragraph:
      "Curly lettuce, tomato and Rocca",
    price: 7.00,
    category: "salads",
  },
  {
    id: 30,
    title: "Caesar salad",
    image: "images/menu/sezer-salata.jpg",
    paragraph:
      "Chicken breast, iceberg, cucumber, tomato, aged kashar and toast bread ",
    price: 10.00,
    category: "salads",
  },
  {
    id: 31,
    title: "Brownie",
    image: "images/menu/brownie.jpg",
    paragraph:
      "Cherry Walnut, Original and Refined Sugar Free Fit Brownie",
    price: 14.00,
    category: "sweets",
  },
  {
    id: 32,
    title: "Cinnamon Rolls",
    image: "images/menu/cinnamon.jpg",
    paragraph:
      "Peanut Butter, Triple Berry, Chocolate Chip, Apple Pie  and Classic Cinnamon Rolls",
    price: 16.00,
    category: "sweets",
  },
  {
    id: 33,
    title: "Plateau Soup",
    image: "images/menu/yayla-corbasi.jpg",
    paragraph:
      "Rice, yogurt and flour",
    price: 8.00,
    category: "soups",
  },
  {
    id: 34,
    title: "Borscht Soup",
    image: "images/menu/borscht.jpg",
    paragraph:
      "Beef shoulder, red beetroot, carrots, white cabbage and onion",
    price: 15.00,
    category: "soups",
  },
  {
    id: 35,
    title: "Adana Kabab",
    image: "images/menu/adana.jpg",
    paragraph:
      "Lamb meat and lamb tail fat",
    price: 20.00,
    category: "main dishes",
  },
  {
    id: 36,
    title: "Ciğer",
    image: "images/menu/ciger.jpg",
    paragraph:
      "Lamb liver, onion and pepper",
    price: 18.00,
    category: "main dishes",
  },
];

const grid = document.getElementById("menuGrid");
const buttons = document.querySelectorAll(".category-scroll button");

function renderItems(items) {
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-div";
    card.innerHTML = `
        <div class="card menu-card">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-paragraph">${item.paragraph}</p>
            <p class="card-price">$${item.price.toFixed(2)}</p>
          
          </div>
        </div>
      `;
    grid.appendChild(card);
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelector(".category-scroll .active")
      .classList.remove("active");
    btn.classList.add("active");
    const cat = btn.dataset.category;
    if (cat === "all") {
      renderItems(menuData);
    } else {
      renderItems(menuData.filter((i) => i.category === cat));
    }
  });
});

renderItems(menuData);
