import { useEffect } from "react";

export default Calculator;




let answerText: any;
let operatorText: any;
let operator: any = null;

const addOperator = (a: number) => (b: number) => a + b;
const subtractOperator = (a: number) => (b: number) => a - b;
const multiplyOperator = (a: number) => (b: number) => a * b;
const divideOperator = (a: number) => (b: number) => a / b;
const squarerootOperator = (a: number) => Math.sqrt(a);
const squareOperator = (a: number) => a * a;

function Calculator()
{
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("click", onClick);
        answerText = document.getElementById("answer");
        operatorText = document.getElementById("operator");

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("click", onClick);
        };
    }, []);


    return(
    <div className="column">
        <div className="calculator">
            <div id="operator">-</div>
            <div id="answer">0</div>
            

            <div className="row">
                <button id="clear">Clear</button>
                <button id="backspace">&#9003;</button>
                    
            </div>
            <div className="row">
                <div className="grid">
                    <button id="sqrt">&radic;x</button>
                    <button id="square">x<sup>2</sup></button>
                    <span></span>

                    <button className="number">7</button>
                    <button className="number">8</button>
                    <button className="number">9</button>
                    
                    <button className="number">4</button>
                    <button className="number">5</button>
                    <button className="number">6</button>

                    <button className="number">1</button>
                    <button className="number">2</button>
                    <button className="number">3</button>
                    
                    <button id="sign">+/-</button>
                    <button className="number">0</button>
                    <button className="number">.</button>
                </div>
                <div className="column">
                    <button id="divide">/</button>
                    <button id="multiply">*</button>
                    <button id="add">+</button>
                    <button id="subtract">-</button>
                    <button id="equals">=</button>
                </div>
            </div>
        </div>
    </div>
    )
    
}


function add()
{
    if (operatorText === null || answerText === null) return;

    calculate();
    let a = Number(answerText.innerText);
    operator = addOperator(a);
    operatorText.innerText = a + " +";
    answerText.innerText = "0";
}
function subtract()
{
    if (operatorText === null || answerText === null) return;

    calculate();
    let a = Number(answerText.innerText);
    operator = subtractOperator(a);
    operatorText.innerText = a + " -";
    answerText.innerText = "0";
}
function multiply()
{
    if (operatorText === null || answerText === null) return;

    calculate();
    let a = Number(answerText.innerText);
    operator = multiplyOperator(a);
    operatorText.innerText = a + " *";
    answerText.innerText = "0";
}
function divide()
{
    if (operatorText === null || answerText === null) return;

    calculate();
    const a = Number(answerText.innerText);
    operator = divideOperator(a);
    operatorText.innerText = a + " /";
    answerText.innerText = "0";
}
function squareroot()
{
    calculate();
    operator = squarerootOperator;
    calculate();
}
function square()
{
    calculate();
    operator = squareOperator;
    calculate();
}



function appendText(text: string)
{
    if (answerText === null) return;

    if (text === ".")
    {
        if (answerText.innerText.includes(".")) return;
        
        answerText.innerText += text;
    }
    else
    {
        if (answerText.innerText === "0")
        {
            answerText.innerText = text;
        }
        else
        {
            answerText.innerText += text;
        }
    }
}

function validate()
{
    if (answerText === null) return;

    if (answerText.innerText === "")
    {
        answerText.innerText = "0";
    }

    /*if (Number(answerText.innerText) > 9999999999 || Number(answerText.innerText < -9999999999))
    {
        answerText.innerText = "out of range";
        return;
    }*/

    if (answerText.innerText.length > 16)
    {
        answerText.innerText = "out of range";
        return;
    }

    const numbers = answerText.innerText.split(".");
    if (numbers.length > 1)
    {
        numbers[1] = numbers[1].substring(0, 5);
    }
    answerText.innerText = numbers.join(".");
}

function backspace()
{
    if (answerText === null) return;
    answerText.innerText = answerText.innerText.slice(0, -1);
}

function clear()
{
    if (answerText === null || operatorText === null) return;
    answerText.innerText = "0";
    operator = null;
    operatorText.innerText = "-";
}
function calculate()
{
    if (answerText === null || operatorText === null) return;
    if (operator === null)
    {
        return;
    }

    let b = Number(answerText.innerText);
    
    //answerText.innerText = operator(b);
    answerText.innerText = Number(operator(b).toFixed(5)).toString();
    //fixes adding 0.03 to a number
    
    operator = null;
    operatorText.innerText = "-";
}

function toggleSign()
{
    if (answerText === null) return;
    if (answerText.innerText === "0")
    {
        return;
    }

    if (answerText.innerText.startsWith('-'))
    {
        answerText.innerText = answerText.innerText.substring(1);
    }
    else
    {
        answerText.innerText = "-" + answerText.innerText;
    }
}
/*function toggleSign2()//removes the decimal
{
    answerText.value = -Number(answerText.value);
    fixAnswer();
}*/



const onKeyDown = (event) =>
{
    switch (event.key)
    {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            appendText(event.key);
            break;
        case "Enter":
        case "=":
            calculate();
            break;
        default:
            break;
    };
};

const onClick = (event) =>
{
    if (event.target instanceof HTMLElement === false)
    {
        return;
    }

    validate();

    if (event.target.id === "equals") calculate();
    if (event.target.id === "clear") clear();
    if (event.target.id === "backspace") backspace();
    if (event.target.id === "sign") toggleSign();
    if (event.target.id === "add") add();
    if (event.target.id === "subtract") subtract();
    if (event.target.id === "multiply") multiply();
    if (event.target.id === "divide") divide();
    if (event.target.id === "sqrt") squareroot();
    if (event.target.id === "square") square();
    if (event.target.matches(".number")) appendText(event.target.innerText);

    validate();
};