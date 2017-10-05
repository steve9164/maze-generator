
function buttonPressed(){

    heightValue = document.getElementById("height").value;
    widthValue = document.getElementById("width").value;
    console.log(heightValue);
    console.log(widthValue);
    // 'https://lwaz1cl0ol.execute-api.us-east-1.amazonaws.com/dev/generate_maze?height='
    // 'http://localhost:8080/generate_maze?height='
    var siteURL = 'https://lwaz1cl0ol.execute-api.us-east-1.amazonaws.com/dev/generate_maze?height=' + heightValue.toString() +  '&width=' + widthValue.toString();
    fetch (siteURL).then(function(data){return data.json();}).then(function(json){

        var boxDelete = document.getElementById('holderBox');
        if (boxDelete === null){

        }else{
            boxDelete.remove();
        }
            box = document.getElementById('svrBox');
            box2 = document.createElement('box2');
            box2.id = "holderBox";
            box.appendChild(box2);


            for (var y = 0; y < json.length; y++)
            {
                var rowName = "row" + y.toString();
                var rowSVR = document.createElement("div");
                rowSVR.id = rowName;
                rowSVR.className = "row";
                box2.appendChild(rowSVR);

                for (var x = 0; x < json[y].length; x++)
                {
                    var sqr = json[y][x];
                    var cell = document.createElement("div");
                    var cellName = "sqr" + x.toString();
                    cell.id = cellName;

                    if(sqr.right){cell.style.borderRightColor = "black";}
                    if(sqr.left){cell.style.borderLeftColor = "black";}
                    if(sqr.top){cell.style.borderTopColor = "black";}
                    if(sqr.bottom){cell.style.borderBottomColor = "black";}
                    if(sqr.start){cell.style.backgroundColor = "#11CC11";}
                    if(sqr.end){cell.style.backgroundColor = "red";}
                    if(sqr.pos){cell.className = "mozeCell";} else {cell.className = "mazeCell";}
                    rowSVR.appendChild(cell);

                }

            }
            heightBox = 30 * heightValue;
            console.log(heightBox);
            widthBox = 30 * widthValue;
            console.log(widthBox);
            box.style.width = widthBox.toString(), "px";
            box.style.height = heightBox.toString(), "px";


        })
}
function solveButtonPressed(){

    console.log("PRESSED");
    var solCells = document.getElementsByClassName('mozeCell');
    console.log(solCells);
    var i;
    for (i = 0; i < solCells.length; i++) {
        cellChange = solCells[i];
        cellChange.classList.add("revealedCells");
    }


}


