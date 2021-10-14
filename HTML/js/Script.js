// JavaScript Document


//function doIt() {
//  $( ".articles" ).show( "slow" );
//}

//$( "#hide_show" ).click( doIt );

//Archive hide and show functions

$(document).ready(function(){
  $("#first_issue_show").click(function(){
  $('div#first_issue_show > i').toggleClass('a_left');
  $("#first_issue_article").toggle("slow")});
})

$(document).ready(function(){
  $("#second_issue_show").click(function(){
  $('div#second_issue_show > i').toggleClass('a_left');
  $("#second_issue_article").toggle("slow")});
})

$(document).ready(function(){
  $("#therd_issue_show").click(function(){
  $('div#therd_issue_show > i').toggleClass('a_left');
  $("#therd_issue_article").toggle("slow")});
})

//Side menu functions

$(document).ready(function(){
  $("#menu").click(function(){
    $('div#menu > i').toggleClass('a_left');
    $(".content_viewer").toggleClass("move");
  });
})

//Metadata display dropdown

$(document).ready(function(){
  $(".meta_down_one").click(function(){
    $(".meta_down_one").toggleClass("a_up");
    $(".meta_one").toggleClass("meta_down");
  });
})

$(document).ready(function(){
  $(".meta_down_two").click(function(){
    $(".meta_down_two").toggleClass("a_up");
    $(".meta_two").toggleClass("meta_down");
  });
})

$(document).ready(function(){
  $(".meta_down_three").click(function(){
    $(".meta_down_three").toggleClass("a_up");
    $(".meta_three").toggleClass("meta_down");
  });
})

//Metadata checkbox

$(document).ready(function() {
                $('input[type="checkbox"].input').click(function() {
                  if ($('input[type="checkbox"]').hasClass("input")){
                    var inputValue = $(this).attr("value");
                    
                    $("." + inputValue).toggle();
                    $(".default").hide();
                  };
      
                });
 });


$(document).ready(function(){
  $(".refresh").click(function(){
    $("input:not([disabled]):checked").prop('checked', false);
    $(".Place").hide();
    $(".Person").hide();
    $(".Date").hide();
    $(".Concept").hide();
    $(".Organization").hide();
    $(".default").show();
  })
})


/*
$(document).ready(function(){
  var file = FileReader.readAsText("National Geographic, 7 ancient sites.txt")
  document.getElementById("text1").innerHTML = file;
})

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

readTextFile("National Geographic, 7 ancient sites.txt");




$.get("schifo.txt", function(data) {
     document.getElementById("text1").src=data;
});


*/




var data = "https://github.com/Camillaneri/Vitale_Vitali/blob/main/schifo.txt"
// Show Error When Use Fetch Method With Import Method
fetch(data)
.then(function(response) {
   return response
}).then(function(data) {
console.log(data)
  return data.text()
}).then(function(Normal) {
  console.log(Normal)
  document.getElementById("text1").innerHTML = Normal;
}).catch(function(err) {
  console.log('Fetch problem show: ' + err.message);
});



