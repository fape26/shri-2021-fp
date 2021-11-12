import { allPass, equals, keys, length, prop, filter, gte, compose } from 'ramda'


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
    filterRed = filter(isRed);

const countFigure = compose(length, keys),
    countGreen = compose(countFigure, filterGreen),
    countBlue = compose(countFigure, filterBlue),
    countRed = compose(countFigure, filterRed);

const isMoreOrEqThanTwo = (number) => gte(number, 2)

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
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
