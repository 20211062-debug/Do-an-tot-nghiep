// server.js (Đoạn mã xử lý API Đăng nhập)

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser'); // Cần thiết để đọc dữ liệu POST
const { sql, getPool } = require('./db.config'); // Import CSDL Pool và Kiểu dữ liệu SQL

const app = express();
const PORT = 3000; // Hoặc port khác bạn muốn sử dụng
const SECRET_KEY = 'BAN_NEN_DOI_KHOA_BI_MAT_NAY'; // Thay bằng khóa bí mật mạnh

// Middleware để đọc dữ liệu JSON từ request body
app.use(bodyParser.json()); 


async function findUserAndRole(username, password) {
    try {
        const pool = await getPool(); // Lấy Connection Pool đã khởi tạo
        
        // Truy vấn phức tạp: Kiểm tra TaiKhoan và JOIN với Admin, NhanVien, KhachHang để xác định Role
        const query = `
            SELECT T.tenDangNhap, T.matKhau, 
                   ISNULL(A.maAdmin, ISNULL(N.maNV, K.maKH)) AS UserID,
                   CASE 
                       WHEN A.tenDangNhap IS NOT NULL THEN 'admin' 
                       WHEN N.tenDangNhap IS NOT NULL THEN 'nhanvien'
                       WHEN K.tenDangNhap IS NOT NULL THEN 'khachhang'
                       ELSE 'user' -- Mặc định là user nếu không thuộc 3 nhóm trên
                   END AS Role
            FROM TaiKhoan T
            LEFT JOIN Admin A ON T.tenDangNhap = A.tenDangNhap
            LEFT JOIN NhanVien N ON T.tenDangNhap = N.tenDangNhap
            LEFT JOIN KhachHang K ON T.tenDangNhap = K.tenDangNhap
            WHERE T.tenDangNhap = @username AND T.matKhau = @password;
        `;

        const result = await pool.request()
            .input('username', sql.VarChar(50), username)
            .input('password', sql.VarChar(255), password)
            .query(query);

        if (result.recordset.length > 0) {
            return result.recordset[0]; // Trả về đối tượng người dùng (bao gồm Role)
        }
        return null; // Không tìm thấy người dùng
        
    } catch (err) {
        console.error("Lỗi SQL khi xác thực:", err);
        return null; 
    }
}


app.post('/api/login', async (req, res) => {
    // Lấy username và password từ body (Client-side TaiKhoan.js gửi đến)
    const { username, password } = req.body; 

    // 1. Tìm và xác minh người dùng trong CSDL
    const user = await findUserAndRole(username, password);
    
    if (user) {
        // 2. Tạo Payload JWT (bao gồm vai trò)
        const payload = { 
            id: user.UserID, // Sử dụng ID (maAdmin, maNV, maKH)
            username: user.tenDangNhap,
            role: user.Role 
        };
        
        // 3. Ký Token và thiết lập thời hạn
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        
        // 4. Trả về Token, Vai trò và thông báo thành công cho Client
        return res.json({ 
            success: true,
            token: token, 
            role: user.Role, 
            message: 'Đăng nhập thành công.'
        });
        
    }
    
    // Đăng nhập thất bại
    res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });
});


app.listen(PORT, () => {
    console.log(`Server Node.js đang chạy tại http://localhost:${PORT}`);
});

