//slider functionality
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
                calculate();
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
                calculate();
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
                calculate();
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
                calculate();
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
                calculate();
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
                calculate();
            });
            rr_input.addEventListener('change', function(){
              rr_slider.noUiSlider.set(this.value);
            });

})();

//standard normal distribution
function ndist(z, upper) {
  var LOWER_TAIL_ONE = 7.5;
  var UPPER_TAIL_ZERO = 20;

  if (z < 0)
   {
       upper = !upper;
       z = -z;
   }
   if ( ((z > LOWER_TAIL_ONE) && !upper) || (z > UPPER_TAIL_ZERO)) {
      if (upper) {
        return 0;
      }
      else {
        return 1;
      }
   }
   var p;
   var y = 0.5 * z * z;
   if (z < 1.28) {
        p = 0.5 - z * (0.398942280444 - 0.399903438504 * y /
                       (y + 5.75885480458 - 29.8213557808 /
                        (y + 2.62433121679 + 48.6959930692 /
                         (y + 5.92885724438))));
   }
   else {
        p = 0.398942270385 * Math.exp (-y) /
        (z - 2.8052e-8 + 1.00000615302 /
         (z + 3.98064794e-4 + 1.98615381364 /
          (z - 0.151679116635 + 5.29330324926 /
           (z + 4.8385912808 - 15.1508972451 /
            (z + 0.742380924027 + 30.789933034 /
             (z + 3.99019417011))))));
   }

   if (upper) {
     return p;
   }
   else {
     return 1 - p;
   }
};

//inverse normal distribution
function ninv(p) {
  var split1 = 0.425;
  var split2 = 5;
  var const1 = 0.180625;
  var const2 = 1.6;

  var a = [
        3.3871328727963666080E0,
        1.3314166789178437745E2,
        1.9715909503065514427E3,
        1.3731693765509461125E4,
        4.5921953931549871457E4,
        6.7265770927008700853E4,
        3.3430575583588128105E4,
        2.5090809287301226727E3
      ];

  var b = [
        4.2313330701600911252E1,
        6.8718700749205790830E2,
        5.3941960214247511077E3,
        2.1213794301586595867E4,
        3.9307895800092710610E4,
        2.8729085735721942674E4,
        5.2264952788528545610E3
      ];

  var c = [
        1.42343711074968357734E0,
        4.63033784615654529590E0,
        5.76949722146069140550E0,
        3.64784832476320460504E0,
        1.27045825245236838258E0,
        2.41780725177450611770E-1,
        2.27238449892691845833E-2,
        7.74545014278341407640E-4
      ];

  var d = [
        2.05319162663775882187E0,
        1.67638483018380384940E0,
        6.89767334985100004550E-1,
        1.48103976427480074590E-1,
        1.51986665636164571966E-2,
        5.47593808499534494600E-4,
        1.05075007164441684324E-9
      ];

  var e = [
        6.65790464350110377720E0,
        5.46378491116411436990E0,
        1.78482653991729133580E0,
        2.96560571828504891230E-1,
        2.65321895265761230930E-2,
        1.24266094738807843860E-3,
        2.71155556874348757815E-5,
        2.01033439929228813265E-7
      ];

  var f = [
        5.99832206555887937690E-1,
        1.36929880922735805310E-1,
        1.48753612908506148525E-2,
        7.86869131145613259100E-4,
        1.84631831751005468180E-5,
        1.42151175831644588870E-7,
        2.04426310338993978564E-15
      ];

  var q = p - 0.5;
  var r;
  var x;

  if( Math.abs(q) < split1 ) {
    r = const1 - q * q;
    return q * ((((((( a[7] * r + a[6] ) * r + a[5] ) * r + a[4] ) * r
                       + a[3] ) * r + a[2] ) * r + a[1] ) * r + a[0] ) /
        ((((((( b[6] * r + b[5] ) * r + b[4] ) * r + b[3] ) * r
            + b[2] ) * r + b[1] ) * r + b[0] ) * r + 1.0 ) ;
  }

  else {
      if ( q < 0 ) {
          r = p ;
      }
      else {
          r = 1 - p ;
      }
      if ( r < 1e-10) {
          if (q < 0){
            return -20;
          }
          else {
            return 20;
          }
      }
      if ( r > 0 ) {
            r = Math.sqrt( -Math.log( r ) );
            if ( r <= split2 ) {
                r = r - const2 ;
                x = ((((((( c[7] * r + c[6] ) * r + c[5] ) * r + c[4] ) * r
                        + c[3] ) * r + c[2] ) * r + c[1] ) * r + c[0] ) /
                ((((((( d[6] * r + d[5] ) * r + d[4] ) * r + d[3] ) * r
                    + d[2] ) * r + d[1] ) * r + d[0] ) * r + 1 ) ;
            }
            else {
                r = r - split2 ;
                x =  ((((((( e[7] * r + e[6] ) * r + e[5] ) * r + e[4] ) * r
                         + e[3] ) * r + e[2] ) * r + e[1] ) * r + e[0] ) /
                ((((((( f[6] * r + f[5] ) * r + f[4] ) * r + f[3] ) * r
                    + f[2] ) * r + f[1] ) * r + f[0] ) * r + 1 ) ;
            }
      }
      else {
           x = 9;
      }
      if ( q < 0 ) {
           x = -x ;
      }
      return x ;
   }
};

//uses values from input and updates results
function calculate() {
      //get values from sliders
      var ncases = cases_slider.noUiSlider.get();
      var ncontrols = controls_slider.noUiSlider.get();
      var freq = allele_slider.noUiSlider.get();
      var risk = rr_slider.noUiSlider.get();
      var prev = prev_slider.noUiSlider.get();
      var alpha = sig_input.value;

      //calculate variables
      var aa_freq = freq * freq;
      var aa_prob = risk * risk;
      var ab_freq = 2 * freq * (1 - freq);
      var ab_prob = risk;
      var bb_freq = (1 - freq) * (1 - freq);
      var bb_prob = 1;

      //adjusted penetrances
      var scale = prev / (aa_prob * aa_freq + ab_prob * ab_freq + bb_prob * bb_freq);
      aa_prob = aa_prob * scale;
      ab_prob = ab_prob * scale;
      bb_prob = bb_prob * scale;

      //check for valid model
      if (aa_prob > 1) {
        alert("invalid genetic model requested");
        exit;
      }

      //disease allele frequency: cases
      var pcases = (aa_prob * aa_freq + ab_prob * ab_freq * 0.5) / prev;
      //disease allele frequency: controls
      var pcontrols = ((1 - aa_prob) * aa_freq + (1 - ab_prob) * ab_freq * 0.5) / (1 - prev);

      var vcases = pcases * (1 - pcases);
      var vcontrols = pcontrols * (1 - pcontrols);
      var ncp  = (pcases - pcontrols) / Math.sqrt( (vcases / ncases + vcontrols / ncontrols) * 0.5 );
      var C = - ninv(alpha * 0.5);
      var P = ndist(-C - ncp, false) + ndist(C - ncp, true);

      //update sliders
      $("#power_progress").html(P.toFixed(3)).attr("style","width:" + (parseFloat(P) * 100) + "%;");
      $('#cases_progress').html(pcases.toFixed(3)).attr("style","width:" + (parseFloat(pcases) * 100) + "%;");
      $('#controls_progress').html(pcontrols.toFixed(3)).attr("style","width:" + (parseFloat(pcontrols) * 100) + "%;");
      $('#AA_freq').html(aa_freq.toFixed(3));
      $('#AA_progress').html(aa_prob.toFixed(3)).attr("style","width:" + (parseFloat(aa_prob) * 100) + "%;");
      $('#AB_freq').html(ab_freq.toFixed(3));
      $('#AB_progress').html(ab_prob.toFixed(3)).attr("style","width:" + (parseFloat(ab_prob) * 100) + "%;");
      $('#BB_freq').html(bb_freq.toFixed(3));
      $('#BB_progress').html(bb_prob.toFixed(3)).attr("style","width:" + (parseFloat(bb_prob) * 100) + "%;");
};

//calculate points for graph
function findpoints() {

}

//graph
$(function () {
$('#highcharts_graph').highcharts({
    chart: {
        type: 'scatter'
    },
    plotOptions:{
        scatter:{
          lineWidth:2
        }
    },
    title: {
        text: 'Statistical Power with varying number of Cases',
        x: -20 //center
    },
    subtitle: {
        text: 'Constants: controls: 1000, significance level: 7.0E-6, prevalence: 0.1, disease allele frequency: 0.5, genotype relative risk: 1.5',
        x: -20
    },
    xAxis: {
        title: {
          text: 'Cases'
        },
        type: 'logarithmic'

    },
    yAxis: {
        title: {
            text: 'Statistical Power'
        },
        max: 1
    },
    series: [{
        name: 'Cases',
        data: [[10,0.000011997],[100,0.0146066],[200,0.134279],[300,0.350654],[400,0.562356],[500,0.720116],[600,0.82402],[700,0.888972],[800,0.928931],[900,0.95359],[1000,0.969],[5000,0.999946],[10000,0.99999],[100000,1]]
    }]
});
});
