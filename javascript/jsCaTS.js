/*slider code*/
(function(){

            var cases_slider = document.getElementById('cases_slider');
            noUiSlider.create(cases_slider, {
              start:1000,
              behaviour:'tap',
              connect:'lower',
              step: 10,
              range: {
                'min':100, 
                '30%':1000,
                '70%':10000,                  
                'max':100000
              },
              format: wNumb({
                decimals:0
              })
            });  
            cases_slider.noUiSlider.on('update', function(values, handle){
              cases_input.value = values[handle];
            });
            cases_slider.noUiSlider.on('set', function(){
                startAjaxCountdown();
            });
            cases_input.addEventListener('change', function(){
              cases_slider.noUiSlider.set(this.value);
            });

            var controls_slider = document.getElementById('controls_slider');
            noUiSlider.create(controls_slider, {
                start: 1000,
                behaviour: 'tap',
                connect: 'lower',
                step: 10,
                range: {
                    'min':100, 
                    '30%':1000,
                    '70%':10000,
                    'max':100000
                },
                format: wNumb({
                    decimals: 0
                })
            });
            controls_slider.noUiSlider.on('update', function(values, handle){
                controls_input.value = values[handle];
            });
            controls_slider.noUiSlider.on('set', function(){
                startAjaxCountdown();
            });
            controls_input.addEventListener('change', function(){
              controls_slider.noUiSlider.set(this.value);
            });

            var sig_slider = document.getElementById('sig_slider');
            noUiSlider.create(sig_slider, {
               start: 0.000007,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  1e-10, 
                    '10%':1e-9,
                    '20%':1e-8,
                    '30%':1e-7,
                    '40%':1e-6,
                    '50%':1e-5,
                    '60%':1e-4,
                    '70%':1e-3,
                    '80%':1e-2,
                    '90%':1e-1,
                    'max':  1
                },
                format: wNumb({
                    decimals: 10,
                })
            });

            //slider to input
            sig_slider.noUiSlider.on('update', function(values, handle){
                var val = parseFloat(values[handle]);
                //2 significant digits
                sig_input.value = val.toFixed(Math.abs(Math.ceil(Math.log10(val)))+2);
            });
            sig_slider.noUiSlider.on('set', function(){
                startAjaxCountdown();
            });
            //input to slider
            sig_input.addEventListener('change', function(){
                sig_slider.noUiSlider.set(this.value);
            });

            var prev_slider = document.getElementById('prev_slider');
            noUiSlider.create(prev_slider, {
                start: 0.1,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  0.001,
                    'max':  1
                },
                format: wNumb({
                    decimals:3
                })
            });
            prev_slider.noUiSlider.on('update', function(values, handle){
              prev_input.value = values[handle];
            });
            prev_slider.noUiSlider.on('set', function(){
                startAjaxCountdown();
            });
            prev_input.addEventListener('change', function(){
              prev_slider.noUiSlider.set(this.value);
            });

           var allele_slider = document.getElementById('allele_slider');
           noUiSlider.create(allele_slider, {
                start: 0.5,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  0,
                    'max':  1
                },
                format: wNumb({
                    decimals:3
                })
            });
            allele_slider.noUiSlider.on('update', function(values, handle){
              allele_input.value = values[handle];
            });
            allele_slider.noUiSlider.on('set', function(){
                startAjaxCountdown();
            });
            allele_input.addEventListener('change', function(){
              allele_slider.noUiSlider.set(this.value);
            });

            var rr_slider = document.getElementById('rr_slider');
            noUiSlider.create(rr_slider, {
              start: 1.5,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  1,
                    'max':  10
                },
                format: wNumb({
                    decimals:3
                })
            });
            rr_slider.noUiSlider.on('update', function(values, handle){
              rr_input.value = values[handle];
            });
            rr_slider.noUiSlider.on('set', function(){
                startAjaxCountdown();
            });
            rr_input.addEventListener('change', function(){
              rr_slider.noUiSlider.set(this.value);
            });

})();





var ajax_call = null;
function startAjaxCountdown(){
    clearTimeout(ajax_call);
    ajax_call = setTimeout(callingcpp, 2);
}



function clearOutput() {
    $('#output').html("");
}

var ajaxRequest;

function callingcpp(){

    clearOutput();

    if (typeof ajaxRequest == "object"){
        ajaxRequest.abort();
    }
    
    var ncases = cases_slider.noUiSlider.get();
    var ncontrols = controls_slider.noUiSlider.get();
    var pisamples = 1
    var pimarkers = 1
    var freq = allele_slider.noUiSlider.get();
    var risk = rr_slider.noUiSlider.get();
    var prevalence = prev_slider.noUiSlider.get(); 
    var alpha = sig_input.value;
    
    ajaxRequest = $.ajax({
        type: "POST",
        url: "ajax/phpscript.php",
        data: {ncases:ncases, 
               ncontrols:ncontrols, 
               pisamples:pisamples, 
               pimarkers:pimarkers,
               freq:freq, 
               risk:risk, 
               prevalence:prevalence,
               alpha:alpha},
        dataType: "JSON",       
        beforeSend:function(){},
        success:function(response){
            //updating progress bar size and display
            $("#power_progress").html(response.power).attr("style","width:" + (parseFloat(response.power) * 100) + "%;");
            $('#cases_progress').html(response.cases).attr("style","width:" + (parseFloat(response.cases) * 100) + "%;");
            $('#controls_progress').html(response.controls).attr("style","width:" + (parseFloat(response.controls) * 100) + "%;");
            $('#AA_freq').html(response.genotypeAA.frequency);
            $('#AA_progress').html(response.genotypeAA.probability).attr("style","width:" + (parseFloat(response.genotypeAA.probability) * 100) + "%;");
            $('#AB_freq').html(response.genotypeAB.frequency);
            $('#AB_progress').html(response.genotypeAB.probability).attr("style","width:" + (parseFloat(response.genotypeAB.probability) * 100) + "%;");
            $('#BB_freq').html(response.genotypeBB.frequency);
            $('#BB_progress').html(response.genotypeBB.probability).attr("style","width:" + (parseFloat(response.genotypeBB.probability) * 100) + "%;");
            },
        error:function(response){
            alert("Invalid parameters, please try again.");
        }      
    });

}
