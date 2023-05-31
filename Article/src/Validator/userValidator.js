const mongoose = require('mongoose')


function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // w use for char * use for breakpoint $ for end
  return regex.test(emailAdress)


}

  const isValidPassword = function (password) { return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))}


  function isValidId(Id){
    let regex = /^[0-9a-fA-F]{24}$/
    return regex.test(Id)
}

const isValidString = (String) => {
    return /\d/.test(String)
  }


module.exports= {isEmail,isValidPassword, isValidId, isValidString}