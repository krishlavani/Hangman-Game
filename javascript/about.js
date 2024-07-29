// Krish Lavani - 8998302

"use strict";


// execute this DOM when page is fully loaded
document.addEventListener("DOMContentLoaded",() => {
    // get ID of image element
    const imageEle = document.getElementById("swapimage");
    // array of differnt path of images 
    const images = [
        "./images/step0.png", 
        "./images/step1.png", 
        "./images/step2.png",
        "./images/step3.png", 
        "./images/step4.png", 
        "./images/step5.png", 
        "./images/step6.png"
    ];
    // index set 0 to load 1st image from array
    let index = 0;
    
    // function that swap images
    function swapImage(){
        // increment in index
        index++;
        // update src of image to new one
        imageEle.src = images[index];
        // when index reach 6, this will again set to -1 for looping animation
        if(index==6){
            index=-1;
        }
    }
    
    // after every 1 sec swapImage function called
    setInterval(swapImage, 1000);
});
