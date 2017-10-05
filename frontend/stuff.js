
function buttonPressed(){

    heightValue = document.getElementById("height").value;
    widthValue = document.getElementById("width").value;
    console.log(heightValue);
    console.log(widthValue);
    var siteURL = 'https://lwaz1cl0ol.execute-api.us-east-1.amazonaws.com/dev/generate_maze?height='+ heightValue.toString() +  '&width=' + widthValue.toString();
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
                    cell.className = "mazeCell";
                    cell.onmouseover ="this.mazeCell='hoveredMazeCell'"
                    if(sqr.right){cell.style.borderRightColor = "black";}
                    if(sqr.left){cell.style.borderLeftColor = "black";}
                    if(sqr.top){cell.style.borderTopColor = "black";}
                    if(sqr.bottom){cell.style.borderBottomColor = "black";}
                    if(sqr.start){cell.style.backgroundColor = "#11CC11";}
                    if(sqr.end){cell.style.backgroundColor = "red";}
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




                // for (var j = 0; j < 10; j++)
                // {
                //     var rowName = "row" + j.toString();
                //     var rowJS = document.createElement("div");
                //     rowJS.id = rowName;
                //     rowJS.className = "row";
                //     document.getElementById("jsBox").appendChild(rowJS);

                //     for (var i=0; i < 10; i++){
                //         var cellName = "cell" + i.toString();
                //         var cell = document.createElement("div");
                //         cell.id = cellName;
                //         cell.className = "mazeCell";
                //         var x = Math.random();
                //         if (x < 0.275) {
                //             cell.style.borderTopColor = "black";
                //         }
                //         var x = Math.random();
                //         if (x < 0.275) {
                //             cell.style.borderBottomColor = "black";
                //         }
                //         var x = Math.random();
                //         if (x < 0.275) {
                //             cell.style.borderLeftColor = "black";
                //         }
                //         var x = Math.random();
                //         if (x < 0.275) {
                //             cell.style.borderRightColor = "black";
                //         }
                //         rowJS.appendChild(cell)
                // }
                // }
