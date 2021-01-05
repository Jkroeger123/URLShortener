const sampleForm = document.querySelector("#contactForm");
const responseMessage = document.getElementById("response");

if(sampleForm){
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}

async function submitForm(e, form){
    e.preventDefault();

    const btnSubmit = document.getElementById('sendMessageButton');
    btnSubmit.disabled = true;

    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            id: form.elements[1].value,
            url: form.elements[0].value
        })
    }).then((res) => {
        if(res.status == 500){
            //ID already in Use
            responseMessage.innerHTML = "Error: ID already in use. Please try a different ID."
        }else if(res.status == 200){
            //Success
            responseMessage.innerHTML = "Short URL successfully created!"
        }else{
            //Unknown error
            responseMessage.innerHTML = "Error: an unknown error has occured."
        }

        btnSubmit.disabled = false;
    });


}

