let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

//API fetch data//
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

//employee data ==== loop through and store data ====//
function displayEmployees(employeeData) {
employees = employeeData;

let employeeHTML = '';

employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
    </div>
`
});
gridContainer.innerHTML = employeeHTML;
}

//temperate literal deconsttructoring//
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
      <img class="avatar-2" src="${picture.large}" />
      <div class="text-container-2">
        <h2 class="name-2">${name.first} ${name.last}</h2>
        <p class="email-2">${email}</p>
        <p class="address-3">${city}</p>
        <hr />
        <p class="phone">${phone}</p>
        <p class="address-2">${street.number}, ${street.name}, ${state} ${postcode}</p>
        <p class="birthday">Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
  `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

//clicks are not on the grid-container === on its proximity//
gridContainer.addEventListener('click', e => {

if (e.target !== gridContainer) {
      const card = e.target.closest(".card");
      const index = card.getAttribute('data-index');
      displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});