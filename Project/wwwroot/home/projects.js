console.log(document.getElementById('container1'))
async function getProjects() {
    const response = await fetch("/api/projects", {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    if (response.ok) {
        var projects = await response.json();
        console.log(projects)
        return projects
    }
    if (response.status = 500) {
        var projects1 = await getProjects()
        return projects1
    }
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
        console.log(typeof (datetime))
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
        let project = await response.json()
        console.log(project)
        let checkList = ["Not Started", "In Progress", "Done"]
        let checkList1 = ["0%", "20%", "40%", "60%", "80%", "100%"]
        let checkList2 = ["1/5", "2/5", "3/5", "4/5", "5/5"]
        var container = document.getElementById('container1')
        let div = document.createElement('div')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        let div4 = document.createElement('div')
        let div5 = document.createElement('div')
        let div6 = document.createElement('div')
        let div7 = document.createElement('div')
        let div8 = document.createElement('div')
        var selectList = document.createElement("select");
        var selectList1 = document.createElement("select");
        var selectList2 = document.createElement("select");
        var selectList3 = document.createElement("select");
        var selectList4 = document.createElement("select");
        var selectList5 = document.createElement("select");
        var selectList6 = document.createElement("select");
        let titleProject = document.createElement('p')
        let duebyProject = document.createElement('p')
        duebyProject.setAttribute('id', 'title2')
        duebyProject.innerHTML = project.dueBy
        titleProject.setAttribute('id', 'title1')
        selectList.setAttribute('id', 'selectList')
        selectList1.setAttribute('id', 'selectList1')
        selectList2.setAttribute('id', 'selectList2')
        selectList3.setAttribute('id', 'selectList3')
        selectList4.setAttribute('id', 'selectList4')
        selectList5.setAttribute('id', 'selectList5')
        selectList6.setAttribute('id', 'selectList6')
        titleProject.innerHTML = project.title
        for (var i = 0; i < checkList.length; i++) {
            var option = document.createElement("option")
            option.value = checkList[i]
            option.text = checkList[i]
            console.log(project.briefStatus)
            if (option.text == project.briefStatus) {
                option.selected = true;
            }
            selectList.appendChild(option)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option1 = document.createElement("option")
            option1.value = checkList[i]
            option1.text = checkList[i]
            if (option1.text == project.researchStatus) {
                option1.selected = true;
            }
            selectList1.appendChild(option1)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option2 = document.createElement("option")
            option2.value = checkList[i]
            option2.text = checkList[i]
            if (option2.text == project.conceptStatus) {
                option2.selected = true;
            }
            selectList2.appendChild(option2)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option3 = document.createElement("option")
            option3.value = checkList[i]
            option3.text = checkList[i]
            if (option3.text == project.designStatus) {
                option3.selected = true;
            }
            selectList3.appendChild(option3)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option4 = document.createElement("option")
            option4.value = checkList[i]
            option4.text = checkList[i]
            if (option4.text == project.mockupStatus) {
                option4.selected = true;
            }
            selectList4.appendChild(option4)
        }
        for (var i = 0; i < checkList1.length; i++) {
            var option5 = document.createElement("option")
            option5.value = checkList1[i]
            option5.text = checkList1[i]
            if (option5.text == project.progress) {
                option5.selected = true;
            }
            selectList5.appendChild(option5)
        }
        for (var i = 0; i < checkList2.length; i++) {
            var option6 = document.createElement("option")
            option6.value = checkList2[i]
            option6.text = checkList2[i]
            if (option6.text == project.priority) {
                option6.selected = true;
            }
            selectList6.appendChild(option6)
        }
        div.appendChild(titleProject)
        div1.appendChild(duebyProject)
        div2.appendChild(selectList)
        div3.appendChild(selectList1)
        div4.appendChild(selectList2)
        div5.appendChild(selectList3)
        div6.appendChild(selectList4)
        div7.appendChild(selectList5)
        div8.appendChild(selectList6)
        container.appendChild(div)
        container.appendChild(div1)
        container.appendChild(div2)
        container.appendChild(div3)
        container.appendChild(div4)
        container.appendChild(div5)
        container.appendChild(div6)
        container.appendChild(div7)
        container.appendChild(div8)


        
    }
}


async function setup() {
    let checkList = ["Not Started", "In Progress", "Done"]
    let checkList1 = ["0%", "20%", "40%", "60%", "80%", "100%"]
    let checkList2 = ["1/5", "2/5", "3/5", "4/5", "5/5"]
    var container = document.getElementById('container1')
    var projects = await getProjects();
    console.log(projects)
    projects.forEach(project => {
        let div = document.createElement('div')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        let div4 = document.createElement('div')
        let div5 = document.createElement('div')
        let div6 = document.createElement('div')
        let div7 = document.createElement('div')
        let div8 = document.createElement('div')
        var selectList = document.createElement("select");
        var selectList1 = document.createElement("select");
        var selectList2 = document.createElement("select");
        var selectList3 = document.createElement("select");
        var selectList4 = document.createElement("select");
        var selectList5 = document.createElement("select");
        var selectList6 = document.createElement("select");
        let titleProject = document.createElement('p')
        let duebyProject = document.createElement('p')
        duebyProject.setAttribute('class', 'title2')
        duebyProject.innerHTML = project.dueBy
        titleProject.setAttribute('class', 'title1')
        selectList.setAttribute('class', 'selectList')
        selectList1.setAttribute('class', 'selectList1')
        selectList2.setAttribute('class', 'selectList2')
        selectList3.setAttribute('class', 'selectList3')
        selectList4.setAttribute('class', 'selectList4')
        selectList5.setAttribute('class', 'selectList5')
        selectList6.setAttribute('class', 'selectList6')
        titleProject.innerHTML = project.title
        for (var i = 0; i < checkList.length; i++) {
            var option = document.createElement("option")
            option.value = checkList[i]
            option.text = checkList[i]
            console.log(project.briefStatus)
            if (option.text == project.briefStatus) {
                option.selected = true;
            }
            selectList.appendChild(option)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option1 = document.createElement("option")
            option1.value = checkList[i]
            option1.text = checkList[i]
            if (option1.text == project.researchStatus) {
                option1.selected = true;
            }
            selectList1.appendChild(option1)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option2 = document.createElement("option")
            option2.value = checkList[i]
            option2.text = checkList[i]
            if (option2.text == project.conceptStatus) {
                option2.selected = true;
            }
            selectList2.appendChild(option2)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option3 = document.createElement("option")
            option3.value = checkList[i]
            option3.text = checkList[i]
            if (option3.text == project.designStatus) {
                option3.selected = true;
            }
            selectList3.appendChild(option3)
        }
        for (var i = 0; i < checkList.length; i++) {
            var option4 = document.createElement("option")
            option4.value = checkList[i]
            option4.text = checkList[i]
            if (option4.text == project.mockupStatus) {
                option4.selected = true;
            }
            selectList4.appendChild(option4)
        }
        for (var i = 0; i < checkList1.length; i++) {
            var option5 = document.createElement("option")
            option5.value = checkList1[i]
            option5.text = checkList1[i]
            if (option5.text == project.progress) {
                option5.selected = true;
            }
            selectList5.appendChild(option5)
        }
        for (var i = 0; i < checkList2.length; i++) {
            var option6 = document.createElement("option")
            option6.value = checkList2[i]
            option6.text = checkList2[i]
            if (option6.text == project.priority) {
                option6.selected = true;
            }
            selectList6.appendChild(option6)
        }
        div.appendChild(titleProject)
        div1.appendChild(duebyProject)
        div2.appendChild(selectList)
        div3.appendChild(selectList1)
        div4.appendChild(selectList2)
        div5.appendChild(selectList3)
        div6.appendChild(selectList4)
        div7.appendChild(selectList5)
        div8.appendChild(selectList6)
        container.appendChild(div)
        container.appendChild(div1)
        container.appendChild(div2)
        container.appendChild(div3)
        container.appendChild(div4)
        container.appendChild(div5)
        container.appendChild(div6)
        container.appendChild(div7)
        container.appendChild(div8)
        console.log(typeof (document.getElementsByClassName('title1')))
        document.getElementById("container1").querySelectorAll("div")

        
    })
    var g = document.getElementById("container1").querySelectorAll("div")
    for (i = 0; i < g.length; i++) {
        g[i].setAttribute("class","projectDiv")
    }

}

setup()