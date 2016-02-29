(function (root) {
    var EMPTY = root.maze.EMPTY,
        WALL = root.maze.WALL,
        PATH = root.maze.PATH,
        CURRENT = root.maze.CURRENT,
        shiftX = [1, 0, -1, 0], // Смещение координаты x
        shiftY = [0, 1, 0, -1]; // Смещение координаты y
    
     // Конструктор очереди 
    function Queue() {
        this.oldestIndex = 1;
        this.newestIndex = 1;
        this.repository = {};
    }
    // Размер очереди 
    Queue.prototype.size = function () {
        return this.newestIndex - this.oldestIndex;
    };
    // Добавление новых данных в очередь 
    Queue.prototype.enqueue = function (data) {
        this.repository[this.newestIndex] = data;
        this.newestIndex++;
    };
    // Удалить старые данные из очереди 
    Queue.prototype.dequeue = function () {
        var oldest = this.oldestIndex,
            newest = this.newestIndex,
            deletedData;

        if (oldest !== newest) {
            deletedData = this.repository[oldest];
            delete this.repository[oldest];
            this.oldestIndex++;

            return deletedData;
        }
    };

    /**
     * Функция проверяет не выходит ли точка за границы лабиринта
     */

    function CheckPoints(j, i, arr) {
        return (i >= 0 && j >= 0 && i < arr.length && j < arr[0].length) ? true : false;
    }

    /**
     * Функция клонирования лабиринта
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @returns {number[][]} clonedMaze скопированная карта либиринта
     */
    function cloneMaze(maze) {
        var clonedMaze = [];
        maze.forEach(function (subArray) {
            clonedMaze.push(subArray.concat());
        });
        return clonedMaze;
    }
    
    /**
     * Функция проходит по лабиринту и для каждой ячейки помещает все соседние точки равные нулю в очередь и присваивает им вес ячейки(родитель) + 1
     */
    
    function WaveExpansion(maze, startX, startY, isVisual) {
        var q = new Queue(), // Создаем пустую очередь
            obj,
            y,
            x,
            recordedWaves = [],
            k;
        q.enqueue({i : startY, j : startX}); // Помешаем в очередь стартовую точку
        if (isVisual) { //isVisual если будем отрисовывать
            recordedWaves.push({
                x : startY,
                y : startX,
                weight : 0
            });
        }
        while (q.size() !== 0) {
            obj = q.repository;
            y = obj[q.oldestIndex].i;
            x = obj[q.oldestIndex].j;

            // Движение по соседним точкам
            for (k = 0; k < 4; k++) {
                if (CheckPoints(x + shiftX[k], y + shiftY[k], maze) && (maze[y + shiftY[k]][x + shiftX[k]] === EMPTY) && !((x + shiftX[k] === startX) && (y + shiftY[k] === startY))) {
                    maze[y + shiftY[k]][x + shiftX[k]] = maze[y][x] + 1;
                    if (isVisual) {
                        recordedWaves.push({
                            x : y + shiftY[k],
                            y : x + shiftX[k],
                            weight : maze[y][x] + 1
                        });
                    }
                    q.enqueue({i : y + shiftY[k], j : x + shiftX[k]});
                }
            }

            q.dequeue();
        }
        if (isVisual) {
            return recordedWaves;
        } else {return maze; }
    }

    /**
     * Функция берет точки(у) лабиринта и выбирает с наименьшим весом
     */

    function SearchLowestWeight(finishData, maze) {
        var size = maze[finishData[0].y][finishData[0].x],
            i;
        for (i = 0; i < finishData.length; i++) {
            if (maze[finishData[i].y][finishData[i].x] <= size) {
                size = maze[finishData[i].y][finishData[i].x];
                finishData.x = finishData[i].x;
                finishData.y = finishData[i].y;
            }
           delete finishData[i];
        }
        return finishData;

    }

    /**
     * Функция возрата обратного пути - пока не стартовая точка, осматриваем точки вокруг и записываем с весом меньше на 1
     */

    function Backtrace(x, y, path, maze, startY, startX) {
        var i, j, k;
        do {
            i = x;
            j = y;
            
            path[path.length] = [y, x];
            
            for (k = 0; k < 4; k++) {
                if (CheckPoints(j + shiftY[k], i + shiftX[k], maze) && maze[i + shiftX[k]][j + shiftY[k]] === maze[i][j] - 1) {
                    x = i + shiftX[k];
                    y = j + shiftY[k];
                }
            }
        } while (i !== startY || j !== startX);
        return path;
    }

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        var finish = [], // Массив с точками финиша
            index = 0, // Индекс для финиша
            path = [], // Массив пар координат Маршрута к выходу
            clonedMaze = cloneMaze(maze),
            i;

        for (i = 0; i < clonedMaze[clonedMaze.length - 1].length; i++) {
            /*Поиск выхода: Должен быть не стеной и удовлетворять условию y=M*/
            if (clonedMaze[clonedMaze.length - 1][i] === 0) {
                finish[index] = {x : i, y : clonedMaze.length - 1};
                index++;
            }
        }
        
        /* Если точка(и) финиша существуют(ет) - ищем маршрут, если нет - выдаем системное сообщение */
        if (finish.length) {
            WaveExpansion(clonedMaze, x, y); // Помечаем точки
            SearchLowestWeight(finish, clonedMaze); // Ищем точку финиша с самым маленьким весом 
            if (clonedMaze[finish.y][finish.x] !== 0) {
                Backtrace(finish.y, finish.x, path, clonedMaze, y, x); // Восстановление пути
            } else {
                alert('Путь не найден');
            }
               
        } else {
            alert('У лабиринта нет выхода. Don\'t starve');
        }

        // Маршрут к выходу
        path[path.length] = [x, y];
        return path;
    }
    

    root.maze.solution = solution;
    root.maze.waves = WaveExpansion;
})(this);
