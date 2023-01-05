import axios from "axios";

export type UserGrade = "PRODUCER" | "ARTIST" | "ADMIN";
export type DigitCodeType = "REGISTER" | "FINDID";

const instance = axios.create({
    timeout: 1000
});

export const canUseId = async(userID: string) => {
    let result = false;
    await instance.post("/api/user/can-use-id", null,{ params: {
        userID
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const canUsePhoneNumber = async(phoneNumber: string) => {
    let result = false;
    await instance.post("/api/user/can-use-phonenumber", null,{ params: {
        phoneNumber
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const findId = async(phoneNumber: string, digitCode: string) => {
    let userID;
    await instance.post("/api/user/find-id", null,{ params: {
        phoneNumber, digitCode
    }}).then((response) => {
        userID = response.data;
    })
    return userID;
}

export const changePw = async(phoneNumber: string, userPW: string, digitCode: string) => {
    let result = false;
    await instance.post("/api/user/change-pw", null,{ params: {
        phoneNumber, userPW, digitCode
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const changeName = async(phoneNumber: string, userName: string) => {
    let result = false;
    await instance.post("/api/user/change-name", null,{ params: {
        phoneNumber, userName
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const sendDigitCode = async(phoneNumber: string, type: DigitCodeType) => {
    let result = false;
    await instance.post("/api/user/send-digitcode", null,{ params: {
        phoneNumber, type
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const checkDigitCode = async(phoneNumber: string, digitCode: string, type: string) => {
    let result = false;
    await instance.post("/api/user/check-digitcode", null,{ params: {
        phoneNumber, digitCode, type
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const login = async(userID: string, userPW: string) => {
    let result = false;
    await instance.post("/api/user/login", null,{ params: {
        userID, userPW
    }}).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const isLogin = async() => {
    let result = false;
    await instance.post("/api/user/is-login"
    ).then((response) => {
        if(response.data) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

export const getUserInfo = async() => {
    let result;
    await instance.post("/api/user/get-info"
    ).then((response) => {
        result = response.data;
    })
    return result;
}