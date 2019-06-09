let questionNumber = 0;
let score = 0;

function generateQuestion(){
    if(questionNumber < Store.length){
        return `<h2>${Store[questionNumber].Prompt}</h2>
        <form class = "container">
        <fieldset>
        <label class = "answerChoice">
        <input type="radio" value="${Store[questionNumber].answer[0]}" name="answer" required>
        <span> ${Store[questionNumber].answer[0]}</span>
        </label>
        <label class="answerChoice">
        <input type="radio" value="${Store[questionNumber].answer[1]}" name="answer" required>
        <span>${Store[questionNumber].answer[1]}</span>
        </label>
        <label class="answerChoice">
        <input type="radio" value="${Store[questionNumber].answer[2]}" name="answer" required>
        <span>${Store[questionNumber].answer[2]}</span>
        </label>
        <label class="answerChoice">
        <input type="radio" value="${Store[questionNumber].answer[3]}" name="answer" required>
        <span>${Store[questionNumber].answer[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        `;
    }

    else {
        showResults();
        restartQuiz();
        // TODO: don't hard code
        $('.questionNumber').text(Store.length);
    }
}

function renderQuestion(){
    $('.questionAnswerForm').html(generateQuestion());
    userSelectAnswer();
}

function startQuiz(){
    $('.quizApp').on('click','.startTest',function (event){
        $('.quizApp').remove();
        $('.questionAnswerForm').css('display','block');
        $('.questionNumber').text(1);
        renderQuestion();  
    });
    displayNextQuestions();
}
//Below is all realted to user data, alowing the user to go through each each. This section accomplishes the user selection, update score if 
//answer is correct, and also display the messages for wrong answer or right answers.
/************************************************************************************************************************************* */

function changeQuestion(){
    questionNumber++;
    $(".questionNumber").text(questionNumber+1);
}

function userSelectAnswer(){
    $('form').on('submit', function (event){
        event.preventDefault();
        let choiceSelected = $("input:checked");
        let answerChoice = choiceSelected.val();
        let correctAnswerIndex = Store[questionNumber].correctAnswer;
        let correctAnswer = Store[questionNumber].answer[correctAnswerIndex];
        
        if (answerChoice === correctAnswer){
            
            choiceSelected.parent().addClass('correct');
            answerCorrect();
            reloadScore();
            
        }
        else{
            choiceSelected.parent().addClass('wrong');
            answerWrong(correctAnswer);
        }
    });
}
function answerCorrect(){
    answerFeedbackCorrect();
}
function answerWrong(correctAnswer){
    answerFeedbackInCorrect(correctAnswer);
}
function answerFeedbackCorrect(){
    let correctAnswer = `${Store[questionNumber].correctAnswer}`;
    $(".questionAnswerForm").html(`<div class = "correctFeedback"><p><b>Your answer is correct!</b>
    </p><button type = button class ="nextButton">Next</button></div>`);

}
function answerFeedbackInCorrect(correctAnswer){
    $(".questionAnswerForm").html(`<div class = "incorrectFeedback"><p class = "incorrectParagraph"><b>Your answer is incorrect, the right option was</b> <span>${correctAnswer}
    </span></p><button type = button class ="nextButton">Next</button></div>`);
}
function displayNextQuestions(){
    $('main').on('click','.nextButton',function (event){
        changeQuestion();
        renderQuestion();
    });
}
/************************************************************************************************************************************* */

//This sections is code for when the user finsihes the test. THe functions we have that are nesscessary are reload score, show results,
// and a option to restart the quiz.
/************************************************************************************************************************************* */
function changeScore(){
    score ++;
}
function reloadScore(){
    changeScore();
    $('.score').text(score);
}
function showResults(){
    if(score > 4){
        $('.questionAnswerForm').html(`<div class = "passedTest"><h3> You pass the test you are a True Car Enthusiast!!!</h3> 
        <img src = "https://www.picclickimg.com/d/l400/pict/272790505231_/DRIVING-TEST-CARD-Congratulations-Funny-Pass-Exam-For.jpg" alt="passIcon"/><p>Your total score was ${score}/7</p><p> For and even greater challenge play against your 
        friends to see is Car knowledge Master</p><button class = "restartButton"> Play Again</button></div>`);
    }
    else {
        $('.questionAnswerForm').html(`<div class = "failedTest"><h3> You failed, but try again to improve your score. </h3> 
        <img src = "https://i.ytimg.com/vi/KKXCJ1qp_Hs/hqdefault.jpg" alt="passIcon"/><p class = "failedScore">Your total score was ${score}/7</p><button class = "restartButton"> Play Again</button>
        </div>`);
    }
}
function restartQuiz(){
    $('main').on('click','.restartButton', function(event){
        location.reload();
    });
}
/*************************************************************************************************************************************** */

//Below is the startup of our jQuery, the code below is designed to launch all the functions we just created. What is below envokes all 
//the previous function we created. This essentially make out web page to be more interactive. 
/*************************************************************************************************************************************** */
function createQuiz(){
    startQuiz();
}

$(createQuiz);