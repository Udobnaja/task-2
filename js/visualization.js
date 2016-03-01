(function (root) {
    var EMPTY = root.maze.EMPTY,
		WALL = root.maze.WALL,
		PATH = root.maze.PATH,
		CURRENT = root.maze.CURRENT;
	
	function visualization(maze, waves, path) {
		var rowElem = document.getElementsByClassName('maze__row'),
			j = 0,
			i = 0,
			point;
		
		var DrawWaveExpansion = function () {
			this.repeater = requestAnimationFrame(DrawWaveExpansion);
			rowElem[waves[j].x].childNodes[waves[j].y].innerHTML = waves[j].weight;
				j++;
				if (j >= waves.length) {
					cancelAnimationFrame(this.repeater);
					DrawPath();
				}
		};
		
		DrawWaveExpansion();
		
		var DrawPath = function () {
			this.repeater = requestAnimationFrame(DrawPath);
			if (path && path.length) {
				point = path[i];
				rowElem[point[1]].childNodes[point[0]].className += ' maze__cell_path';
				i++;

				if (i >= path.length) {
					point = path[0];
					rowElem[point[1]].childNodes[point[0]].className += ' maze__cell_current';
					cancelAnimationFrame(this.repeater);
				}
			}
		};
				
	}
				
    root.maze.visualization = visualization;
})(this);
