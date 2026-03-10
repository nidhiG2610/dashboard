<?php

namespace App\Console\Commands;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RefreshData extends Command
{
    protected $signature = 'db:refresh-data';
    protected $description = 'Truncate only tables defined in DatabaseSeeder';

     public function handle()
    {
        $this->info("Refreshing seeded tables...");

        $seeders = DatabaseSeeder::$seeders;
        $this->line("Found " . count($seeders) . " seeders to check for tables.");
        $tables = [];

        foreach ($seeders as $seederClass) {

            $seeder = new $seederClass();

            if ($seeder instanceof \App\Contracts\HasTable) {
                $tables[] = $seeder->getTableName();
            } else {
                $this->warn("Seeder {$seederClass} does not implement HasTable interface.");
            }
        }

        $tables = array_unique($tables);

        if (empty($tables)) {
            $this->warn("No tables found.");
            return;
        }

        Schema::disableForeignKeyConstraints();

        foreach ($tables as $table) {

            if (!Schema::hasTable($table)) {
                $this->warn("Table {$table} does not exist.");
                continue;
            }

            $this->line("Truncating: {$table}");

            DB::table($table)->truncate();
        }

        $this->info('Cleaning mapping tables...');
        $mappingTables = ['product_tag_map'];

        foreach ($mappingTables as $table) {
            if (!Schema::hasTable($table)) {
                $this->warn("Table {$table} does not exist.");
                continue;
            }

            $this->line("Truncating: {$table}");
            DB::table($table)->truncate();
        }

        // clean users with role user
        if (Schema::hasTable('users')) {
            $this->line("Truncating users with role 'user'...");
            DB::table('users')->where('role_id', '!=', 1)->delete();
        } else {
            $this->warn("Table users does not exist.");
        }

        Schema::enableForeignKeyConstraints();

        $this->info("✅ Done! Seeded tables truncated successfully.");
    }

}
