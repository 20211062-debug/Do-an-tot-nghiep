# Thủ Công Việt
ĐỚI SỸ MẠNH 20211062
ĐỀ TÀI: XÂY DỰNG WEBSITE BÁN THỦ CÔNG MỸ NGHỆ
Website thương mại điện tử giới thiệu và kinh doanh các sản phẩm thủ công mỹ nghệ Việt Nam.

Dự án được xây dựng nhằm giới thiệu các sản phẩm truyền thống như **gốm sứ, đồ gỗ, mây tre đan, lụa, tranh thêu...**, đồng thời cung cấp các chức năng quản lý sản phẩm, tài khoản, đơn hàng và nghệ nhân.

---

## 📌 Giới thiệu

**Thủ Công Việt** là website bán hàng trực tuyến tập trung vào các sản phẩm thủ công mỹ nghệ và làng nghề truyền thống Việt Nam.

Website hướng tới việc:

- 🏺 Giới thiệu các sản phẩm thủ công Việt Nam.
- 👨‍🎨 Giới thiệu nghệ nhân và câu chuyện về nghề truyền thống.
- 🛒 Cung cấp chức năng xem sản phẩm và thêm vào giỏ hàng.
- 💳 Hỗ trợ quy trình đặt hàng và thanh toán.
- 🔎 Tra cứu tình trạng đơn hàng.
- 👤 Đăng ký và đăng nhập tài khoản.
- 🔐 Phân quyền người dùng.
- 📦 Quản lý sản phẩm.
- 📊 Thống kê đơn hàng và doanh thu.
- ☁️ Sử dụng Firebase cho xác thực và cơ sở dữ liệu.

---

## ✨ Chức năng chính

### 🏠 Trang chủ

- Banner giới thiệu thương hiệu.
- Hiển thị các sản phẩm nổi bật.
- Danh mục sản phẩm.
- Điều hướng đến các trang chức năng.
- Giao diện responsive.

### 🛍️ Sản phẩm

Website hỗ trợ nhiều nhóm sản phẩm:

- 🏺 Gốm sứ
- 🪵 Đồ gỗ mỹ nghệ
- 🎋 Mây tre đan
- 🧵 Lụa và thổ cẩm
- 🖼️ Tranh thêu
- 🥉 Đồ đồng
- Và các sản phẩm thủ công khác.

Các chức năng:

- Xem danh sách sản phẩm.
- Lọc sản phẩm theo danh mục.
- Xem chi tiết sản phẩm.
- Xem hình ảnh sản phẩm.
- Chọn số lượng.
- Thêm sản phẩm vào giỏ hàng.
- Hiển thị giá và thông tin sản phẩm.

### 🛒 Giỏ hàng

- Hiển thị sản phẩm đã chọn.
- Thay đổi số lượng.
- Xóa sản phẩm.
- Tính tổng tiền.
- Chuyển sang trang thanh toán.

### 💳 Thanh toán

- Nhập thông tin người nhận.
- Nhập thông tin giao hàng.
- Lựa chọn phương thức thanh toán.
- Xác nhận đơn hàng.
- Hiển thị trang đặt hàng thành công.

### 🔎 Tra cứu đơn hàng

Khách hàng có thể sử dụng mã đơn hàng để kiểm tra thông tin và trạng thái đơn hàng.

### 👨‍🎨 Nghệ nhân

Trang giới thiệu các nghệ nhân thủ công Việt Nam.

Thông tin có thể bao gồm:

- Họ tên nghệ nhân.
- Làng nghề.
- Câu chuyện nghề nghiệp.
- Giải thưởng / danh hiệu.
- Hình ảnh nghệ nhân.

Hệ thống quản lý còn hỗ trợ thêm, chỉnh sửa và xóa thông tin nghệ nhân.

### 👤 Tài khoản

Website hỗ trợ:

- Đăng ký tài khoản.
- Đăng nhập.
- Đăng xuất.
- Phân quyền tài khoản.
- Quản lý người dùng thông qua Firebase Authentication.

### 🔐 Phân quyền

Hệ thống có các nhóm tài khoản:

- `quanly` – Quản lý hệ thống.
- `nhanvien` – Nhân viên.
- Người dùng thông thường.

Sau khi đăng nhập, hệ thống sẽ chuyển người dùng đến giao diện tương ứng với quyền được cấp.

### 📦 Quản lý sản phẩm

Quản trị viên có thể:

- Thêm sản phẩm.
- Xóa sản phẩm.
- Tìm kiếm sản phẩm.
- Chỉnh sửa thông tin sản phẩm.
- Quản lý giá.
- Quản lý danh mục.
- Quản lý hình ảnh.

### 📊 Thống kê

Hệ thống có trang thống kê đơn hàng và doanh thu.

Có thể sử dụng biểu đồ để trực quan hóa dữ liệu.

---

## 🛠️ Công nghệ sử dụng

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

### Database & Authentication

- Firebase Authentication
- Firebase Realtime Database

### Thư viện

- Chart.js
- Leaflet.js
- OpenSeadragon

### Lưu trữ dữ liệu phía Client

- LocalStorage

---

## 📁 Cấu trúc dự án

```text
mynghe-website/
│
├── index.html
├── gioi-thieu.html
├── san-pham.html
├── chi-tiet-san-pham.html
│
├── cart.html
├── checkout.html
├── order-success.html
├── kiem-tra-don-hang.html
│
├── login.html
├── register.html
│
├── quanly.html
├── nhanvien.html
├── admin-dashboard.html
├── admin-products.html
├── thong-ke.html
│
├── lien-he.html
├── ok.html
│
├── CSS/
│   ├── style.css
│   ├── style.css1.css
│   └── chatbot.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── firebase.js
│   ├── products.js
│   ├── productdetail.js
│   ├── script.js
│   ├── TaiKhoan.js
│   ├── admin.css
│   └── Node.js
│
├── images/
│   ├── banner.jpg
│   ├── logo.png
│   ├── binh_gom_sen.jpg
│   ├── sp_gom_1.jpg
│   ├── sp_lua_1.jpg
│   ├── sp_may_tre.jpg
│   ├── sp_tranh_theu.jpg
│   └── ...
│
├── thaook/
│   ├── logo.png
│   └── sp1.jpg
│
└── .vscode/
    └── launch.json
