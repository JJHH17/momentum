import { titleContainerSelect, siteContainerSelect, removeProjectModal, sidebarSelect, mainBodySelect, removeToDoButton, removeToDoModal, editToDoBtnSelect, removeEditModal, editModalSelect } from "./elementSelect";
import { saveProjectsLocal, loadProjectsLocal } from "./localStorage";

// Stores projects, local storage API Used
let projects = loadProjectsLocal();
// Confirms which index we're on
let currentActiveIndex = null;


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
            // Removes "to do" modal and "edit to do" modal
            removeToDoModal();
            removeEditModal();
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
    // Saves to local storage
    saveProjectsLocal(projects);
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
        sidebar.appendChild(deleteProjectBtn(index));

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
            // Remove "create project" modal, "to do" modal and "edit" modal
            removeProjectModal();
            removeToDoModal();
            removeEditModal();
            // Creates "Add to do" button
            removeToDoButton(); // Removes previous modal
            createToDoBtn(); // Add button
        });
    });
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
    projects[index].toDo.forEach((toDo, todoIndex) => {
        let toDoItem = document.createElement("div");

        // Check box that updates status of "to do"
        const toDoCheckbox = document.createElement("input");
        toDoCheckbox.type = "checkbox";
        toDoCheckbox.checked = toDo.completed;

        toDoItems.appendChild(toDoCheckbox);

        // Add functionality of checkbox tick
        toDoCheckbox.addEventListener("change", () => {
            // Update satatus 
            projects[index].toDo[todoIndex].completed = toDoCheckbox.checked;
            saveProjectsLocal(projects);
            loadProject(currentActiveIndex); // re loads the function when actioned
        });

        toDoItem.textContent += `
        completed? ${toDo.completed}
        Title: ${toDo.title}
        Details: ${toDo.notes}
        Due Date: ${toDo.dueDate}
        Priority: ${toDo.priority}`

        // Appends to container div
        toDoItems.appendChild(toDoItem);
        toDoItems.appendChild(editToDo(index, todoIndex));
        toDoItem.appendChild(deleteToDoBtn(index, todoIndex));
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
            // Removes project modal and "edit to do" button
            removeProjectModal();
            removeEditModal();
            createToDoModal();
        }
    });
}

// Button that allows user to edit "to do" items
function editToDo(index, toDoIndex) {
    const editToDoBtn = document.createElement("button");
    editToDoBtn.type = "button";
    editToDoBtn.textContent = "Edit";
    editToDoBtn.id = "editToDoBtn";

    editToDoBtn.addEventListener("click", () => {
        if (editModalSelect()) {
            alert("Please fill out the displayed form")
        } else {
            editToDoModal(index, toDoIndex);
            removeProjectModal(); // Removes project modal
            removeToDoModal();  // Removes to do modal
        }
    });
    return editToDoBtn;
}

// Modal that allows user to edit "to do" items
function editToDoModal(index, toDoIndex) {
    const toDoItem = projects[index].toDo[toDoIndex];    

    const formContainer = document.createElement("div");
    formContainer.id = "editToDoModalContainer";
    siteContainerSelect().appendChild(formContainer);
    // Styling
    formContainer.style.position = "absolute";
    formContainer.style.right = "50%";
    formContainer.style.left = "50%";
    formContainer.style.top = "25%";

    const editToDoForm = document.createElement("form");
    formContainer.appendChild(editToDoForm)

    // Edits to do title
    const editTitleLabel = document.createElement("label");
    editTitleLabel.textContent = "Title";
    editToDoForm.appendChild(editTitleLabel);
    
    const editTitleInput = document.createElement("input");
    editTitleInput.value = toDoItem.title;
    editToDoForm.appendChild(editTitleInput);

    // Edit details/notes
    const editDetailsLabel = document.createElement("label");
    editDetailsLabel.textContent = "Details";
    editToDoForm.appendChild(editDetailsLabel);

    const editDetailsInput = document.createElement("input");
    editDetailsInput.value = toDoItem.notes;
    editToDoForm.appendChild(editDetailsInput);

    // Edit due date
    const editDateLabel = document.createElement("label");
    editDateLabel.textContent = "Due Date";
    editToDoForm.appendChild(editDateLabel);

    const editDateInput = document.createElement("input");
    editDateInput.type = "date";
    editDateInput.value = toDoItem.dueDate;
    editToDoForm.appendChild(editDateInput);

    const editPriorityLabel = document.createElement("label");
    editPriorityLabel.textContent = "Priority";
    editToDoForm.appendChild(editPriorityLabel);

    const editPriorityInput = document.createElement("input");
    editPriorityInput.value = toDoItem.priority;
    editToDoForm.appendChild(editPriorityInput);

    // Creates submission button
    const submitEdits = document.createElement("button");
    submitEdits.type = "button";
    submitEdits.textContent = "Submit";
    editToDoForm.appendChild(submitEdits);

    // Handles submission button and feeds into behaviour
    submitEdits.addEventListener("click", () => {
        // Update to relevant "To Do" entry
        projects[index].toDo[toDoIndex] = {
            ...toDoItem,
            title: editTitleInput.value,
            notes: editDetailsInput.value,
            dueDate: editDateInput.value,
            priority: editPriorityInput.value,
        };

        saveProjectsLocal(projects);
        // Removed project modal and reload project
        formContainer.remove();
        loadProject(index);
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

    const toDoPriorityInput = document.createElement("select");
    toDoForm.appendChild(toDoPriorityInput);

    // Creating the drop down elements for priority input
    const p1 = document.createElement("option");
    p1.textContent = "P1";
    toDoPriorityInput.appendChild(p1);

    const p2 = document.createElement("option");
    p2.textContent = "P2";
    toDoPriorityInput.appendChild(p2);

    const p3 = document.createElement("option");
    p3.textContent = "P3";
    toDoPriorityInput.appendChild(p3);

    const p4 = document.createElement("option");
    p4.textContent = "P4";
    toDoPriorityInput.appendChild(p4);

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
                dueDate: toDoDateInput.value,
                priority: toDoPriorityInput.value.trim(),
            })
            saveProjectsLocal(projects);
            // Removal modal
            removeToDoModal();
            loadProject(currentActiveIndex) // Reloads display
        }
    });
}

// Creation of "delete to do item" button
function deleteToDoBtn(index, toDoIndex) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Item";

    deleteButton.addEventListener("click", () => {
        projects[index].toDo.splice(toDoIndex, 1);
        saveProjectsLocal(projects);
        loadProject(currentActiveIndex);
    })

    return deleteButton;
}

// Creation of "delete project items" button
function deleteProjectBtn(index) {
    const deleteProject = document.createElement("button");
    deleteProject.type = "button";
    deleteProject.textContent = "Delete Project";

    deleteProject.addEventListener("click", () => {
        projects.splice(index, 1);
        saveProjectsLocal(projects);
        renderToSidebar()
    })

    return deleteProject;
}

// Initial render of projects to sidebar
renderToSidebar();