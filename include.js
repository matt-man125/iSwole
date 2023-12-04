function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = 
    `

    `
}

function redirect(url) {
    window.location.href = url;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');

    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';
        menuToggle.innerHTML = '&#9776; Menu';
    } else {
        sidebar.style.left = '0px';
        menuToggle.innerHTML = '&#10006; Close';
    }
}
