$('body').removeClass('game-over');
var userClickedPattern = [];
var gamePattern =[];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var started = false;
var level = 0;
var row = 0;
var column = 0;
var name = []
var gamestart = new Audio ('game-start.wav');
var gameover = new Audio ('game-over.wav');
    
$(document).keydown(function(){
    if (!started){
        var names = prompt('What\'s your name?');
        gamestart.play();
        $('h1').text('It\'s about to begin.');
        $('body').removeClass('game-over');
        $('table').removeClass('hidden');
        $('.gameover-img').attr('src','ytyt');
        $('.score').removeClass('hidden');
        alert('Ok, ' + names + ", it's time to roll. Don\'t flip it aight?")
        setTimeout(function(){
            gamePattern = [];
            nextSequence();
        }, 1500);
        started = true;
        $('body').removeClass('game-over');
        $('table').removeClass('hidden');
        $('.gameover-img').attr('src','ytyt');
        name.push(names);
    }
});


$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  checkanswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text('Level ' + level);
 var randomNumber = Math.floor(Math.random()* 4);
 var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 animatePress(randomChosenColour);
}

function playSound (name) {
    var audio = new Audio ('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress (currentColour) {
    var activeButton = $('#' + currentColour);
    activeButton.addClass('pressed');
    setTimeout(function (){
        activeButton.removeClass('pressed');
    }, 100);
}

function checkanswer (currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
           
           setTimeout(function(){
            if (column > 4) {

                column = 0;
                row++;
                if (column == 0 && row == 1) {
                    alert("Ok, seems like we're getting something, keep going.")
                }
                if (column == 0 && row == 2){
                    alert("Ok now we're talking.")
                }
                if (row == 4 && column == 4) {
                    $('td').css('background-color', 'red');
                }
                else{

                }
            }
            $('.ranking tr:eq(' + row + ') td:eq('+ column +')').css('background-color', 'green');
            column++;

            $('.trophy').addClass('trophy-animate');
            setTimeout(function(){
                $('.trophy').removeClass('trophy-animate');
            }, 500);
            $('.trophy').addClass('trophy-animate');
            setTimeout(function(){
                $('.trophy').removeClass('trophy-animate');
            }, 500);
           
            nextSequence ();
           }, 1000); 
           levelStage ++;
          

         
        }
    } else {

        $('h1').text('Game Over. Press any key to restart.');
        $('body').addClass('game-over');
        $('table').addClass('hidden');
        $('.gameover-img').attr('src', 'game-over.png')
        $('.score').addClass('hidden');
        gameover.play ();
        started = false;
        level = 0;
        $('td').css('background-color', 'grey');
        row = 0;
        column = 0;
    }
}
