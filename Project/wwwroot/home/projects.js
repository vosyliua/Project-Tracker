document.getElementById('logout').addEventListener('click', e => {
    window.localStorage.removeItem('Username');
    window.location.replace("https://localhost:7043/index");
    console.log("wtf")
})