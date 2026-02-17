<?php

namespace App\Listeners;

use App\Notifications\WelcomeNotification;
use Illuminate\Auth\Events\Verified;

/**
 * Listener that sends a welcome email when a user registers.
 *
 */
class SendWelcomeEmailListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event  An event that should expose a ->user property
     * @return void
     *
     * @throws \Throwable Re-throws exceptions so queued jobs can be retried.
     */
    public function handle(Verified $event): void
    {
        $user = $event->user;

        if ($user) {
            $user->notify(new WelcomeNotification());
        }
    }
}