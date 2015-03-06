<?php
	
	// log the download
	$tLogFileName = "downloads.txt";
	date_default_timezone_set('Australia/Brisbane');
	$tLogEntry = date('r') . "\t" . $_SERVER['REMOTE_ADDR'] . "\t" . "ManReader-noSB.zip" . "\n";

	$tFileHandle = fopen($tLogFileName, 'a');
	if ($tFileHandle) {
	   fwrite($tFileHandle, $tLogEntry);
	}
	fclose($tFileHandle);
	
	// return a header to the download link
	$tDownloadURL = "/manreader-nosb/ManReader-noSB.zip";
	header("Location: " . $tDownloadURL);
	
?>
