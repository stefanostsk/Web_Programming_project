window.addEventListener("load", () => {
    

    // const togglePasswordSignIn = document.querySelector('#togglePasswordSignIn');
    // const passwordSignIn = document.querySelector('#password-signin');

    // togglePasswordSignIn.addEventListener('click', function (e) {
    // // toggle the type attribute
    // const type = passwordSignIn.getAttribute('type') === 'password' ? 'text' : 'password';
    // passwordSignIn.setAttribute('type', type);
    // // toggle the eye slash icon
    // this.classList.toggle('fa-eye-slash');
    // });

    if (document.querySelector('#add-phone'))
    document.querySelector('#add-phone').addEventListener('click', function(el) {
        const phoneDivs = document.querySelectorAll('#phones>div');
        let newId;
        if (phoneDivs.length===0) {
            newId = 2;
        }
        else {
            newId = Number(phoneDivs[phoneDivs.length - 1].id.slice(-1)) + 1;
        }
        console.log(newId)
        const newPhone = document.createElement('div');
        newPhone.innerHTML = `
            <input type="text" name="Phone${newId}" id="Phone-${newId}" placeholder="New phone number" style="margin-top:1em" ">
            <i class="fas fa-times delete-phone" id="x${newId}"></i>`;
        newPhone.id = `phone-div-${newId}`;
        document.querySelector('#phones').insertBefore(newPhone, el.target);
        document.querySelector(`#x${newId}`).addEventListener('click', function(el){
            console.log(`#phone-div-${newId}`);
            document.querySelector(`#phone-div-${newId}`).remove();
        })
        document.querySelector(`#Phone-${newId}`).focus();
        document.querySelector(`#Phone-${newId}`).select();
        
    })


    const togglePasswordSignUp = document.querySelector('#togglePassword');
    const passwordSignUp = document.querySelector('#password-signup');

    togglePasswordSignUp.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passwordSignUp.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordSignUp.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
    });
})

