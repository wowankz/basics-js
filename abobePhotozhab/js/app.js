const draw = {
    canvas: null,
    ctx: null,
    xCoord: null,
    yCoord: null,
    toolsPanel: null,
    nameTool: null,
    sizeInput: null,
    colorInput: null,
    instrument: null,
    color: '#000000',
    oldColor: '#000000',
    bgColor: '#ffffff',
    lineStart: null,
    lineEnd: null,

    
    init() {
        this.canvas = document.getElementById('canv');
        this.ctx = this.canvas.getContext('2d');
        this.xCoord = document.querySelector('#xCoord');
        this.yCoord = document.querySelector('#yCoord');
        this.toolsPanel = document.querySelector('#tools');
        this.nameTool = document.querySelector("#toolName");
        this.sizeInput = document.querySelector("input[type=range]");
        this.colorInput = document.querySelector("input[type=color]");
        this.instrument = null;
        this.color = '#000000';
        this.oldColor = '#000000';
        this.bgColor = '#ffffff';
        this.lineStart = null;
        this.lineEnd = null;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000000';
        this._addEvents();
    },

    _addEvents() {

        this.toolsPanel.addEventListener('click', (e) => {
            if (e.target.dataset.tool === 'pencil' || e.target.parentNode.dataset.tool === 'pencil') {
                console.log('Pencil');
                this.canvas.style.cursor = 'crosshair';
                this.nameTool.value = 'Pencil : ';
            }

            if (e.target.dataset.tool === 'clearCnv' || e.target.parentNode.dataset.tool === 'clearCnv') {
                console.log('Clear');
                this.canvas.style.cursor = 'default';
                this._clear(e);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.fillStyle = '#000000';
            }
            if (e.target.dataset.tool === 'eraser' || e.target.parentNode.dataset.tool === 'eraser') {
                console.log('Eraser');
                this.canvas.style.cursor = 'crosshair';
                this.nameTool.value = 'Eraser : ';
            }

            if (e.target.dataset.tool === 'square' || e.target.parentNode.dataset.tool === 'square') {
                console.log('Square');
                this.canvas.style.cursor = 'crosshair';
                this.nameTool.value = 'Square : ';
            }

            if (e.target.dataset.tool === 'squareFill' || e.target.parentNode.dataset.tool === 'squareFill') {
                console.log('Square');
                this.canvas.style.cursor = 'crosshair';
                this.nameTool.value = 'Square Fill : ';
            }

            if (e.target.dataset.tool === 'circle' || e.target.parentNode.dataset.tool === 'circle') {
                console.log('Circle ');
                this.canvas.style.cursor = 'crosshair';
                this.nameTool.value = 'Circle  : ';
            }

            if (e.target.dataset.tool === 'circleFill' || e.target.parentNode.dataset.tool === 'circleFill') {
                console.log('Circle Fill');
                this.canvas.style.cursor = 'crosshair';
                this.nameTool.value = 'Circle Fill : ';
            }

            if (e.target.dataset.tool === 'fill' || e.target.parentNode.dataset.tool === 'fill') {
                console.log('Fill');
                document.querySelector("#tools > div.color > input[type=color]").click();
                this.instrument = 'fill';
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }

            if (e.target.dataset.tool === 'line' || e.target.parentNode.dataset.tool === 'line') {
                console.log('Line');
                this.canvas.style.cursor = 'default';
                this.nameTool.value = 'line : ';
                this.instrument = 'line';
            }

            if (e.target.dataset.tool === 'text' || e.target.parentNode.dataset.tool === 'text') {
                console.log('Text');
                this.canvas.style.cursor = 'text';
                this.nameTool.value = 'Text : ';
                this.instrument = 'text';
            }

            if (e.target.id === 'saveImg' || e.target.parentNode.id === 'saveImg') {
                console.log('saveImg');
                this._saveImg();
            }
        })

        document.addEventListener('mouseup', (e) => {
            if (this.instrument === 'pencil') {
                let position = this._getCursorPosition(e);
                this.ctx.lineTo(position.x, position.y);
                this.ctx.stroke();
                this.ctx.closePath();
                this.instrument = ''
            }
            if (this.instrument === 'eraser') {
                this.instrument = '';
            }
            if (this.instrument === 'line') {
                this.ctx.closePath();
                this.lineStart = null;
                this.lineEnd = null;
            }

        });

        this.canvas.addEventListener('mousedown', (e) => {
            let tool = document.querySelector('input[name = "options"]:checked');
            if (tool) {
                if (tool.parentNode.dataset.tool === 'pencil') {
                    let position = this._getCursorPosition(e);
                    this.ctx.beginPath();
                    this.ctx.lineCap = "round";
                    this.ctx.moveTo(position.x, position.y);
                    this.instrument = 'pencil';
                }
                if (tool.parentNode.dataset.tool === 'eraser') {
                    this.instrument = 'eraser';
                }

                if (tool.parentNode.dataset.tool === 'square') {
                    this._drawSquare(50, 50, '', e);
                }

                if (tool.parentNode.dataset.tool === 'squareFill') {
                    this._drawSquare(50, 50, 'fill', e);
                }

                if (tool.parentNode.dataset.tool === 'circle') {
                    this._drawCircle(this.sizeInput.value, '', e);
                }

                if (tool.parentNode.dataset.tool === 'circleFill') {
                    this._drawCircle(this.sizeInput.value, 'fill', e);
                }

                if (tool.parentNode.dataset.tool === 'line') {
                    this.lineStart = this._getCursorPosition(e);
                    this.ctx.beginPath();
                }

                if (tool.parentNode.dataset.tool === 'text') {
                    this._printText(e);
                }
            }

        });

        this.canvas.addEventListener('mousemove', (e) => {
            let position = this._getCursorPosition(e);
            if (this.instrument === 'eraser') {
                this._erase(position);
            }

            if (this.instrument === 'pencil') {
                this.ctx.lineTo(position.x, position.y);
                this.ctx.stroke();
            }

            if (this.instrument === 'line' && this.lineStart) {
                if (this.lineEnd && this.lineStart) {
                    let width = this.ctx.lineWidth;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.bgColor;
                    this.ctx.lineWidth = 2.5;
                    this.ctx.moveTo(this.lineStart.x, this.lineStart.y);
                    this.ctx.lineTo(this.lineEnd.x, this.lineEnd.y);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.lineWidth = width;
                    this.ctx.strokeStyle = this.color;
                }

                this.ctx.moveTo(this.lineStart.x, this.lineStart.y);
                this.ctx.lineTo(position.x, position.y);
                this.lineEnd = position;
                this.ctx.stroke();

            }
        });

        this.colorInput.addEventListener('input', (e) => {
            if (this.instrument === 'fill') {
                this.oldColor = this.ctx.fillStyle;
                this.ctx.fillStyle = e.target.value;
                this.bgColor = e.target.value;
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.fillStyle = this.oldColor;
            } else {
                this.color = e.target.value;
                this.ctx.fillStyle = this.color;
                this.ctx.strokeStyle = this.color;
            }
        });

        this.colorInput.addEventListener('change', (e) => {
            if (this.instrument === 'fill') {
                this.instrument = '';
                this.ctx.fillStyle = this.oldColor;
                e.target.value = this.oldColor;
                console.log(e.target.value)
            }
        });

        this.sizeInput.addEventListener('input', (e) => {
            this.ctx.lineWidth = e.target.value;
        })

    },


    _drawSquare(width, height, type, event) {
        console.log(type)
        let position = this._getCursorPosition(event);
        let lineWidth = this.ctx.lineWidth;
        this.ctx.beginPath();
        this.ctx.rect(position.x - this.ctx.lineWidth / 2, position.y - this.ctx.lineWidth / 2, this.ctx.lineWidth, this.ctx.lineWidth);
        type === 'fill' ? this.ctx.fill() : (this.ctx.lineWidth = 2, this.ctx.stroke(), this.ctx.lineWidth = lineWidth);

    },

    _erase(position, event) {
        this.ctx.clearRect(position.x, position.y, this.sizeInput.value, this.sizeInput.value);
    },

    _clear(e) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    _drawCircle(radius, type, event) {
        let startAngle = 0 * (Math.PI / 180);
        let endAngle = 360 * (Math.PI / 180);
        let position = this._getCursorPosition(event);
        let lineWidth = this.ctx.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, radius, startAngle, endAngle, false);
        type === 'fill' ? this.ctx.fill() : (this.ctx.lineWidth = 2, this.ctx.stroke(), this.ctx.lineWidth = lineWidth);
    },

    _printText(e) {
        let position = this._getCursorPosition(e)
        let text = prompt('Введите нужный текст .');
        if (text) {
            this.ctx.font = `${this.sizeInput.value}px Georgia`;
            this.ctx.fillText(text, position.x, position.y);
        }
    },

    _saveImg() {
        const dataURL = this.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "My Img.jpg";
        link.click();
    },


    _getCursorPosition(e) {
        let x;
        let y;
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        x -= this.canvas.offsetLeft;
        y -= this.canvas.offsetTop;
        this.xCoord.textContent = x;
        this.yCoord.textContent = y;
        return { x: x, y: y };
    }

}

const dr = draw.init();

