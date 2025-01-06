const menuItem = document.querySelectorAll('#topics_menu > li');
const subMenuItem = document.querySelectorAll('.subtopic-item')

menuItem.forEach(menu => {
    menu.addEventListener('click', function () {
        const subMenu = document.querySelector(`#${this.id} > ul`);
        subMenu.classList.toggle('active');
    })
})

subMenuItem.forEach(item => {
    item.addEventListener('click', function() {
        const nestedMenu = document.querySelectorAll(`#${this.id} > ul`);
        nestedMenu.forEach(el => {
            el.classList.toggle('active');
        })  
    })
})