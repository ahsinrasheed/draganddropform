document.addEventListener("DOMContentLoaded", function () {
    let lists = document.getElementsByClassName("btn");
    let rightContainer = document.getElementById("right");
  
    // Add EventListener to all Button
    for (list of lists) {
      list.addEventListener("dragstart", function (e) {
        dragHandle(e);
      });
    }
  
    // Handle Drag and Drop Function
    function dragHandle(e) {
      let select = e.target;
  
      rightContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      rightContainer.addEventListener("drop", function (e) {
        let value ='';
        let inputType = select.id;
        // Get the label based on the input type
        let label =
          inputType.charAt(0).toUpperCase() + inputType.slice(1) + " Field";
        // Create a form element with the specified input type and label
        createFormElement(inputType, label, value);
  
        select = null;
      });
    }
  
    // ========== Create Form ============
  
    function createFormElement(inputType, label, value) {
      let newForm = document.createElement("div");
      newForm.classList.add("formDiv");
      newForm.draggable = true;
      newForm.innerHTML = `
              <div>
                  <label for="${inputType}">${label}</label>
                  <input type="${inputType}" value="${value}" class=${inputType} required />
              </div>
            `;
      rightContainer.appendChild(newForm);
    }
  
    // Add submit event listener to the submit button
    let submitButton = document.getElementById("submitBtn");
    submitButton.addEventListener("click", function () {
      handleSubmit();
    });
  });
  
  function formValidation() {
    let inputFields = document.querySelectorAll(".formDiv input");
    let isValid = true;
  
    inputFields.forEach((inputField) => {
      if (inputField.hasAttribute("required") && inputField.value.trim() === "") {
        isValid = false;
        alert(`Please fill in the ${inputField.getAttribute("type")} field.`);
      }
  
      if (
        inputField.classList.contains("email") &&
        !validateEmail(inputField.value)
      ) {
        isValid = false;
        alert("Please enter a valid email address.");
      }
      if (inputField.type === "checkbox" && !inputField.checked) {
          checkbox.click();
          isValid = false;
          alert(`Please check the ${inputField.getAttribute("type")} field.`);
        }
    });
  
    return isValid;
  }
  
  function handleSubmit() {
    if (formValidation()) {
      let formElements = [];
      let inputFields = document.querySelectorAll(".formDiv input");
  
      inputFields.forEach((inputField) => {
        formElements.push({
          type: inputField.getAttribute("type"),
          // label: inputField.parentElement.querySelector("label").innerText,
          value: inputField.value,
        });
      });
  
      // Save form data in JSON format to localStorage
      localStorage.setItem("formData", JSON.stringify(formElements));
      alert('Form submit Successfully ')
  
      // Retrieve and log the form data from localStorage
      let retrievedData = localStorage.getItem("formData");
      console.log("Retrieved Form Data:", JSON.parse(retrievedData));
    }
  }
  
  function validateEmail(emailValue) {
      // Add  email validation
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailValue.match(validRegex)) {
          return true;
      } 
    return emailValue.includes("@");
  }
  