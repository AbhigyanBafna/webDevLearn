const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navList');
    const navLink = document.querySelectorAll('.navList li');

    burger.addEventListener('click', () =>{
        //Nav Toggle
        nav.classList.toggle('nav-active');

        //Animation Nav
        navLink.forEach((link,index)=> {
            if(link.style.animation){
                link.style.animation = ''
            }
            else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4}s`;
            }
        });

        //Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();