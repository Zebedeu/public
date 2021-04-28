function validateName(text){
    if(!checkBlank(text)){
        let regName = /^[a-zA-Z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]{2,30}$/;
        if(!regName.test(text)){
            return 2;
        } else {
            return 0;
        }
    } else {
        return 1;
    }
}

function validateEmailAddress(text){
    if(!checkBlank(text)){
        let regEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!regEmail.test(text)){
            return 2;
        } else {
            return 0;
        }
    } else {
        return 1;
    }
}

function validateEmailAndPhoneAddress(text){
    if(!checkBlank(text)){
        let regEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if(regEmail.test(text) == true || text == parseInt(text, 10)){
            return 0;
        } else  {
            return 4;
        }
    } else {
        return 1;
    }
}


function validateNif(text){
    if(!checkBlank(text)){
        let regNif = /^[0-9a-zA-Z]+/;

        console.log(regNif.test(text))
        if(!regNif.test(text)){
            return 2;
        } else {
            return 0;
        }
    } else {
        return 1;
    }
}

// var outString = sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

function validatePassword(text){
    if(!checkBlank(text)){
        let regPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(!regPassword.test(text)){
            return 2;
        } else {
            return 0;
        }
    } else {
        return 1;
    }
}

function validateConfirmPassword(password, confirm_password){
    if(!checkBlank(confirm_password)){
        let regPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(!regPassword.test(confirm_password)){
            return 2;
        } else {
            if(password != confirm_password){
                return 3;
            }

            return 0;
        }
    } else {
        return 1;
    }
}

function validateBankAccountNo(bankAccountNo){
    let first4Chars = bankAccountNo.substring(0, 4);
    let lastChars = bankAccountNo.substring(4, bankAccountNo.length);
    let pattern = /^\d*$/;
    if(!bankAccountNo || bankAccountNo.length!= 25 || first4Chars!='AO06' || !pattern.test(lastChars)){
        return 1;
    } else {
        return 0;
    }
}

function validateBankAccountNo(bankAccountNo){
    let first4Chars = bankAccountNo.substring(0, 4);
    let lastChars = bankAccountNo.substring(4, bankAccountNo.length);
    let pattern = /^\d*$/;
    if(!bankAccountNo || bankAccountNo.length!= 25 || first4Chars!='AO06' || !pattern.test(lastChars)){
        return 1;
    } else {
        return 0;
    }
}

function checkBlank(text){
    if(!text){
        return 1;
    }

    return 0;    
}