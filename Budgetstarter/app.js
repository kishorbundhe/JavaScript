//TODO: add  an event handler
//TODO: get an Input values 
//TODO: add new item to datastructure
//TODO: Add the new item to UI , calculate the budget and update UI
// Module Pattern
let budgetController = (function () {
    // new scope 
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome * 100)
        } else {
            this.percentage = -1;
        }
    }
    Expense.prototype.funpercentage = function () {
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Data structure for income and expense 
    var Data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1

    };

    var CalculateTotal = function (type) {
        var sum = 0;
        Data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        Data.totals[type] = sum;
    };
    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            //[1 3 4 6 8] ID are not ordered since we also perform the delete operation

            if (Data.allItems[type].length > 0) {
                ID = Data.allItems[type][Data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create the new item based in 'inc' or 'exp' type
            if (type === "inc") {
                newItem = new Income(ID, des, val)
            } else if (type === "exp") {
                newItem = new Expense(ID, des, val);
            }
            // push it to the data structures
            Data.allItems[type].push(newItem);
            // return the new element 
            return newItem;
        },
        testing: function () {
            console.log(Data);
        },
        calculateBudget: function () {
            // calculate the  total income and expenses 
            CalculateTotal("exp");
            CalculateTotal("inc");
            // calculate the budget: income- expenses
            Data.budget = Data.totals.inc - Data.totals.exp;
            // claculate the percentage of income spent 
            if (Data.totals.inc > 0) {
                Data.percentage = Math.round(Data.totals.exp / Data.totals.inc * 100);
            }
        },
        getBudget: function () {
            return {
                budget: Data.budget,
                totalInc: Data.totals.inc,
                totalExp: Data.totals.exp,
                percentage: Data.percentage
            }
        },
        calculatePercentages: function () {
            Data.allItems.exp.forEach(function (current) {
                current.calPercentage(Data.totals.inc);
            });

        },
        getPercentages: function () {
            var allPercentage = Data.allItems["exp"].map(function (current) {
                return current.funpercentage();
            });
            return allPercentage;
        },
        deleteItem: function (type, id) {
            var ids, index;
            //ids=[1 3 4 6 8]
            // if we want to delete the item with ID=4 we need the index = 2 right
            var ids = Data.allItems[type].map(function (current) {
                //console.log(current.id);
                return current.id;
            });
            //console.log(ids)
            index = ids.indexOf(id);

            if (index !== -1) {
                // splice method is used to delete the item 

                Data.allItems[type].splice(index, 1);
            }
        }
    }

})();


//=------------------------------------------------------------------------------------------------------
let UIController = (
    function () {

        var DOMstringsClassess = {
            inputType: ".add__type",
            inputDescription: ".add__description",
            inputValue: ".add__value",
            inputAddBtn: ".add__btn",
            expenseContainer: ".expenses__list",
            incomeContainer: ".income__list",
            budgetLabel: ".budget__value",
            incomeLabel: ".budget__income--value",
            expenseLabel: ".budget__expenses--value",
            budgetPercentageLabel: ".budget__expenses--percentage",
            container: ".container",
            itemPercentage: ".item__percentage"
        }

        var formatNumber=function(number,type){
            /*
            + or - before the number
            exactly 2 decimal points 
            comma seperated the thousands 2310.4567->2,310.46
             */
            var numSplit,int,dec,sign;
            number=Math.abs(number);
            number=number.toFixed(2);
            numSplit=number.split(".");
            int= numSplit[0];
            if(int.length>3)   {
                int=int.substr(0,int.length-3)+","+int.substr(int.length-3,3);
            }
            
            dec=numSplit[1];
           
            return (type==="exp"?sign='-':sign='+')+" "+int+"."+dec;
        }

        return {
            getInput: function () {
                return {
                    type: document.querySelector(DOMstringsClassess.inputType).value,// will be either inc or exp
                    description: document.querySelector(DOMstringsClassess.inputDescription).value,
                    value: parseFloat(document.querySelector(DOMstringsClassess.inputValue).value)
                };

            },
            addListItem: function (obj, type) {
                //create HTML string with placeholder text 
                var html, element, newHtml;

                if (type === "inc") {
                    element = document.querySelector(DOMstringsClassess.incomeContainer);
                    html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                } else if (type === "exp") {
                    element = document.querySelector(DOMstringsClassess.expenseContainer);
                    html = ' <div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                }

                // Replace the Placeholder text with some actual data
                newHtml = html.replace("%id%", obj.id);
                newHtml = newHtml.replace("%description%", obj.description);
                newHtml = newHtml.replace("%value%", formatNumber(obj.value,type));
                // Insert the HTMl into the  DOM 
                element.insertAdjacentHTML("beforeend", newHtml);

            },
            getDOMStrings: function () {
                return DOMstringsClassess;
            },
            clearFields: function () {
                var fields;
                fields = document.querySelectorAll(DOMstringsClassess.inputDescription + ',' + DOMstringsClassess.inputValue);
                // querySelectorAll returns the list not the array and since the array has built in methods 
                // so we convert to array
                // We use slice method takes input as array and return the copy of the array So, fields.slice() 
                //will not work because again, it's not an array and hence we trick it

                var fieldsArray = Array.prototype.slice.call(fields);
                // using for loop we can clear , this call back function applies to all the elements of the array
                fieldsArray.forEach(function (current, index, array) {
                    current.value = "";
                });
                fieldsArray[0].focus();

            },
            displayBudget: function (obj) {
                document.querySelector(DOMstringsClassess.budgetLabel).textContent = obj.budget;
                document.querySelector(DOMstringsClassess.incomeLabel).textContent = obj.totalInc;
                document.querySelector(DOMstringsClassess.expenseLabel).textContent = obj.totalExp;
                if (obj.percentage > 0) {
                    document.querySelector(DOMstringsClassess.budgetPercentageLabel).textContent = obj.percentage + '%';
                } else {
                    document.querySelector(DOMstringsClassess.budgetPercentageLabel).textContent = '---';
                }
            },
            deleteListItem: function (selectorID) {
                var element;
                element = document.getElementById(selectorID);
                element.parentNode.removeChild(element);
            },
           
            displayPercentage: function (percentages) {
                percentageList = document.querySelectorAll(DOMstringsClassess.itemPercentage);
                // it returns the nodelist of html and doesnt have foreach method
                // console.log(percentageList);
                //  creating a method

                nodeListForeach = function (list, callback) {
                    var length = list.length;
                    for (var i = 0; i < length; i++) {
                        callback(list[i], i);
                    }
                }
                nodeListForeach(percentageList, function (current, index) {
                    if (percentages[index] > 0) {
                        current.textContent = percentages[index] + '%';
                    } else {
                        current.textContent = "---";
                    }
                });

            }

        };
    }
)();
//---------------------------------------------------------------------------------------------------------------
let controller = (
    function (budgetCtrl, UICtrl) {
        /**
*So I could of course simply have used the
original controllers name inside of the add controller. Or I could have even not passed anything into the
module and simply have used the other controls in here in our function because of course we have
access to them because they are in the outer scope. Right, so I could simply use the, let's say the
budgetController, like this, in here. But that is not a good practice because this would make the
controller a little bit less independent. Because imagine that we would change the name of the module
then we would have to do this all over our code. We would have to change the name everywhere in here, right?
         */
        let setupEventListener = function () {
            let DOMstring = UICtrl.getDOMStrings();
            document.querySelector(DOMstring.inputAddBtn).addEventListener("click", ctrlAddItem);

            document.addEventListener("keypress", function (event) {
                // we are adding it to the document not any particular element 
                // keypress occurs when we press ANY key but we want the function to execute only when return or enter key is pressed
                if (event.keyCode === 13 || event.which === 13) {
                    ctrlAddItem();
                }
            });
            document.querySelector(DOMstring.container).addEventListener("click", ctrlDeleteItem);
            //So when we click on the button,
            /* we actually click on this i element.
            Now when we hit the button, it is not just a button that we want to delete, right,
            so we actually want to delete all of this here, right, because all of this is the item on the user interface,
            and each of these items is identified by their unique ID name, which is this one here,
            so actually we are not interested just in this element here, which is the target one, but we're actually interested
            in this element here, so in this parent element. So again, this element here that we click
            is not actually the one that we're interested in, but it's this parent element, so this entire div element
            that we're actually interested in, and that we wanna have access to.
            So we need to move up in the DOM from here, and that is something called DOM traversing.
             */
        }


        var updateBudget = function () {
            // 1 Calculate the budget
            budgetCtrl.calculateBudget();
            // 2. Return the budget 
            var budget = budgetCtrl.getBudget();

            // 3. Display the budget on the UI 
            UICtrl.displayBudget(budget);
        }

        var updatePercentages = function () {
            //1. calculate the percentages
            budgetCtrl.calculatePercentages();
            //2. Rread the percentages from budget controller
            var expPercentages = budgetCtrl.getPercentages();
            //3. Display in the UI with new percentages
            UICtrl.displayPercentage(expPercentages);

        }
        let ctrlAddItem = function () {

            //1. Get the Input data
            var input = UICtrl.getInput();

            // console.log(input);
            // if the input contains falsy value then it wont work
            if (input.description && input.value) {
                //2. add the item to the budget controller
                var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                //3. Add the item to the UI 
                UICtrl.addListItem(newItem, input.type);
                // 4 .clear the fields 
                UICtrl.clearFields();
                // 5 . claculate the budget and update the UI
                updateBudget();
                // 6. call and update the percentages
                updatePercentages();
            }

        }

        var ctrlDeleteItem = function (event) {
            var itemID, splitID, type, ID;


            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
            //console.log(itemID);
            if (itemID) {
                splitID = itemID.split('-');
                type = splitID[0];
                ID = parseInt(splitID[1]);
                //1. delete the item from data structure 
                budgetCtrl.deleteItem(type, ID);
                //2. delete the item from the UI 
                UICtrl.deleteListItem(itemID);
                //3. Update and show the new budget
                updateBudget();
                //4. call and update the percentages
                updatePercentages();

            }


        }

        return {
            init: function () {
                console.log(" Everything Works");
                setupEventListener();
                UICtrl.displayBudget({

                    budget: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1

                })
            }
        }
    }
)(budgetController, UIController);

controller.init();