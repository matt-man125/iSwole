function createHeader(page) {
  const header = document.getElementById("header");
  header.innerHTML = `
    <div class="imgLogo"><img src="public/img/logo.png" onclick="redirect('index.html')" alt="logo img here"></div>
    <div class="headerPri" onclick="redirect('index.html')">iSwole</div>
    <div class="headerSec">${page}</div>
    <div class="imgBurger"><img src="public/img/burger.png" onclick="toggleSidebar()" alt="menu icon here"></div>
    `;
}
async function queryExercises() {
  var selectElement = document.getElementById("exerciseSelect");
  var selectedValue = selectElement.options[selectElement.selectedIndex].value;
  console.log(selectedValue);

  try {
    const response = await fetch(`/progress?value=${selectedValue}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log(response);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function clearInputs(num) {
  var selectElement = document.querySelectorAll("select")[num];
  selectElement.value = "";
  var numberInput = document.querySelector('input[name="weight' + num + '"]');
  numberInput.value = "";
  var numberInput = document.querySelector('input[name="sets' + num + '"]');
  numberInput.value = "";
  var numberInput = document.querySelector('input[name="reps' + num + '"]');
  numberInput.value = "";
}

function redirect(url) {
  window.location.href = url;
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const pageGeneral = document.getElementById("pageGeneral");
  sidebar.classList.toggle("active");
  pageGeneral.classList.toggle("active");
}

createHeader();
