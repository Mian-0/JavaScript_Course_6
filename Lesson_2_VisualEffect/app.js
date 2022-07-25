function scrollAppear(){
    var introText = document.querySelector('.intro-text');
    var introPosition = introText.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.3;

    if(introPosition < screenPosition){
        introText.classList.add('intro-appear');
        console.log("hello")
    }
}

window.addEventListener('scroll',scrollAppear);