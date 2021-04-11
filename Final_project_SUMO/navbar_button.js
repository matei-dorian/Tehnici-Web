const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => { navbarLinks.classList.toggle('active') })
// sursa: https://www.youtube.com/watch?v=At4B7A4GOPg&t=119s
