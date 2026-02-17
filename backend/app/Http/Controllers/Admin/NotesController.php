<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class NotesController extends Controller
{
    public function index()
    {
        return Inertia::render('Notes',
            [
                'title' => 'Notes',
                'user' => Auth::user()
            ]
        );
    }
}
