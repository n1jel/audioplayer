import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, Text, View } from "react-native";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode, State } from "react-native-track-player";
const SoundPlayer = () => {
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    useEffect(() => {
        async function setup() {
            let isSetup = await setupPlayer();
            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                await addTracks();
            }
            setIsPlayerReady(isSetup);
        }

        setup();
    }, []);

    async function setupPlayer() {
        let isSetup = false;
        try {
            await TrackPlayer.getCurrentTrack();
            isSetup = true;
        }
        catch {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                android: {
                    appKilledPlaybackBehavior:
                        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                },
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.SeekTo,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                ],
                progressUpdateEventInterval: 2,
            });

            isSetup = true;
        }
        finally {
            return isSetup;
        }
    }
    const addTracks = async () => {
        await TrackPlayer.add([
            {
                id: '1',
                url: require('../../assets/sample.mp3'),
                title: 'Fluidity',
                artist: 'tobylane',
                duration: 60,
            }
        ]);
        // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }

    return (
        <SafeAreaView>
            {!isPlayerReady &&
                <ActivityIndicator size="large" color="#bbb" />
            }
            <Pressable style={{ backgroundColor: "red", height: 100, width: 100 }}
                onPress={() => {
                    TrackPlayer.play()
                }}
            >
                <Text>Play</Text>
            </Pressable>
            <Pressable style={{ backgroundColor: "blue", height: 100, width: 100 }}
                onPress={() => {
                    TrackPlayer.pause()
                }}
            >
                <Text>Pause</Text>
            </Pressable>
        </SafeAreaView>
    )
}
export default SoundPlayer;