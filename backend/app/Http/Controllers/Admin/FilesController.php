<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class FilesController extends Controller
{
    public function index()
    {
        return Inertia::render('Files',
            [
                'title' => 'Files',
                'user' => Auth::user()
            ]
        );
    }
}
