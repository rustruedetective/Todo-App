//UI functions
function displayAllNotes(){   //populate all cards
    let notesdiv = document.querySelector('.notesdiv');
    notesdiv.innerHTML = '';

    let oldStoreArray = JSON.parse(localStorage.getItem('note'));
    if(oldStoreArray !== null){
        oldStoreArray.forEach((x,y) => {
            notesdiv.innerHTML += `<div class="card m-3" style="width: 18rem; visibility: visible;">
                <div class="card-body">
                    <span style="visibility:hidden; position:absolute">${y}</span>
                    <h5 class="card-title">${x[0]}</h5>
                    <p class="card-text">${x[1]}</p>
                    <button class="btn btn-dark delete" onclick="deleteNote(this)">Delete</button>
                </div>
            </div>`
        });
    }
}



//STORAGE functions
function storeNewNote(newStoreArray){
    let oldStoreArray = JSON.parse(localStorage.getItem('note'));

    if(oldStoreArray === null){
        oldStoreArray = [];
    }
    oldStoreArray.push(newStoreArray);
    localStorage.setItem('note', JSON.stringify(oldStoreArray))
}

function deleteStoreNote(x){
    let oldStoreArray = JSON.parse(localStorage.getItem('note'));
    oldStoreArray.splice(x, 1);
    localStorage.setItem('note', JSON.stringify(oldStoreArray));
}



//FUNCTIONALITY functions
function createNewNote(){   //create new card
    let newtitle = document.querySelector('.newtitle').value;
    let newnote = document.querySelector('.newnote').value;
    let newNoteArray = [];
    
    if(newtitle !== '' && newnote !== ''){
        newNoteArray = [newtitle, newnote];
        storeNewNote(newNoteArray);
    }
    displayAllNotes();
}

function deleteNote(div){   //delete card
    let noteToDelete = div.parentNode.firstElementChild.innerHTML;

    deleteStoreNote(noteToDelete);
    displayAllNotes();
}

function displaySelectNotes(){   //hide the unwanted cards
    let searchedVal = document.querySelector('.search').value;   //yeah, its inefficient, to get it again and again
    let notesdiv = document.querySelector('.notesdiv');
    Array.from(notesdiv.children).forEach(x => {
        let card = Array.from(x.firstElementChild.children);
        if((card[1].innerText.includes(searchedVal) || card[2].innerText.includes(searchedVal))){
            x.setAttribute('style', 'width: 18rem; visibility: visible;');
        }
        else{
            x.setAttribute('style', 'width: 18rem; visibility: hidden; position: absolute;');
        }
    });
}

displayAllNotes();
document.querySelector('.create').addEventListener('click', createNewNote);
document.querySelector('.search').addEventListener('input', displaySelectNotes);