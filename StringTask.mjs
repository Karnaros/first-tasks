export {toCapitalCase, toProperSpacing, countWords, countUniqueWords};

function toCapitalCase(str) {
    if( (typeof(str) !== "string") ){
        return undefined;
    }
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

function toProperSpacing(str) {
    if( (typeof(str) !== "string") ){
        return undefined;
    }
    let punctuationArr = [' ', '.', ',', ';', ':', '!', '?', '-', '…'];

    return Array.from(str).reduce((result, current, index, arr) => {
        if( (current === ' ') ) return result;
        if( punctuationArr.includes(current) || !punctuationArr.includes(arr[index - 1]) ) return result + current;
        return result + ' ' + current;
    }, "");
}

function countWords(str){
    if( (typeof(str) !== "string") ){
        return undefined;
    }

    return str.split(/\P{Letter}+/u)
              .filter((str) => Boolean(str))
              .length;
}

function countUniqueWords(str){
    if( (typeof(str) !== "string") ){
        return undefined;
    }

    return str.toLowerCase()
              .split(/\P{Letter}+/u)
              .filter((str) => Boolean(str))
              .reduce((count, current) => {
                return count.set(current, (count.has(current) ? (count.get(current) + 1) : 1) );
              }, new Map())
}