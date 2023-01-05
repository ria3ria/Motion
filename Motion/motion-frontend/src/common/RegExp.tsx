export const testId = (userID: string) => {
    const regExp = /^[a-z0-9]{5,20}$/;
    if(regExp.test(userID)) {
        return true;
    }
    return false;
}

export const testPw = (userPW: string) => {
    const regExp = /^[*~`!^\-_+<>@\#$%&a-zA-Z0-9]{5,30}$/;
    if(regExp.test(userPW)) {
        return true;
    }
    return false;
}

export const testPhoneNumber = (phoneNumber: string) => {
    const regExp = /^[0-9]{9,11}$/;
    if(regExp.test(phoneNumber)) {
        return true;
    }
    return false;
}

export const testName = (userName: string) => {
    const regExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9 ]{2,30}$/;
    if(regExp.test(userName)) {
        return true;
    }
    return false;
}

export const testDigitCode = (digitCode: string) => {
    const regExp = /^[0-9]{6}$/;
    if(regExp.test(digitCode)) {
        return true;
    }
    return false;
}