<?php

header('Content-Type: application/json');

$_STORY_FILE_PREFIX = '_story_';

function GetStory($story_name) {
    $story_text = readfile('./stories/_story_'.$story_name.'.json');

    $json_length = strripos($story_text, '}');
    return substr(
        $story_text,
        0,
        $json_length
    );
}

echo GetStory('test');

