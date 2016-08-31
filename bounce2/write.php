<?php
header( 'X-Frame-Options: SAMEORIGIN' );
header( "X-Content-Security-Policy: allow 'self'; options inline-script eval-script$t_avatar_img_allow; frame-ancestors 'none'" );
$check = false;

foreach (getallheaders() as $name => $value) {
	if($name=='Referer') {
		if(strpos($value, 'maurobiasutto') !== FALSE) {
			$check = true;
		}
	}
}
// if(!$check & false) {
// 	echo "imbrogliare?";
// }
// else if(intval($_POST['d']/$_POST['p'])!=$_POST['h']) {
// 	echo "imbrogliare?";
// }
// else if(intval($_POST['p']/$_POST['d'])!=$_POST['t']) {
// 	echo "imbrogliare?";
// }
else {

$host="sql.maurobiasutto.it"; // Host name
$username="maurobia23426"; // Mysql username
$password="maur21611"; // Mysql password
$db_name="maurobia23426"; // Database name
if(TRUE) {
	$host="localhost"; // Host name
	$username="root"; // Mysql username
	$password="root"; // Mysql password
	$db_name="siluro"; // Database name
}

//$hostname =  gethostname();
// $envo =  getenv('HTTP_HOST');
// if(strpos($envo, 'maurobiasutto') !== FALSE & strpos($hostname, 'seeweb.it') !== FALSE) {

	// Connect to server and select databse.
	$link = mysql_connect("$host", "$username", "$password")or die("cannot connect");
	mysql_select_db("$db_name",$link)or die("cannot select DB");

	$query = "DELETE FROM `ids2` WHERE timestamp < (NOW() - INTERVAL 25 SECOND);";
	$result = mysql_query($query);




	if(true) {
		$currID;
		$passed = false;
		$sql="SELECT `id` FROM `ids2`";
		$result = mysql_query($sql);
		$ress =  $_POST['d'];
		while($row = mysql_fetch_array($result)){

			$calculated = intval (((($row['id']*7*64)-(64*$row['id']-13))/3)+log(64*$row['id']));
			if($ress==$calculated) {
				$passed = true;
				$currID = $row['id'];
			}
		}

		if($passed) {
			$passed2 = false;
			$query = "SELECT POS FROM lastids2 ORDER BY POS DESC"; //You don't need a ; like you do in SQL
			$result = mysql_query($query);
			$int =  mysql_fetch_array($result)[0];
			//echo $int;

			$query="SELECT * FROM `lastids2`";
			$result = mysql_query($query);
			$limit =  mysql_num_rows ( $result );
			$index = 0;
			while ($index <= $limit) {
				$sql="SELECT `ID` FROM `lastids2` WHERE POS = $int";
				$result = mysql_query($sql);
				//echo '-';
				//echo mysql_fetch_array($result)[0];
				//echo '-';
				$sql="SELECT `ID` FROM `lastids2` WHERE POS = $int-1";
				$result2 = mysql_query($sql);
				//echo mysql_fetch_array($result2)[0];
				$uno = mysql_fetch_array($result)[0];
				$due = mysql_fetch_array($result2)[0];
				$precalc = intval(($uno+$due)/2);
				$calculated2 = intval (((($precalc*7*64)-(64*$precalc-13))/3)+log(64*$precalc));

				if($ress==$calculated2) {
					// echo $uno;
					// echo "-";
					// echo $due;
					$passed2 = true;
				}
				$int--;
				$index++;
			}
			if($passed2) {
				$query = "SELECT * FROM user ORDER BY punteggio DESC"; //You don't need a ; like you do in SQL
				$result = mysql_query($query);
				$index = 1;
				$last;
				while($row = mysql_fetch_array($result)){   //Creates a loop to loop through results
				//echo "<tr><td>" . $index . "</td><td>" . $row['nome'] . "</td><td>" . $row['punteggio'] . "</td></tr>";  //$row['index'] the index here is a field name
				if ($index==100) {
					$last = $row['punteggio'];
				}
				$index++;
				}

				$query = "SELECT nome, punteggio FROM user ORDER BY punteggio ASC";
				$result = mysql_query($query);
				$doublecheck =  mysql_fetch_array($result)['punteggio'];


				if ($doublecheck > $_POST['p'] || strpos($_POST['n'], '<') !== FALSE || strpos($_POST['n'], '>') !== FALSE || strpos($_POST['p'], '<') !== FALSE || strpos($_POST['p'], '>') !== FALSE || strlen($_POST['n']) > 20)
				    echo 'imbrogliare?';
				else {
					$sql="DELETE FROM `ids2` WHERE `id` = '" . $currID . "'";
					$result = mysql_query($sql);
				    if ($index<=100) {
						$sql="INSERT INTO `user` (`punteggio`, `nome`, `id`) VALUES ('" . $_POST['p'] . "', '" . $_POST['n'] . "', '9');";
						$result = mysql_query($sql);
					}
					else {
						//echo $last;
						$sql="DELETE FROM `user` WHERE `punteggio` = '" . $last . "'";
						$result = mysql_query($sql);
						$sql="INSERT INTO `user` (`punteggio`, `nome`, `id`) VALUES ('" . $_POST['p'] . "', '" . $_POST['n'] . "', '9');";
						$result = mysql_query($sql);
					}
				}
			} else {
				echo 'imbrogliare?';
			}

		} else {
			echo 'imbrogliare?';
		}

	}
//}
	mysql_close($link);
}

?>