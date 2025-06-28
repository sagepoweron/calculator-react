export default Calculator;

import { useEffect, useState } from "react";

function Calculator()
{
    //let operator: any = null;
    const [answer, setAnswer] = useState("0");
    const [operatorText, setOperatorText] = useState("-");
    const [operator, setOperator] = useState<any>(null);
    //const answer = useState("");


    /*useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("click", onClick);
        };
    }, []);*/


    function onToggleClicked()
    {
        if (answer === "0") return;

        if (answer.startsWith('-'))
        {
            setAnswer(answer.substring(1));
        }
        else
        {
            setAnswer("-" + answer);
        }
    }

    function onNumberClicked(text : string)
    {
        if (text === ".")
        {
            if (answer.includes(".")) return;
            
            setAnswer(answer + text);
        }
        else
        {
            if (answer === "0")
            {
                setAnswer(text);
            }
            else
            {
                setAnswer(answer + text);
            }
        }
    }

    function onAddClicked()
    {
        let a = calculate();
        setOperator(() => (b: number) => a + b);
        setOperatorText(a + " +");
        setAnswer("0");
    }
    function onSubtractClicked()
    {
        let a = calculate();
        setOperator(() => (b: number) => a - b);
        setOperatorText(a + " -");
        setAnswer("0");
    }
    function onMultiplyClicked()
    {
        let a = calculate();
        setOperator(() => (b: number) => a * b);
        setOperatorText(a + " *");
        setAnswer("0");
    }
    function onDivideClicked()
    {
        let a = calculate();
        setOperator(() => (b: number) => a / b);
        setOperatorText(a + " /");
        setAnswer("0");
    }
    function onSqrtClicked()
    {
        let a = calculate();
        setAnswer(Math.sqrt(a).toString());
        setOperator(null);
        setOperatorText("-");
    }
    function onSquareClicked()
    {
        let a = calculate();
        setAnswer((a * a).toString())
        setOperator(null);
        setOperatorText("-");
    }

    /*function validNumber(number: number)
    {
        return Number(number.toFixed(5)).toString();
    }

    function validate(text: string)
    {
        if (text === null) return "0";
        if (text === "") return "0";
        if (text.length > 16) return "out of range";

        const numbers = text.split(".");
        if (numbers.length > 1)
        {
            numbers[1] = numbers[1].substring(0, 5);
        }

        return numbers.join(".");
    }*/

    function backspace()
    {
        setAnswer(answer.length > 1 ? answer.slice(0, -1) : "0");
    }

    function clear()
    {
        setAnswer("0");
        setOperator(null);
        setOperatorText("-");
    }
    function calculate()
    {
        if (operator === null)
        {
            return Number(answer);
        }
        else
        {
            return operator(Number(answer));
        }
        //return operator === null ? Number(answer) : Number(operator(Number(answer).toFixed(5)));
    }

    function onEqualsClicked()
    {
        let b = calculate();
        setAnswer(b.toString());
        setOperator(null);
        setOperatorText("-");

        //answerText.innerText = operator(b);
        //fixes adding 0.03 to a number
    }


    /*const onKeyDown = (event: any) =>
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
                onNumberClicked(event.key);
                break;
            case "Enter":
            case "=":
                calculate();
                break;
            default:
                break;
        };
    };*/

    /*const onClick = (event: any) =>
    {
        if (event.target instanceof HTMLElement === false)
        {
            return;
        }

        validate();

        if (event.target.id === "equals") calculate();
        if (event.target.id === "clear") clear();
        if (event.target.id === "backspace") backspace();
        //if (event.target.id === "sign") toggleSign();
        if (event.target.id === "add") add();
        if (event.target.id === "subtract") subtract();
        if (event.target.id === "multiply") multiply();
        if (event.target.id === "divide") divide();
        if (event.target.id === "sqrt") squareroot();
        if (event.target.id === "square") square();
        if (event.target.matches(".number")) onNumberClicked(event.target.innerText);

        validate();
    };*/


    return (
    <div className="column">
        <div className="calculator">
            <div id="operator">{operatorText}</div>
            <div id="answer">{answer}</div>
            

            <div className="row">
                <button onClick={clear}>Clear</button>
                <button onClick={backspace}>&#9003;</button>
                    
            </div>
            <div className="row">
                <div className="grid">
                    <button onClick={onSqrtClicked}>&radic;x</button>
                    <button onClick={onSquareClicked}>x<sup>2</sup></button>
                    <span></span>

                    <button className="number" onClick={() => onNumberClicked("7")}>7</button>
                    <button className="number" onClick={() => onNumberClicked("8")}>8</button>
                    <button className="number" onClick={() => onNumberClicked("9")}>9</button>
                    
                    <button className="number" onClick={() => onNumberClicked("4")}>4</button>
                    <button className="number" onClick={() => onNumberClicked("5")}>5</button>
                    <button className="number" onClick={() => onNumberClicked("6")}>6</button>

                    <button className="number" onClick={() => onNumberClicked("1")}>1</button>
                    <button className="number" onClick={() => onNumberClicked("2")}>2</button>
                    <button className="number" onClick={() => onNumberClicked("3")}>3</button>
                    
                    <button onClick={onToggleClicked}>+/-</button>
                    <button className="number" onClick={() => onNumberClicked("0")}>0</button>
                    <button className="number" onClick={() => onNumberClicked(".")}>.</button>
                </div>
                <div className="column">
                    <button onClick={onDivideClicked}>/</button>
                    <button onClick={onMultiplyClicked}>*</button>
                    <button onClick={onAddClicked}>+</button>
                    <button onClick={onSubtractClicked}>-</button>
                    <button onClick={onEqualsClicked}>=</button>
                </div>
            </div>
        </div>
    </div>
    )
    
}


