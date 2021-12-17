function populate_selection() {
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

    var name_issue = localStorage.issue_id;

    if (name_issue) {
      a.innerHTML = name_issue;
    } else {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    }

    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;

      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
          and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        issue_id = this.innerHTML;

        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            issue_selected(h.innerHTML, "stay");
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

    a.addEventListener("click", function (e) {
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
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;

  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
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

function issue_selected(issue_id, name_article) {
  var style = localStorage.style;
  localStorage.clear();
  if (name_article != "stay") {
    var newWin = window.open("articles_viewer.html", "_self");
    readIssues(issue_id, name_article);
    localStorage.setItem("style", style);
  } else {
    readIssues(issue_id, "stay");
  }
}

function from_issue(adviser) {
  /*fromStyle();*/
  var name_article = localStorage.name_article;
  var articles = JSON.parse(localStorage.articles);
  var sources = JSON.parse(localStorage.sources);
  var name_displayed = JSON.parse(localStorage.name_displayed);

  document.getElementById("article_1_name").innerHTML = name_displayed[0];
  document.getElementById("article_2_name").innerHTML = name_displayed[1];
  document.getElementById("article_3_name").innerHTML = name_displayed[2];
  document.getElementById("article_1_source").href = sources[0];
  document.getElementById("article_2_source").href = sources[1];
  document.getElementById("article_3_source").href = sources[2];

  if (name_article == "") {
    if (adviser == "stay") {
      getCheckedBoxes("Article");
    }else {
    document.getElementById("article_1").checked = true;
    document.getElementById("article_2").checked = true;
    document.getElementById("article_3").click();
  }
}else {
    for (c = 0; c < 3; c++) {
      if (articles[c] == name_article) {
        var article_pointer = "article_" + (c + 1);
        document.getElementById(article_pointer).click();
      }
    }
  }
}

function article_selector(issue, article, num_article) {
  var articles = JSON.parse(localStorage.articles);
  var name_displayed = JSON.parse(localStorage.name_displayed);
  var id_list = [];
  var name_list = [];
  var name_stander = "";

  switch (num_article) {
    case 1:
      var name = "data/" + issue + "/" + article + ".txt";
      var id = "text_" + num_article + "_1";
      var index = articles.indexOf(article);
      name_stander = name_displayed[index];
      id_list.push(id);
      name_list.push(name_stander);
      populator(name, id);
      break;

    case 2:
      for (t = 0; t < 2; t++) {
        var name = "data/" + issue + "/" + article[t] + ".txt";
        var id = "text_" + num_article + "_" + (t + 1);
        var index = articles.indexOf(article[t]);
        name_stander = name_displayed[index];
        id_list.push(id);
        name_list.push(name_stander);
        populator(name, id);
      }
      break;

    case 3:
      for (i = 0; i < 3; i++) {
        var name = "data/" + issue + "/" + articles[i] + ".txt";
        var id = "text_" + num_article + "_" + (i + 1);
        id_list.push(id);
        name_list = name_displayed;
        populator(name, id);
      }
      break;
  }
  localStorage.setItem("name_list", JSON.stringify(name_list));
  localStorage.setItem("id_list", JSON.stringify(id_list));
}

  

  function populator(article, position){
    fetch(article)
 			 .then(response => response.text())
  				.then(text => document.getElementById(position).innerHTML=(text))
          .then(() => {
            this.display_basic_metadata();
            });
        return;
  }

function readIssues(issue_id, name_article) {
  readJSon("js/issues.json", function (content) {
    var issues = JSON.parse(content);
    var len = issues.length;
    var articles = [];
    var sources = [];
    var recaller = false;
    if (name_article == "stay") {
      name_article = "";
      recaller = true;
    }
    for (i = 0; i < len; i++) {
      if (issues[i].name == issue_id) {
        articles = issues[i].articles;
        sources = issues[i].sources;
        name_displayed = issues[i].name_displayed;
        localStorage.setItem("issue_id", issue_id);
        localStorage.setItem("name_article", name_article);
        localStorage.setItem("articles", JSON.stringify(articles));
        localStorage.setItem("sources", JSON.stringify(sources));
        localStorage.setItem("name_displayed", JSON.stringify(name_displayed));
      }
    }
    if (recaller == true) {
      from_issue("stay");
    }
  });
}

function readJSon(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function getCheckedBoxes(chkboxClass) {
  var checkboxes = document.getElementsByName(chkboxClass);
  var checkboxesChecked = [];

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i]);
    }
  }

  var issue_id = localStorage.issue_id;
  var articles = JSON.parse(localStorage.articles);

  switch (checkboxesChecked.length) {
    case 1:
      document.getElementById("one_article").classList.add("display");
      document.getElementById("two_article").classList.remove("display");
      document.getElementById("three_article").classList.remove("display");
      for (l = 0; l < 3; l++) {
        if (checkboxes[l].checked) {
          var name_article = articles[l];
        }
      }
      article_selector(issue_id, name_article, 1);
      break;

    case 2:
      document.getElementById("one_article").classList.remove("display");
      document.getElementById("two_article").classList.add("display");
      document.getElementById("three_article").classList.remove("display");
      var article_list = [];
      for (l = 0; l < 3; l++) {
        if (checkboxes[l].checked) {
          var name_article = articles[l];
          article_list.push(name_article);
        }
      }
      article_selector(issue_id, article_list, 2);
      break;

    case 3:
      document.getElementById("one_article").classList.remove("display");
      document.getElementById("two_article").classList.remove("display");
      document.getElementById("three_article").classList.add("display");
      article_selector(issue_id, "", 3);
      break;

    default:
      document.getElementById("one_article").classList.remove("display");
      document.getElementById("two_article").classList.remove("display");
      document.getElementById("three_article").classList.remove("display");
      break;
  }
}

function hover(event, id) {
  var myPara = document.getElementById("hr_lens");

  function str(el) {
    if (!el) return "null";
    return el.id || el.className;
  }

  var target = str(event.target);

  if (event.type == "mouseenter") {
    switch (target) {
      case "future":
        myPara.style.marginRight = "86%";
        break;
      case "Y2000s":
        myPara.style.marginRight = "71.5%";
        break;
      case "Y80s":
        myPara.style.marginRight = "57.8%";
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
  } else if (event.type == "mouseleave") {
    switch (target) {
      default:
        myPara.style.marginRight = currStyle;
        break;
    }
  } 
}

var currStyle;

function styleSwitch(id) {
  var theme = document.getElementsByTagName("link")[1];
  console.log(theme);
  var new_style = id + ".css";
  theme.setAttribute("href", new_style);
  var myPara = document.getElementById("hr_lens");
  var set = myPara.style.marginRight;
  var world = document.getElementById("gif");
  var coverLogo = document.getElementById("logo_img");

  if (id == "no_style") {
    theme.setAttribute("href", "#");
  }
  currStyle = set;

  switch (id) {
    case "future":
      world.setAttribute("src", "img/futuro-gif.gif");
      coverLogo.setAttribute("src", "img/svg/3000inv.svg");
      break;
    case "Y2000s":
      world.setAttribute("src", "img/matrixsmall.gif");
      coverLogo.setAttribute("src", "img/svg/2001.svg");
      break;
    case "Y80s":
      world.setAttribute("src", "img/80ssmall.gif");
      coverLogo.setAttribute("src", "img/svg/1990inv.svg");
      break;
    case "Y40s":
      world.setAttribute("src", "img/futuristsmall.gif");
      coverLogo.setAttribute("src", "img/svg/1926inv1.svg");
      break;
    case "Y1800s":
      world.setAttribute("src", "img/victoriansmall.gif");
      coverLogo.setAttribute("src", "img/svg/1800inv.svg");
      break;
    case "Y300s":
      world.setAttribute("src", "img/medioevosmall.gif");
      coverLogo.setAttribute("src", "img/svg/1300inv2.svg");
      break;
    case "no_style":
      world.setAttribute("src", "img/200w.gif");
      coverLogo.setAttribute("src", "img/dontPanic_logo.svg");
      break;
  }

  localStorage.setItem('style', theme.outerHTML);
}

/*
function fromStyle() {
  var cur_style = localStorage.getItem('style');
  var link = document.getElementsByTagName("link")[1];
  if (cur_style){
    if (cur_style !== '<link rel="stylesheet" type="text/css" href="#">'){
      link.outerHTML = cur_style;
    } else {
      link = '<link rel="stylesheet" type="text/css" href="#">';
    }
  }
  
}
*/

function display_basic_metadata() {
  var id_pointer = JSON.parse(localStorage.id_list);
  var name_pointer = JSON.parse(localStorage.name_list);
  var category_list = ["place", "person", "date", "concept", "organization"];
  for (i = 0; i < id_pointer.length; i++) {

    var single_id = id_pointer[i];
    var meta_pointer = "meta_" + single_id.slice(5, single_id.length);
    var meta_author = "";
    var meta_date = "";
    var meta_publisher = "";
    meta_author = document.getElementById(single_id).getElementsByClassName("nameAuthor")[0].innerHTML;
    meta_publisher = document.getElementById(single_id).getElementsByClassName("publishedBy")[0].innerHTML;
    meta_date = document.getElementById(single_id).getElementsByClassName("datePublished")[0].innerHTML;
    document.getElementById(meta_pointer).getElementsByClassName("meta_name_author")[0].innerHTML = meta_author;
    document.getElementById(meta_pointer).getElementsByClassName("meta_name_publisher")[0].innerHTML=meta_publisher;
    document.getElementById(meta_pointer).getElementsByClassName("meta_name_date")[0].innerHTML=meta_date;
    document.getElementById(meta_pointer).getElementsByClassName("meta_name_article")[0].innerHTML=name_pointer[i]; 


    for (l=0;l<category_list.length;l++){
      var meta_list = [];
      var meta_sub_list = [];
      var couple_list = [];
      var meta_specific = "meta_"+ category_list[l] + "_" + single_id.slice(5,single_id.length);
      var input_list = document.getElementById(single_id).getElementsByClassName(category_list[l]);

        for (c=0;c<input_list.length;c++){
          if (category_list[l]=="concept"){
          meta_sub_list.push(input_list[c].getAttribute("about"));
          meta_list.push(input_list[c].getAttribute("data-label"));
          }else{
          meta_list.push(input_list[c].getAttribute("data-label"));
        }
      }

      for (c=0;c<meta_sub_list.length;c++){
        if (!(couple_list.includes(meta_sub_list[c]))){
          couple_list.push(meta_sub_list[c]);
        }
        if (!(couple_list.includes(meta_list[c]))){
          var index = couple_list.indexOf(meta_sub_list[c]);
          couple_list.splice(index + 1, 0, meta_list[c]);
        }
      }

    
        var unique_meta_list = [...new Set(meta_list)];
        var unique_meta_sublist = [...new Set(meta_sub_list)];

        unique_meta_sublist.sort(function (a, b) {
          return a.localeCompare(b); 
        });
        unique_meta_list.sort(function (a, b) {
          return a.localeCompare(b); 
        });
        
        var div_content = document.getElementById(meta_specific).children;
       
        for (var t=0;t<div_content.length;t++){
          if (div_content[t].tagName == 'DL'|| div_content[t].tagName == 'OL') {
            div_content[t].innerHTML="";
            if (category_list[l]=="concept"){
             for (m=0;m<couple_list.length;m++){
               if (unique_meta_sublist.includes(couple_list[m])){
               var dl = div_content[t];
               var dt = document.createElement("dt");
               dt.innerHTML = couple_list[m];
               dl.appendChild(dt);
               generate_metadata_calls(dt.innerHTML, meta_specific, "DL", single_id, "about"); 
               var z = m + 1;
               while ((!(unique_meta_sublist.includes(couple_list[z]))) && z<couple_list.length){
                 var dd = document.createElement("dd");
                 dd.innerHTML=couple_list[z];
                 dl.appendChild(dd);
                 generate_metadata_calls(dd.innerHTML, meta_specific, "DL", single_id, "data-label");
                 z++;
               }
             }
             }
            } else {
            div_content[t].innerHTML="";
            for (m=0;m<unique_meta_list.length;m++){
            var ol = div_content[t];
            var li = document.createElement("li");
            li.innerHTML = unique_meta_list[m];
            ol.appendChild(li);
            generate_metadata_calls(li.innerHTML, meta_specific, "OL", single_id, "data-label");
           }
           }
           }
         }
     }
 }
}


function generate_metadata_calls(text, position, kind, text_id, selector){
 var section = document.getElementById(position).children;
 for (var t=0;t<section.length;t++){
   if (section[t].tagName==kind){
     var class_list = section[t].children;
     for (var j=0;j<class_list.length;j++){
       if (class_list[j].innerHTML==text){
         class_list[j].addEventListener("click", function(){
           highlight_metadata(text_id, text, selector);
         });
       }
     }
   }
 }
}

var counter=0;

function highlight_metadata(text_id, text, selector){
  var meta_focus_list = document.getElementById(text_id).querySelectorAll('['+selector+'="'+text+'"]');
  if (localStorage.getItem("text") == text_id){
  if (localStorage.getItem("meta") == text){
  if (localStorage.getItem("counter") == meta_focus_list.length-1){
    meta_focus_list[meta_focus_list.length-1].classList.remove("MetaFocus");
  }
  if (counter<meta_focus_list.length-1){
  if (counter == 0){
    meta_focus_list[0].classList.add("MetaFocus");
    localStorage.setItem("counter", counter);
    counter += 1;
  }else{
    if (counter == 1){
      meta_focus_list[counter-1].classList.remove("MetaFocus");
      localStorage.setItem("counter", counter);
      meta_focus_list[counter].classList.add("MetaFocus");
    }else{
    meta_focus_list[counter-1].classList.remove("MetaFocus");
    counter += 1;
    localStorage.setItem("counter", counter);
    meta_focus_list[counter].classList.add("MetaFocus");
  }
  }
}else if(counter == meta_focus_list.length-1){
  meta_focus_list[counter-1].classList.remove("MetaFocus");
  meta_focus_list[counter].classList.add("MetaFocus");
  localStorage.setItem("counter", counter);
  counter = 0;
}else{
  counter = 0;
  highlight_metadata(text_id,text, selector);
}
}else if (localStorage.getItem("counter")>-1){
  var temp_name = localStorage.getItem("meta");
  var temp_counter = localStorage.getItem("counter");
  meta_focus_list = document.getElementById(text_id).querySelectorAll('['+selector+'="'+temp_name+'"]');
  meta_focus_list[temp_counter].classList.remove("MetaFocus");
  counter=0;
  localStorage.setItem("meta", text);
  highlight_metadata(text_id, text, selector);
}else{
  localStorage.setItem("meta", text);
  highlight_metadata(text_id, text, selector);
}
 }else{
  localStorage.setItem("text", text_id);
  localStorage.setItem("counter", 0);
  counter=0;
  highlight_metadata(text_id, text, selector);
}
}

function not_your_prob (text_id, text){
  var metadata_list = document.getElementById(text_id).querySelectorAll('["class"="'+text+'"]');
  for (var i=0;i<metadata_list.length;i++)
    if (text == "mention concept")
      metadata_list[i].classList.add("noprob1");
    if (text == "mention date")
      metadata_list[i].classList.add("noprob2");
    if (text == "mention person")
      metadata_list[i].classList.add("noprob3");
    if (text == "mention place")
      metadata_list[i].classList.add("noprob4");
    else (text == "mention organization")
      metadata_list[i].classList.add("noprob5")
}