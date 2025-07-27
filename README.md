# kanidawritapp – Local PWA Writing Tool

## 🎯 Concept

แอปช่วยนักเขียนสร้างพล็อต + เอาท์ไลน์ + treatment  
**ออกแบบแบบ modular, local-first, AI ไม่แทรกเกิน 20%**

> สร้างจากแนวคิด “Writer-first / AI-later”  
> รอ input ครบก่อน generate ไม่คิดแทนเกินจำเป็น

---

## 🚀 วิธีใช้งาน

### 🔹 Deploy แบบ Static (เช่น Render)

1. สร้าง Static Site บน [Render.com](https://render.com/)
2. root directory = `/public`
3. build command = _none_
4. publish directory = `/public`

### 🔹 ใช้งานแบบ Local / Offline

- เปิด `index.html` โดยตรงใน browser (Chrome แนะนำ)
- ติดตั้งเป็น PWA ได้ (มี manifest + service worker)
- บันทึกโปรเจกต์แยกใน `localStorage` (ต่อโปรเจกต์)

---

## 🗂️ โครงสร้างไฟล์

