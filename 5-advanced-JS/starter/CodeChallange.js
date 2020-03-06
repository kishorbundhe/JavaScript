/////////////////////////////
// CODING CHALLENGE

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

(function() {
  var Question = function(question, options, correctOption) {
    this.question = question;
    this.options = options;
    this.correctOption = correctOption;
  };

  var Question0 = new Question(
    "JavaScript is ______ language.",
    ["a. Scripting", "b. Programming", "c. Both a and b", "d. Application ?"],
    "a"
  );
  var Question1 = new Question(
    "The behaviour of the document elements can be defined by ?",
    [
      "a. Using document object",
      "b. Registering appropriate event handlers",
      "c. Using element object",
      "d. All of the mentioned"
    ],
    "b"
  );
  var Question2 = new Question(
    "The service(s) that enables networking through scripted HTTP requests is ? ",
    [
      "a. XMLHttpResponse",
      "b. XMLRequest",
      "c. XMLHttpRequest",
      "d. All of the mentioned"
    ],
    "c"
  );
  var Question3 = new Question(
    "The HTML5 specification includes ?",
    [
      "a. Data storage",
      "b. Graphics APIs",
      "c. Other APIs for web apps",
      "d. All of the mentioned"
    ],
    "d"
  );
  var Question4 = new Question(
    "Which of the following are not advanced services ?",
    [
      "a. Data storage",
      "b. Networking",
      "c. XMLHttpRequest object",
      "d. None of the mentioned"
    ],
    "d"
  );
  var Question5 = new Question(
    "Client-side JavaScript code is embedded within HTML documents in ?",
    [
      "a. A URL that uses the special javascript:encoding",
      "b. A URL that uses the special javascript:stack",
      "c. A URL that uses the special javascript:protocol",
      "d. A URL that uses the special javascript:code"
    ],
    "c"
  );
  var Question6 = new Question(
    "What is the programming philosophy that argues that content and behaviour should as much as possible be kept separate?"[
      ("a. Unobtrusive JavaScript",
      "b. Obtrusive JavaScript",
      "c. Inherited JavaScript",
      "d. Modular JavaScript")
    ],
    "a"
  );
  var Question7 = new Question(
    "Which of the following communicates with server-side CGI scripts through HTML form submissions and can be written without the use of JavaScript?",
    [
      "a. Static Web Pages",
      "b. Interactive Web Pages",
      "c. Conditional Web Pages",
      "d. None of the mentioned"
    ],
    "b"
  );
  var Question8 = new Question(
    " How does JavaScript store dates in a date object?",
    [
      "a.  The number of milliseconds since January 1st, 1970",
      "b.   The number of days since January 1st, 1900",
      "c.  The number of seconds since Netscape's public stock offering.",
      "d.  None of the above"
    ],
    "a"
  );
  var Question9 = new Question(
    "What does the <noscript> tag do?",
    [
      "a.  Enclose text to be displayed by non-JavaScript browsers.",
      "b.   Prevents scripts on the page from executing.",
      "c.  Describes certain low-budget movies.",
      "d.  None of the above"
    ],
    "a"
  );

  var allQuestion = [
    Question0,
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    Question6,
    Question7,
    Question8,
    Question9
  ];

  // Creating selecting Random Question
  function score() {
    var sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }

  var keepScore = score();

  Question.prototype.checkAnswer = function(ans,callback) {
    var sc;
    if(ans===this.correctOption){
        console.log("Correct answer ! ");
        sc=callback(true);
    }else{
      console.log(" Wrong answer ,Try Next Question. ");
      sc=callback(false);
    }
  this.displayScore(sc);
  };

  Question.prototype.displayScore=function(score){
console.log(" Your current  score is "+score );
  }


  function nextQuestion() {
    var questionIndex = Math.floor(Math.random() * 10);
    var questionAsked = allQuestion[questionIndex];
    console.log(
      questionAsked.question +
        "\n" +
        questionAsked.options[0] +
        "\n" +
        questionAsked.options[1] +
        "\n" +
        questionAsked.options[2] +
        "\n" +
        questionAsked.options[3] +
        "\n"
    );
    let userAnswered = window.prompt(" Your answer please");
    console.log(userAnswered);
    if (userAnswered !== "exit") {
      questionAsked.checkAnswer(userAnswered,keepScore);
      nextQuestion();
    }
  }
  nextQuestion();
})();
