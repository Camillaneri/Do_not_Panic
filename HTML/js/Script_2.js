
function populate_selection(){
    var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
    
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
        issue_selected_selector(h.innerHTML, "");
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });

  }
}


function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

function issue_selected_selector (issue_id, name_article){
  localStorage.clear();
      readIssues(issue_id, name_article);
  }

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

