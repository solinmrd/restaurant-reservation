const menuItems = document.querySelectorAll('.nav-item');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active')); // diğerlerinden kaldır
    item.classList.add('active'); // tıklanana ekle
  });
});
