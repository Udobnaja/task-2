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
            start_x = x, // Старт по оси X
            start_y = y, // Старт по оси Y
            f_i = 0, // Индекс для финиша
            Q, // Очередь 
            route =[], // Массив пар координат Маршрута к выходу
            arr_x = [1,0,-1,0], // Смещение координаты x
            arr_y = [0,1,0,-1]; // Смещение координаты y

        // Конструктор очереди 
        function Queue() {
            this.oldestIndex = 1;
            this.newestIndex = 1;
            this.repository = {};
        }
        // Размер очереди 
        Queue.prototype.size = function() {
            return this.newestIndex - this.oldestIndex;
        };
        // Добавление новых данных в очередь 
        Queue.prototype.enqueue = function(data) {
            this.repository[this.newestIndex] = data;
            this.newestIndex++;
        };
        // Удалить старые данные из очереди 
        Queue.prototype.dequeue = function() {
            var o_i = this.oldestIndex,
                n_i = this.newestIndex,
                deletedData;

            if (o_i !== n_i) {
                deletedData = this.repository[o_i];
                delete this.repository[o_i];
                this.oldestIndex++;

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
                y = obj[q.oldestIndex].i;
                x = obj[q.oldestIndex].j;

                // Движение по соседним точкам
                for (var k = 0; k < 4; k++) {
                    if(CheckPoints(x+arr_x[k],y+arr_y[k],maze) && (maze[y+arr_y[k]][x+arr_x[k]] === 0) && !((x+arr_x[k]===start_x) && (y+arr_y[k] === start_y))){
                        maze[y+arr_y[k]][x+arr_x[k]] = maze[y][x] + 1;
                        q.enqueue({i :y+arr_y[k], j:x+arr_x[k]});
                    }
                };

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

        /**
         * Функция возрата обратного пути - пока не стартовая точка, осматриваем точки вокруг и записываем с весом меньше на 1
         */

        function Backtrace(x,y){
            var i, j;
            do{
                i = x;
                j = y;
                
                route[route.length] = [y, x]; 
                
                for (var k = 0; k < 4; k++) {
                    if(CheckPoints(j+arr_y[k],i+arr_x[k], maze) && maze[i+arr_x[k]][j+arr_y[k]]==maze[i][j]-1 )
                    {
                        x = i+arr_x[k];
                        y = j+arr_y[k];
                    }
                };
            }
            while(i!==start_y || j!==start_x)
        }

        for (var i = 0; i < maze[maze.length-1].length; i++) {              
            /*Поиск выхода: Должен быть не стеной и удовлетворять условию y=M*/
            if (maze[maze.length-1][i]===0) {
                finish[f_i] = {x: i, y: maze.length-1};
                f_i++;
            }   
        }

        /* Если точка(и) финиша существуют(ет) - ищем маршрут, если нет - выдаем системное сообщение */
        if (finish.length){
            Q = new Queue(); // Создаем пустую очередь
            MarkNeighbors(Q); // Помечаем точки
            SearchLowestWeight(finish, maze); // Ищем точку финиша с самым маленьким весом 
            if(maze[finish.y][finish.x]!==0){
                Backtrace(finish.y,finish.x); // Восстановление пути
            } else alert('Путь не найден');
               
        } else {
            alert('У лабиринта нет выхода. Don\'t starve');
        }


        // todo: построить правильный маршрут к выходу
        route[route.length] = [start_x, start_y];
        return route.reverse();
    }

    root.maze.solution = solution;
})(this);
