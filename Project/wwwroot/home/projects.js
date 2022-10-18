
async function getProjects() {                                                              //function to retrieve all projects
    const token = localStorage.getItem('authorization')
    const response = await fetch("/api/projects", {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Authorization': token }                   //apply auth token, which was set on login
    })
    if (response.ok) {
        console.log(response)
        var projects = await response.json()
        console.log(projects)
        return projects
    }
}




document.getElementById('logout').addEventListener('click', e => {                          //logout func
    localStorage.clear()
    window.location = "https://localhost:7043/index"

})

document.getElementById('saveProject').addEventListener('click', e => {                     //event listener to add a project
    e.preventDefault();
    var owner = localStorage.getItem('Username')
    const form = document.forms['projectForm'];
    var mockup = form.elements['mockup'].value
    var title = form.elements['title'].value
    var dueby = form.elements['dueby'].value
    var brief = form.elements['brief'].value                                                 //retrieve all values from input data
    var research = form.elements['research'].value
    var concept = form.elements['concept'].value
    var priority = form.elements['priority'].value
    var progress = form.elements['progress'].value
    var design = form.elements['design'].value
    if (owner != null) {                                                                    //extra check for the username and if project title isn't empty
        if (title == "") {
            alert("Please Enter A Project Title")
            return;
        }
        addProject(title, owner, dueby, brief, research, concept, design, mockup, progress, priority)

    } else {                                                                                    //if username is empty
        alert("only logged in users can create a project")
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
    }
   
})


async function addProject(projectName, owner, dueby, brief, research, concept, design, mockup, progress, priority) {
    if (projectName == null) {
        alert("Please enter a project name")
        return;
    } else {

        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"                                                          
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        const response = await fetch("/api/projects", {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': localStorage.getItem('authorization') },
            body: JSON.stringify({
                Date: datetime,
                Title: projectName,
                Owner: owner,
                DueBy: dueby,
                BriefStatus: brief,                                                                 //payload with retrieved data from input fields, which is sent via POST route to add project
                ResearchStatus: research,
                ConceptStatus: concept,
                DesignStatus: design,
                MockupStatus: mockup,
                Progress: progress,
                Priority: priority
            })
        })
        if (response.ok) {                                                                      //if response ok was true, add the new project to the UI by creating HTML elements
            document.forms['projectForm'].elements['title'].value = ""
            document.forms['projectForm'].elements['mockup'].selectedIndex = 0
            document.forms['projectForm'].elements['dueby'].selectedIndex = 0
            document.forms['projectForm'].elements['brief'].selectedIndex = 0
            document.forms['projectForm'].elements['research'].selectedIndex = 0
            document.forms['projectForm'].elements['concept'].selectedIndex = 0
            document.forms['projectForm'].elements['priority'].selectedIndex = 0
            document.forms['projectForm'].elements['progress'].selectedIndex = 0
            document.forms['projectForm'].elements['design'].selectedIndex = 0
            document.forms['projectForm'].elements['dueby'].value = ""
            let project = await response.json()
            let checkList = ["Not Started", "In Progress", "Done"]
            let checkList1 = ["0%", "20%", "40%", "60%", "80%", "100%"]                          //arrays, used to check which value to set the HTML elements to
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
            let div9 = document.createElement('div')
            let div10 = document.createElement('div')
            let div11 = document.createElement('div')
            var selectList = document.createElement("select");
            var selectList1 = document.createElement("select");
            var selectList2 = document.createElement("select");
            var selectList3 = document.createElement("select");
            var selectList4 = document.createElement("select");
            var selectList5 = document.createElement("select");
            var selectList6 = document.createElement("select");
            let titleProject = document.createElement('p')
            let duebyProject = document.createElement('p')
            let ownerProject = document.createElement('p')
            let buttonSave = document.createElement('button')
            let buttonRemove = document.createElement('button')
            buttonSave.setAttribute('id', project.id)
            buttonRemove.setAttribute('id', project.id)
            ownerProject.setAttribute('class', 'title3')
            duebyProject.setAttribute('class', 'title2')                                              //class attributes set for styling
            titleProject.setAttribute('class', 'title1')
            selectList.setAttribute('class', 'selectList')
            selectList1.setAttribute('class', 'selectList1')
            selectList2.setAttribute('class', 'selectList2')
            selectList3.setAttribute('class', 'selectList3')
            selectList4.setAttribute('class', 'selectList4')
            selectList5.setAttribute('class', 'selectList5')
            selectList6.setAttribute('class', 'selectList6')
            duebyProject.innerHTML = project.dueBy
            titleProject.innerHTML = project.title
            ownerProject.innerHTML = project.owner
            for (var i = 0; i < checkList.length; i++) {                                        // loops through arrays, adds all the values from arrays, and checks which one was selected
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
            for (var i = 0; i < checkList.length; i++) {                                        // loops through arrays, adds all the values from arrays, and checks which one was selected
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
            buttonSave.innerText = "Save Project"
            buttonRemove.innerText = "Remove Project"
            buttonRemove.setAttribute('class', 'projectButtons')                                        //setting attributes, for styling
            buttonSave.setAttribute('class', 'projectButtons')
            div.appendChild(titleProject)
            div1.appendChild(duebyProject)
            div2.appendChild(selectList)
            div3.appendChild(selectList1)
            div4.appendChild(selectList2)
            div5.appendChild(selectList3)
            div6.appendChild(selectList4)
            div7.appendChild(selectList5)
            div8.appendChild(selectList6)                                                       //theres two layers of divs for each HTML element with a value
            div9.appendChild(buttonSave)                                                        // last div contains all of the other divs, which contain all the other html elements and the last div is added to the document
            div10.appendChild(ownerProject)
            div11.appendChild(buttonRemove)
            container.appendChild(div)
            container.appendChild(div1)
            container.appendChild(div10)
            container.appendChild(div2)
            container.appendChild(div3)
            container.appendChild(div4)
            container.appendChild(div5)
            container.appendChild(div6)
            container.appendChild(div7)
            container.appendChild(div8)
            container.appendChild(div9)
            container.appendChild(div11)
            buttonSave.addEventListener('click', e => {                                         //event listener, which retrieves new information from input about project and updates the specific project via PUT route
                var brief = selectList.options[selectList.selectedIndex].text;
                var research = selectList1.options[selectList1.selectedIndex].text;
                var concept = selectList2.options[selectList2.selectedIndex].text;
                var design = selectList3.options[selectList3.selectedIndex].text;
                var mockup = selectList4.options[selectList4.selectedIndex].text;
                var progress = selectList5.options[selectList5.selectedIndex].text;
                var priority = selectList6.options[selectList6.selectedIndex].text;
                var projectId = buttonSave.id
                updateProject(projectId, brief, concept, progress, priority, mockup, design, research)
            })
            buttonRemove.addEventListener('click', e => {                                       //event listener, which removes a specific project, and all it's elements
                removeProject(buttonRemove.id);
                div.remove();
                div1.remove();
                div2.remove();
                div3.remove();
                div4.remove();
                div5.remove();
                div6.remove();
                div7.remove();
                div8.remove();
                div9.remove();
                div10.remove();
                div11.remove();
            }
            )


            var g = document.getElementById("container1").querySelectorAll("div")
            for (i = 0; i < g.length; i++) {                                                //setting attributes, for styling
                g[i].setAttribute("class", "projectDiv")
            }
            alert("Your Project Has Been Created!")
        }
        if (response.status == 409) {
            alert("Project Already Exsists")                                                            //If project already in database
        }
        if(response.status == 500) {                                                        
            await addProject(projectName, owner, dueby, brief, research, concept, design, mockup, progress, priority)       //if db connection error, without entering route
        }

    }
   
}


async function setup() {                                                                                //main function, retrieves all existing projects
    if (localStorage.getItem("authorization") === null) {
        window.location = "https://localhost:7043/index"
    }
    var user = localStorage.getItem('Username')
    if (user == null) {
        document.getElementById('logout').innerText = "Login"
    } else {
        document.getElementById('userH2').innerText = "Logged in as " + user
    }

    let checkList = ["Not Started", "In Progress", "Done"]
    let checkList1 = ["0%", "20%", "40%", "60%", "80%", "100%"]                                         //arrays, which are used to determine the correct value of html select elements
    let checkList2 = ["1/5", "2/5", "3/5", "4/5", "5/5"]
    var container = document.getElementById('container1')
    var projects = await getProjects();
    while (projects == undefined) {
        projects = await getProjects()                                                                      //status 500 preventer(database connection error), to ensure information
    }
    if (projects != undefined) {
        if (projects.length >= 1) {                                                                         //for each project, create html elements and populate them with project values
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
                let div9 = document.createElement('div')
                let div10 = document.createElement('div')
                let div11 = document.createElement('div')
                var selectList = document.createElement("select");
                var selectList1 = document.createElement("select");
                var selectList2 = document.createElement("select");
                var selectList3 = document.createElement("select");
                var selectList4 = document.createElement("select");
                var selectList5 = document.createElement("select");
                var selectList6 = document.createElement("select");
                let titleProject = document.createElement('p')
                let duebyProject = document.createElement('p')
                let ownerProject = document.createElement('p')
                let buttonSave = document.createElement('button')
                let buttonRemove = document.createElement('button')
                buttonSave.setAttribute('id', project.id)
                buttonRemove.setAttribute('id', project.id)
                ownerProject.setAttribute('class', 'title3')
                duebyProject.setAttribute('class', 'title2')
                titleProject.setAttribute('class', 'title1')
                selectList.setAttribute('class', 'selectList')
                selectList1.setAttribute('class', 'selectList1')
                selectList2.setAttribute('class', 'selectList2')                                        //setting attributes, for styling
                selectList3.setAttribute('class', 'selectList3')
                selectList4.setAttribute('class', 'selectList4')
                selectList5.setAttribute('class', 'selectList5')
                selectList6.setAttribute('class', 'selectList6')
                duebyProject.innerHTML = project.dueBy
                titleProject.innerHTML = project.title
                ownerProject.innerHTML = project.owner
                for (var i = 0; i < checkList.length; i++) {                                            //loop through array of values, and select the one which was selected
                    var option = document.createElement("option")
                    option.value = checkList[i]
                    option.text = checkList[i]
                    console.log(project.briefStatus)
                    if (option.text == project.briefStatus) {
                        option.selected = true;
                        console.log(option.text)
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
                    var option3 = document.createElement("option")                                           //loop through array of values, and select the one which was selected
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
                buttonSave.innerText = "Save Project"
                buttonRemove.innerText = "Remove Project"
                div.appendChild(titleProject)
                div1.appendChild(duebyProject)
                div2.appendChild(selectList)
                div3.appendChild(selectList1)
                div4.appendChild(selectList2)
                div5.appendChild(selectList3)                                                           //appending child elements to parent divs
                div6.appendChild(selectList4)
                div7.appendChild(selectList5)
                div8.appendChild(selectList6)
                div9.appendChild(buttonSave)
                div10.appendChild(ownerProject)
                div11.appendChild(buttonRemove)
                buttonRemove.setAttribute('class', 'projectButtons')                            
                buttonSave.setAttribute('class', 'projectButtons')
                container.appendChild(div)
                container.appendChild(div1)
                container.appendChild(div10)
                container.appendChild(div2)
                container.appendChild(div3)
                container.appendChild(div4)                                                             //appending child divs to main div
                container.appendChild(div5)
                container.appendChild(div6)
                container.appendChild(div7)
                container.appendChild(div8)
                container.appendChild(div9)
                container.appendChild(div11)
                document.getElementById("container1").querySelectorAll("div")
                buttonSave.addEventListener('click', e => {                                         //event listeners, which save the project if information was updated
                    console.log(buttonSave.id)                                                      //updates UI with selected information from html values
                    console.log(project.title)
                    var brief = selectList.options[selectList.selectedIndex].text;
                    var research = selectList1.options[selectList1.selectedIndex].text;
                    var concept = selectList2.options[selectList2.selectedIndex].text;
                    var design = selectList3.options[selectList3.selectedIndex].text;
                    var mockup = selectList4.options[selectList4.selectedIndex].text;
                    var progress = selectList5.options[selectList5.selectedIndex].text;
                    var priority = selectList6.options[selectList6.selectedIndex].text;
                    var projectId = buttonSave.id
                    updateProject(projectId, brief, concept, progress, priority, mockup, design, research)
                })
                buttonRemove.addEventListener('click', e => {                                       //removes a specific project and the html elements that were used by the project
                    var log = removeProject(buttonRemove.id);
                    div.remove();
                    div1.remove();
                    div2.remove();
                    div3.remove();
                    div4.remove();
                    div5.remove();
                    div6.remove();
                    div7.remove();
                    div8.remove();
                    div9.remove();
                    div10.remove();
                    div11.remove();
                }
                )
            })
            var g = document.getElementById("container1").querySelectorAll("div")
            for (i = 0; i < g.length; i++) {                                                            //sets a class for html elements to later apply styling
                g[i].setAttribute("class", "projectDiv")
            }

        }
       
    }
    
}


async function updateProject(projectId, brief, concept, progress, priority, mockup, design, research) {        //function to update a project
    var response = await fetch("/api/projects", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': localStorage.getItem('authorization') },
        body: JSON.stringify({
            Id: projectId,
            BriefStatus: brief,
            ResearchStatus: research,
            ConceptStatus: concept,
            DesignStatus: design,                                                                               //payload with new input values
            MockupStatus: mockup,
            Progress: progress,
            Priority: priority
        })
    })
    if (response.ok) {
        var info = await response.json()
    }
    else {                                                                                                      //recursion, if project wasn't updated, because of database connection
        await updateProject()
    }
}

async function removeProject(projectId) {                                                                       //function to remove a project
    var response = await fetch("/api/projects/" + projectId, {                                                  //parameter passed is the id of the button clicked, which helps find the specific project in the database to remove
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': localStorage.getItem('authorization') },
    })
    if (response.ok) {
        var info = await response.json()                                                                  
        return info.status;
    }
    else {
        await removeProject(projectId)                                                                             //recursion, in case of database connection error
    }

}
setup()                                                                                                         //calling Main function