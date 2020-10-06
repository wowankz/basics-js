const calc = {
    _actions: ["C", "back", "="],
    _operations: ["+", "-", "*", "/"],
    _keyboard: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+/-", "0", "."],
    _currentInput: null,
    _historyInput: null,
    _result: null,
    _history: null,
    _operand: null,
    _prevOperand: null,
    _currentOperator: null,

    init() {
        this._render("actions", this._actions);
        this._render("operators", this._operations);
        this._render("keyboard", this._keyboard);
        this._addEvent();
        this._currentInput = document.querySelector(`input[name = "current"]`);
        this._historyInput = document.querySelector(`input[name = "history"]`);
        this._result = 0;
        this._history = '';
        this._operand = '';
        this._prevOperand = '';
        this._currentOperator = '';
        this._renderInput();

    },

    _render(container, items) {
        let str = '';
        let cont = document.querySelector(`#${container}`);
        items.forEach(item => {
            str += `<button name="${container}" data-value="${item}"><span>${item}</span></button>`;
        });
        cont.innerHTML = str;
    },

    _renderInput() {
        this._currentInput.value = this._operand || this._result;
        this._historyInput.value = this._history;
    },

    _addEvent() {
        let buttons = document.querySelectorAll(" button");
        buttons.forEach(button => {
            button.addEventListener("click", this._handlerEvent.bind(this), true);
        })
    },

    _handlerEvent(event) {
        switch (event.currentTarget.name) {
            case "actions":
                this._action(event.currentTarget.dataset.value);
                break;

            case "operators":
                this._operator(event.currentTarget.dataset.value);
                break;

            case "keyboard":
                this._input(event.currentTarget.dataset.value);
                break;
            default:
                console.log("unknown action");
        }
    },

    _action(act) {
        console.log(act);
    },
    _operator(opr) {
        if (!this._operand) return;
        switch (opr) {
            case "+":
                this._currentOperator = opr;
                this._result = this._prevOperand ? this._operand : (+this._result) + (+this._operand);
                this._history += this._operand + opr;
                this._operand = '';
                this._renderInput();
                break;
            case "-":
                this._result = this._prevOperand ? this._operand : (+this._result) - (+this._operand);
                this._history += this._operand + opr;
                this._operand = '';
                this._renderInput();
                break;
        }
    },
    _input(inp) {
        this._operand = inp === '+/-' ? this._operand.includes('-') ? this._operand.slice(1) : '-' + this._operand : this._operand += inp;
        this._renderInput()
    }

}

calc.init()