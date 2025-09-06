const form = document.querySelector("#form")

const fullName = document.querySelector("#full-name")

const email = document.querySelector("#email")

const orderNo = document.querySelector("#order-no")

const productCode = document.querySelector("#product-code")

const quan = document.querySelector("#quantity")

const complaintsGroup = document.querySelector("#complaints-group")

const complaints = complaintsGroup.querySelectorAll("input[type='checkbox']")

const complaintDescription = document.querySelector("#complaint-description")

const solutionsGroup = document.querySelector("#solutions-group")

const solutions = solutionsGroup.querySelectorAll("input[type='radio']")

const solutionDescription = document.querySelector("#solution-description")

const messageBox = document.querySelector("#message-box")

const clearBtn = document.querySelector("#clear-btn")


const validateForm = () => { 
  const obj = {
    "full-name": fullName.value.trim() !== "",
    email: (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value),
    "order-no": (/^2024\d{6}$/).test(orderNo.value),
    "product-code": (/^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/).test(productCode.value),
    quantity: Number(quan.value) >= 1,
    "complaints-group": Array.from(complaints).some((comp) => comp.checked),
    "complaint-description": document.querySelector("#other-complaint").checked ? complaintDescription.value.length >= 20 : true,
    "solutions-group": Array.from(solutions).some((sol) => sol.checked),
    "solution-description": document.querySelector("#other-solution").checked ? solutionDescription.value.length >= 20 : true 

  }

  return obj

}

const isValid = (validateFormObj) => {
  const res = Object.values(validateFormObj).every((prop) => prop === true)  // [true, true, false, false... true]

  // console.log(res)

  return res

}

const otherCheckbox = document.querySelector("#other-complaint")
otherCheckbox.addEventListener("change", () => {
  document.querySelector("#complaint-description-container").hidden = !otherCheckbox.checked
})

const otherRadio = document.querySelector("#other-solution")
const radioBtns = document.querySelectorAll("input[type='radio']")
 
radioBtns.forEach((radio) => { 
  radio.addEventListener("change", () => {
    // console.log(otherRadio.checked)
    document.querySelector("#solution-description-container").hidden = !otherRadio.checked    
  })
  
})
  
// otherRadio.addEventListener("change", () => {
//   document.querySelector("#solution-description-container").hidden = !otherRadio.checked;
// })



const setFieldStateColor = (elementOrFieldset, isValid) => {
  if(isValid){
    // set green
    elementOrFieldset.style.borderColor = "green"
  }
  else{
    elementOrFieldset.style.borderColor = "red"
  }
}

[fullName, email, orderNo, productCode, quan, complaintDescription, solutionDescription].forEach((field) => {

  field.addEventListener("change", () => {
    const validationObj = validateForm()
    setFieldStateColor(field, validationObj[field.id])
  })

})

complaints.forEach((comp) => {
  comp.addEventListener("change", () => {
    const validateObj = validateForm()
    setFieldStateColor(complaintsGroup, validateObj["complaints-group"])
  })
})

solutions.forEach((sol) => {
  sol.addEventListener("change", () => {
    const validateObj = validateForm()
    setFieldStateColor(solutionsGroup, validateObj["solutions-group"]) 
  })
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const validateObj = validateForm()
  if(isValid(validateObj)){
    messageBox.innerText = "Form submitted successfully!"
    messageBox.style.color = "green"
  }

  else{
    messageBox.innerText = "Please fix errors before submitting."
    messageBox.style.color = "red"

    setFieldStateColor(fullName, validateObj["full-name"])
    setFieldStateColor(email, validateObj["email"])
    setFieldStateColor(orderNo, validateObj["order-no"])
    setFieldStateColor(productCode, validateObj["product-code"])
    setFieldStateColor(quan, validateObj["quantity"])
    setFieldStateColor(complaintsGroup, validateObj["complaints-group"])
    setFieldStateColor(complaintDescription, validateObj["complaint-description"])
    setFieldStateColor(solutionsGroup, validateObj["solutions-group"])
    setFieldStateColor(solutionDescription, validateObj["solution-description"])

  }
})

clearBtn.addEventListener("click", (e) => {
  e.preventDefault()
  form.reset()

  document.querySelector("#complaint-description-container").hidden = true
  document.querySelector("#solution-description-container").hidden = true

  messageBox.innerText = ""
  messageBox.style.color = "";

  [fullName, email, orderNo, productCode, quan, complaintDescription, solutionDescription].forEach((field) => {
    field.style.borderColor = ""
  })

  complaintsGroup.style.borderColor = ""
  solutionsGroup.style.borderColor = ""
   
})
