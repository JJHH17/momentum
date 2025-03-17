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
    projectTitle.textContent = projects[index].title;
    main.appendChild(projectTitle);
}