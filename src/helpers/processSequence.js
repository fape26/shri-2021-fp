/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import { allPass, compose, gt, length, when, lt, not, prop, test, tap, andThen } from 'ramda';
import Api from '../tools/api';



const api = new Api();
const getAnimalById = (id) => api.get(`https://animals.tech/${id}`)({});
const getTech = api.get('https://api.tech/numbers/base');

const getBinary = (input) => getTech({from: 10, to: 2, number: input});

const getValue = prop('value'),
    getWriteLog = prop('writeLog'),
    getSuccess = prop('handleSuccess'),
    getError = prop('handleError'),
    getResult = prop('result');


const isNumber = test(/^\d+(\.\d+)?$/),
    isValidateValueLength = compose(
    allPass([gt(10), lt(2)]),
    length,
);

const isValidatedValue = compose(
    allPass([isValidateValueLength,
    isNumber
    ]),
    getValue
);

const isNotValidatedValue = compose(
    not,
    isValidatedValue
);

const parseNumber = compose(Math.round, parseFloat, getValue),
    divideThree = (input) => input % 3,
    powNumber = (input) => Math.pow(input, 2);

const logError = (input) => getError(input)('ValidationError')

const processSequence = (input) => {
    
    const writeLog = getWriteLog(input);
    const handleSuccess = getSuccess(input);
    const logInput = compose(writeLog, getValue);

    const result = compose(
        when(
            isValidatedValue,
            compose(
                andThen(handleSuccess),
                andThen(getResult),
                andThen(getAnimalById),
                andThen(tap(writeLog)),
                andThen(divideThree),
                andThen(tap(writeLog)),
                andThen(powNumber),
                andThen(tap(writeLog)),
                andThen(length),
                andThen(tap(writeLog)),
                andThen(getResult),
                getBinary,
                tap(writeLog),
                parseNumber
            )
        ),
        when(
            isNotValidatedValue,
            tap(logError)
        ),
        tap(logInput)
    )

    result(input);
}

export default processSequence;
