

socket.on('audioText', function (audioTexst) {
    $('#messages').append($('<li class="remote">').text(audioTexst.message));
    // window.scrollTo(0, document.body.scrollHeight);
});
