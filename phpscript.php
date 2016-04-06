<?php
	//variables from user input
	$ncases =intval($_POST['ncases']);
	$ncontrols = intval($_POST['ncontrols']);
	$pisamples = floatval($_POST['pisamples']);
	$pimarkers =floatval($_POST['pimarkers']);
	$freq = floatval($_POST['freq']); //disease allele frequency
	$risk = floatval($_POST['risk']); //genotype relative risk
	$prevalence = floatval($_POST['prevalence']);
	$alpha = floatval($_POST['alpha']); //significance level
	
	//command line input
  $cmdstr = '/usr/cluster/bin/CaTS';
  $cmdstr .= ' --cases '.$ncases.' --controls '. $ncontrols.' --pisamples '. $pisamples.' --pimarkers '.$pimarkers.' --freq '. $freq.' --risk '.$risk.' --prevalence '.$prevalence.' --alpha '.$alpha;
  $outVal = exec($cmdstr);
      
	$error = "I don't like the genetic model you requested!";
    if($outVal == $error) {
      http_response_code(400);
      exit;
    }
    else {   
	    $data = explode(" ", $outVal);
      $json = array(
        "genotypeAA"      => array(
            "frequency"   => $data[0],
            "probability" => $data[1]
        ),
        "genotypeAB"      => array(
            "frequency"   => $data[2],
            "probability" => $data[3]
        ),
        "genotypeBB"      => array(
            "frequency"   => $data[4],
            "probability" => $data[5]
        ),

        "cases"           => $data[6],
        "controls"        => $data[7],
        "power"           => $data[8],
      );
	   
      echo json_encode($json);
      exit;           
  }
?>
