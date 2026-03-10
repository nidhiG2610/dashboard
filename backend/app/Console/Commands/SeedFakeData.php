<?php

namespace App\Console\Commands;

use Database\Seeders\DatabaseSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\UserTableSeeder;
use Illuminate\Console\Command;

class SeedFakeData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:fake {count=50}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed all application data with progress output';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = $this->argument('count');

        $seeders = DatabaseSeeder::$seeders;


        $this->info("Starting database seeding...");

        $bar = $this->output->createProgressBar($count);
        $bar->start();

        $this->newLine();

        $bar = $this->output->createProgressBar(count($seeders));
        $bar->start();

        foreach ($seeders as $seeder) {

            $name = class_basename($seeder);

            $this->newLine();
            $this->line("Running {$name}...");

            $this->call('db:seed', [
                '--class' => $seeder,
                '--force' => true,
            ]);

            $this->info("✔ {$name} completed");

            $bar->advance();
        }


        $bar->finish();

        $this->newLine();
        $this->info("Seeding completed successfully!");
    }
}
