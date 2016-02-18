(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

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
            start_x = x, // Старт по оси x
            start_y = y, // Старт по оси y
            f_i = 0, // Индекс для финиша
            Q, // Очередь 
            route =[]; // Массив пар координат Маршрута к выходу
        
        // todo: построить правильный маршрут к выходу
        return [
            [1, 0],
            [1, 1]
        ];
    }

    root.maze.solution = solution;
})(this);
