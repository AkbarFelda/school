<?php

if (!defined('_VALID_BBC'))
    exit('No direct script access allowed');

$userExist = $db->getOne("SELECT COUNT(*) FROM `bbc_user` WHERE `id` = $user->id AND `active` = 1");

if ($userExist != 1) {
    user_logout($user->id);
    redirect(_URL);
}

if (empty($user->id)) {
    redirect(_URL);
}


if (strpos($user->group_id, '5') !== false) {
    redirect(_URL . 'teacher/dashboard');
} else if (strpos($user->group_id, '7') !== false) {
    redirect(_URL . 'student');
}
