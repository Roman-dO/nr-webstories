import $ from './libs/jquery.module.js';
import {Story} from "./virtual_game_env.js";

export default class GAME_ENV {
    static nodes = {
        text:            () => $('#--node-text'),
        title:           () => $('#--node-title'),
        toggleBtn:       () => $('#--toggle-button'),
        answerVariables: () => $('#--node-variables-root'),
        answerContainer: () => $('#--node-var-container')
    };

    static OpenedAns = () => this.nodes.answerVariables().hasClass('on');
    static ToggleAnswersShow() {
        if (this.OpenedAns) this.ShowAnswers();
        else                this.HideAnswers();
    }
    static UpdateShowAnswersButton() {
        if (this.OpenedAns)
            this.nodes.toggleBtn().removeClass('on');
        else
            this.nodes.toggleBtn().addClass('on');
    }

    static ShowAnswers() {
        this.OpenedAns = !this.OpenedAns;
        this.nodes.answerVariables().addClass('on');
        this.UpdateShowAnswersButton();
    }
    static HideAnswers() {
        this.OpenedAns = !this.OpenedAns;
        this.nodes.answerVariables().removeClass('on');
        this.UpdateShowAnswersButton();
    }

    static AddAnswers(arr) {
        arr.forEach(answer => {
            this.AddAnswer({
                text: answer.text? answer.text: 'default_text',
                tid: answer.tid? answer.tid: 0,
            });
        })
    }
    static GenerateAnswerObject() {
        const el = $('<div>', {'class': 'var'});
        const text = $('<div>');
        const content_el = $('<div>', { 'class': 'content' });
        const bg_el = $(
        '<div class="bg">' +
            '<div class="rect"></div>' +
        '</div>');

        content_el.append(
            text,
            bg_el
        );
        el.append(
            $('<div>', {'class': 'line'}),
            content_el,
            $('<div>', {'class': 'line'})
        );

        return { root: el, text: text };
    }
    static AddAnswer(temp) {
        let answer = this.GenerateAnswerObject();
        answer.text.text(temp.text);

        this.nodes.answerContainer().append(answer.root);

        answer.root.click((e) => {
            Story.OpenNode(temp.tid);
        })

        return answer.root;
    }
    static ClearAnswers() {
        this.nodes.answerContainer().html('');
    }

    static init() {
        this.nodes.toggleBtn().click(() => {
            this.ToggleAnswersShow();
        });
    }

    static SetText(temp) {
        this.nodes.text().text(temp);
    }

    static SetTitle(temp) {
        this.nodes.title().text(temp);
    }

    static UploadNode(title, text, vars) {
        this.SetText(text);
        this.SetTitle(title);

        this.ClearAnswers();
        this.AddAnswers(vars);
    }
}

$(function() {
    GAME_ENV.init();
});

