// количество колонок в лабиринте
const columnsSize = 450;
// количество строк в лабиринте
const rowsSize = 450;
// размер клетки в лабиринте
const fieldSize = 7;
 // рамка (внешняя граница лабиринта)
const padding = 10;


// находим холст на странице по имени элемента
const canvas = document.querySelector('canvas');
// создаём переменную, через которую будем работать с холстом
const context = canvas.getContext('2d');

// количество тракторов
const tractorsNumber = 50;
// создаём новую карту лабиринта, которую будем отрисовывать
const map = generateMaze(columnsSize, rowsSize, tractorsNumber);

// переменные сдвига
var shiftX = 0;
var shiftY = 0;

// рисуем рамку и готовимся к отрисовке лабиринта
function init () {
	// устанавливаем размеры холста
	canvas.width = padding * 2 + columnsSize * fieldSize;
	canvas.height = padding * 2 + rowsSize * fieldSize;

	// цвет заливки
	context.fillStyle = 'black';
	// рисуем прямоугольник на весь холст с координатами левого верхнего и правого нижнего углов
	context.rect(0, 0, canvas.width, canvas.height);
	// закрашиваем его выбранным цветом
	context.fill();

	// делаем белое поле внутри рамки, чтобы потом нарисовать на нём стены
	context.fillStyle = 'white';
	// сообщаем скрипту, что сейчас будем рисовать новую фигуру
	context.beginPath();
	// рисуем прямоугольник, отступив от границ холста на толщину рамки
	context.rect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
	// закрашиваем его белым 
	context.fill();
}


// получаем значение ячейки из лабиринта
function getField (x, y) {
	// если хотя бы одна из координат не находится в границах карты
	if (x < 0 || x >= columnsSize || y < 0 || y >= rowsSize) {
		// выходим из функции и говорим, что такой ячейки нет
		return null;
	}
	// если дошли до сюда, значит координата верная и мы возвращаем её значение из карты лабиринта
	return map[y][x];
}

// отрисовываем карту
function drawMap () {
	// обрабатываем по очереди все ячейчки в каждом столбце и строке
	for (let x = 0; x < columnsSize; x++) {
		for (let y = 0; y < rowsSize; y++) {
			// если на карте лабиринта эта ячейка помечена как стена
			if (getField(x, y) === '▉') {
				// берём чёрный цвет
				context.fillStyle = 'black';
				// начинаем рисовать новую фигуру
				context.beginPath();
				// делаем прямоугольник на месте этой ячейки
				context.rect(padding + x * fieldSize, padding + y * fieldSize, fieldSize, fieldSize);
				// закрашиваем его чёрным
				context.fill();
			}
		}
	}
}

// рисуем вход и выход из лабиринта
function drawExit() {
	// берём белый цвет
	context.fillStyle = 'white';
	// начинаем рисовать новую фигуру
	context.beginPath();
	// рисуем белый прямоугольник над первой ячейкой лабиринта
	context.rect(padding, 0, fieldSize, padding);
	// закрашиваем его белым
	context.fill();

	// берём белый цвет
	context.fillStyle = 'white';
	// начинаем рисовать новую фигуру
	context.beginPath();

	// считаем размеры сдвига
	if (columnsSize % 2 == 0) {shiftX = fieldSize};
	if (rowsSize % 2 == 0) {shiftY = fieldSize};

	// рисуем белый прямоугольник под последней ячейкой лабиринта
	context.rect((columnsSize - 1) * fieldSize + padding - shiftX, rowsSize * fieldSize + padding - shiftY, fieldSize, padding + shiftY);
	// закрашиваем его белым
	context.fill();

}

// рисуем рамку и готовимся к отрисовке лабиринта
init();
// рисуем лабиринт
drawMap();
// делаем вход и выход из лабиринта
drawExit();