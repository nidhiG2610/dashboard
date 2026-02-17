<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// @todo convert this to private channel.
Broadcast::channel('command-output', function ($user) {
    return true;
});
