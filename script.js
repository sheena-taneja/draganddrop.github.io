
let sourceBox = null;
let destBox = null;
const stack = [];
const boxes = document.querySelectorAll('.box');
const undoBtn = document.getElementById('undo-btn');
undoBtn.addEventListener('click', handleUndo);

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
        boxes.forEach(box =>{
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