# 📦 Hướng Dẫn Backup và Khôi Phục Git

## ⚠️ Tình Trạng Hiện Tại

Bạn đang có:
- ✅ Code TypeScript hoàn chỉnh và build thành công
- ⚠️ Branch behind origin/main 31 commits
- ⚠️ Nhiều thay đổi đã staged (bao gồm cả node_modules)

## 🔧 Giải Pháp

### Bước 1: Backup Code Hiện Tại (QUAN TRỌNG!)

```bash
# Tạo folder backup
mkdir ../airport-backup-$(date +%Y%m%d-%H%M%S)

# Copy toàn bộ dự án (trừ node_modules và .git)
xcopy /E /I /EXCLUDE:exclude.txt . ..\airport-backup-$(date +%Y%m%d-%H%M%S)
```

Hoặc đơn giản hơn:
```bash
# Copy thủ công folder frontend/src và các file config
```

### Bước 2: Unstage node_modules (Không Nên Commit)

```bash
# Unstage node_modules
git restore --staged frontend/node_modules

# Thêm vào .gitignore nếu chưa có
echo "node_modules/" >> .gitignore
echo "frontend/node_modules/" >> .gitignore
```

### Bước 3: Tạo Commit Cho Code TypeScript

```bash
# Commit code TypeScript
git commit -m "feat: Convert frontend to TypeScript + Add landing page features

- Convert all JSX/JS to TSX/TS
- Add landing page with animations (framer-motion)
- Add flight search and booking features
- Add forgot/change password flows
- Fix react-router-dom imports
- Add TypeScript configurations
- Build successful: 511 modules, 411kB bundle"
```

### Bước 4: Xử Lý Conflict Với Origin

**Option A: Pull và Merge (Khuyến nghị nếu muốn giữ cả 2)**
```bash
# Pull changes từ origin
git pull origin main

# Nếu có conflict, resolve rồi:
git add .
git commit -m "merge: Resolve conflicts with origin/main"
git push origin main
```

**Option B: Force Push (CHỈ dùng nếu chắc chắn code local đúng)**
```bash
# ⚠️ CẢNH BÁO: Sẽ ghi đè lên origin
git push --force origin main
```

**Option C: Tạo Branch Mới (An toàn nhất)**
```bash
# Tạo branch mới cho TypeScript
git checkout -b typescript-migration
git push origin typescript-migration

# Sau đó merge vào main trên GitHub/GitLab
```

## 📁 Backup Thủ Công (Nhanh Nhất)

### Cách 1: Copy Folder
1. Mở File Explorer
2. Copy folder `airport` 
3. Paste vào `airport-backup-typescript`
4. Xóa folder `node_modules` trong backup để tiết kiệm dung lượng

### Cách 2: Zip File
```bash
# Tạo file zip (không bao gồm node_modules)
tar -czf airport-backup.tar.gz --exclude=node_modules --exclude=.git .
```

## 🔍 Kiểm Tra Trước Khi Commit

```bash
# Xem những gì sẽ được commit
git status

# Xem chi tiết thay đổi
git diff --staged

# Unstage file không cần thiết
git restore --staged <file>
```

## ✅ Checklist

- [ ] Đã backup code vào folder khác
- [ ] Đã unstage node_modules
- [ ] Đã kiểm tra git status
- [ ] Đã tạo commit message rõ ràng
- [ ] Đã chọn strategy (pull/force/branch)
- [ ] Đã push thành công

## 🆘 Nếu Có Lỗi

### Lỗi: "Your branch is behind"
```bash
git pull --rebase origin main
# Hoặc
git pull origin main
```

### Lỗi: "Conflict"
```bash
# Xem files conflict
git status

# Resolve từng file, sau đó:
git add <resolved-file>
git commit
```

### Lỗi: "Permission denied"
```bash
# Kiểm tra SSH key hoặc dùng HTTPS
git remote -v
git remote set-url origin https://github.com/username/repo.git
```

## 💡 Khuyến Nghị

1. **Backup trước khi làm gì với git**
2. **Không commit node_modules**
3. **Tạo branch riêng cho features lớn**
4. **Pull thường xuyên để tránh behind**
5. **Viết commit message rõ ràng**

---
*Tạo: ${new Date().toLocaleString('vi-VN')}*
