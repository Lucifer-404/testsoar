<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "test";

$conn = mysqli_connect($host,$user,$pass,$db);

if(isset($_POST['submit'])){

    if(!empty($_POST['name-2']) || !empty($_POST['email']) || !empty($_POST['phone']) || !empty($_POST['message'])){
        $name = $_POST['name-2'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $msg = $_POST['message'];
        $subject = 'SOMEONE WANTS TO CONTACT YOU';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: ${email}' . "\r\n";

        $query = "INSERT INTO `contact_us`(`name`, `email`, `phone`, `message`) VALUES ('$name', '$email', '$phone', '$msg')";
        $run = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if($run){
            echo "Form submitted";
        }
        else{
            echo "Form not submitted";
        }
    }
    else{
        echo "all fields required";

    }
}



//get data from form  

$to = "vedantmisra4444@gmail.com";
$subject = "Contact From website";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $msg."\r\n Contact No. = ".$phone;
$headers = "From: noreply@yoursite.com" . "\r\n" .
"CC: somebodyelse@example.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("location:contact.php?success");




    // if(empty($name) || empty($email) || empty($phone) || empty($msg)){
    //     header("location:contact.php?error");
    // }
    // else{
    //     $to = "vedantmisra4444@gmail.com";
    //     if(mail($to,$subject,$msg))
    //     {
    //         header("location:contact.php?success");
    //     }
    // }
// }
// else{
//     header("location:contact.php");
    
// }
?>