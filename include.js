function createHeader(page) {
    const header = document.getElementById('header');
    header.innerHTML = 
    `
    <div class="imgLogo"><img src="img/logo.png" onclick="redirect('index.html')" alt="logo img here"></div>
    <div class="headerPri" onclick="redirect('index.html')">iSwole</div>
    <div class="headerSec">${page}</div>
    <div class="imgBurger"><img src="img/burger.png" onclick="toggleSidebar()" alt="menu icon here"></div>
    `
}

function redirect(url) {
    window.location.href = url;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const pageGeneral = document.getElementById('pageGeneral');
    sidebar.classList.toggle('active');
    pageGeneral.classList.toggle('active');

}

createHeader();