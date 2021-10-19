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




//Article select

$(document).ready(function(){
  $("#dropdown_article").click(function(){
    $('div#dropdown_article > i').toggleClass('a_up');
    $(".drop_content").toggle();
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
  $('input[type="checkbox"].input').click(function(){
    if ($('input[type="checkbox"].input').is( ":checked" )){
      var inputValue = $(this).attr("value");
      $("." + inputValue).toggle();
      $(".default").hide();
    }
    else{
    var inputValue = $(this).attr("value");
      $("." + inputValue).hide();
      $(".default").show();

    }
  });
});





$(document).ready(function(){
  $(".refresh").click(function(){
    $('input[type="checkbox"].input:not([disabled]):checked').prop('checked', false);
    $(".Place").hide();
    $(".Person").hide();
    $(".Date").hide();
    $(".Concept").hide();
    $(".Organization").hide();
    $(".default").show();
  })
})

//Put the article in the div

fetch('js/schifo.txt',  {mode: 'no-cors'})
  .then(response => response.text())
  .then(text => document.getElementById("text1").innerHTML=(text))

