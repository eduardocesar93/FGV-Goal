radioChange( $('input[name="efx"]'), $('#nav'), $('#efx-name') );
radioChange( $('input[name="ease"]'), $('#main-menu'), $('#efx-ease'));

function radioChange(inputs, addClassTo, appendTo) {
  inputs.hide();
  inputs.on( 'change', function() { 
    inputs.each( function() {
      if ( $(this).is(':checked') ) {
        addClassTo.attr('class', $(this).val() );
        var radioName = $(this).next('span').text(); 
        appendTo.text(radioName);
      }
  
    });
  }); 
}