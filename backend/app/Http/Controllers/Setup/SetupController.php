<?php

namespace App\Http\Controllers\Setup;

use App\Events\CommandOutput;
use App\Http\Controllers\Controller;
use App\Jobs\RunCommandJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Broadcast;

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
        Log::info('Running setup command...');
        RunCommandJob::dispatch();

    return response()->json(['message' => 'Command started']);
    }
}
