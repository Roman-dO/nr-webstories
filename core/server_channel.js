export default class ServerChannel {
    static async GetStory({storyName}) {
        const res = await fetch('http://nothing.local/file_server/get_story.php', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ STORY_NAME: storyName })
        });
        return res.json();
    }
}