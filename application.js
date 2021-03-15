$(document).ready(function(){
  var currentQuestion;
  var timeLeft = 10;
  var score = 0;
  var interval;
  var rangeValue;

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(rangeValue);
    var num2 = randomNumberGenerator(rangeValue);

    $(".plus").click(function(){
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
    });

    $(".minus").click(function(){
      question.answer = num1 - num2;
      question.equation = String(num1) + " - " + String(num2);
    });

    $(".multiply").click(function(){
      question.answer = num1 * num2;
      question.equation = String(num1) + " * " + String(num2);
    });

    $(".divide").click(function(){
      question.answer = num1 / num2;
      question.equation = String(num1) + " / " + String(num2);
    });



    return question;
  }

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

    var checkAnswer = function (userInput, answer){
      if(userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);

      }
    }

    var updateScre = function(amount){
      score += amount;
      document.getElementById("score").innerHTML = score;
    };

    $('#user-input').on('keyup', function(){
      checkAnswer(Number($(this).val()),currentQuestion.answer);
    });

    renderNewQuestion();



    var startGame = function(){
      if(!interval){
        interval = setInterval(function(){
          updateTimeLeft(-1);
          if (timeLeft === 0){
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000);
      }
    }

    $('#user-input').on('keyup', function(){
      startGame();
      checkAnswer(Number($(this).val()),
    currentQuestion.answer);
  });


    var updateTimeLeft = function(amount){
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    }

    $('input[type="range"]').on('input',()=> {
      var control = $(this),
          controlMin = control.attr('min'),
          controlMax = control.attr('max'),
          controlVal = control.val(),
          controlThumbWidth = control.data('thumbwidth');

      var range = controlMax - controlMin

      var position = ((controlVal-controlMin)/range)*100;
      var positionOffset = Math.round(controlThumbWidth*position/100)-(controlThumbWidth/2);
      var output = control.next('output');
      output.css('left', 'calc(' + position + '% - ' + positionOffset + 'px)').text(controlVal);
    });




});
