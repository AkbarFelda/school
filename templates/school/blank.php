<!DOCTYPE html>
<html lang="en">
    <head>
        <?php
        echo $sys->meta();
        ?>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body style="">
        <?php echo trim($Bbc->content); ?>
        <script type="text/javascript"> if (_URL.indexOf(window.location.protocol) == -1)
                window.location.href = window.location.href.replace(window.location.protocol, (window.location.protocol == 'https:') ? 'http:' : 'https:');</script>
        <script src="<?php echo _URL; ?>templates/admin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    </body>
</html>