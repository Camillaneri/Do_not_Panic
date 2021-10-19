function issue_selected(issue_id, name_article){
  var newWin = window.open("articles_viewer.html", "_self");
      localStorage.setItem("issue_id", issue_id);
      localStorage.setItem("name_article",name_article);
  }

function from_issue(){
  var issue_id = localStorage.issue_id;
  var name_article = localStorage.name_article;
  var articles = JSON.parse(localStorage.articles);
  var sources = JSON.parse(localStorage.sources);
  console.log(issue_id, name_article, articles, sources);
  localStorage.clear();
  readIssues(issue_id, name_article);
  if (issue_id == "Deep Thoughts" || issue_id == "Magratears" || issue_id == "Vogueon" && name_article == ""){
    document.getElementById("article_1").click();
    document.getElementById("article_2").click();
    document.getElementById("article_3").click();
    for (i=0; i<3; i++){
  		var name =  "/data/" + issue_id + "/" + articles[i] + ".txt";
        var id = "text_3_" + (i+1);
        alert (name);
        alert (id);
        fetch(name)
 			 .then(response => response.text())
  				.then(text => document.getElementById(id).innerHTML=(text))
                return;
    }
  }
  }

function getCheckedBoxes(chkboxClass) {
  var checkboxes = document.getElementsByName(chkboxClass);
  var checkboxesChecked = [];
  for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
     }
    }

    if (checkboxesChecked.length == 1){
      document.getElementById('one_article').classList.add('display');
      document.getElementById('two_article').classList.remove('display');
      document.getElementById('three_article').classList.remove('display');
      }
    else if (checkboxesChecked.length == 2){
      document.getElementById('one_article').classList.remove('display');
      document.getElementById('two_article').classList.add('display');
      document.getElementById('three_article').classList.remove('display');
    }
    else if (checkboxesChecked.length == 3){
      document.getElementById('one_article').classList.remove('display');
      document.getElementById('two_article').classList.remove('display');
      document.getElementById('three_article').classList.add('display');
    }
    else{
      document.getElementById('one_article').classList.remove('display');
      document.getElementById('two_article').classList.remove('display');
      document.getElementById('three_article').classList.remove('display');
    }
}

function readJSon(file, name, callback) {
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

function readIssues(issue_id, name_article){
	readJSon("js/issues.json", name, function(content){
    var issues = JSON.parse(content);
    var len = issues.length;
    var articles =[];
    var sources =[];
    for (i=0; i<len; i++){
      if (issues[i].name == issue_id){
      articles = issues[i].articles;
      sources = issues[i].sources;
      localStorage.setItem("articles", JSON.stringify(articles));
      localStorage.setItem("sources", JSON.stringify(sources));
      }
      }
    })
    }
    
    
