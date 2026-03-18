// ── TOAST ──────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── SIDEBAR TOGGLE ─────────────────────────────────────────
function initSidebar() {
  const btn = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (!btn) return;
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

// ── TOPBAR DATE ────────────────────────────────────────────
function initDate() {
  const el = document.getElementById('topbar-date');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  el.textContent = now.toLocaleDateString('en-IN', opts);
}

// ── ACTIVE NAV ─────────────────────────────────────────────
function initActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const path = window.location.pathname.split('/').pop();
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── STORAGE HELPERS ────────────────────────────────────────
const Store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; }
    catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch {}
  },
  push(key, val) {
    const arr = this.get(key) || [];
    arr.push(val);
    this.set(key, arr);
    return arr;
  }
};

// ── IST TIME ────────────────────────────────────────────────
function getIST() {
  return new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}
function todayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

// ── MENU DATA ───────────────────────────────────────────────
const MENU = {
  Monday:    { Breakfast: ["Idli+Chutney+Sambhar","Tea/Coffee","Milk","Seasonal Fruit"], Lunch: ["Arhar Dal","Aalu Bhujia","Salad","Rice","Chapati","Veg Raita"], Snacks: ["Biscuits","Tedhe Medhe","Aam Panna","Tea"], Dinner: ["Mixed Dal","Lauki Sabji","Rice","Chapati","Salad","Pickle","Ice Cream"] },
  Tuesday:   { Breakfast: ["Stuffed Parantha","Sabji","Butter","Tea/Coffee","Milk","Seasonal Fruit"], Lunch: ["Dal Tadka","Kathal Sabji","Curd","Rice","Chapati","Salad","Pickle"], Snacks: ["Chola Samosa","Chutney","Tea/Coffee"], Dinner: ["Soyabean Sabji","Dal Makhani","Rice","Chapati","Salad","Pickle","Sewal"] },
  Wednesday: { Breakfast: ["Methi Parantha","Boiled Eggs","Curd","Milk","Tea/Coffee","Fruit"], Lunch: ["Pulao","White Chana","Boondi Raita","Chapati","Salad","Pickle"], Snacks: ["Black Chana","Rasna"], Dinner: ["Aalu Bora Sabji","Mixed Dal","Rice","Chapati","Halwa","Salad","Pickle"] },
  Thursday:  { Breakfast: ["Poha","Bread Butter","Milk","Tea/Coffee","Fruit"], Lunch: ["Rajma","Bhindi","Rice","Chapati","Salad","Curd"], Snacks: ["Pakora","Chutney","Tea"], Dinner: ["Chole","Pulao","Chapati","Salad","Pickle","Sweet"] },
  Friday:    { Breakfast: ["Upma","Chutney","Tea/Coffee","Milk","Fruit"], Lunch: ["Dal Fry","Aalu Gobi","Rice","Chapati","Salad","Raita"], Snacks: ["Namkeen","Juice","Tea"], Dinner: ["Kofta Curry","Rice","Chapati","Salad","Pickle","Kheer"] },
  Saturday:  { Breakfast: ["Chole Bhature","Tea/Coffee","Milk","Fruit"], Lunch: ["Dal","Paneer Sabji","Rice","Chapati","Salad","Raita"], Snacks: ["Biscuits","Cold Drink","Tea"], Dinner: ["Vegetable Biryani","Raita","Salad","Pickle","Sweet"] },
  Sunday:    { Breakfast: ["Puri Sabji","Tea/Coffee","Milk","Fruit"], Lunch: ["Dal Makhani","Mixed Veg","Rice","Chapati","Salad","Curd"], Snacks: ["Maggie","Tea"], Dinner: ["Paneer Curry","Rice","Chapati","Salad","Pickle","Gulab Jamun"] }
};

const FOOD_EMOJI = {
  "Idli+Chutney+Sambhar":"🥘","Tea/Coffee":"☕","Milk":"🥛","Seasonal Fruit":"🍎","Arhar Dal":"🫘","Aalu Bhujia":"🥔","Salad":"🥗","Rice":"🍚","Chapati":"🫓","Veg Raita":"🥣","Biscuits":"🍪","Tedhe Medhe":"🥨","Aam Panna":"🧃","Tea":"☕","Mixed Dal":"🫘","Lauki Sabji":"🥒","Pickle":"🫙","Ice Cream":"🍨","Stuffed Parantha":"🥙","Sabji":"🥘","Butter":"🧈","Dal Tadka":"🍛","Kathal Sabji":"🍆","Curd":"🥛","Chola Samosa":"🥟","Soyabean Sabji":"🥘","Dal Makhani":"🍛","Sewal":"🍲","Methi Parantha":"🥙","Boiled Eggs":"🥚","Fruit":"🍊","Pulao":"🍛","White Chana":"🧆","Boondi Raita":"🥣","Black Chana":"🧆","Rasna":"🧃","Aalu Bora Sabji":"🥔","Halwa":"🍮","Poha":"🍚","Bread Butter":"🍞","Rajma":"🫘","Bhindi":"🥦","Pakora":"🍤","Chutney":"🫙","Chole":"🧆","Sweet":"🍬","Upma":"🍲","Dal Fry":"🍛","Aalu Gobi":"🥔","Namkeen":"🥨","Juice":"🧃","Kofta Curry":"🍛","Kheer":"🥛","Chole Bhature":"🥙","Dal":"🫘","Paneer Sabji":"🧀","Cold Drink":"🥤","Vegetable Biryani":"🍛","Raita":"🥣","Maggie":"🍜","Paneer Curry":"🧀","Gulab Jamun":"🍡","Mixed Veg":"🥗","Puri Sabji":"🥙"
};

// init on every page
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initDate();
  initActiveNav();
});
