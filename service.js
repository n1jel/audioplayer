import TrackPlayer from "react-native-track-player";
module.exports = async function () {
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
    TrackPlayer.setupPlayer().then(() => {
        console.log('Track player ready');
    });
    TrackPlayer.addEventListener('remote-play', () =>
        TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () =>
        TrackPlayer.pause());
}