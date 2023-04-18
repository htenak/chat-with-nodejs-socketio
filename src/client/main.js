const ip = 'http://your_ip_here:6677';

const socket = io.connect(ip, {
    'forceNew': true
});

socket.on('messages', (data) => {
    console.log(data)
    render(data)
});

function render(data) {
    var html = data.map((message, index) => {
        return (`
            <div class="message">
                <strong>${message.nickname}:</strong>
                <span>${message.text}</span>
            </div>
        `);
    }).join(' ');

    const div_msgs = document.getElementById("messages");
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
    const message = {
        nickname: document.getElementById("nickname").value,
        text: document.getElementById("text").value
    };

    document.getElementById("nickname").style.display = "none";
    socket.emit('add-message', message);
    return false;

}
