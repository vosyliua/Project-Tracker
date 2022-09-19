console.log(document.getElementById('saveProject'))


document.getElementById('logout').addEventListener('click', e => {
    localStorage.removeItem('Username')
    window.location = "https://localhost:7043/index"

})
console.log(document.getElementById('saveProject'))

document.getElementById('saveProject').addEventListener('click', e => {
    e.preventDefault();
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
    
    console.log(mockup + title + dueby+brief+research+concept+priority+progress+design)

})

async function test() {
    console.log("????????????????")
    console.log("in func")
    const response = await fetch("/api/usersall", {
        method: 'GET',
        headers: { "Accept": "application/json" }
    })
    if (response.ok) {
        var people = await response.json()
        console.log(people)
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
            Title: projectName,
            Owner: owner,
            Date: currentdate,

        })
    })
}

