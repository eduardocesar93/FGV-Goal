function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    renderQuestion(contents);
  };
  reader.readAsText(file);
}

function renderQuestion(file)
{
    var allText = file;
    allText = allText.replace(/&/g,'&amp;');
    allText = allText.replace(/&/g,'&amp;');
    xmlDoc = $.parseXML(allText);
    $xml = $(xmlDoc);

    question = $xml.find("question").first();
    $("#info").html("Assunto: " + question.attr("subject") + " - Nível: " + question.attr("level"));				
    $("#wording").html($xml.find("question > text").first().html());
    $("#explanation").html($xml.find("question > explanation").first().html());
    
    var $options = $xml.find("choice");
    $("#options > div").remove();
    $options.each(function(index){
        var explanation = $(this).find("explanation").html();
        var textChoice = $(this).find("text").html();
        $(this).find("explanation").remove();
        $(this).find("text").remove();
        if(explanation == undefined){
            explanation = "";
        }
        if(textChoice == undefined){
            textChoice = "";
        }
        var message = $(this).attr("type") == "correct" ? "Correto!" : "Errado";
        $("#options").append("<div><input type='radio' name='option' value='" + index + "'>" 
            + textChoice + "<span hidden='hidden'>" 
            + explanation + " <i> - " + message + "</i></span></div>");
    });
    
    $("input[name='option']").change(function(){
        $("#options div span").hide();
        $(this).parent().find("span").show();
    });
    
    MathJax.Hub.Typeset();
}

$( document ).ready(function(){
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);
	$("input[name='option']").change(function(){
		$("#options div span").hide();
		$("span").first().parent().find("span").show();
	});
});