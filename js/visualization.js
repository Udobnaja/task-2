(function (root) {
    var EMPTY = root.maze.EMPTY,
		WALL = root.maze.WALL,
		PATH = root.maze.PATH,
		CURRENT = root.maze.CURRENT;
	
	function visualization(maze, waves, path) {
		var rowElem = document.getElementsByClassName('maze__row'),
			j = 0,
			i = 0,
			point,
			PathTimer;
		
		var DrawWaveExpansion = function () {
			rowElem[waves[j].x].childNodes[waves[j].y].innerHTML = waves[j].weight;
			j++;

			if (j >= waves.length) {
				clearInterval(WaveTimer);
				PathTimer = setInterval(DrawPath, 50);
			}
		};
		
		var DrawPath = function () {
			if (path && path.length) {
				point = path[i];
				rowElem[point[1]].childNodes[point[0]].className += ' maze__cell_path';
				i++;

				if (i >= path.length) {
					point = path[0];
					rowElem[point[1]].childNodes[point[0]].className += ' maze__cell_current';
					clearInterval(PathTimer);
				}
			}
		};
		
		var WaveTimer = setInterval(DrawWaveExpansion, 10);
				
	}
	console.log(visualization);
    root.maze.visualization = visualization;
})(this);
