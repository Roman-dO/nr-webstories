import $ from './core/libs/jquery.module.js';
import GAME_ENV from './core/game_env.js';
import ServerChannel from "./core/server_channel.js";
import { Story } from "./core/virtual_game_env.js";
import { Background } from "./core/background.js";
import { Notification } from "./core/menu.js";
import { Sound } from "./core/sound.js";


function SetupNodes(data) {
    const nodes = data.nodes;

    Story.Setup(nodes, 0);

    const c_node = Story.cur_node();

    Story.OpenNode(0);
}
function OpenStory(name) {
    ServerChannel.GetStory({ storyName: name }).then(json => {
        SetupNodes(json)
    });
}

$(function() {
    GAME_ENV.ShowAnswers();

    setTimeout(() => {
        Background.SetImage('./img/future_town.png');
        OpenStory('test');
    }, 100);
})


