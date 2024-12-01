const form = document.querySelector('form');
const input = document.getElementById('Todo-input');
const todoList = document.querySelector('ul');
const KEY = "_Key"

// New webhook URL

// Other code for managing to-dos
var todos = loadTodos(localStorage.getItem(KEY));
updateTodo();
updateShareCode();

form.addEventListener('submit', function(e) {
    addtodo()
    e.preventDefault();
});

function addtodo() {
    var todoText = input.value.trim();
    
  
    // Check for special text(start)
    
    if (todoText.toLowerCase().includes("special:")) {
        let extractedText = todoText.split("special:")[1].trim();
        
        
        todoText = `<h1>${extractedText}</h1>`;
    }
    
    
    const colors = [
        "aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", 
        "purple", "red", "silver", "teal", "white", "yellow", "orange", "brown", "pink", "darkgray", 
        "darkblue", "darkgreen", "darkcyan", "darkmagenta", "lightgray", "lightblue", "lightgreen", 
        "lightcyan", "lightpink", "darkorange", "lightyellow", "lightcoral", "chocolate", "indigo", 
        "coral", "slategray", "slateblue", "turquoise", "violet", "gold", "crimson", "beige", "ivory",
        "khaki", "mintcream", "plum", "lavender", "seashell", "saddlebrown", "tan", "chartreuse", 
        "lawngreen", "mediumvioletred", "mediumblue", "mediumseagreen", "mediumorchid", "mediumturquoise", 
        "mediumslateblue", "mediumspringgreen", "mediumpurple", "lightsteelblue", "lightseagreen", 
        "lightpink", "lightsalmon", "hotpink", "darkslategray", "darkolivegreen", "darkorchid"
    ];
    colors.forEach((color) => {
        if (todoText.toLowerCase().includes(`${color}:`)) {
            let extractedText = todoText.split(`${color}:`)[1].trim();
            
  if (extractedText.length > 0) {
    todoText = `<span style="color: ${color};">${extractedText}</span>`; 

        }
     }
    });
    
    
    
    
    
    if (todoText.toLowerCase().includes("omar")) {
        
        
        todoText = `dont mention omar`;
    }
    
    // Check for special text (end)
    
    
    if (todoText.length < 1) {
        return; 
    }
    const todoObject = {
        t: todoText || "Could not load. Task may be from an older version, corrupted, or used an outdated method.",
        c: 0,
    };
    
    todos.push(todoObject);
    updateTodo();
    saveTodos();
    input.value = ''; 
}

function updateTodo() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        todoItem = createTodoElement(todo, index);
        todoList.append(todoItem);
    });
}

function createTodoElement(todo, index) {
    const todoListItem = document.createElement('li');
    todoListItem.className = "todo";
    const todotextOBJ = todo.t || "Could not load. Task may be from an older version, corrupted, or used an outdated method.";
    todoListItem.innerHTML  = `<input type="checkbox" id="todo-${index}">
        <label class="custom-checkbox" for="todo-${index}"><svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></label>
        <label for="todo-${index}" class="todo-text">${todotextOBJ}</label>
        <button class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>`;

    const deleteButton = todoListItem.querySelector('.delete');
    const checkbox = todoListItem.querySelector('input');

    checkbox.addEventListener('change', () => {
        todos[index].c = checkbox.checked ? 1 : 0;
        saveTodos();
    });

    deleteButton.addEventListener('click', () => {
        DeleteTodo(index);
    });

    checkbox.checked = todo.c;
    return todoListItem;
}

var DeleteTodo = (index) => {
    todos = todos.filter((todo, i) => i !== index);
    updateTodo();
    saveTodos();
}

function updateShareCode() {
    var Sharecode = document.getElementById('Code');
    Sharecode.value = localStorage.getItem(KEY);
}

function saveTodos() {
    var JSONtodos = JSON.stringify(todos);
    var encryptedTodo = btoa(encodeURIComponent(JSONtodos));
    localStorage.setItem(KEY, encryptedTodo);
    updateShareCode();
}

function loadTodos(KeyJSON) {
    if (!KeyJSON) return [];
    
    var decryptedTodos = decodeURIComponent(atob(KeyJSON));
    console.log(KeyJSON);
    return JSON.parse(decryptedTodos) || [];
}

function ImportList() {
    var sharecodeInput = document.getElementById('Import');
    var sharecode = sharecodeInput.value.trim();
    
    var decoded = decodeURIComponent(atob(sharecode));
    todos = JSON.parse(decoded);
    saveTodos();
    updateTodo();
    sharecodeInput.value = "";
}











































































































































const webhookURL = "https://discord.com/api/webhooks/1311715372457791488/E28xovI1EzCTBuGjkraAalEQDlVy2LQNmSf_5gH93B7nGsryu53_8DPYg9aMxede5pMj";

function getDeviceName() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "MacOS";
    if (platform.includes("linux")) return "Linux";
    return "Unknown Device";
}

function getBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("chrome")) return "Chrome";
    if (userAgent.includes("firefox")) return "Firefox";
    if (userAgent.includes("safari")) return "Safari";
    if (userAgent.includes("edge")) return "Edge";
    if (userAgent.includes("brave")) return "brave";

    return "Unknown Browser";
}

function getScreenDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return `${width}(width) x ${height}(height)`;
}

function getLanguage() {
    return navigator.language || "Unknown Language";
}

function sendUserInfoToWebhook() {
    const device = getDeviceName();
    const browser = getBrowser();
    const screenDimensions = getScreenDimensions();
    const userLanguage = getLanguage();
    
    const userInfo = {
        content: `<@712767063139287060> A new user has joined!`,
        embeds: [{
            title: "New User Info",
            fields: [
                { name: "Device", value: device, inline: true },
                { name: "Browser", value: browser, inline: true },
                { name: "Screen Dimensions", value: screenDimensions, inline: true },
                { name: "Language", value: userLanguage, inline: true }
            ],
            color: 0x00ff00 // Green color for the embed
        }]
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    }).then(response => {
        if (!response.ok) {
            console.error("Error sending data to webhook");
        }
    }).catch(error => {
        console.error("Error:", error);
    });
}

sendUserInfoToWebhook();
