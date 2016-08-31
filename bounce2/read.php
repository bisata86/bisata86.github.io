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
if(!$check & false) {
	echo "imbrogliare?";
}
else {
	error_reporting(0);
	$host="sql8.freemysqlhosting.net"; // Host name
	$username="sql8133823"; // Mysql username
	$password="p3iQitW3kU"; // Mysql password
	$db_name="sql8133823"; // Database name
	if(FALSE) {
		$host="localhost"; // Host name
		$username="root"; // Mysql username
		$password="root"; // Mysql password
		$db_name="siluro"; // Database name
	}


		$link = mysql_connect("$host", "$username", "$password");
		if(!$link) {
			die("stupido DB!");
		}
		mysql_select_db("$db_name",$link)or die("cannot select DB");

		$query = "DELETE FROM `ids2` WHERE timestamp < (NOW() - INTERVAL 25 SECOND);";
		$result = mysql_query($query);


		$query = "SELECT * FROM user ORDER BY punteggio DESC"; //You don't need a ; like you do in SQL
		$result = mysql_query($query);
		echo "<table class='chart'>"; // start a table tag in the HTML
		echo "<tr><td>Rank</td><td>Name</td><td>Score</td></tr>";
		$index = 1;
		while($row = mysql_fetch_array($result)){   //Creates a loop to loop through results
		echo "<tr><td>" . $index . "</td><td>" . $row['nome'] . "</td><td>" . $row['punteggio'] . "</td></tr>";  //$row['index'] the index here is a field name
		$index++;
		}

		echo "</table>";

	// } else {
	// 	echo "IMBROGLIARE?!?";
	// }
		mysql_close($link);

}



?>