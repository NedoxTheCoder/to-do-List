//* TODO app
let todoItems;
const input = document.querySelector("#input");
const deleteAllBtn = document.querySelector("#delete");
const todoUl = document.querySelector("#ul");
const addBtn = document.querySelector("#add");
let array;

window.addEventListener("load",() => {
    // todoItems = JSON.parse((localStorage.getItem("items") || localStorage.setItem("items",JSON.stringify([]))));

    if (localStorage.getItem("items")){
        todoItems = JSON.parse(localStorage.getItem("items"))
    }else{
        localStorage.setItem("items",JSON.stringify([]));
        todoItems = JSON.parse(localStorage.getItem("items"));
    }
    array = Array.from(todoItems);
    // console.log(typeof array, array , Array.isArray(array));
    array.forEach(a => createElement(a));
})

addBtn.addEventListener("click",function(e){
    if (input.value.trim()){
        const newTodo = {
            id : new Date().getTime(), // Id üreteci
            completed : false,
            text : input.value,
        }
        array.push(newTodo);
        todoItems = array;
        // console.log(array);
        // console.log(todoItems);
        localStorage.setItem("items",JSON.stringify(todoItems));
        createElement(newTodo);
        // todoUl.innerHTML += `<li class = 'm-0'><input type='checkbox' name='' id=''></li>`
        input.value = "";

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Not Valid',
          })
    }
})

input.addEventListener("keydown",function(e){
    // e.preventDefault();
    if (e.code == "Enter"){
        e.preventDefault();
        addBtn.click();
    }
})


function createElement(newTodo){

    //? Sorgu

    

    const element = document.createElement("li");
    element.id = newTodo.id;

    const pAndCheck = document.createElement("div");


    
    const p  = document.createElement("p");
    p.classList.add("m-0");
    // p.innerText = JSON.parse(localStorage.getItem("tasks"))[counter];
    // counter++;
    // console.log(counter);
    p.innerText = newTodo.text;


    p.style.listStyle = "none";
    todoUl.appendChild(element);
    // element.append(p);
    pAndCheck.appendChild(p);

    const container = document.createElement("div");
    container.classList.add("d-flex","align-items-center","justify-content-between","gap-3")

    
     //! Pretty Checkbox
    const div = document.createElement("div");
    div.classList.add("pretty", "p-icon", "p-round")
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    div.appendChild(checkbox);

    const state = document.createElement("div");
    state.classList.add("state");

    const ix = document.createElement("i");
    ix.classList.add("icon","mdi","mdi-check");

    const label = document.createElement("label");


    //!Appends
    // pAndCheck.appendChild()
    state.appendChild(ix)
    state.appendChild(label);

    div.appendChild(state);

    // container.appendChild(div);
    pAndCheck.appendChild(div);
    // pAndCheck.style.display = "flex";
    // pAndCheck.style.flexDirection = "row-reverse";
    pAndCheck.classList.add("d-flex","flex-row-reverse","align-items-center","justify-content-between")
    element.appendChild(pAndCheck)

    const deletex = document.createElement("i");
    deletex.classList.add("fa-solid","fa-xmark","testing");
    container.appendChild(deletex);
    console.log(container);


    element.appendChild(container);
    




    // element.addEventListener("click",function(e){
    //     console.log(e.target);
    //     if (e.target.getAttribute("type") == "checkbox"){
    //         if (e.target.checked){
    //             console.log(array);
    //             console.log(e.target.parentElement.parentElement.parentElement);
    //             // array = array.filter(a => a != e.target.parentElement.parentElement);
    //             array.filter(a => a.id == e.target.parentElement.parentElement.parentElement.getAttribute("id")) 
    //             .forEach(x => x.completed = true);
    //         }
    //         newTodo.completed && element.classList.add("completed");
    //     }else if (e.target.classList.contains("fa-xmark")){
    //         e.target.parentElement.parentElement.parentElement.remove();
    //     }
    // })

    if (newTodo.completed){
        checkbox.checked = true;
    }
    newTodo.completed && element.classList.add("completed");
    newTodo.completed || element.classList.remove("completed");

    //! Other
    checkbox.addEventListener("change",function(e){
        if (e.target.checked){
            console.log(array);
            console.log(e.target.parentElement.parentElement.parentElement);
            // array = array.filter(a => a != e.target.parentElement.parentElement);
            array.filter(a => a.id == e.target.parentElement.parentElement.parentElement.getAttribute("id")) 
            .forEach(x => x.completed = true);
        }else{
            array.filter(a => a.id == e.target.parentElement.parentElement.parentElement.getAttribute("id")) 
            .forEach(x => x.completed = false);
            newTodo.completed || element.classList.remove("completed");
        }
        newTodo.completed && element.classList.add("completed") && (checkbox.checked = true);
        console.log(checkbox.checked);
        localStorage.setItem("items",JSON.stringify(array));
    })

    deletex.addEventListener("click",function(e){
    array =   array.filter(a => a.id != e.target.parentElement.parentElement.getAttribute("id"));
    localStorage.setItem("items",JSON.stringify(array));
    e.target.parentElement.parentElement.remove();
    })


    deleteAllBtn.addEventListener("click",function(e){
        array = [];
        localStorage.setItem("items",JSON.stringify(array));
        element.remove();
    })
}


