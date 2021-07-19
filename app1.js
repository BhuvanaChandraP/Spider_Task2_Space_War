let collect = [];





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