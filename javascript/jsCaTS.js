function callingcpp(){

    var ncases = $('#cases_slider').val()
    var ncontrols =$('#controls_slider').val()
    var pisamples = 1
    var pimarkers = 1
    var freq=$('#allele_slider').val()
    var risk =$('#rr_slider').val()
    var prevalence=$('#prev_slider').val()
    var alpha =$('#sig_slider').val()
 

    $.ajax({
        type: "POST",
	url: "ajax/phpscript.php",
        data: {ncases:ncases, ncontrols:ncontrols, pisamples:pisamples, pimarkers:pimarkers,
            freq:freq, risk:risk, prevalence:prevalence,alpha:alpha},
        beforeSend:function(){},
        success:function(response){
		 $('#output').html(response);
},
        error:function(){}      
    })    
    }    
