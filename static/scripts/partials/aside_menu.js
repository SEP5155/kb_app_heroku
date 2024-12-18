const menuItem = document.querySelectorAll('#topics_menu > li');

menuItem.forEach(menu => {
    menu.addEventListener('click', function () {
        const subMenu = document.querySelector(`#${this.id} > ul`);
        subMenu.classList.toggle('active');
    })
})