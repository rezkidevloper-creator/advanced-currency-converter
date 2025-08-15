# 🌍 Advanced Currency Converter | محوّل العملات المتقدم

## 🇬🇧 English

**Advanced Currency Converter** is a modern web application built with **React + Vite** that allows you to convert between world currencies and the top 50 cryptocurrencies in real-time.  
It features **Dark/Light mode**, a clean responsive UI, and up-to-date exchange rates from trusted APIs.

### ✨ Features
- 💱 Convert between all world currencies
- 🪙 Real-time prices for top 50 cryptocurrencies
- 🌗 Dark & Light mode toggle
- 📊 Latest crypto market updates
- 📱 Fully responsive design
- ✍️ Signature: *Developed by Rezki-dev*

### 🚀 Technologies
- React + Vite
- CoinGecko API (Crypto)
- Open Exchange Rates API (Fiat)
- CSS for styling

### 📦 Installation
```bash
# Clone the repository
git clone https://github.com/YourUsername/advanced-currency-converter.git

# Navigate to the project folder
cd advanced-currency-converter

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Using a Backend Proxy

To avoid **CORS restrictions** when calling APIs directly from the browser, you can set up a simple **Node.js backend proxy** or use **Serverless Functions** (Netlify Functions / Vercel API Routes).

Example using **Node.js + Express**:

```javascript
// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/rates', async (req, res) => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/crypto', async (req, res) => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Running the backend
```bash
npm install express node-fetch cors
node server.js
```

Then in your frontend, replace:
```javascript
fetch('https://api.exchangerate-api.com/v4/latest/USD')
```
with:
```javascript
fetch('http://localhost:5000/api/rates')
```

---

## 🇸🇦 العربية

**محوّل العملات المتقدم** هو تطبيق ويب حديث مبني باستخدام **React + Vite** يسمح لك بالتحويل بين العملات العالمية وأفضل 50 عملة رقمية في الوقت الحقيقي.  
يتميز **بوضع داكن وفاتح**، واجهة أنيقة ومتجاوبة، وأسعار محدثة من واجهات برمجة تطبيقات موثوقة.

### ✨ المميزات
- 💱 التحويل بين جميع عملات العالم
- 🪙 أسعار حية لأفضل 50 عملة رقمية
- 🌗 التبديل بين الوضع الداكن والفاتح
- 📊 أحدث أخبار سوق العملات الرقمية
- 📱 تصميم متجاوب بالكامل
- ✍️ التوقيع: *Developed by Rezki-dev*

### 🚀 التقنيات المستخدمة
- React + Vite
- CoinGecko API (العملات الرقمية)
- Open Exchange Rates API (العملات التقليدية)
- CSS للتصميم

### 📦 التثبيت
```bash
# استنساخ المستودع
git clone https://github.com/YourUsername/advanced-currency-converter.git

# الانتقال إلى مجلد المشروع
cd advanced-currency-converter

# تثبيت التبعيات
npm install

# تشغيل الخادم المحلي
npm run dev

# إنشاء نسخة للإنتاج
npm run build
```

---

## 🖥️ استخدام خادم وسيط (Backend Proxy)

لتجنب قيود **CORS** عند استدعاء واجهات برمجة التطبيقات مباشرة من المتصفح، يمكنك إعداد **خادم Node.js بسيط** أو استخدام **Functions** على Netlify أو Vercel.

### مثال باستخدام Node.js + Express
```javascript
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/rates', async (req, res) => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'فشل في جلب البيانات' });
    }
});

app.get('/api/crypto', async (req, res) => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'فشل في جلب البيانات' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`الخادم يعمل على المنفذ ${PORT}`));
```

### تشغيل الخادم
```bash
npm install express node-fetch cors
node server.js
```

بعد ذلك، بدلاً من الاتصال بـ API مباشرة:
```javascript
fetch('https://api.exchangerate-api.com/v4/latest/USD')
```
ستتصل بخادمك المحلي:
```javascript
fetch('http://localhost:5000/api/rates')
```
