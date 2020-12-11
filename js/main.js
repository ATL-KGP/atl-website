//Hamburger-Menu Controller

const loggedOutLinks = document.querySelectorAll('.navigation__link-logout');
const loggedInLinks = document.querySelectorAll('.navigation__link-login');
const loggedLinks = document.querySelectorAll('.navigation__link');
const setupUI = (user) => {
    if (user) {
        loggedLinks.forEach(item => item.style.display = 'inline-block');
        loggedInLinks.forEach(item => item.style.display = 'inline-block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        loggedLinks.forEach(item => item.style.display = 'inline-block');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'inline-block');
    }
}


//Sign-In/Sign-Up 
const card = document.querySelector(".card");

document.querySelector("#login").addEventListener("click", () => {
    card.classList.remove("rotate");
});
document.querySelector("#signup").addEventListener("click", () => {
    card.classList.add("rotate");
});

