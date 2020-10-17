const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
let xCoord = document.querySelector('#xCoord');
let yCoord = document.querySelector('#yCoord');
let toolsPanel = document.querySelector('#tools');
let nameTool = document.querySelector("#toolName");
let sizeInput = document.querySelector("input[type=range]");
let colorInput = document.querySelector("input[type=color]");
let instrument = null;
let color = '#000000';
let oldColor = '#000000';
let bgColor = '#ffffff';
let lineStart = null;
let lineEnd = null;

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#000000';


toolsPanel.addEventListener('click', (e) => {
    if (e.target.dataset.tool === 'pencil' || e.target.parentNode.dataset.tool === 'pencil') {
        console.log('Pencil');
        canvas.style.cursor = 'crosshair';
        nameTool.value = 'Pencil : ';
    }

    if (e.target.dataset.tool === 'clearCnv' || e.target.parentNode.dataset.tool === 'clearCnv') {
        console.log('Clear');
        canvas.style.cursor = 'default';
        clear(e);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
    }
    if (e.target.dataset.tool === 'eraser' || e.target.parentNode.dataset.tool === 'eraser') {
        console.log('Eraser');
        canvas.style.cursor = 'crosshair';
        nameTool.value = 'Eraser : ';
    }

    if (e.target.dataset.tool === 'square' || e.target.parentNode.dataset.tool === 'square') {
        console.log('Square');
        canvas.style.cursor = 'crosshair';
        nameTool.value = 'Square : ';
    }

    if (e.target.dataset.tool === 'squareFill' || e.target.parentNode.dataset.tool === 'squareFill') {
        console.log('Square');
        canvas.style.cursor = 'crosshair';
        nameTool.value = 'Square Fill : ';
    }

    if (e.target.dataset.tool === 'circle' || e.target.parentNode.dataset.tool === 'circle') {
        console.log('Circle ');
        canvas.style.cursor = 'crosshair';
        nameTool.value = 'Circle  : ';
    }

    if (e.target.dataset.tool === 'circleFill' || e.target.parentNode.dataset.tool === 'circleFill') {
        console.log('Circle Fill');
        canvas.style.cursor = 'crosshair';
        nameTool.value = 'Circle Fill : ';
    }

    if (e.target.dataset.tool === 'fill' || e.target.parentNode.dataset.tool === 'fill') {
        console.log('Fill');
        document.querySelector("#tools > div.color > input[type=color]").click();
        instrument = 'fill';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (e.target.dataset.tool === 'line' || e.target.parentNode.dataset.tool === 'line') {
        console.log('Line');
        canvas.style.cursor = 'default';
        nameTool.value = 'line : ';
        instrument = 'line';
    }

    if (e.target.dataset.tool === 'text' || e.target.parentNode.dataset.tool === 'text') {
        console.log('Text');
        canvas.style.cursor = 'text';
        nameTool.value = 'Text : ';
        instrument = 'text';
    }

    if (e.target.id === 'saveImg' || e.target.parentNode.id === 'saveImg') {
        console.log('saveImg');
        saveImg();
    }
})

document.addEventListener('mouseup', (e) => {
    if (instrument === 'pencil') {
        let position = getCursorPosition(e);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
        ctx.closePath();
        instrument = ''
    }
    if (instrument === 'eraser') {
        instrument = '';
    }
    if (instrument === 'line') {
        ctx.closePath();
        lineStart = null;
        lineEnd = null;
    }

});

canvas.addEventListener('mousedown', (e) => {
    let tool = document.querySelector('input[name = "options"]:checked');
    if (tool) {
        if (tool.parentNode.dataset.tool === 'pencil') {
            let position = getCursorPosition(e);
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.moveTo(position.x, position.y);
            instrument = 'pencil';
        }
        if (tool.parentNode.dataset.tool === 'eraser') {
            instrument = 'eraser';
        }

        if (tool.parentNode.dataset.tool === 'square') {
            drawSquare(50, 50, '', e);
        }

        if (tool.parentNode.dataset.tool === 'squareFill') {
            drawSquare(50, 50, 'fill', e);
        }

        if (tool.parentNode.dataset.tool === 'circle') {
            drawCircle(sizeInput.value, '', e);
        }

        if (tool.parentNode.dataset.tool === 'circleFill') {
            drawCircle(sizeInput.value, 'fill', e);
        }

        if (tool.parentNode.dataset.tool === 'line') {
            lineStart = getCursorPosition(e);
            ctx.beginPath();
        }

        if (tool.parentNode.dataset.tool === 'text') {
            printText(e);
        }
    }

});

canvas.addEventListener('mousemove', (e) => {
    let position = getCursorPosition(e);
    if (instrument === 'eraser') {
        erase(position);
    }

    if (instrument === 'pencil') {
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
    }

    if (instrument === 'line' && lineStart) {
        if (lineEnd && lineStart) {
            let width = ctx.lineWidth;
            ctx.beginPath();
            ctx.strokeStyle = bgColor;
            ctx.lineWidth = 2.5;
            ctx.moveTo(lineStart.x, lineStart.y);
            ctx.lineTo(lineEnd.x, lineEnd.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
        }

        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(position.x, position.y);
        lineEnd = position;
        ctx.stroke();

    }
});

colorInput.addEventListener('input', (e) => {
    if (instrument === 'fill') {
        oldColor = ctx.fillStyle;
        ctx.fillStyle = e.target.value;
        bgColor = e.target.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = oldColor;
    } else {
        color = e.target.value;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    }
});

colorInput.addEventListener('change', (e) => {
    if (instrument === 'fill') {
        instrument = '';
        ctx.fillStyle = oldColor;
        e.target.value = oldColor;
        console.log(e.target.value)
    }
});

sizeInput.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
})


function drawSquare(width, height, type, event) {
    console.log(type)
    let position = getCursorPosition(event);
    let lineWidth = ctx.lineWidth;
    ctx.beginPath();
    ctx.rect(position.x - ctx.lineWidth / 2, position.y - ctx.lineWidth / 2, ctx.lineWidth, ctx.lineWidth);
    type === 'fill' ? ctx.fill() : (ctx.lineWidth = 2, ctx.stroke(), ctx.lineWidth = lineWidth);

}

function erase(position, event) {
    ctx.clearRect(position.x, position.y, sizeInput.value, sizeInput.value);
}

function clear(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(radius, type, event) {
    let startAngle = 0 * (Math.PI / 180);
    let endAngle = 360 * (Math.PI / 180);
    let position = getCursorPosition(event);
    let lineWidth = ctx.lineWidth;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, startAngle, endAngle, false);
    type === 'fill' ? ctx.fill() : (ctx.lineWidth = 2, ctx.stroke(), ctx.lineWidth = lineWidth);
}

function printText(e) {
    let position = getCursorPosition(e)
    let text = prompt('Введите нужный текст .');
    if (text) {
        ctx.font = `${sizeInput.value}px Georgia`;
        ctx.fillText(text, position.x, position.y);
    }
}

function saveImg() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "My Img.jpg";
    link.click();
}




function getCursorPosition(e) {
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
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    xCoord.textContent = x;
    yCoord.textContent = y;
    return { x: x, y: y };
};