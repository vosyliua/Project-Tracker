
async function getProjects() {
    const response = await fetch("/api/projects", {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    if (response.ok) {
        var projects = await response.json();
        return projects
    } else {
        console.log("error")
    }
}

async function setup() {
    var projects = await getProjects();
    projects.forEach(project => {
        console.log(project)

    })
}

document.getElementById('logout').addEventListener('click', e => {
    localStorage.removeItem('Username')
    window.location = "https://localhost:7043/index"

})
console.log(document.getElementById('saveProject'))

document.getElementById('saveProject').addEventListener('click', e => {
    e.preventDefault();
    var owner = localStorage.getItem('Username')
    const form = document.forms['projectForm'];
    var mockup = form.elements['mockup'].value
    var title = form.elements['title'].value
    var dueby = form.elements['dueby'].value
    var brief = form.elements['brief'].value
    var research = form.elements['research'].value
    var concept = form.elements['concept'].value
    var priority = form.elements['priority'].value
    var progress = form.elements['progress'].value
    var design = form.elements['design'].value
    console.log(owner)
    if (owner != null) {
        addProject(title, owner, dueby, brief, research, concept, design, mockup, progress, priority)
    } else {
        alert("only logged in users can create a project")
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        console.log(typeof(datetime))
    }





})

async function test() {
    const response = await fetch("/api/usersall", {
        method: 'GET',
        headers: {'Accept':'application/json'}
    })
    if (response.ok) {
        var dude = await response.json()
        console.log(dude)
    }
}

async function addProject(projectName, owner, dueby, brief, research, concept, design, mockup, progress, priority) {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    const response = await fetch("/api/projects", {
        method: 'POST',
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            Date: datetime,
            Title: projectName,
            Owner: owner,
            DueBy: dueby,
            BriefStatus: brief,
            ResearchStatus: research,
            ConceptStatus: concept,
            DesignStatus: design,
            MockupStatus: mockup,
            Progress: progress,
            Priority:priority
        })
    })
    if (response.ok) {
        console.log("it worked?")
        console.log(await response.json())
        setup()
    }
}





setup();