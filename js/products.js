

let products = JSON.parse(localStorage.getItem("products")) || [];
const list = document.getElementById("productList");
const modal = document.getElementById("modal");

function renderProducts(filter = "") {
    list.innerHTML = "";
    products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((p, i) => {
        list.innerHTML += `
        <tr>
            <td><img src="images/${p.image || 'default.jpg'}" width="50"></td>
            <td>${p.name}</td>
            <td>${p.price.toLocaleString()} đ</td>
            <td>${p.category}</td>
            <td>
                <button onclick="deleteProduct(${i})">🗑</button>
            </td>
        </tr>`;
    });
}

function deleteProduct(i) {
    if(confirm("Xoá sản phẩm?")) {
        products.splice(i,1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    }
}

document.getElementById("productForm").addEventListener("submit", e => {
    e.preventDefault();
    products.push({
        name: name.value,
        price: Number(price.value),
        category: category.value,
        image: image.value
    });
    localStorage.setItem("products", JSON.stringify(products));
    closeModal();
    renderProducts();
});

document.getElementById("search").addEventListener("input", e => {
    renderProducts(e.target.value);
});

function openModal() { modal.style.display = "block"; }
function closeModal() { modal.style.display = "none"; }

renderProducts();
