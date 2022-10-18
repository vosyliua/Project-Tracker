localStorage.clear()

document.getElementById('login').addEventListener('click', e => {
    e.preventDefault();
    const form = document.forms['userForm'];
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;
    Login(username, password)
    form.elements['username'].value = "";
    form.elements['password'].value = "";
})
document.getElementById('register').addEventListener('click', e => {
    e.preventDefault();
    const form = document.forms['userForm'];
    const usernameR = form.elements['username'].value;
    const passwordR = form.elements['password'].value;
    Register(usernameR, passwordR)
    form.elements['username'].value = "";
    form.elements['password'].value = "";
})




async function Login(username, password) {
    localStorage.clear()
    const token = 'Basic ' + btoa(`${username}:${password}`)
    console.log(token)
    if (username.length >= 6) {
        if (password.length >= 6) {
            const response = await fetch("/api/users", {
                method: 'GET',
                headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': token },
            })
            if (response.ok === true) {
                console.log("found in db")
                window.location = "https://localhost:7043/index/home/projects.html"
                localStorage.setItem('authorization', token)
                localStorage.setItem('Username', username)


            }
            if (response.status == 500) {
               await Login(username, password)
            }
            if(response.status == 401) {
                alert("Invalid Username Or Password")
            }

        }
    }
    else {
        alert("Password and Username need to be greater than 6 symbols in lenght")
    }   

}

async function Register(usernameR, passwordR) {
    if (usernameR.length >= 6) {
        if (passwordR.length >= 6) {
            console.log(usernameR + "in func")
            const response = await fetch("/api/usersR", {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    Username: usernameR,
                    Password: passwordR
                })
            })
            if (response.status == 200) {
                alert("Account Successfuly Registered")
            }
            if (response.status == 500) {
                await Register(usernameR, passwordR)
            }
            if(response.status == 409) {
                alert("Username Already Exists")
            }
        }
    }
    else {
        alert("Password and Username need to be greater than 6 symbols in lenght")
    }
}


