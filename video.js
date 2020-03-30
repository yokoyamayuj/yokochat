 // --- prefix -----
navigator.getUserMedia  = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia;
RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;


/** videoのコンテナに反映する */
function attachVideo(id, stream) {
    let video = addRemoteVideoElement(id);
    playVideo(video, stream);
    video.volume = 1.0;
}

/** コンテナからvideoを削除 */ 
function detachVideo(id) {
    let video = getRemoteVideoElement(id);
    pauseVideo(video);
    deleteRemoteVideoElement(id);
}

/** Videoがあるか確認 */ 
function isRemoteVideoAttached(id) {
    if (remoteVideos[id]) {
        return true;
    }
    else {
        return false;
    }
}

/**  videoの枠作成*/
function addRemoteVideoElement(id) {
    _assert('addRemoteVideoElement() video must NOT EXIST', (!remoteVideos[id]));
    let video = createVideoElement('remote_video_' + id);
    remoteVideos[id] = video;
    return video;
}

function getRemoteVideoElement(id) {
    let video = remoteVideos[id];
    _assert('getRemoteVideoElement() video must exist', video);
    return video;
}

function deleteRemoteVideoElement(id) {
    _assert('deleteRemoteVideoElement() stream must exist', remoteVideos[id]);
    removeVideoElement('remote_video_' + id);
    delete remoteVideos[id];
}

/** 枠作成 */
function createVideoElement(elementId) {

    let video = document.createElement('video');
    video.id = elementId;
    container.appendChild(video);

    return video;
}

function removeVideoElement(elementId) {
    let video = document.getElementById(elementId);
    _assert('removeVideoElement() video must exist', video);

    container.removeChild(video);
    return video;
}

// ---------------------- media handling ----------------------- 
// start local video
function startVideo() {
    getDeviceStream({ video: true, audio: false }) 
        .then(function (stream) { // success
            localStream = stream;
            playVideo(localVideo, stream);
        });
}

function startScreenShare() {
    getScreenStream({ video: true, audio: false })
        .then(function (stream) { // success
            localStream = stream;
            playVideo(localVideo, stream);
        });
}

// stop local video
function stopVideo() {
    pauseVideo(localVideo);
    stopLocalStream(localStream);
    localStream = null;
}

function stopLocalStream(stream) {
    let tracks = stream.getTracks();
    for (let track of tracks) {
        track.stop();
    }
}

function getDeviceStream(option) {
    return navigator.mediaDevices.getUserMedia(option);
}
function getScreenStream(option) {
    return navigator.mediaDevices.getDisplayMedia(option);
}


function playVideo(element, stream) {
    if ('srcObject' in element) {
        element.srcObject = stream;
    }

    element.volume = 1.0;
    element.play();
}

function pauseVideo(element) {
    element.pause();
    element.srcObject = null;

}
