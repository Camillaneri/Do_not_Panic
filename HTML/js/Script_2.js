function issue_selected(issue_id, name_article){
  localStorage.clear();
  var newWin = window.open("articles_viewer.html", "_self");
      readIssues(issue_id, name_article);
  }

function from_issue(){
  var issue_id = localStorage.issue_id;
  var name_article = localStorage.name_article;
  var articles = JSON.parse(localStorage.articles);
  var sources = JSON.parse(localStorage.sources);
  document.getElementById("article_1_name").innerHTML=articles[0];
  document.getElementById("article_2_name").innerHTML=articles[1];
  document.getElementById("article_3_name").innerHTML=articles[2];
  document.getElementById("article_1_source").href=sources[0];
  document.getElementById("article_2_source").href=sources[1];
  document.getElementById("article_3_source").href=sources[2];
  if (name_article == ""){
    document.getElementById("article_1").click();
    document.getElementById("article_2").click();
    document.getElementById("article_3").click();
  } else {
    for (c=0; c<3; c++){
      if (articles[c]== name_article){
      var article_pointer =  "article_" + (c+1);
      document.getElementById(article_pointer).click();
      }
    }
  }
  }
// glgggluilglglfyllyufffffffffuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu//
/*[].forEach.call(document.querySelectorAll('div > ul > li a'), function (document) {
  document.addEventListener('mouseover', slideUnder);
  document.addEventListener('mouseout', slideLeft);
});

function slideUnder() {
  var ciccino = document.getElementById("hr_lens");
  this.dataset.initialInlineColor = this.style.color;
  ciccino.style.margin-right = ciccino.style.margin-right;
  this.style.color = 'red';
}

function slideLeft() {
  this.style.color = this.dataset.initialInlineColor;
}*/
/*function hover1(){
  var myPara = document.getElementById("hr_lens");
  myPara.style.backgroundColor = red;
}
/*  function hover1(){
    var iconName
    var myPara = document.getElementById("hr_lens");
    myPara.style.margin-right = "87%";

function hover(element)
{
    element.style.backgroundColor = "red";
}
function hoverOff(element)
{
    element.style.backgroundColor = "#000079";
}
*/
//GIUSTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
/*function hover1(){
  var myPara = document.getElementById("hr_lens");
  myPara.style.marginRight = "87%";
}
function hoverOff1(){
  var myPara = document.getElementById("hr_lens");
  myPara.style.marginRight = "0%";
}*/
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function hover(obj) {
  var myPara = document.getElementById("hr_lens");

  switch (obj.id) {
    case "future":
      myPara.style.marginRight = "86%";
      break;
    case "Y2000s":
      myPara.style.marginRight = "71.5%";
      break;
    case "Y80s":
      myPara.style.marginRight = "58%";
      break;
    case "Y40s":
      myPara.style.marginRight = "43.5%";
      break;
    case "Y1800s":
      myPara.style.marginRight = "29%";
      break;
    case "Y300s":
      myPara.style.marginRight = "14.5%";
      break;
    case "no_style":
      myPara.style.marginRight = "0%";
      break;
  }
}

function hoverOff(){
  var myPara = document.getElementById("hr_lens");
  myPara.style.marginRight = "0%";
}
/*
function hover(element){
  if element= 
  var myPara = document.getElementById("hr_lens");
  myPara.style.marginRight = "87%";
}
function hoverOff1(){
  var myPara = document.getElementById("hr_lens");
  myPara.style.marginRight = "0%";
}*/
//ggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllllllllllllllll//



  function article_selector(issue, article, num_article){
    var articles = JSON.parse(localStorage.articles);
    var sources = JSON.parse(localStorage.sources);
    console.log(issue, article, articles, sources);
    for (i=0; i<3; i++){
      if (num_article == 3){
  		var name =  "/data/" + issue + "/" + articles[i] + ".txt";
      var id = "text_" + num_article + "_" + (i+1);
      populator (name, id);
      }
      else if (articles [i] == article){
      var name =  "/data/" + issue + "/" + articles[i] + ".txt";
      var id = "text_" + num_article + "_1";
      populator (name, id);
      }
      else if (num_article == 2){
        for (t=0; t<2; t++){
          for (c=0; c<3; c++){
            if (article[t]== articles[c]){
            var name =  "/data/" + issue + "/" + articles[c] + ".txt";
            var id = "text_" + num_article + "_" + (t+1);
            populator (name, id);
            }
          }
      }
    }
    }
  }

  function populator(article, position){
    fetch(article)
 			 .then(response => response.text())
  				.then(text => document.getElementById(position).innerHTML=(text))
                return;
  }

  function readIssues(issue_id, name_article){
    readJSon("js/issues.json", function(content){
      var issues = JSON.parse(content);
      var len = issues.length;
      var articles =[];
      var sources =[];
      for (i=0; i<len; i++){
        if (issues[i].name == issue_id){
        articles = issues[i].articles;
        sources = issues[i].sources;
        localStorage.setItem("issue_id", issue_id);
        localStorage.setItem("name_article", name_article);
        localStorage.setItem("articles", JSON.stringify(articles));
        localStorage.setItem("sources", JSON.stringify(sources));
        }
        }
      })
      }

      function readJSon(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
        

function getCheckedBoxes(chkboxClass) {
  var checkboxes = document.getElementsByName(chkboxClass);
  var checkboxesChecked = [];
  var id_list = [];
  for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
      id_list.push("article_" + (i+1));
      checkboxesChecked.push(checkboxes[i]);
     }
    }
    
    var issue_id= localStorage.issue_id;
    var articles = JSON.parse(localStorage.articles);
    var sources = JSON.parse(localStorage.sources);

    if (checkboxesChecked.length == 1){
      document.getElementById('one_article').classList.add('display');
      document.getElementById('two_article').classList.remove('display');
      document.getElementById('three_article').classList.remove('display');
      for (c=0; c<3; c++){
        if (checkboxes[c].checked) {
        var article_pointer =  "article_" + (c+1) + "_name";
        var name_article = document.getElementById(article_pointer).innerHTML;
        }
      }
      article_selector(issue_id, name_article, 1);
      }
    else if (checkboxesChecked.length == 2){
      document.getElementById('one_article').classList.remove('display');
      document.getElementById('two_article').classList.add('display');
      document.getElementById('three_article').classList.remove('display');
      var article_list = [];
      for (l=0;l<3;l++){
        if (checkboxes[l].checked) {
          var article_pointer =  "article_" + (l+1) + "_name";
          var name_article = document.getElementById(article_pointer).innerHTML;
          article_list.push(name_article);
          }
    }
    article_selector(issue_id, article_list, 2);
    }
    else if (checkboxesChecked.length == 3){
      document.getElementById('one_article').classList.remove('display');
      document.getElementById('two_article').classList.remove('display');
      document.getElementById('three_article').classList.add('display');
      article_selector(issue_id, "", 3);
    }
    else{
      document.getElementById('one_article').classList.remove('display');
      document.getElementById('two_article').classList.remove('display');
      document.getElementById('three_article').classList.remove('display');
    }
  
}
