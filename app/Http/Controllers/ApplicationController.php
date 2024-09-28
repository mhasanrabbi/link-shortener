<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;

class ApplicationController
{
    /**
     * @return Application|Factory|View|\Illuminate\Foundation\Application
     */
    public function app()
    {
        return view('application');
    }
}
