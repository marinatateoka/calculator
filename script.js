//create calculator class - to store the input information
// constructor - will take the previous and current text current text element
// constructor - where to place the display for the calculator

class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    //clear everything
    // these are the variables the calculator can hold
    this.currentOperand = " "
    this.previousOperand = " "
    this.operation = undefined
  }

  delete() {
    //delete one number at time
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    //click in a number and add to the screan
    //take the number the user selected (number)
    //the if will check if you alrady have "." and if yes, wont allow you yo add
    //more
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()

  }

  chosseOperation (operation){
    // take the opeation the user selected (operation)
    //when you select an operation button,  the current display, will be now in
    //the  position of the previous Display
    if (this.currentOperand === " ") return
    if (this.previousOperand !== " "){
      this.compute ()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = " " //clearing the current display

  }

  compute () {
    // it is going to take a value inside our calculator and compute
    //a single value for what we need to display
    //create a variable to be the result - computation
    //transform the strings in numbers
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    //if the user clicks on operation or equal first, we dont want anything to happen
    //if is NaN = if is not a number

    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case "+":
        computation = prev + current
        break;
      case "-":
        computation = prev + current
        break;
      case "x":
        computation = prev * current
        break;
      case "/":
        computation = prev / current
        break;
      case "%":
        computation = prev * 0.01
        break;
      default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = " "
  }

  updateDisplay () {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const opeationButtons = document.querySelectorAll("[data-operation]")
const equalsButtons = document.querySelector("[data-equals]")
const deleteButtons = document.querySelector("[data-delete]")
const allClearButtons = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")


//creating a calculator object

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

//when selecting a number on the calculator - forEach to look all the numbers

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

opeationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chosseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButtons.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButtons.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButtons.addEventListener("click", button => {
  calculator.delete()
  calculator.updateDisplay()
})
