function issue_selected(issue_id, name_article){
  localStorage.clear();
  var newWin = window.open("articles_viewer.html", "_self");
      readIssues(issue_id, name_article);
  }

function from_issue(){
  var issue_id = localStorage.issue_id;
  var name_article = localStorage.name_article;
  if (issue_id == "Deep-Thoughts" || issue_id == "Magratears" || issue_id == "Vogueon" && name_article == ""){
    document.getElementById("article_1").click();
    document.getElementById("article_2").click();
    document.getElementById("article_3").click();
    article_selector(issue_id, name_article, 3);
  }
  }

  function article_selector(issue, article, num_article){
    var articles = JSON.parse(localStorage.articles);
    var sources = JSON.parse(localStorage.sources);
    console.log(issue, article, articles, sources);
    for (i=0; i<num_article; i++){
  		var name =  "/data/" + issue + "/" + articles[i] + ".txt";
      var id = "text_" + num_article + "_" + (i+1);
      populator (name, id);
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
