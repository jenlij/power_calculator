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
//      $output = shell_exec($cmdstr);
//      print $output;
        $outVal = exec($cmdstr);
        //$filename = '/net/wonderland/home/jenlij/CatsOutData.txt';
        //$data = file($filename);
	$error = "I don't like the genetic model you requested!";
        if($outVal == $error) {
                echo"<font color='#FF0000'>I don't like the genetic model you requested!</font>";
                echo nl2br("\n");
                print "<font color='#FF0000'>Please try setting new parameters.</font>";
        }
        else {
	//http://papermashup.com/using-php-and-css-to-make-a-simple-graph/	
	$data = explode(" ", $outVal);
	$percent1 = $data[1] * 100;
	$percent2 = $data[3] * 100;
	$percent3 = $data[5] * 100;

	echo "<strong>Probability of disease:</strong>";
        echo nl2br("\n");
        echo '
        <table cellspacing="5">
	<tr>
        <td>Genotype A/A [with frequency ',$data[0],']:</td>
        <td><div class="rating"><div class="graphcont"><div class="graph"><strong class="bar" style="width:',$percent1,'%;">',$percent1,'%</strong></div></div></div><div class="clear"></div></td>
        </tr>
        <tr>
        <td>Genotype A/B [with frequency ',$data[2],']:</td>
        <td><div class="rating"><div class="graphcont"><div class="graph"><strong class="bar" style="width:',$percent2,'%;">',$percent2,'%</strong></div></div></div><div class="clear"></div></td>
        </tr>
        <tr>
        <td>Genotype B/B [with frequency ',$data[4],']:</td>
        <td><div class="rating"><div class="graphcont"><div class="graph"><strong class="bar" style="width:',$percent3,'%;">',$percent3,'%</strong></div></div></div><div class="clear"></div></td>
        </tr>
        </table>';

	echo nl2br("\n");
	echo "<strong>Expected disease allele frequency:</strong>";
	echo nl2br("\n");
	print "Cases: <strong> ".$data[6];
	echo nl2br("\n");
	print "</strong>Controls: <strong>".$data[7];
	echo nl2br("\n");
	echo nl2br("\n");
	echo "Expected power for a one stage study: ".$data[8];
	}
	echo nl2br("\n");	
	echo nl2br("\n");
//	print "--------------------------------------------------";
//	echo nl2br("\n");	
//	echo nl2br("\n");
//	print "Parameters in effect:";
//        echo nl2br("\n"); 
//        print "cases: ".$ncases.", controls: ".$ncontrols.", significance level: ".$alpha.", prevalence: ".$prevalence.", disease allele frequency: ".$freq.", genotype relative risk: ".$risk;
?>
