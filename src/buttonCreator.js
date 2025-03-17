import { titleContainerSelect, siteContainerSelect, removeProjectModal, sidebarSelect, mainBodySelect } from "./elementSelect";

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
            // Remove "create project" modal
            removeProjectModal();
            // Creates "Add to do" button
            createToDoBtn();
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
}


// Create to do button
function createToDoBtn() {
    const mainContainer = titleContainerSelect(); // Used to append button to page
    mainContainer.style.textAlign = "center";

    const createToDo = document.createElement("button");
    createToDo.type = "button";
    createToDo.textContent = "Create To Do Item";
    // Appends to page
    mainContainer.appendChild(createToDo);

    // Handle button click event, opens modal

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

    // Creates to do title elements
    
}