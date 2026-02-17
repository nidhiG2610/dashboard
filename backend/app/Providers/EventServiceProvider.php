<?php

namespace App\Providers;

use App\Listeners\SendWelcomeEmailListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;


class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Verified::class => [
            SendWelcomeEmailListener::class,
        ],

        // Example:
        // \App\Events\OrderPlaced::class => [
        //     \App\Listeners\SendOrderConfirmation::class,
        // ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        // Register additional events or perform boot-time logic here.
    }

    /**
     * Determine if events should be auto-discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}