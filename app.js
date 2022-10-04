const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navList');
    const navLink = document.querySelectorAll('.navList li');

    burger.addEventListener('click', () =>{
        nav.classList.toggle('nav-active');
    });

    navLink.forEach((link,index)=> {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s`;
    });
}

navSlide();