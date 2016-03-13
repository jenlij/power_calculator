<?php

	//variables from user input
	$ncases =intval($_POST['ncases']);
	$ncontrols = intval($_POST['ncontrols']);
	$pisamples = floatval($_POST['pisamples']);
	$pimarkers =floatval($_POST['pimarkers']);
	$freq = floatval($_POST['freq']);
	$risk = floatval($_POST['risk']);
	$prevalence = floatval($_POST['prevalence']);
	$alpha = floatval($_POST['alpha']);
	
	//command line input
        $cmdstr = '/usr/cluster/bin/CaTS';
        $cmdstr .= ' --cases '.$ncases.' --controls '. $ncontrols.' --pisamples '. $pisamples.' --pimarkers '.$pimarkers.' --freq '. $freq.' --risk '.$risk.' --prevalence '.$prevalence.' --alpha '.$alpha;
        $outVal = exec($cmdstr);
      
	$error = "I don't like the genetic model you requested!";
      if($outVal == $error) {
                echo"<font color='#FF0000'>I don't like the genetic model you requested!</font>";
                echo nl2br("\n");
                print "<font color='#FF0000'>Please try setting new parameters.</font>";
      }
      //http://papermashup.com/using-php-and-css-to-make-a-simple-graph/  
      else {   
	         $data = explode(" ", $outVal);
	         $percent1 = $data[1] * 100;
	         $percent2 = $data[3] * 100;
	         $percent3 = $data[5] * 100;
           $powerpercent = $data[8] * 100;
           $casespercent = $data[6] * 100;
           $controlspercent = $data[7] *100;
        
        echo '
        <table cellspacing="5">
        <tr>
        <td>
            <strong>Expected power for a one stage study:</strong> 
        </td>
        <td>
            <div class="rating graphcont graph1"><strong class="bar" style="width:',$powerpercent,'%;">',$data[8],'</strong></div><div class="clear"></div> 
        </td>
        </tr>
        <tr><td>&nbsp</td></tr>

        <tr>
        <td><strong>Expected disease allele frequency:</strong></td>
        </tr>
        <tr>
        <td>Cases:</td>
        <td>
          <div class="rating graphcont graph2"><strong class="bar" style="width:',$casespercent,'%;">',$data[6],'</strong></div><div class="clear"></div>
        </td>
        </tr>
        <tr>
        <td>Controls:</td>
        <td>
          <div class="rating graphcont graph2"><strong class="bar" style="width:',$controlspercent,'%;">',$data[7],'</strong></div><div class="clear"></div>
        </td>
        </tr>
        <tr><td>&nbsp</td></tr>

        <tr>
        <td><strong>Probability of disease:</strong></td>
        </tr>
        <tr>
        <td>Genotype A/A [with frequency ',$data[0],']:</td>
        <td><div class="rating graphcont graph3"><strong class="bar" style="width:',$percent1,'%;">',$percent1,'%</strong></div><div class="clear"></div></td>
        </tr>
        <tr>
        <td>Genotype A/B [with frequency ',$data[2],']:</td>
        <td><div class="rating graphcont graph3"><strong class="bar" style="width:',$percent2,'%;">',$percent2,'%</strong></div><div class="clear"></div></td>
        </tr>
        <tr>
        <td>Genotype B/B [with frequency ',$data[4],']:</td>
        <td><div class="rating graphcont graph3"><strong class="bar" style="width:',$percent3,'%;">',$percent3,'%</strong></div><div class="clear"></div></td>
        </tr>
        </table>';
  
  }

  echo nl2br("\n"); 
  echo nl2br("\n");
  echo '<table cellspacing="5">
  <tr>
  <td><strong>Parameters in effect:</strong></td>
  </tr> 
  <tr>
    <td>cases: ',$ncases,', controls: ',$ncontrols,', significance level: ',$alpha,', prevalence: ',$prevalence,', disease allele frequency: ',$freq,', genotype relative risk: ',$risk,'
    </td>
  </tr>
  </table>';
?>
