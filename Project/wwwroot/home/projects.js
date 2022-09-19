document.getElementById('logout').addEventListener('click', e => {
    localStorage.removeItem('Username')
    window.location = "https://localhost:7043/index"

})

document.getElementById('project').addEventListener('click', e => {
    console.log("????????????????")
    e.preventDefault();
    console.log("????????????????")
    test()
    console.log("????????????????")
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


async function addProject(projectName, owner) {
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

setTimeout(function () { window.location.reload(); }, 4000);
