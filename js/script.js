// Cập nhật: Sử dụng Firebase Realtime Database thay cho LocalStorage
import { db } from './db.config.js'; 


function getCurrentUser() {
    try {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        return null;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    // Nếu bạn có dùng Firebase Auth, hãy thêm: firebase.auth().signOut();
}


function updateCartCount() {
    const user = getCurrentUser();
    const cartCountElement = document.querySelector('.cart-count');
    if (!cartCountElement) return;

    if (user) {
        // Lấy giỏ hàng từ Firebase dựa trên Username/ID người dùng
        db.ref('carts/' + user.username).on('value', (snapshot) => {
            const cartData = snapshot.val();
            let totalItems = 0;
            if (cartData) {
                // Tính tổng quantity từ Firebase
                Object.values(cartData).forEach(item => {
                    totalItems += (item.quantity || 0);
                });
            }
            cartCountElement.textContent = totalItems;
        });
    } else {
        // Nếu chưa đăng nhập, dùng tạm LocalStorage cho khách (Optional)
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = localCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountElement.textContent = total;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Khởi tạo đếm giỏ hàng
    updateCartCount(); 

    const authArea = document.querySelector('.auth-area');
    const loginLink = document.getElementById('loginLink'); 
    const cartLink = document.getElementById('cartLink');
    
    if (!authArea || !loginLink || !cartLink) return;

    // Tạo link Quản trị (Dành cho QL/NV)
    const adminDashboardLink = document.createElement('a');
    adminDashboardLink.href = "quanly.html"; // Cập nhật đúng tên file của bạn
    adminDashboardLink.id = "adminDashboardLink";
    adminDashboardLink.className = "nav-icon-link";
    adminDashboardLink.style.marginLeft = '10px';
    adminDashboardLink.style.display = 'none';
    adminDashboardLink.innerHTML = `<i class="fas fa-chart-line"></i> Quản trị`;
    authArea.insertBefore(adminDashboardLink, cartLink);

    const user = getCurrentUser();

    if (user) {
        // Hiển thị UI khi đã đăng nhập
        const roleText = user.role === 'quanly' ? 'QL' : user.role === 'nhanvien' ? 'NV' : 'KH';
        
        loginLink.innerHTML = `
            <span style="display: flex; align-items: center;">
                <i class="fas fa-user" style="margin-right: 5px;"></i> 
                <span style="font-weight: 600; color: #d35400;">${user.name || user.username}</span> 
                (<span style="font-weight: 600;">${roleText}</span>)
            </span>
        `;
        loginLink.href = 'profile.html';
        
        const btnLogout = document.createElement('a');
        btnLogout.href = "#";
        btnLogout.id = "btnLogout";
        btnLogout.style.marginLeft = '10px';
        btnLogout.style.color = '#e74c3c';
        btnLogout.style.fontWeight = '600';
        btnLogout.textContent = '(Thoát)';
        authArea.insertBefore(btnLogout, cartLink);

        if (user.role === 'quanly' || user.role === 'nhanvien') {
            adminDashboardLink.style.display = 'inline-block';
        }
        
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            window.location.reload(); 
        });

    } else {
        loginLink.innerHTML = `<i class="fas fa-user"></i>`;
        loginLink.href = 'login.html';
    }
    
    

    function addToCartCloud(productId, name, price) {
        const user = getCurrentUser();
        
        if (!user) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng!");
            window.location.href = 'login.html';
            return;
        }

        // Đường dẫn: carts/username/productId
        const cartRef = db.ref('carts/' + user.username + '/' + productId);

        cartRef.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                // Nếu đã có SP, tăng số lượng
                const currentQty = snapshot.val().quantity;
                cartRef.update({ quantity: currentQty + 1 });
            } else {
                // Nếu chưa có, tạo mới
                cartRef.set({
                    id: productId,
                    name: name,
                    price: price,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                });
            }
            alert(`✅ Đã thêm "${name}" vào giỏ hàng Cloud!`);
        });
    }

    // Bắt sự kiện Click nút mua nhanh
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-add-to-cart-quick')) {
            const btn = e.target.closest('.btn-add-to-cart-quick');
            const productData = btn.closest('.product-data');
            
            if (productData) {
                const id = productData.dataset.productId;
                const name = productData.dataset.name;
                const price = Number(productData.dataset.price);

                if (!isNaN(price)) {
                    addToCartCloud(id, name, price);
                }
            }
        }
    });
});