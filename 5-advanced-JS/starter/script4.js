// function interviewQuestion(job) {
//   if (job === "designer") {
//       return function(name){
//           console.log(name+ ', can you please explain what UX design is ?');
//       }
//   } else if (job === "teacher") {
//     return function(name){
//         console.log(' What subject do you teach ? '+name);
//     }
//   }else{
//         return function (name){
//             console.log('Hello, '+name+' what do you do ?');
//         }
//   }
// }

// var teacherQuestion= interviewQuestion('teacher');
// teacherQuestion('Smile');
// interviewQuestion('Dentist')('Kiran');
// // IIFE

// function game(){
//  var score=Math.random()*10;
// console.log(score>=5);
// }

// ( function(){
//     var score=Math.random()*10;
//     console.log(score>=5);
// })();

//--------------------------------------------------
// Closure

// function retirement(retirementAge){
//     var a=' years left until retirement.';
//     return function (yearOfBirth) {
//         var age=2019-yearOfBirth;
//         console.log((retirementAge-age)+a);
//     }
// }
// var retirementUS= retirement(66);
// retirementUS(1990);

// retirement(66)(1990);
//----------------------------
// bind call and apply

// var John = {
//   name: "john",
//   age: 26,
//   job: "teacher",
//   presentation: function(style, timeOfDay) {
//     if (style === "formal") {
//       console.log(
//         " Good " +
//           timeOfDay +
//           " Ladies and Gentlemen! " +
//           "I'm " +
//           this.name +
//           ", I'm a " +
//           this.job +
//           " and I'm " +
//           this.age +
//           " years old."
//       );
//     } else if (style === "freindly") {
//       console.log(
//         " Hey! What's up ? Good " +
//           timeOfDay +
//           " I'm " +
//           this.name +
//           ", I'm a " +
//           this.job +
//           " and I'm " +
//           this.age +
//           " years old."
//       );
//     }
//   }
// };

// var Emily = {
//   name: "Emily",
//   age: 30,
//   job: "Designer"
// };

// John.presentation('formal','morning');
// //he call method allows us
// // to set the this variable here in the first argument,
// // and we set it to "emily" because we wanted
// // to use John's presentation method,
// // but setting the this variable to "emily,"
// // so that we could use John's method on Emily, right?
// // So that is the call method.
// John.presentation.call(Emily,'formal','morning');


// // apply methods accept the arguments as an array 
// // John.presentation.apply(emily,['freindly','morning']);

//  var johnFreindly= John.presentation.bind(John,'freindly');
//  // johnFreindly is based on John presentation with preset argument that is Freindly
//  johnFreindly('morning');
//  johnFreindly('Afternoon');
//  var emilyFormal= John.presentation.bind(Emily,'formal');
//  emilyFormal('morning');