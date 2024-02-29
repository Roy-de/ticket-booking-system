<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Booking Confirmation</title>
</head>
<body>
    <p>Thank you for booking!</p>
    <p>Event Name: <?php echo e($data['event_name']); ?></p>
<p>Number of Tickets: <?php echo e($data['no_of_tickets']); ?></p>
<p>Feel free to explore our app and let us know if you have any questions.</p>
</body>
</html>
<?php /**PATH /home/roy/cytonn_project/resources/views/email.blade.php ENDPATH**/ ?>