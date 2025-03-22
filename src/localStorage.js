
// File responsible for local storage push and pull of projects

export function saveProjectsLocal(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjectsLocal() {
    const projects = localStorage.getItem("projects");
    return projects ? JSON.parse(projects) : [];
}