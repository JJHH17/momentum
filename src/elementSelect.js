

// Responsible for selecting queries on page

export function titleContainerSelect() {
    const titleContainer = document.querySelector("#titleContainer");
    return titleContainer;
}

export function createProjectBtnSelect() {
    const createProjectBtn = document.querySelector("#createProjectButton");
    return createProjectBtn;
}

export function siteContainerSelect() {
    const siteContainer = document.querySelector("#siteContainer");
    return siteContainer;
}

export function mainBodySelect() {
    const mainBody = document.querySelector("#mainBody");
    return mainBody;
}

export function removeProjectModal() {
    const projectModal = document.querySelector("#formContainer");
    if (document.querySelector("#formContainer")) {
        projectModal.remove();
    };
}

export function sidebarSelect() {
    const sidebar = document.querySelector("#sidebar");
    return sidebar;
}

export function removeToDoButton() {
    const toDoButton = document.querySelector("#createToDo");
    if (toDoButton) {
        toDoButton.remove();
    }
}

export function removeToDoModal() {
    const toDoModal = document.querySelector("#toDoModalDiv");
    if (toDoModal) {
        toDoModal.remove();
    }
}