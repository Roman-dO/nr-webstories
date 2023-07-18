<?php


function GetStoryList() {
    $answers = [];
    $story_dir = scandir('./stories/');
    
    foreach ($story_dir as $story_file_name) {
        answers[] = $story_file_name;
    }

    return $answers;
}

var_dump(GetStoryList());