class Goods {
    #name;
    #price;
    #quantity;
    #description;

    constructor(name, price, quantity, description){
        this.#name = name;
        this.#price = price;
        this.#quantity = quantity;
        this.#description = description;
    }

    get name(){
        return this.#name;
    }

    get price(){
        return this.#price;
    }

    get quantity(){
        return this.#quantity;
    }
    
    get description(){
        return this.#description;
    }

    static filterGoods(str, arr) {
        if( (typeof(str) !== "string") ){
            return undefined;
        }

        let resultArr = [];
        let queryArr = str.split('|').map(subStr => subStr.split('&').map(query => query.split('-')));
        
        for (const item of arr) {
            if( Goods.testItemOnQueries(item, queryArr) ){
                resultArr.push(item);
            }
        }

        return resultArr;
    }

    static testItemOnQueries(item, queryArr){
        let result;
        
        for (const andArr of queryArr) {
            for (const query of andArr) {
                result = Goods.testItemOnQuery(item, query);
                if(!result) break;
            }

            if(result) break;
        }

        return result;
    }

    static testItemOnQuery(item, query){
        let property = query[0];
        let operator;
        let arg;
        let inversionFlag = false;
        let result;

        if(property[0] == '!') {
            inversionFlag = true;
            property = property.slice(1);
        }

        if(query.length == 2){
            if(isNaN(query[1][1])){
                operator = query[1].slice(0, 2);
                arg = query[1].slice(2);
            } else {
                operator = query[1][0];
                arg = query[1].slice(1);
            }
        } else if(query.length == 3){
            operator = query[1];
            arg = query[2].toLowerCase();
        } else {
            return false;
        }
        
        if( !( property in item) ){
            return false;                    
        }

        switch(operator){
            case '<':
                result = item[property] < arg;
                break;
            case '>':
                result = item[property] > arg;
                break;
            case '=':
                result = item[property] == arg;
                break;
            case '<=':
                result = item[property] <= arg;
                break;
            case '>=':
                result = item[property] >= arg;
                break;
            case 'contains':
                result = item[property].toLowerCase().includes(arg);
                break;
            case 'starts':
                result = item[property].toLowerCase().startsWith(arg);
                break;
            case 'ends':
                result = item[property].toLowerCase().endsWith(arg);
                break;
            default: 
                return false;
        }
        return inversionFlag ? !result : result;
    }
}

let goodsArr = [new Goods("Red apple", 60, 50, "Fresh fruit. Price and quantity are per 1kg"),
                new Goods("Green apple", 70, 25, "Fresh fruit. Price and quantity are per 1kg"),
                new Goods("Orange", 80, 0, "Fresh fruit. Price and quantity are per 1kg"),
                new Goods("Lemon", 65, 20, "Fresh fruit. Price and quantity are per 1kg"),
                new Goods("Cherry", 200, 30, "Fresh fruit. Price and quantity are per 1kg"),
                new Goods("Tomato", 100, 50, "Fresh vegetable. Price and quantity are per 1kg"),
                new Goods("Cucumber", 120, 40, "Fresh vegetable. Price and quantity are per 1kg"),
                new Goods("Onion", 40, 40, "Fresh vegetable. Price and quantity are per 1kg"),
                new Goods("Carrot", 50, 0, "Fresh vegetable. Price and quantity are per 1kg"),
                new Goods("Bottled water", 30, 200, "Carbonised water. Sold in 1.5l bottles"),
                new Goods("Apple juice", 100, 100, "Bottled juice. Sold in 1l bottles"),
                new Goods("Orange juice", 100, 0, "Bottled juice. Sold in 1l bottles"),
                new Goods("Cherry juice", 100, 50, "Bottled juice. Sold in 1l bottles"),
                new Goods("Lemonade", 55, 70, "Carbonised soft drink. Sold in 0.5l bottles"),
                new Goods("Coke", 70, 30, "Carbonised soft drink. Sold in 0.5l bottles"),
                new Goods("Pepsi", 70, 60, "Carbonised soft drink. Sold in 0.5l bottles"),]

let filteredGoods = Goods.filterGoods("description-starts-carb&!price-<=55|name-contains-r&quantity->0", goodsArr);
for (const item of filteredGoods) {
    console.log(item.name);
}