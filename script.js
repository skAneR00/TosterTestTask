let discount_price = document.querySelector("#discount");
let current_price = document.querySelector("#current-price");

// Редактирование скидки и текущей цены в коде ( если я правильно понял конечно )
discount_price.textContent = "R 250.00";
current_price.textContent = "R 160.00";

// Таймер 
// Изначально будет всегда 5 часов акции. Можно переделать как угодно, если нужно.
const timer_field = document.querySelector("#timer-field");
let endDate = Date.now() + (3600000 * 5);

let ticker = setInterval(function () {
    let tempDate = Date.now();
    let difference = endDate - tempDate;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timer_field.textContent = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    if (difference <= 0) {
        timer_field.textContent = "Ooops...";
        // Просто прикольная фича
        current_price.textContent = discount_price.textContent;
        discount_price.style.display = "none";
        clearInterval(ticker);
    }
}, 1000);






// Создание img через js, чтобы в дальнейшем можно было проще работать с ними
let product_colors_block = document.querySelector(".product-colors");
let main_img = document.querySelector("#product-photo-main");

let product_colors = ["./assets/products/black.jpg", "./assets/products/orange.jpg", "./assets/products/pink.jpg", "./assets/products/yellow.jpg"];

function setActiveImage(id) {
    let cur_img = document.querySelector(`#${id}`);
    let prev_img = document.querySelector('.active');
    prev_img.className = 'nactive';
    cur_img.className == "nactive" ? cur_img.className = "active" : cur_img.className = "nactive";
    main_img.src = cur_img.src;
}

function createImages() {
    for (let i = 0; i < product_colors.length; i++) {
        const img = document.createElement('img');
        img.id = "product-color-" + i;
        i == 0 ? img.className = "active" : img.className = "nactive";
        img.src = product_colors[i];
        img.onclick = function () {
            setActiveImage(img.id);
        };
        product_colors_block.appendChild(img);
    }
}

// Выпадающие списки
// Создание пунктов с цветами товара c привязкой к картинке ( Black, Orange и т.д. )
// Т.е. при нажатии на Orange будет выбираться Orange картинка
const dropdown_button = document.querySelector(".dropdown-button");
const dropdown_list = document.querySelector("#dropdown-list-colors");

const dropdown_button_count = document.querySelector("#dropdown-button-count");
const dropdown_list_count = document.querySelector("#dropdown-list-count");

dropdown_list.style.display = "none", dropdown_list_count.style.display = "none";

function closeDropdownList() {
    dropdown_list.style.display == "none" ? dropdown_list.style.display = "block" : dropdown_list.style.display = "none";
}

function closeDropdownListCount(e) {
    dropdown_list_count.style.display == "none" ? dropdown_list_count.style.display = "block" : dropdown_list_count.style.display = "none";
    e != undefined ? dropdown_button_count.textContent = e.textContent : "";
}

function createDropdownList() {
    for (let i = 0; i < product_colors.length; i++) {
        const li = document.createElement('li');
        li.textContent = product_colors[i].split("./assets/products/")[1].split(".jpg")[0];
        li.addEventListener('click', function () {
            dropdown_button.textContent = li.textContent;
            let selected = product_colors.map((item) => item.includes(li.textContent)).indexOf(true);
            setActiveImage("product-color-" + selected);
            closeDropdownList();
        })
        dropdown_list.appendChild(li);
    }
}

dropdown_button.addEventListener('click', function () {
    closeDropdownList();
})

dropdown_button_count.addEventListener('click', function () {
    closeDropdownListCount();
})













window.addEventListener("load", function () {
    createImages();
    createDropdownList();
});