<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if the file was uploaded without errors
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = basename($_FILES['file']['name']); // Sanitize the file name
        $uploadFileDir = './uploads/';
        $dest_path = $uploadFileDir . $fileName;

        // Check if the uploads directory exists, if not, create it
        if (!is_dir($uploadFileDir)) {
            mkdir($uploadFileDir, 0755, true); // Create the directory with appropriate permissions
        }

        // Move the uploaded file to the specified directory
        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            echo "File successfully uploaded to: $dest_path";
        } else {
            echo "Error moving the uploaded file.";
        }
    } else {
        echo "File upload error. Error code: " . $_FILES['file']['error'];
    }
} else {
    echo "Invalid request method.";
}
?>
