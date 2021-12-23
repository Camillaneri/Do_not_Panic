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

      $('div#dropdown_article > i').removeClass('a_up');
      $(".drop_content").hide();
    
  });
})

//Article select

$(document).ready(function (){
  $("#dropdown_article").click(function (){
    $('div#dropdown_article > i').toggleClass('a_up');
    $(".drop_content").toggle();
  });
})


//Metadata display dropdown

$(document).ready(function(){
  $(".meta_down_one").click(function(){
    $(".meta_down_one").toggleClass("a_up");
    $(".meta_one").toggleClass("meta_down");
    $(".show_meta_one").toggleClass("show_meta_down");
      
  });
})

$(document).ready(function(){
  $(".meta_down_two").click(function(){
    $(".meta_down_two").toggleClass("a_up");
    $(".meta_two").toggleClass("meta_down");
    $(".show_meta_two").toggleClass("show_meta_down");
    var height = $("metadata").height();
    console.log(height)
  });
})

$(document).ready(function(){
  $(".meta_down_three").click(function(){
    $(".meta_down_three").toggleClass("a_up");
    $(".meta_three").toggleClass("meta_down");
    $(".show_meta_three").toggleClass("show_meta_down");
  });
})

//Metadata checkbox

$(document).ready(function() {
  

  $('input[type="checkbox"].input').click(function(){
    if ($('input[type="checkbox"].input').is( ":checked" )){
      var inputValue = $(this).attr("value");
      $("." + inputValue).toggle();
      $(".default").hide();

      var numberOfChecked = $('input[type="checkbox"].input:checked').length;
      switch (numberOfChecked){
        case 1:
          $(".article").css("height", "77%");
          //if($("div.meta_one").hasClass("meta").toString() == "true"){
            //$(".article").css("height", "66%");}
          break;
  
        case 2:
          $(".article").css("height", "69%");
          break;
        
        case 3:
          $(".article").css("height", "62%");
          break;
            
        case 4:
          $(".article").css("height", "52%");
          break;
  
        case 5:
          $(".article").css("height", "45%");
          break;
      }
    }

    else{
    var inputValue = $(this).attr("value");
      $("." + inputValue).hide();
      $(".MetaFocusAll").hide();
      $(".MetaFocus").hide();
      $(".default").show();
      var numberOfChecked = $('input[type="checkbox"].input:checked').length;
      switch (numberOfChecked){
        case 0: 
          $(".article").css("height", "83%");
          break;

        case 1:
          $(".article").css("height", "77%");
          break;
  
        case 2:
          $(".article").css("height", "69%");
          break;
        
        case 3:
          $(".article").css("height", "62%");
          break;
            
        case 4:
          $(".article").css("height", "52%");
          break;

      }
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
    $(".article").css("height", "83%");
  })
})

$(document).ready(function(){
  $("#team_explain_Camilla").click(function(){
    $('#team_explain_Camilla').toggleClass('a_up');
    $('.team_box').toggleClass('team_box_scroll');
    $('#Camilla').toggleClass('fit');
    $("div#Camilla > div.explain").toggle();
  });
})

$(document).ready(function(){
  $("#team_explain_Giorgia").click(function(){
    $('#team_explain_Giorgia').toggleClass('a_up');
    $('.team_box').toggleClass('team_box_scroll');
    $('#Giorgia').toggleClass('fit');
    $("div#Giorgia > div.explain").toggle();
  });
})

$(document).ready(function(){
  $("#team_explain_Giulia").click(function(){
    $('#team_explain_Giulia').toggleClass('a_up');
    $('.team_box').toggleClass('team_box_scroll');
    $('#Giulia').toggleClass('fit');
    $("div#Giulia > div.explain").toggle();
  });
})

$(document).ready(function(){
  $(".lens_menu_icon").click(function(){
    $('div.lensbox input').prop('checked', true);
    $(self).hide();
  })
})

$(document).ready(function(){
  $(".info_meta").click(function(){
    $(".info_meta_explain").show("slow")
  })
})

$(document).ready(function(){
  $(".close_info_meta").click(function(){
    $(".info_meta_explain").hide("slow")
  })
})