// Chuyển đổi giữa form đăng nhập và đăng ký
function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

// Xử lý form đăng nhập
document.getElementById('loginForm').querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // TODO: Gọi API đăng nhập
    console.log('Đăng nhập:', { email, password });
    alert('Đăng nhập thành công! (Demo)');
});

// Xử lý form đăng ký
document.getElementById('registerForm').querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    // Kiểm tra mật khẩu khớp
    if (password !== confirm) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    // TODO: Gọi API đăng ký
    console.log('Đăng ký:', { name, email, password });
    alert('Đăng ký thành công! (Demo)');
    
    // Chuyển về form đăng nhập
    showLogin();
});
