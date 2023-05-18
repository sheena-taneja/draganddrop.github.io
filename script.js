
let sourceBox = null;
let destBox = null;
const stack = [];
const boxes = document.querySelectorAll('.box');
const undoBtn = document.getElementById('undo-btn');
undoBtn.addEventListener('click', handleUndo);

const addRowBtn = document.getElementById('add-row');
addRowBtn.addEventListener('click', addRows);

attachEventListeners(boxes);
checkForEmptyStack();

function handleDragStart(e) {
    sourceBox = e.target;
    sourceBox.style.opacity = '0.4';
    e.dataTransfer.setData('text/html', sourceBox.innerHTML);
}

function handleDragEnter(e) {
    destBox = e.target;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragLeave(e) {
    destBox = null;
}

function handleDragEnd(e) {
    checkForEmptyStack();
    sourceBox.style.opacity = '1';
    destBox = null;
}

function handleUndo() {
    console.log("handle undo")
    if (stack.length <= 0) {
        document.getElementById('undo-btn').disabled = true;
    } else {
        document.getElementById('undo-btn').disabled = false;
        const prevState = stack.pop();
        document.querySelector('table').innerHTML = prevState;
        const boxes = document.querySelectorAll('.box');
        attachEventListeners(boxes);
        boxes.forEach(box => {
            box.style.opacity = '1';
        })

    }
}

function handleDrop(e) {
    checkForEmptyStack();

    e.preventDefault();
    if (destBox && sourceBox !== destBox) {
        stack.push(document.querySelector('table').innerHTML);
        const temp = sourceBox.innerHTML;
        sourceBox.innerHTML = destBox.innerHTML;
        destBox.innerHTML = temp;
    }
}


function attachEventListeners(boxes) {
    boxes.forEach(box => {
        box.addEventListener('dragstart', handleDragStart);
        box.addEventListener('dragenter', handleDragEnter);
        box.addEventListener('dragover', handleDragOver);
        box.addEventListener('dragleave', handleDragLeave);
        box.addEventListener('drop', handleDrop);
        box.addEventListener('dragend', handleDragEnd);
    });
}

function checkForEmptyStack() {
    if (stack.length <= 0) {
        document.getElementById('undo-btn').disabled = true;
    } else {
        document.getElementById('undo-btn').disabled = false;
    }

}


function addRows() {
    var table = document.getElementById("tbl");
    var rowCount = table.rows.length;
    var colCount = (table.rows[0]).cells.length;
    var row = table.insertRow(rowCount);
    for (var i = 0; i < colCount; i++) {
        var cell = row.insertCell(i);
        const id="box"+getRandomColor();
        console.log(id)
        cell.innerHTML = `<td><div id=${id} class="box" backgrounColor="red" draggable="true">${(rowCount) * (colCount) * 100 + (i + 1) * 100}</div></td>`; // Set cell value to the cell number
        //cell.style.backgroundColor = getRandomColor();
    }
    const boxes = document.querySelectorAll('.box');
    attachEventListeners(boxes);
    // emailCell3.innerHTML = "<input type='email' name='email'>";
}

function getRandomColor() {
    var color = 1;
    for (var k = 0; k < 6; k++) {
        color = Math.floor(Math.random() * 8);
    }
    return color%9;
}