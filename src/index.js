module.exports = function check(str, bracketsConfig) {

    let isValid = true;

    bracketsConfig.forEach(function (config) {
        while (((str.split(config[0]).length - 1) !== 0) && ((str.split(config[1]).length - 1) !== 0)) {
            let leftSymbol = '';
            let rightSymbol = '';
            if (config[0] === config[1]) {
                // |()|||
                leftSymbol = str.indexOf(config[0]);
                rightSymbol = str.indexOf(config[1], leftSymbol + 1);
            } else {
                // [])(({})
                leftSymbol = str.lastIndexOf(config[0]);
                rightSymbol = str.indexOf(config[1], leftSymbol);
            }

            if ((leftSymbol - rightSymbol - 1) % 2 !== 0) {
                isValid = false;
                return;
            }

            //  (|))|(|)| left = 1, right = 4,
            // 
            str = str.slice(0, leftSymbol) + str.slice(leftSymbol + 1);
            // ())|(|)|
            str = str.slice(0, rightSymbol - 1) + str.slice(rightSymbol);
            // ())(|)|
        }
    });

    if (str !== '') {
        isValid = false;
    }

    return isValid;
}

// [])(({})
// [])(
// )(

// 1. Проверить количество открывающихся и закрывающихся равно:
//  - найти кол-во открывающихся, записать в переменную open
//  - найти кол-во закрывающихся, записать в переменную close
//  - сравнить open == close
//  если количество равно, вернуть true, иначе false

// 2. Проверить правильность вложенности скобок:
// - перебрать строку, найти последнюю открывающуюся скобку
// - перебрать строку, найти следующую закрывающуюся после последней открывающейся скобки скобку
// - если закрывающаяся скобка есть, вырезать эту пару и повторить перебор
// - иначе вернуть false

// |()|||
// ()||
// ()

// ||||(|)|(|)|
// ||(|)|(|)|
// (|))|(|)|
// ())(|)|


// 3. Проверить количество символов, т.к. открывающиеся и закрывающиеся в || одинаковы:
//  - посчитать количество символов
//  - если четное вернуть true
//  - иначе вернуть false

// 4. Проверить правильность вложенности скобок с ||
// - перебрать строку, найти первую | 
// - перебрать строку, найти следующую | после первой |
// - если между ними ничего нет, вернуть true
// - иначе проверить на четность
// - если количество скобок внутри нечетное, вернуть false
// - иначе вырезать текущую пару ||
