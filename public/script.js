async function sendMail() {

    const fileInput = document.getElementById("htmlFile");

    const formData = new FormData();

    formData.append("from", document.getElementById("fromEmail").value);
    formData.append("to", document.getElementById("to").value);
    formData.append("cc", document.getElementById("cc").value);
    formData.append("bcc", document.getElementById("bcc").value);
    formData.append("subject", document.getElementById("subject").value);
    formData.append("bodyType", document.getElementById("bodyType").value);
    formData.append("body", document.getElementById("body").value);

    if(fileInput.files[0]){
        formData.append("template", fileInput.files[0]);
    }

    await fetch("/send-mail", {
        method: "POST",
        body: formData
    });

    alert("Mail sent");
}