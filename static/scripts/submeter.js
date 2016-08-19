$.getScript('http://cdnjs.cloudflare.com/ajax/libs/dropzone/3.8.4/dropzone.min.js',function(){
  // instantiate the uploader
  $('#file-dropzone').dropzone({ 
    url: "/upload",
    maxFilesize: 100,
    paramName: "file",
    maxThumbnailFilesize: 5,
    init: function() {
		this.on('success', function(file, json) {
		});
      
		this.on('addedfile', function(file) {
		  $('.needsclick').css('position', 'absolute');
		});
      
		this.on('drop', function(file) {
		  $('.needsclick').css('position', 'absolute');
		}); 
	}
  });
});

$(document).on('change', ':file', function() {
	var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
	$(':file').on('fileselect', function(event, numFiles, label) {
		var input = $(this).parents('.input-group').find(':text'),
			log = numFiles > 1 ? numFiles + ' files selected' : label;
		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
	});
	
	$("#btn-submit").click(function() {
        $("#file-dropzone").submit();
    });
});

