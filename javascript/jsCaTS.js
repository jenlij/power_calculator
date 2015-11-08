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
            controls_input.addEventListener('change', function(){
              controls_slider.noUiSlider.set(this.value);
            });

            var sig_slider = document.getElementById('sig_slider');
            noUiSlider.create(sig_slider, {
               start: 0.000007,
                behaviour: 'tap',
                connect: 'lower',
                direction: 'rtl',
                range: {
                    'min':  1e-7, //range should be .9 to 1*10^-8 
                    '15%':1e-6,
                    '30%':1e-5,
                    '45%':1e-4,
                    '60%':1e-3,
                    '75%':1e-2,
                    '90%':1e-1,
                    'max':  1
                },
                format: wNumb({
                    decimals: 7,
                })
            });
            sig_slider.noUiSlider.on('update', function(values, handle){
              sig_input.value = values[handle];
            });
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
            rr_input.addEventListener('change', function(){
              rr_slider.noUiSlider.set(this.value);
            });

})();



function callingcpp(){

    var ncases = cases_slider.noUiSlider.get();
    var ncontrols = controls_slider.noUiSlider.get();
    var pisamples = 1
    var pimarkers = 1
    var freq = allele_slider.noUiSlider.get();
    var risk = rr_slider.noUiSlider.get();
    var prevalence = prev_slider.noUiSlider.get(); 
    var alpha = sig_slider.noUiSlider.get();
 

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
