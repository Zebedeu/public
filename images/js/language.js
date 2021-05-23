function setLabels(language, url){
    $.ajax({url: url+"set-session/"+language,  success: function(result) {
        window.location.reload();
    }});
}