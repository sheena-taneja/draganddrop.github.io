
const table = document.querySelector("table");
const boxes = document.querySelectorAll(".box");
const undoBtn = document.getElementById("undo-btn");

let state = [getTableCellContents()];

function getTableCellContents() {
    const contents = [];
    for (let i = 0; i < boxes.length; i++) {
        contents.push(boxes[i].textContent);
    }
    return contents;
}

function swapTableCellContents(src, dest) {
    const srcBox = src.querySelector(".box");
    const destBox = dest.querySelector(".box");
    const temp = srcBox.textContent;
    srcBox.textContent = destBox.textContent;
    destBox.textContent = temp;
}

function handleDragStart(e) {
    e.currentTarget.classList.add("move");
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const src = document.querySelector(".move").parentNode;
    const dest = e.currentTarget.parentNode;
    swapTableCellContents(src, dest);
    state.push(getTableCellContents());
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove("move");
}

function handleUndo() {
    if (state.length > 1) {
        state.pop();
        const contents = state[state.length - 1];
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].textContent = contents[i];
        }
    }
}

for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.setAttribute("draggable", "true");
    box.addEventListener("dragstart", handleDragStart);
    box.addEventListener("dragend", handleDragEnd);
}

const cells = document.querySelectorAll("td");
for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener("dragover", handleDragOver);
    cell.addEventListener("drop", handleDrop);
}

undoBtn.addEventListener("click", handleUndo);

