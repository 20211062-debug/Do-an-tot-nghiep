
// Dữ liệu người dùng giả lập (Lưu ý: TRONG THỰC TẾ, CẦN BACK-END VÀ DATABASE)
const MOCK_USERS = [
    { username: 'admin', password: '123', role: 'admin', name: 'Quản Trị Viên' },
    { username: 'nv01', password: '456', role: 'nhanvien', name: 'Nhân Viên A' },
    { username: 'nv02', password: '456', role: 'nhanvien', name: 'Nhân Viên B' }
];

// Dữ liệu sản phẩm giả lập
let MOCK_PRODUCTS = [
    { id: 1, name: 'Bình gốm hoa sen', price: 500000, stock: 15, desc: 'Bình gốm sứ Bát Tràng vẽ tay.' },
    { id: 2, name: 'Khăn lụa tơ tằm', price: 250000, stock: 50, desc: 'Lụa Hà Đông cao cấp.' },
    { id: 3, name: 'Tượng gỗ lũa', price: 1200000, stock: 5, desc: 'Chạm khắc từ gỗ quý.' }
];

// Dữ liệu đơn hàng giả lập (Dùng để tính thống kê)
let MOCK_ORDERS = [
    { id: 101, total: 500000, date: '2025-10-20', seller: 'nv01' },
    { id: 102, total: 1200000, date: '2025-10-21', seller: 'nv01' },
    { id: 103, total: 250000, date: '2025-10-22', seller: 'nv02' },
];

// Hàm khởi tạo LocalStorage nếu chưa có
function initializeData() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(MOCK_PRODUCTS));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(MOCK_ORDERS));
    }
}

// Bắt đầu khởi tạo dữ liệu
initializeData();