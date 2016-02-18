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

        // Конструктор очереди 
        function Queue() {
            this.oldestiNdex = 1;
            this.newestiNdex = 1;
            this.repository = {};
        }
        // Размер очереди 
        Queue.prototype.size = function() {
            return this.newestiNdex - this.oldestiNdex;
        };
        // Добавление новых данных в очередь 
        Queue.prototype.enqueue = function(data) {
            this.repository[this.newestiNdex] = data;
            this.newestiNdex++;
        };
        // Удалить старые данные из очереди 
        Queue.prototype.dequeue = function() {
            var o_i = this.oldestiNdex,
                n_i = this.newestiNdex,
                deletedData;

            if (o_i !== n_i) {
                deletedData = this.repository[o_i];
                delete this.repository[o_i];
                this.oldestiNdex++;

                return deletedData;
            }
        };

        // todo: построить правильный маршрут к выходу
        return [
            [1, 0],
            [1, 1]
        ];
    }

    root.maze.solution = solution;
})(this);
