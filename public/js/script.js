// submit watcher
document.getElementById("form").addEventListener("submit", (e) => {

  // 1 - check the text input
  const $inputs = document.getElementsByClassName("form__to-fill");

  for (let i = 0; i < $inputs.length; i++) {
    if ($inputs[i].value.trim() === "") $inputs[i].parentNode.classList.add('form__item--error')
    else $inputs[i].parentNode.classList.remove('form__item--error')
  }

  // 2 - If no missing fields submit the form
  if (document.getElementsByClassName("form__item--error").length + document.getElementsByClassName("form__checkboxe--error").length === 0) {

    Swal.fire(
      'Registered Successfully!',
      'You will be redirected to the form again!',
      'success'
    )

    const serviceID = 'default_service';
    const templateID = 'template_ktnr8jh';

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        console.log('Sent!');
    }, (err) => {
        console.log(JSON.stringify(err));
    });

    setTimeout(function() {
      document.getElementById("form").submit();
    }, 5000);
  }

  // prevent send
  e.preventDefault()
})
