//script.js

var playing= false;
var score;
var trialsLeft;
var fruits=['apple','banana','mango','cherries','grapes','orange','peach','pear','watermelon'];
var step;
var action;

$(function(){
   
    $('#startreset').click(function(){
       if(playing==true)
           location.reload();
        else{
            //if we are not playing
            playing=true;//initiate the game
            
            score=0;//set the score to 0
            $('#scoreValue').html(score);
            
            //hide gameover box
            $('#gameover').hide();
            
            //add hearts
            $('#trialsLeft').show();
            trialsLeft=3;
            addHearts();
            
            
            //change the button text to reset game
            $('#startreset').html('Reset Game');
            
            //start sending the fruits
            startAction();
        }
    });//start reset click function ends here
    
});//on load function ends here

function addHearts(){
    $('#trialsLeft').empty();
    for(i=0;i<trialsLeft;i++)
        $('#trialsLeft').append('<img src="images/heart.png" class="life">');
}

//start sending fruits
function startAction(){
    $('#fruit1').show();
    chooseFruit();//choose a random fruit and display it
    
    $('#fruit1').css({
        'left': Math.round(Math.random() * 550),
        'top': -50,
    });
    //change the step randomly
    step = 1 + Math.round(Math.random() * 5);
    
    //Move fruit down by one step every 10ms
    action = setInterval(function(){
      //move the fruit by one step
      $('#fruit1').css('top',$('#fruit1').position().top + step);
      if($('#fruit1').position().top > $('#fruitsContainer').height())
      {
            if(trialsLeft > 1){
                
                $('#fruit1').show();
                chooseFruit();//choose a random fruit and display it

                $('#fruit1').css({
                    'left': Math.round(Math.random() * 550),
                    'top': -50,
                });
                //change the step randomly
                step = 1 + Math.round(Math.random() * 5);
    
                //reduce the no. of trials by 1
                trialsLeft--;
                
                //populate trialsLeft Hearts
                addHearts();
            }
            else{//game over
                playing = false;
                $('#trialsLeft').hide();
                $('#startreset').html("Start Game");
                $('#gameover').show();
                $('#gameover').html('<p>Game Over!</p><p>Your score is ' +score + '</p>');
                
                stopAction();
            }
      }
    },10);
}


//slice a fruit

$('#fruit1').mouseover(function(){
    score++;
    $('#scoreValue').html(score);
    clearInterval(action);
    
    $('#fruit1').hide("explode",500);
    var myAudio = document.createElement('audio');
            myAudio.controls = true;
            myAudio.src = 'audio/slicefruit.mp3';
            myAudio.play();

    setTimeout(startAction,500);
});

function stopAction(){
    clearInterval(action);
    $('#fruit1').hide();
}
function chooseFruit(){
    $('#fruit1').attr("src","images/"+fruits[Math.round(8*Math.random())]+".png");
}