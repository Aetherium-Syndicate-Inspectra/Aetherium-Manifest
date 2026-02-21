# ใช้ Nginx image ขนาดเล็กสำหรับ Production
FROM nginx:1.25-alpine

# กำหนด Working Directory
WORKDIR /usr/share/nginx/html

# คัดลอกไฟล์ทั้งหมดใน context ปัจจุบัน (ที่ .dockerignore อนุญาต)
# เข้าไปยัง working directory ของ image
COPY . .

# เปิด Port 80 (default ของ Nginx)
EXPOSE 80

# หมายเหตุ: Nginx image มี CMD เริ่มต้นในการ start server อยู่แล้ว
