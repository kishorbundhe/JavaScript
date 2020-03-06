// // Function constructor
// // var john = {
// //   name: "john",
// //   yearOfBirth: 1990,
// //   job: "teacher"
// // };

// /*
// So this is the way that we have been writing objects
// using the object literal, right?
// And now imagine that we wanted to create
// a lot of objects with different names and ages and jobs.
// we can use some kind of blueprint for this, right?
// So in JavaScript there are a couple of different
// ways to create objects.
// But probably the most popular way
// is using something called a function constructor.
// So the function constructor is a pattern
// for like writing a blueprint
// And we want this constructor to be called Person.
// So we create a function called Person. */

// var Person= function(name,yearOfBirth,job){
//     this.name=name;
//     this.yearOfBirth=yearOfBirth;
//     this.job=job;
    
// };
// var John= new Person('John',1990,'teacher');
// var Jane= new Person('John',1995,'Designer');
// var mark= new Person('John',1992,'retired');
// var Dad= new Person('John',1985,'Army');
// // creates a funcion object and callijng a function  creates this variable 

// Person.prototype.calculateAge= function(){
//     console.log(2019-this.yearOfBirth);
    
// }
// John.calculateAge();
// Jane.calculateAge();
// mark.calculateAge();
// Dad.calculateAge();