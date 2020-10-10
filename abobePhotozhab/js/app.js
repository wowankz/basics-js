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

    if (e.target.dataset.tool === 'fill' || e.target.parentNode.dataset.tool === 'fill') {
        console.log('Fill');
        document.querySelector("#tools > div.color > input[type=color]").click();
        instrument = 'fill';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
})

canvas.addEventListener('mouseup', (e) => {
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
});

function drawSquare(width, height, type, event) {
    console.log(type)
    let position = getCursorPosition(event);
    if (type === 'fill') {
        ctx.fillRect(position.x - width / 2, position.y - height / 2, width, height);
        return;
    }
    ctx.beginPath();
    ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
    ctx.stroke();
}

function erase(position, event) {
    ctx.clearRect(position.x, position.y, sizeInput.value, sizeInput.value);
}

function clear(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}





colorInput.addEventListener('input', (e) => {
    color = e.target.value;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    if (instrument === 'fill') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

colorInput.addEventListener('change', (e) => {
    if (instrument === 'fill') {
        instrument = '';
    }
});

sizeInput.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
})


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