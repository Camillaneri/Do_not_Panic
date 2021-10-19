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
