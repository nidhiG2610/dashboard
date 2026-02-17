<?php

namespace App\Jobs;

use App\Events\CommandOutput;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class RunCommandJob implements ShouldQueue 
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $command = 'route:list'; // 👈 change to what you want

        Artisan::call($command);

        $output = Artisan::output();
        Log::info('Artisan command output:', ['output' => $output]);

        foreach (explode("\n", $output) as $line) {
            event(new CommandOutput($line));
        }

        event(new CommandOutput('Command finished.', true));
    }
}
