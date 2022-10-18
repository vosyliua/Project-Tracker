localStorage.clear()                                                                            //ensures the localstorage is cleared

document.getElementById('login').addEventListener('click', e => {                              //event listener for the login a user functionality
    e.preventDefault();
    const form = document.forms['userForm'];
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;
    Login(username, password)
    form.elements['username'].value = "";                                                       //after calling the login function, reset the input fields
    form.elements['password'].value = "";
})
document.getElementById('register').addEventListener('click', e => {                            //event listener for the register a user functionality
    e.preventDefault();
    const form = document.forms['userForm'];
    const usernameR = form.elements['username'].value;
    const passwordR = form.elements['password'].value;
    Register(usernameR, passwordR)
    form.elements['username'].value = "";                                                        //after calling the register function, reset the input fields
    form.elements['password'].value = "";
})




async function Login(username, password) {                                                      //login function 
    localStorage.clear()
    const token = 'Basic ' + btoa(`${username}:${password}`)                                    // creates a token, which is used for the auth header
    console.log(token)
    if (username.length >= 6) {
        if (password.length >= 6) {
            const response = await fetch("/api/users", {
                method: 'GET',
                headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': token },
            })
            if (response.ok === true) {
                console.log("found in db")
                window.location = "https://localhost:7043/index/home/projects.html"             //relocates to new static html file, sets two localstorage items
                localStorage.setItem('authorization', token)
                localStorage.setItem('Username', username)


            }
            if (response.status == 500) {
               await Login(username, password)                                                  //constant db connection errors for no reason, ensures user doesn't have to retry if not checked credentials
            }
            if(response.status == 401) {
                alert("Invalid Username Or Password")                                           //incorrect credentials
            }

        }
    }
    else {
        alert("Password and Username need to be greater than 6 symbols in lenght")
    }   

}

async function Register(usernameR, passwordR) {                                                 //user registration function
    if (usernameR.length >= 6) {
        if (passwordR.length >= 6) {
            console.log(usernameR + "in func")
            const response = await fetch("/api/usersR", {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    Username: usernameR,
                    Password: passwordR                                                           //payload of two attributes extracted from html elements
                })
            })
            if (response.status == 200) {
                alert("Account Successfuly Registered")
            }
            if (response.status == 500) {                                                        //constant db connection errors for no reason, ensures user doesn't have to retry if not checked credentials        
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


