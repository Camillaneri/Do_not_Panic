function populate_selection() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");

    var name_issue = localStorage.issue_id;

    if (name_issue) {
      a.innerHTML = name_issue;
    } else {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    }

    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;

      c.addEventListener("click", function (e) {
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
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl,
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

document.addEventListener("click", closeAllSelect);

function issue_selected(issue_id, name_article) {
  var href = localStorage.theme_href;
  var style = localStorage.style;
  localStorage.clear();
  if (name_article != "stay") {
    var newWin = window.open("articles_viewer.html", "_self");
    readIssues(issue_id, name_article);
    localStorage.setItem("style", style);
    localStorage.setItem('theme_href', href)
  } else {
    readIssues(issue_id, "stay");
  }
}

function from_issue(adviser) {
  fromStyle();
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
  document.getElementById("article_1_source").setAttribute('target', '_blank');
  document.getElementById("article_2_source").setAttribute('target', '_blank');
  document.getElementById("article_3_source").setAttribute('target', '_blank');
  if (name_article == "") {
    if (adviser == "stay") {
      getCheckedBoxes("Article");
      no_prob_checker();
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
      var name = "dont_panic/data/" + issue + "/" + article + ".txt";
      var id = "text_" + num_article + "_1";
      var index = articles.indexOf(article);
      name_stander = name_displayed[index];
      id_list.push(id);
      name_list.push(name_stander);
      populator(name, id);
      break;

    case 2:
      for (t = 0; t < 2; t++) {
        var name = "dont_panic/data/" + issue + "/" + article[t] + ".txt";
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
        var name = "dont_panic/data/" + issue + "/" + articles[i] + ".txt";
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
  readJSon("dont_panic/js/issues.json", function (content) {
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

function hover(event) {
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
  
  var theme = document.getElementsByTagName("link");
  console.log(theme[0]);
  console.log(theme[1]);
  var new_style = "dont_panic/" + id + ".css";



  if (id != "no_style") {
    theme.setAttribute("href", new_style);
  } else {
    theme.setAttribute("href", "#");
  }

  var href = theme.getAttribute('href');
  console.log(href)

  localStorage.setItem('style', theme.outerHTML);
  localStorage.setItem('theme_href', href)
  changeItemForStyle();

  document.getElementById("transition").style.display="block";
  window.setTimeout("closeHelpDiv();", 1000);
  
  if(document.getElementsByName("problemCheckbox")){
    var checkprob = document.getElementsByName("problemCheckbox")[0].checked;
    }
  if (checkprob == true){
    document.getElementsByName("problemCheckbox")[0].click();
  }
}

function closeHelpDiv(){
  document.getElementById("transition").style.display=" none";
}

function changeItemForStyle() {
  
  var world = document.getElementById("gif");
  var coverLogo = document.getElementById("logo_img");
  var theme = localStorage.getItem('theme_href');
  console.log(theme)
  var icon_selected = document.getElementById('lens_selected');

  var myPara = document.getElementById("hr_lens");
  var set = myPara.style.marginRight;
  currStyle = set;


  switch (theme) {
    case 'dont_panic/future.css':
      world.setAttribute("src", "dont_panic/img/futuro-gif.gif");
      icon_selected.setAttribute("src", "dont_panic/img/svg/3000inv.svg");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/svg/3000inv.svg");}
      break;
    case 'dont_panic/Y2000s.css':
      icon_selected.setAttribute("src", "dont_panic/img/svg/2001.svg");
      world.setAttribute("src", "dont_panic/img/matrixsmall.gif");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/svg/2001.svg");}
      break;
    case 'dont_panic/Y80s.css':
      icon_selected.setAttribute("src", "dont_panic/img/svg/1990inv.svg");
      world.setAttribute("src", "dont_panic/img/80ssmall.gif");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/svg/1990inv.svg");}
      break;
    case 'dont_panic/Y40s.css':
      icon_selected.setAttribute("src", "dont_panic/img/svg/1926inv1.svg");
      world.setAttribute("src", "dont_panic/img/futuristasmall.gif");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/svg/1926inv1.svg");}
      break;
    case 'dont_panic/Y1800s.css':
      icon_selected.setAttribute("src", "dont_panic/img/svg/1800inv.svg");
      world.setAttribute("src", "dont_panic/img/victoriansmall.gif");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/svg/1800inv.svg");}
      break;
    case 'dont_panic/Y300s.css':
      icon_selected.setAttribute("src", "dont_panic/img/svg/1300inv2.svg");
      world.setAttribute("src", "dont_panic/img/medioevosmall.gif");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/svg/1300inv2.svg");}
      break;
    case '#':
      icon_selected.setAttribute("src", "dont_panic/img/dontPanic_logo.svg");
      world.setAttribute("src", "dont_panic/img/200w.gif");
      if (coverLogo){coverLogo.setAttribute("src", "dont_panic/img/dontPanic_logo.svg");}
      break;
  }


}

function no_prob_checker(){
  if (document.getElementsByName("problemCheckbox")[0].checked == true){
    document.getElementsByName("problemCheckbox")[0].click();
    
  }
}

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
  
  changeItemForStyle();
  
}



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

        var meta_counter = 0;
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
               meta_counter=0;
               if (unique_meta_sublist.includes(couple_list[m])){
                 for (p=0;p<meta_sub_list.length;p++){
                   if (meta_sub_list[p]==couple_list[m]){
                    meta_counter+=1;
                   }
                 }
               var dl = div_content[t];
               var dt = document.createElement("dt");
               dt.innerHTML = couple_list[m]+" ("+meta_counter+")";
               dl.appendChild(dt);
               generate_metadata_calls(dt.innerHTML, meta_specific, "DL", single_id, "about"); 
               var z = m + 1;
               while ((!(unique_meta_sublist.includes(couple_list[z]))) && z<couple_list.length){
                meta_counter=0;
                for (p=0;p<meta_list.length;p++){
                  if (meta_list[p]==couple_list[z]){
                   meta_counter+=1;
                  }
                }
                 var dd = document.createElement("dd");
                 dd.innerHTML=couple_list[z]+" ("+meta_counter+")";
                 dl.appendChild(dd);
                 generate_metadata_calls(dd.innerHTML, meta_specific, "DL", single_id, "data-label");
                 z++;
               }
             }
             }
            } else {
            div_content[t].innerHTML="";
            for (m=0;m<unique_meta_list.length;m++){
              meta_counter=0;
              for (p=0;p<meta_list.length;p++){
                if (meta_list[p]==unique_meta_list[m]){
                 meta_counter+=1;
                }
              }
            var ol = div_content[t];
            var li = document.createElement("li");
            li.innerHTML = unique_meta_list[m]+" ("+meta_counter+")";
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

var counter=-1;

function highlight_metadata(text_id, text_to_splice, selector){
  var text = text_to_splice.split(" (")[0];
  var text_to_call ="";
  var meta_focus_list = document.getElementById(text_id).querySelectorAll('['+selector+'="'+text+'"]');
  if (localStorage.getItem("text") == text_id){
  if (localStorage.getItem("meta") == text){
    localStorage.setItem("prev_selector", selector);
    for (f=0;f<meta_focus_list.length;f++){
      meta_focus_list[f].classList.add("MetaFocusAll");
      text_to_call = meta_focus_list[f].getAttribute("data-label");
      meta_focus_list[f].addEventListener("click", function(){
        callWiki(text_to_call);
      });
    }
  if (meta_focus_list.length==1){
    meta_focus_list[0].classList.add("MetaFocus");
    scroll_metadata_up(text_id);
    localStorage.setItem("counter", 0);
    counter= meta_focus_list.length;
  } else if (localStorage.getItem("counter") == meta_focus_list.length-1){
    meta_focus_list[meta_focus_list.length-1].classList.remove("MetaFocus");
  }
  if (counter<meta_focus_list.length-1){
  if (counter == 0){
    meta_focus_list[0].classList.add("MetaFocus");
    scroll_metadata_up(text_id);
    localStorage.setItem("counter", counter);
    counter += 1;
  }else{
    if (counter == 1){
      meta_focus_list[counter-1].classList.remove("MetaFocus");
      localStorage.setItem("counter", counter);
      meta_focus_list[counter].classList.add("MetaFocus");
      scroll_metadata_up(text_id);
      counter += 1;
    }else if (counter == -1){
    meta_focus_list[0].classList.add("MetaFocus");
    scroll_metadata_up(text_id);
    counter = 1;
    localStorage.setItem("counter", counter);
    }else{
    meta_focus_list[counter-1].classList.remove("MetaFocus");
    meta_focus_list[counter].classList.add("MetaFocus");
    counter += 1;
    localStorage.setItem("counter", counter);
    scroll_metadata_up(text_id);
  }
  }
}else if(counter == meta_focus_list.length-1){
  meta_focus_list[counter-1].classList.remove("MetaFocus");
  meta_focus_list[counter].classList.add("MetaFocus");
  scroll_metadata_up(text_id);
  localStorage.setItem("counter", counter);
  counter = 0;
}else if (counter==meta_focus_list.length){
  counter = 0;
}else{
  localStorage.setItem("counter", counter);
  counter = 0;
  highlight_metadata(text_id,text, selector);
}
}else if (localStorage.getItem("counter")!=-1){
  var temp_name = localStorage.getItem("meta");
  var temp_selector = localStorage.getItem("prev_selector");
  meta_focus_list = document.getElementById(text_id).querySelectorAll('['+temp_selector+'="'+temp_name+'"]');
  for (q=0;q<meta_focus_list.length;q++){
    meta_focus_list[q].classList.remove("MetaFocusAll");
    if (meta_focus_list[q].classList.contains("MetaFocus")){
      meta_focus_list[q].classList.remove("MetaFocus");
    }
  }
  counter=0;
  localStorage.setItem("meta", text);
  highlight_metadata(text_id, text, selector);
}else{
  localStorage.setItem("meta", text);
  highlight_metadata(text_id, text, selector);
}
 }else{
  localStorage.setItem("text", text_id);
  localStorage.setItem("counter", -1);
  meta_focus_list = document.getElementById(text_id).getElementsByClassName("mention");
  for (q=0;q<meta_focus_list.length;q++){
    if (meta_focus_list[q].classList.contains("MetaFocusAll")){
    meta_focus_list[q].classList.remove("MetaFocusAll");
    }
    if (meta_focus_list[q].classList.contains("MetaFocus")){
      meta_focus_list[q].classList.remove("MetaFocus");
    }
  }
  highlight_metadata(text_id, text, selector);
}
}


function scroll_metadata_up(text_id){
  var topOffSet = document.getElementById(text_id).getElementsByClassName("MetaFocus")[0].getBoundingClientRect().top;
  var meta_offset = document.getElementById(text_id).getBoundingClientRect().bottom;
  meta_offset = meta_offset + 200;
    document.getElementById(text_id).scrollBy(0, topOffSet);
    document.getElementById(text_id).scrollBy(0, -meta_offset);
    var newOffSet = document.getElementById(text_id).getElementsByClassName("MetaFocus")[0].getBoundingClientRect().top;
    if (newOffSet>meta_offset){
      document.getElementById(text_id).scrollBy(0, 500);
    }
}

function callWiki (text){
  window.open("https://en.wikipedia.com/w/index.php?search="+text);
}

function not_your_prob (){
  var checkProblem = document.getElementsByName("problemCheckbox")[0];
  var issue_id = localStorage.issue_id;
  var stringa = "";
  var stringg = "";
  var words = [];
  var count_words = 0;
  var svg_element = "";
  var check_icon = document.getElementById("lens_selected").getAttribute("src");
  var category_list = ["place", "person", "date", "concept", "organization"];
  if (checkProblem.checked) {
  var text_id = JSON.parse(localStorage.id_list);
  for (j=0;j<text_id.length;j++) {
    for (z=0; z<category_list.length;z++){
  var metadata_list = document.getElementById(text_id[j]).getElementsByClassName(category_list[z]);
  while (metadata_list.length>0){
    metadata_list = document.getElementById(text_id[j]).getElementsByClassName(category_list[z]);
    stringa = "";
    stringg = metadata_list[0].innerHTML;
    words = stringg.split(' ');
    count_words = words.length;
    svg_element = "<img id='logo_img' class = 'prob_icon prob_" +category_list[z]+ "' src='" +check_icon+ "'/>";
      for (x=0;x<count_words;x++){
        stringa = stringa + svg_element;
      }
      metadata_list[0].outerHTML = stringa;
  }
}
}
}else{
readIssues(issue_id, "stay");
}
}
