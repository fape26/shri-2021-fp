import { allPass, equals, keys, length, prop, filter, gt, gte, compose, anyPass, not } from 'ramda'


/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const getStar = prop('star'),
    getSquare = prop('square'),
    getTriangle = prop('triangle'),
    getCircle = prop('circle');

const isWhite = equals('white'),
    isGreen = equals('green'),
    isRed = equals('red'),
    isBlue = equals('blue'),
    isOrange = equals('orange');

const filterGreen = filter(isGreen),
    filterBlue = filter(isBlue),
    filterRed = filter(isRed),
    filterOrange = filter(isOrange),
    filterWhite = filter(isWhite);

const countFigure = compose(length, keys),
    countGreen = compose(countFigure, filterGreen),
    countBlue = compose(countFigure, filterBlue),
    countRed = compose(countFigure, filterRed),
    countOrange = compose(countFigure, filterOrange),
    countWhite = compose(countFigure, filterWhite);

const isMoreOrEqThanTwo = (number) => gte(number, 2),
    isMoreThanTwo = (number) => gt(number, 2);

const isSquareSameColorTriangle = (colorObj) => equals(getSquare(colorObj), getTriangle(colorObj));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    compose(isWhite, getCircle),
    compose(isWhite, getTriangle),
    compose(isRed, getStar),
    compose(isGreen, getSquare)
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    isMoreOrEqThanTwo,
    countGreen
)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figure) => equals(countRed(figure), countBlue(figure));

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
    compose(isBlue, getCircle),
    compose(isRed, getStar),
    compose(isOrange, getSquare)
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    compose(isMoreThanTwo, countRed),
    compose(isMoreThanTwo, countGreen),
    compose(isMoreThanTwo, countBlue),
    compose(isMoreThanTwo, countOrange)
])

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    compose(isGreen, getTriangle),
    compose(equals(2), countGreen),
    compose(equals(1), countRed)
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), countOrange);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([
    compose(not, isRed, getStar),
    compose(not, isWhite, getStar)
])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4), countGreen);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
    compose(not, isWhite, getTriangle),
    compose(not, isWhite, getSquare),
    isSquareSameColorTriangle
])
