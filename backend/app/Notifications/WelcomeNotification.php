<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class WelcomeNotification extends Notification
{
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Welcome to Our App!')
                    ->greeting("Hello {$notifiable->first_name},")
                    ->line('Thanks for verifying your email!')
                    ->action('Go to Dashboard', url('/dashboard'))
                    ->line('We are happy to have you!');
    }
}
