<?php
$csv = file(".//documents/MiniAssessment.csv");
$qcount = count($csv) - 1;
echo $qcount;
// $file = fopen("C:/Users/vedan/Desktop/MY FILES/PROGRAMMING/soar-vision/documents/Free Mini Assessment Draft1.csv","r");
// $data = str_getcsv($file)
// // while (!feof($file)) {
// //     $data = fgetcsv($file);    
// // }
// print_r($data);
// fclose($file);


// for($i = 1;$i<= $qcount;$i++){

// }
$radio = array();
for ($i = 1; $i <= $qcount; $i++) {
    array_push($radio, "radio${i}");
}
foreach ($radio as $loop) {
    $loop = $_POST['' . $loop];
}
