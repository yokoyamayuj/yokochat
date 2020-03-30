
function startChat() {
    alert($('#m').val());
    // TODO peer2peerでやりたいできれば
    $('#m').val('');
};

socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
    // window.scrollTo(0, document.body.scrollHeight);
});
