fetch ('http://localhost:8080/generate_maze?height=10&width=20').then(function(data){

    return data.json();

}).then(function(json){

    for (var y = 0; y < json.length; y++)
    {
        var rowName = "row" + y.toString();
        var rowSVR = document.createElement("div");
        rowSVR.id = rowName;
        rowSVR.className = "row";
        document.getElementById("svrBox").appendChild(rowSVR);

        for (var x = 0; x < json[y].length; x++)
        {
            var sqr = json[y][x];
            var cell = document.createElement("div");
            var cellName = "sqr" + x.toString();
            cell.id = cellName;
            cell.className = "mazeCell";
            if(sqr.right){cell.style.borderRightColor = "black";}
            if(sqr.left){cell.style.borderLeftColor = "black";}
            if(sqr.top){cell.style.borderTopColor = "black";}
            if(sqr.bottom){cell.style.borderBottomColor = "black";}
            if(sqr.start){cell.style.backgroundColor = "greenyellow";}
            if(sqr.end){cell.style.backgroundColor = "red";}
            rowSVR.appendChild(cell)
        }

    }

})
                for (var j = 0; j < 10; j++)
                {
                    var rowName = "row" + j.toString();
                    var rowJS = document.createElement("div");
                    rowJS.id = rowName;
                    rowJS.className = "row";
                    document.getElementById("jsBox").appendChild(rowJS);

                    for (var i=0; i < 10; i++){
                        var cellName = "cell" + i.toString();
                        var cell = document.createElement("div");
                        cell.id = cellName;
                        cell.className = "mazeCell";
                        var x = Math.random();
                        if (x < 0.275) {
                            cell.style.borderTopColor = "black";
                        }
                        var x = Math.random();
                        if (x < 0.275) {
                            cell.style.borderBottomColor = "black";
                        }
                        var x = Math.random();
                        if (x < 0.275) {
                            cell.style.borderLeftColor = "black";
                        }
                        var x = Math.random();
                        if (x < 0.275) {
                            cell.style.borderRightColor = "black";
                        }
                        rowJS.appendChild(cell)
                }
                }
