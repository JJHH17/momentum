import { titleContainerSelect, siteContainerSelect, removeProjectModal, sidebarSelect, mainBodySelect, removeToDoButton, removeToDoModal } from "./elementSelect";

export { titleContainerSelect } from "./elementSelect";

// Stores projects
let projects = [];
// Confirms which index we're on
let currentActiveIndex = null;

// Responsible for creating button elements on page

// Creates "create Project" button
export function createProjectButton() {
    const mainContainer = titleContainerSelect();
    mainContainer.style.textAlign = "center";

    const createProjectBtn = document.createElement("button");
    createProjectBtn.id = "createProjectBtn";
    createProjectBtn.textContent = "Add New Project";
    createProjectBtn.type = "button";

    // Appends to page
    mainContainer.appendChild(createProjectBtn);

    // Add event listener
    createProjectBtn.addEventListener("click", () => {
        if (document.querySelector("#formContainer")) {
            alert("Please fill out the project form.")
        } else {
            // Removes "to do" modal
            removeToDoModal();
            createProjectModal();
        }
    });
}

// Creates modal to create project with
function createProjectModal() {
    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";
    // Append to main page container
    siteContainerSelect().appendChild(formContainer);

    // Styling
    formContainer.style.position = "absolute";
    formContainer.style.left = "50%";
    formContainer.style.right = "50%";
    formContainer.style.top = "25%";

    // Creates form
    const projectForm = document.createElement("form");
    formContainer.appendChild(projectForm);

    // Creates project title elements
    const projectTitleLabel = document.createElement("label");
    projectTitleLabel.textContent = "Project Title";
    projectForm.appendChild(projectTitleLabel);

    const projectTitleInput = document.createElement("input");
    projectForm.appendChild(projectTitleInput);

    // Creates project description elements
    const projectDescLabel = document.createElement("label");
    projectDescLabel.textContent = "Project Description";
    projectForm.appendChild(projectDescLabel);

    const projectDescInput = document.createElement("input");
    projectForm.appendChild(projectDescInput);

    // Creates submission button
    const projectSubmit = document.createElement("button");
    projectSubmit.textContent = "Create";
    projectSubmit.type = "button";
    projectForm.appendChild(projectSubmit);

    projectSubmit.addEventListener("click", () => {
        createProject(projectTitleInput.value, projectDescInput.value);
        // Removes project modal
        removeProjectModal();
        renderToSidebar();
    });
}


// Function allowing user to create a Project object
function createProject(title, description) {
    // Creates project
    const newProject = { title, description, toDo: [] };
    // Push to projects array
    projects.push(newProject);
}


// Renders projects to sidebar, places projects in sidebar view
function renderToSidebar() {
    const sidebar = sidebarSelect();
    sidebar.innerHTML = ""; // Clears sidebar projects when called

    // Loops through projects for displaying
    projects.forEach((project, index) => {
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("projectHolder");
        projectDiv.textContent = `${project.title} - ${project.description}`;

        // Appends to sidebar
        sidebar.appendChild(projectDiv);


            // Mouse over events colour div when hovering over
        projectDiv.addEventListener("mouseover", () => {
            projectDiv.style.backgroundColor = "pink";
        });
    
        projectDiv.addEventListener("mouseleave", () => {
            projectDiv.style.backgroundColor = "";
        });

        // Expands project into main area
        projectDiv.addEventListener("click", () => {
            loadProject(index);
            // Remove "create project" modal and "to do" modal
            removeProjectModal();
            removeToDoModal();
            // Creates "Add to do" button
            removeToDoButton(); // Removes previous modal
            createToDoBtn(); // Add button
        });
    })
}

// Responsible for loading projects contents into main area of page
function loadProject(index) {
    currentActiveIndex = index; // Allows us to dynamically update project being shown
    const main = mainBodySelect();
    main.innerHTML = ""; // Clears contents before call
    
    // Display project title
    const projectTitle = document.createElement("p");
    projectTitle.textContent = "Project: " + projects[index].title;
    main.appendChild(projectTitle);

    // Display project description
    const projectDesc = document.createElement("p");
    projectDesc.textContent = "Description: " + projects[index].description;
    main.appendChild(projectDesc)

    // This will contain the "To do" items
    const toDoItems = document.createElement("div");
    toDoItems.id = "toDoItems";

    // Prints "to do" array items to screen
    projects[index].toDo.forEach(toDo => {
        let toDoItem = document.createElement("div");
        toDoItem.textContent = `
        Completed? ${toDo.completed}
        Title: ${toDo.title}
        Details: ${toDo.notes}
        Due Date: ${toDo.dueDate}
        Priority: ${toDo.priority}`

        // Appends to container div
        toDoItems.appendChild(toDoItem);
    });

    // Appends to do div to page
    main.appendChild(toDoItems);
}


// Create to do button
function createToDoBtn() {
    const mainContainer = titleContainerSelect(); // Used to append button to page
    mainContainer.style.textAlign = "center";

    const createToDo = document.createElement("button");
    createToDo.type = "button";
    createToDo.textContent = "Create To Do Item";
    createToDo.id = "createToDo";
    // Appends to page
    mainContainer.appendChild(createToDo);

    // Handle button click event, opens modal
    createToDo.addEventListener("click", () => {
        if (document.querySelector("#toDoModalDiv")) {
            alert("Please fill out the current modal")
        } else {
            // Removes project modal
            removeProjectModal();
            createToDoModal();
        }
    });
}


// Create to do modal
function createToDoModal() {
    const containerDiv = document.createElement("div");
    containerDiv.id = "toDoModalDiv";
    // Append to page
    siteContainerSelect().appendChild(containerDiv);

    // Styling and positioning
    containerDiv.style.position = "absolute";
    containerDiv.style.left = "50%";
    containerDiv.style.right = "50%";
    containerDiv.style.top = "25%";

    // Creation of form
    const toDoForm = document.createElement("form");
    containerDiv.appendChild(toDoForm);

    // Create status check elements
    const statusCheckLabel = document.createElement("label");
    statusCheckLabel.textContent = "Complete:";
    toDoForm.appendChild(statusCheckLabel);

    const statusCheckInput = document.createElement("input");
    statusCheckInput.type = "checkbox";
    toDoForm.appendChild(statusCheckInput);
    let isCompleteValue = false; // manages value for status

    // Handles check box value and behaviour
    statusCheckInput.addEventListener("change", () => {
        isCompleteValue = statusCheckInput.checked;
    });

    // Creates to do title elements
    const toDoTitleLabel = document.createElement("label");
    toDoTitleLabel.textContent = "Title";
    toDoForm.appendChild(toDoTitleLabel);

    const toDoTitleInput = document.createElement("input");
    toDoForm.appendChild(toDoTitleInput);

    // Creates to do notes elements
    const toDoNotesLabel = document.createElement("label");
    toDoNotesLabel.textContent = "Notes";
    toDoForm.appendChild(toDoNotesLabel);

    const toDoNotesInput = document.createElement("input");
    toDoForm.appendChild(toDoNotesInput);

    // Creates to do date elements
    const toDoDateLabel = document.createElement("label");
    toDoDateLabel.textContent = "Due Date";
    toDoForm.appendChild(toDoDateLabel);

    const toDoDateInput = document.createElement("input");
    toDoDateInput.type = "date";
    toDoForm.appendChild(toDoDateInput);

    // Creates priority elements
    const toDoPriorityLabel = document.createElement("label");
    toDoPriorityLabel.textContent = "Priority";
    toDoForm.appendChild(toDoPriorityLabel);

    const toDoPriorityInput = document.createElement("input");
    toDoForm.appendChild(toDoPriorityInput);

    // Adds submit button to modal
    const submitToDo = document.createElement("button");
    submitToDo.type = "button";
    submitToDo.textContent = "Create";
    toDoForm.appendChild(submitToDo);

    // Handling submission behaviour, feeds into projects "To Do" array
    submitToDo.addEventListener("click", () => {
        if (currentActiveIndex !== null && toDoTitleInput.value.trim !== "") {
            projects[currentActiveIndex].toDo.push({
                completed: isCompleteValue,
                title: toDoTitleInput.value.trim(),
                notes: toDoNotesInput.value.trim(),
                dueDate: toDoDateInput,
                priority: toDoPriorityInput.value.trim(),
            })
            // Removal modal
            removeToDoModal();
            loadProject(currentActiveIndex) // Reloads display
        }
    })
}