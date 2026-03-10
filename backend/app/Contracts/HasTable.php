<?php

namespace App\Contracts;

interface HasTable
{
    /**
     * Get the table name associated with the model.
     *
     * @return string
     */
    public function getTableName(): string;
}
