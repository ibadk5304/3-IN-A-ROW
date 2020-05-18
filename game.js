//RETRIEVAL OF THE JSON STARTING DATA FOR THE PUZZLE
//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
(function(){

    //var url= "https://www.mikecaines.com/3inarow/10x10a.php";
    var url = "https://www.mikecaines.com/3inarow/sample.json";
    fetch(url)
    .then(response =>response.json())
    .then((json)=>{
        
        var PuzzleArray =[]; // this array will break the nested array of row and column 
        var targetDiv = document.getElementById('theGame')

        

        var showTable = document.createElement('div');
        targetDiv.appendChild(showTable);
        showTable.setAttribute("id","showTable");

        var newTable = "<h1> Three in a row Puzzle gmae.</h1>";
         newTable += "<table border=1px solid #dddddd>";
        
        var rawData = json.rows;
        for(var i=0; i<rawData.length; i++)
        {
            newTable += `<tr>`;
            for(var j=0; j<rawData[i].length; j++)
            {
                PuzzleArray.push(rawData[i][j]);
                if(rawData[i][j].currentState == 0)
                {
                    newTable += `<td bgcolor ="white" width = "50px" height= "50px" value="${(i*5) + j}"></td>`;
                }
                else if(rawData[i][j].currentState == 1)
                {
                    newTable += `<td bgcolor ="grey"></td>`;
                }
                else if (rawData[i][j].currentState == 2)
                {
                    newTable += `<td bgcolor ="blue"></td>`;
                }
            }
            newTable += `</tr>`;
        }

        newTable += `</table>`;
        showTable.innerHTML = newTable;
        
        var cell = document.querySelectorAll("td");
        
        var source ={};
        var a=0;		
        for(let i =0; i<cell.length;i++)		 
        {   
            if(cell[i].bgColor == "white")
            {
                cell[i].addEventListener('click', function(e){
                    if(this.bgColor =='white')
                    {
                        this.bgColor ='grey';
                    }
                    else if(this.bgColor =='grey')
                    {
                        this.bgColor ='blue';
                    }
                    else if(this.bgColor =='blue')
                    {
                        this.bgColor ='white';
                    }
                    
                    if(this.bgColor == "white")
                    {
                        PuzzleArray[i].currentState = 0;						
                    }
                    else if(this.bgColor == "grey")
                    {
                        PuzzleArray[i].currentState = 1;									
                    }
                    else if(this.bgColor == "blue")
                    {
                        PuzzleArray[i].currentState = 2;									
                    }

                    // var rows = document.querySelectorAll('tr');
                    // console.log(rows);

                });
            }
        }
        //It will be used for innovative

        
        
        

        // Div created to display the result
        var tableDiv = document.createElement('div');
        targetDiv.appendChild(tableDiv).lastChild;
        tableDiv.setAttribute("id","displayResult");

        // Button created
        var button = document.createElement('button'); 
        var text  = document.createTextNode("Check");
        button.appendChild(text);
        var addButton = tableDiv.appendChild(button);
        button.setAttribute("id","checkResult");
        button.setAttribute("class","button");
        
// ****** show the result
        var p = document.createElement('p');
        tableDiv.appendChild(p);

        
        
        
        document.getElementById('checkResult').addEventListener('click',function(){
           
            // it will check all for "You did it message"
            var allCorrect = true;
            for(var i =0; i<PuzzleArray.length;i++)
            {
                if (PuzzleArray[i].currentState !== PuzzleArray[i].correctState)
                {
                    allCorrect = false;
                    break;
                }
            }


            // it will chech the selected ones, whether correct or not, 
            
            var puzzleBox = true;
            for(var i =0; i<PuzzleArray.length;i++)
            {
                
                if(PuzzleArray[i].canToggle == true && PuzzleArray[i].currentState == 1 || PuzzleArray[i].currentState == 2)
                {
                    if (PuzzleArray[i].currentState !== PuzzleArray[i].correctState)
                    {
                        console.log(PuzzleArray[i].currentState);
                        puzzleBox = false;
                        break;
                    }
                }
                
            }
            if(allCorrect == true)
            {
                p.innerHTML="";
                var pText  = document.createTextNode("You did it!");
                p.appendChild(pText);
            }
            else if(puzzleBox == false)
            {
                p.innerHTML="";
                var pText  = document.createTextNode("Something is wrong");
                p.appendChild(pText);
            }
            else if(puzzleBox == true)
            {
                p.innerHTML="";
                var pText  = document.createTextNode("So far so good");
                p.appendChild(pText);
            } 
            
        });

        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");

        x.setAttribute("id","checkError");
        tableDiv.appendChild(x);
        tableDiv.appendChild(document.createTextNode("Check Errors"));
       
        document.getElementById('checkError').onclick=function(){
            if ( this.checked ) 
            {
                var text = document.createTextNode("X");
                
                for(var i =0; i<PuzzleArray.length;i++)
                {
                    if(PuzzleArray[i].canToggle == true && PuzzleArray[i].currentState == 1 || PuzzleArray[i].currentState == 2)
                    {
                        if (PuzzleArray[i].currentState !== PuzzleArray[i].correctState)
                        {
                            cell[i].innerHTML= "X";
                        }
                    }
                }
            }  
            if(this.checked == false)
            {
                
                for(var i =0; i<PuzzleArray.length;i++)
                {
                    if(PuzzleArray[i].canToggle == true && PuzzleArray[i].currentState == 1 || PuzzleArray[i].currentState == 2)
                    {
                       
                            cell[i].innerHTML= "";
                    }
                }
            }
        }

        // Innovative feature code are below, which shows the blue and white colours after click 

        // Add the div for innovative feature
        var innovativeDiv = document.createElement('div');
        document.getElementById("showTable").appendChild(innovativeDiv);
        innovativeDiv.setAttribute("id","innovative");

        document.getElementById('checkResult').addEventListener('click',function(){

            var rows = document.querySelectorAll('tr');

            var grayInRow=[];
            var blueInRow=[];

            var grayInColumn=[];
            var blueInColumn=[];

            var countGrayInRow = 0;
            var countBlueInRow = 0;
            var countGrayInColumn = 0;
            var countBlueInColumn = 0;
    
            for(var i=0;i<rows.length; i++)
            {              
                countGrayInRow=0;
                countBlueInRow=0;
               for(var j=0;j<rows[i].cells.length; j++)
               {
                    if(rows[i].cells[j].bgColor == "grey")
                    {
                        countGrayInRow++;
                    }
                    else if(rows[i].cells[j].bgColor == "blue")
                    {
                        countBlueInRow++;
                    }
               }
               grayInRow.push(countGrayInRow);
               blueInRow.push(countBlueInRow);
    
            }
           
            for(var i=0;i<rows.length; i++)
            {
                countGrayInColumn = 0;
                countBlueInColumn = 0;
                for(var j=0;j<rows[i].cells.length; j++)
                {
                    if(rows[j].cells[i].bgColor == "grey")
                    {
                        countGrayInColumn++;
                    }
                    else if(rows[j].cells[i].bgColor == "blue")
                    {
                        countBlueInColumn++;
                    }
                }
                grayInColumn.push(countGrayInColumn);
                blueInColumn.push(countBlueInColumn);
            }

            console.log(countGrayInColumn);


            var innovativeText = "<div id='column-innovative'>";
    
            for(var i=0;i<grayInRow.length; i++)
            {
                //console.log("Raw "+(i+1)+" have "+grayInRow[i]+" grey and "+blueInRow[i]+" blue");
                //console.log("Column "+(i+1)+" have "+grayInColumn[i]+" grey and "+blueInColumn[i]+" blue");

                innovativeText += "<p>Column "+(i+1)+": "+grayInColumn[i]+" / "+blueInColumn[i]+"</p>";
            }

            innovativeText += "</div>";
            innovativeText += "<div id='row-innovative'>";
            for(var i=0;i<grayInRow.length; i++)
            {
                //console.log("Raw "+(i+1)+" have "+grayInRow[i]+" grey and "+blueInRow[i]+" blue");
                //console.log("Column "+(i+1)+" have "+grayInColumn[i]+" grey and "+blueInColumn[i]+" blue");

                innovativeText += "<p>Raw "+(i+1)+": "+grayInRow[i]+" / "+blueInRow[i]+"</p>";
            }
            innovativeText += "</div>";

            document.getElementById("innovative").innerHTML = innovativeText;
            
        })
       
    })

})()



