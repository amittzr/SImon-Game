// Array of the colours
var buttonColours = ["red", "blue", "green", "yellow"];

// empty array to track the pattern
var gamePattern = [];

//empty array to track User pattern
var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keydown(function(){
    if (started === false){
        nextSequence();
        $(".title").text("Level " + level);
        started = true;
    }
    
})


$(".start").click(function(){
    if (started === false){
        nextSequence();
        $(".title").text("Level " + level);
        started = true;
    }
    
})


$(".btn").click(function(){
    //get the id attribute from the clicked button
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);

})

// function to random the next swquence and push into the gamePattern Array
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    //random between 0-3
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    //push into the pattern Array
    gamePattern.push(randomChosenColour);



    //loop for all array 
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            // Animate the faded button
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);

            // Play the sound of the specific color
            playSound(gamePattern[i]);
        }, 700 * i); // Delay each step by 700ms multiplied by the index
    }
    

    // //animate the faded button
    // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // // play the sound of the specific color
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    // console.log($("#"+color));
    // $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("currect");
        if(currentLevel === gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
                
            },1000);
         }   
    }

    else {
        console.log("wrong");
        gameOver();
    }
}

function gameOver (){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}

