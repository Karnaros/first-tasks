export {addAnyNum, subtractAnyNum, multiplyAnyNum, divideAnyNum}

function addAnyNum(arg1, arg2){
    if(isInvalidInput(arg1, arg2)){
        return undefined;
    }

    return (BigInt(arg1) + BigInt(arg2)).toString();
}

function subtractAnyNum(arg1, arg2){
    if(isInvalidInput(arg1, arg2)){
        return undefined;
    }

    return (BigInt(arg1) - BigInt(arg2)).toString();    
}

function multiplyAnyNum(arg1, arg2){
    if(isInvalidInput(arg1, arg2)){
        return undefined;
    }

    return (BigInt(arg1) * BigInt(arg2)).toString();    
}

function divideAnyNum(arg1, arg2){
    if(isInvalidInput(arg1, arg2)){
        return undefined;
    }

    return (BigInt(arg1) / BigInt(arg2)).toString();    
}

function isInvalidInput(...args){
    let result = false;
    for (let arg of args) {
        result ||= (typeof(arg) !== "string") || !Boolean(arg) || isNaN(arg);
    }
    return result;
}