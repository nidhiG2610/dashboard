<?php

namespace App\Jobs;

use App\Events\CommandOutput;
use Database\Seeders\DatabaseSeeder;
use Defuse\Crypto\Exception\EnvironmentIsBrokenException;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\BufferedOutput;

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

        // event(new CommandOutput( 
        // 'Creating new data... 
        // The data will be stored only for currnt session and will be deleted after 10 mins when the session ends. 
        // The data is being created for the first time, so it may take a while.
        // Please wait...'
        // ));

        // $command = 'seed:fake'; // 👈 change to what you want

        // Artisan::call($command);

        // $output = Artisan::output();
        // Log::info('Artisan command output:', ['output' => $output]);

        // foreach (explode("\n", $output) as $line) {
        //     event(new CommandOutput($line));
        // }

        // event(new CommandOutput('Command finished.', true));

        $seeders = DatabaseSeeder::$seeders;

        event(new CommandOutput("Starting database seeding..."));

        $count = count($seeders);
        $progress = 0;

        event(new CommandOutput("Found {$count} seeders to run.", 0, $count));

        foreach ($seeders as $seeder) {

            $name = class_basename($seeder);

            event(new CommandOutput("Running {$name}...", $progress, $count));

            Artisan::call('db:seed', [
                '--class' => $seeder,
                '--force' => true,
            ]);

            $progress++;
            event(new CommandOutput("✔ {$name} completed", $progress, $count));
        }
        event(new CommandOutput("Seeding completed successfully!", $progress, $count, true));
    }
}
