$(document).ready(function(){
  var currentQuestion;
  var timeLeft = 10;
  var score = 0;
  var interval;
  var rangeValue = 10;
  var selectedQuestionType = 'add';

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(rangeValue);
    var num2 = randomNumberGenerator(rangeValue);

    switch (selectedQuestionType) {
      case 'add':
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
        break;
      case 'minus':
        if (num1 > num2) {
          question.answer = num1 - num2;
          question.equation = String(num1) + " - " + String(num2);
        } else {
          question.answer = num2 - num1;
          question.equation = String(num2) + " - " + String(num1);
        }
        break;
      case 'multiply':
        question.answer = num1 * num2;
        question.equation = String(num1) + " * " + String(num2);
        break;
      case 'divide':
        var num3 = num1 * num2;
        question.answer = num1;
        question.equation = String(num3) + " / " + String(num2);
        break;
    }

    return question;
  }

  $('button.qType').on('click', function () {
    var newType = $(this).attr('name');
    selectedQuestionType = newType;
    $('#questionType').text(newType);
  })

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  var checkAnswer = function (userInput, answer){
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScre(+1);

    }
  }

  var updateScre = function(amount){
    score += amount;
    $('#score').text(score);
  };

  $('#user-input').on('keyup', function(){
    checkAnswer(Number($(this).val()),currentQuestion.answer);
  });

  renderNewQuestion();

  var startGame = function(){
    if(!interval){
      interval = setInterval(function(){
        updateTimeLeft(-1);
        UpdateScre(-1);
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

  $('#inputRange').on('change', function() {
    var control = $(this),
        // controlMin = control.attr('min'),
        // controlMax = control.attr('max'),
        controlVal = control.val(),
        // controlThumbWidth = control.data('thumbwidth');

    rangeValue = controlVal;

    // var range = controlMax - controlMin;

    // var position = ((controlVal-controlMin)/range)*100;
    // var positionOffset = Math.round(controlThumbWidth*position/100)-(controlThumbWidth/2);
    var output = $('#rangeVal');
    output.text(controlVal);
  });




});
