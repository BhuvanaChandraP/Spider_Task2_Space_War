let collect = [];

let check = document.getElementById("setting");
let check1;


function display (){
    if(document.getElementById("score").checked){
        check1 = document.getElementById("score").value;
    }
    if(document.getElementById("time").checked){
        check1 = document.getElementById("time").value;
    }
    localStorage.setItem("type",check1);
    console.log(check1);
        
}




function scoreBoard1 ()
{
    

    if((localStorage.getItem("array1")!= undefined) && (localStorage.getItem("array1") != null))      
    {
        
        collect = JSON.parse(localStorage.getItem("array1"));
        

        collect.sort(function(a, b){return b[1]-a[1]});
        for(i=0;i<collect.length;i++)
        {
            list.innerHTML  += '<li>' + collect[i][0] +  '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + collect[i][1] +'</li>'; 
           
        }
    }
   

}
scoreBoard1 ();