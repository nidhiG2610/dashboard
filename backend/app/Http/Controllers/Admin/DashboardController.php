<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index(): InertiaResponse
    {
        $user = Auth::user();
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'user' => $user
        ]);
    }
}
