const addBox = document.querySelector(".add-box");
const popUpBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const titleTag= document.querySelector("input");
const descTag= document.querySelector("textarea");
const addBtn = popUpBox.querySelector("button");
const popupTitle = document.querySelector("header p");
const searchInput = document.getElementById("searchInput");


const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", function(){
    titleTag.focus();
     popUpBox.classList.add("show")
 });
 

 closeIcon.addEventListener("click", ()=>{
    popUpBox.classList.remove("show")
});


addBtn.addEventListener("click", (e) => {
    e.preventDefault();
     let noteTitle = titleTag.value,
     noteDesc = descTag.value;
      if (noteTitle || noteDesc){


        let dateObj = new Date(),
        month = dateObj.getMonth()+1,
        day = dateObj.getDate(),
        year = dateObj.getFullYear();


        let noteInfo = {
            title: noteTitle, description: noteDesc,


            date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`



        }  
     if(isUpdate=true){
             notes.push(noteInfo);
        }else {
            isUpdate = false;
            notes[UpdateId] = noteInfo
        } 
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click()
        showNotes()
     }
});




function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
  notes.forEach((note, index) => {
    let liTag = `  <li class="note">
      <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
      </div>
      <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>עריכה</li>
                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>מחיקה</li>
            </ul>
        </div>
      </div>
     </li>`;
     addBox.insertAdjacentHTML("afterend", liTag)
  });
};
showNotes(); 

closeIcon.addEventListener("click", ()=>{
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "הוסף פתק";
    popupTitle.innerText = "הוספת פתק";


});



function showMenu(elem){
    elem.parentElement.classList.add("show")
     document.addEventListener("click", e =>{
         if(e.target.tagName != "I" || e.target != elem){
             elem.parentElement.classList.remove("show")
         }
     });
 }
 

 
function deleteNote(noteId) {
    let confirmDel = confirm("האם למחוק פתק זה?");
    if (!confirmDel) return;

    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    UpdateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "ערוך פתק";
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    popupTitle.innerText = "עריכת פתק";

    
} 







function confirmDate() {
    const dateInput = document.getElementById('dateInput');
    const selectedDate = document.getElementById('selectedDate');
    
    if (dateInput.value) {
      const date = new Date(dateInput.value);
      const formattedDate = date.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      selectedDate.textContent = `התאריך הנבחר: ${formattedDate}`;

    } else {
      selectedDate.textContent = "לא נבחר תאריך, אנא בחר תאריך.";
    }
  }


//לסדר שאם נכנסתי לעריכה ובסוף לא עורכת שלא ימחק את הנתונים










function showNotes(date = null) {
    document.querySelectorAll(".note").forEach(note => note.remove());

    notes.forEach((note, index) => {
        if (date && note.date !== date) return; // הצג רק פתקים לתאריך שנבחר

        let liTag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i> עריכה</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i> מחיקה</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

function confirmDate() {
    const dateInput = document.getElementById('dateInput').value;
    if (dateInput) {
        showNotes(dateInput); // סינון פתקים לפי התאריך שנבחר
    }
}

function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.description.toLowerCase().includes(searchTerm)
    );
    document.querySelectorAll(".note").forEach(note => note.remove());
    
    filteredNotes.forEach((note, index) => {
        let liTag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i> עריכה</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i> מחיקה</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}