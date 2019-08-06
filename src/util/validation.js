

export const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
       switch (rule) {
           case 'isEmail':
              isValid = isValid && emailValidator(val);
              break
            case 'minLength':
              isValid = isValid && minLengthValidator(val, rules[rule]);
              break
            case 'equalTo':
              isValid = isValid && equalToValidator(val, connectedValue[rule]);
              break
            default:
              console.log("default rule", rule)
              isValid = true;
       }
   }
   return isValid
}

const emailValidator = val => {
    return val.match(/\S+@\S+\.\S+/) != null
}

const minLengthValidator = (val, minLength) => {
    return typeof val == 'string' && 
        val.length >= minLength
}

const equalToValidator = (val, otherVal) => {
    return typeof val == 'string' && 
        val === otherVal
}