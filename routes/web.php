<?php

use App\Http\Controllers\ApplicationController;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', [ApplicationController::class, 'app'])->where('any', '^(?!api\/).*$')->name('any');
