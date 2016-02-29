(function (root) {
    var map = root.maze.MAZE_Y;
    var path = root.maze.solution(map, 1, 0);
	var waves = root.maze.waves(map, 1, 0, true);
    document.querySelector('.outer').appendChild(
        root.maze.render(map)
    );
	var visualization = root.maze.visualization(map, waves, path);
})(this);
