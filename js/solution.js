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

        /**
         * Функция проверяет не выходит ли точка за границы лабиринта
         */

        CheckPoints = function (j, i, arr) {
            return (i>=0 && j>=0 && i<arr.length && j<arr[0].length ) ? true : false;
        }

        /**
         * Функция проходит по лабиринту и для каждой ячейки помещает все соседние точки равные нулю в очередь и присваивает им вес ячейки(родитель) + 1
         */

        function MarkNeighbors(q){

            q.enqueue({i :start_y, j:start_x}); // Помешаем в очередь стартовую точку 

            var obj, y, x
            while (q.size()!=0){
                obj = q.repository;
                y = obj[q.oldestiNdex].i;
                x = obj[q.oldestiNdex].j;

                if(CheckPoints(x+1,y,maze) && (maze[y][x+1] === 0) && !((x+1===start_x) && (y === start_y))){
                        maze[y][x+1] = maze[y][x] + 1;
                        q.enqueue({i :y, j:x+1});
                }
                if(CheckPoints(x,y+1,maze) && (maze[y+1][x] === 0) && !((x===start_x) && (y+1 === start_y))){
                        maze[y+1][x] = maze[y][x] + 1;
                        q.enqueue({i :y+1, j:x});
                }
                if(CheckPoints(x-1,y,maze) && (maze[y][x-1] === 0) && !((x-1===start_x) && (y === start_y))){
                        maze[y][x-1] = maze[y][x] + 1;
                        q.enqueue({i :y, j:x-1});
                }
                if(CheckPoints(x,y-1,maze) && (maze[y-1][x] === 0) && !((x===start_x) && (y-1 === start_y)) ){         
                        maze[y-1][x] = maze[y][x] + 1;
                        q.enqueue({i :y-1, j:x});
                }

                q.dequeue();
            }
        }

        /**
         * Функция берет точки(у) лабиринта и выбирает с наименьшим весом
         */

        function SearchLowestWeight(data, maze){
            var size = maze[data[0].y][data[0].x];
            for (var i = 0; i < data.length; i++) {
                if(maze[data[i].y][data[i].x]<=size){
                    size = maze[data[i].y][data[i].x];
                    finish.x = data[i].x;
                    finish.y = data[i].y;
                }
               delete data[i]; 
            };

        }

        // todo: построить правильный маршрут к выходу
        return [
            [1, 0],
            [1, 1]
        ];
    }

    root.maze.solution = solution;
})(this);
