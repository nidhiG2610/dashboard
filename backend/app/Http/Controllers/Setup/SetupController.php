<?php

namespace App\Http\Controllers\Setup;

use App\Http\Controllers\Controller;
use App\Jobs\RunCommandJob;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SetupController extends Controller
{
    /**
     * Show a simple setup status.
     *
     * GET /setup
     */
    public function index()
    {
        $isConfigured = DB::table('migrations')->exists() && DB::table('users')->exists();
        return response()->json([
            'configured' => $isConfigured,
            'message' => $isConfigured ? 'Application appears configured.' : 'Setup required.'
        ]);
    }

    /**
     * Run application setup.
     *
     * POST /setup
     */
    public function runCommand(){

        RunCommandJob::dispatch();

        return response()->json(['message' => 'Command started']);
    }

    public function workerStatus()
    {
        // Check if queue worker is running
        $output = shell_exec("ps aux | grep 'queue:work' | grep -v grep");

        $running = !empty($output);

        return response()->json([
            'running' => $running
        ]);    
    }
}
