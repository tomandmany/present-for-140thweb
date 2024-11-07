// @/components/camera/camera.tsx
'use client';

import uploadPhoto from '@/actions/photo/uploadPhoto';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CameraProps = {
    user_id: string;
};

export default function Camera({ user_id }: CameraProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const secondCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [bigPhotoTaken, setBigPhotoTaken] = useState<string | null>(null);
    const [smallPhotoTaken, setSmallPhotoTaken] = useState<string | null>(null);
    const [deviceType, setDeviceType] = useState<'pc' | 'mobile' | 'tablet'>('pc');

    useEffect(() => {
        const determineDeviceType = () => {
            const userAgent = navigator.userAgent;
            if (/Mobi|Android|iPhone/.test(userAgent)) {
                setDeviceType('mobile');
            } else if (/iPad|Tablet/.test(userAgent)) {
                setDeviceType('tablet');
            } else {
                setDeviceType('pc');
            }
        };

        determineDeviceType();

        const getCameraStream = async () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }

            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: facingMode === 'user' ? { facingMode: 'user' } : { facingMode: { ideal: 'environment' } },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = newStream;
                }
                setStream(newStream);
            } catch (error) {
                console.error('カメラのアクセスに失敗しました:', error);
            }
        };

        getCameraStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [facingMode]);

    const takePhoto = async () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageData = canvasRef.current.toDataURL('image/png');
                setBigPhotoTaken(imageData);

                // Wait for 2 seconds and take another photo with the opposite facing mode
                const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
                setFacingMode(newFacingMode);

                try {
                    console.log('videoRef.current: ', videoRef.current);
                    const newStream = await navigator.mediaDevices.getUserMedia({
                        video: newFacingMode === 'user' ? { facingMode: 'user' } : { facingMode: { ideal: 'environment' } },
                    });
                    console.log('videoRef.current: ', videoRef.current);

                    if (videoRef.current) {
                        videoRef.current.srcObject = newStream;
                    }
                    setStream(newStream);

                    // Wait for the video stream to be ready before capturing the second photo
                    setTimeout(() => {
                        if (videoRef.current && secondCanvasRef.current) {
                            console.log('Second photo capture process started');
                            const newContext = secondCanvasRef.current.getContext('2d');
                            if (newContext) {
                                secondCanvasRef.current.width = videoRef.current.videoWidth;
                                secondCanvasRef.current.height = videoRef.current.videoHeight;
                                newContext.drawImage(videoRef.current, 0, 0, secondCanvasRef.current.width, secondCanvasRef.current.height);
                                const secondImageData = secondCanvasRef.current.toDataURL('image/png');
                                setSmallPhotoTaken(secondImageData);
                            }
                        }
                    }, 2000);
                } catch (error) {
                    console.error('2回目のカメラのアクセスに失敗しました:', error);
                    setFacingMode(facingMode); // Revert facing mode in case of failure
                }
            }
        }
    };

    const retryPhoto = () => {
        setBigPhotoTaken(null);
        setSmallPhotoTaken(null);
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        setStream(null);
        (async () => {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: facingMode === 'user' ? { facingMode: 'user' } : { facingMode: { ideal: 'environment' } },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = newStream;
                }
                setStream(newStream);
            } catch (error) {
                console.error('カメラのアクセスに失敗しました:', error);
            }
        })();
    };

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`w-full max-w-md border-2 border-gray-300 rounded-lg mb-4" ${bigPhotoTaken ? 'hidden' : ''}`}
            />
            <div className={`w-[390px] h-[520px] relative ${bigPhotoTaken ? '' : 'hidden'}`}>
                <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className={`rounded-xl w-[390px] h-[520px] object-cover absolute inset-0 ${bigPhotoTaken ? '' : 'hidden'}`}
                />
                <canvas
                    ref={secondCanvasRef}
                    width={640}
                    height={480}
                    className={`rounded-xl w-[120px] h-[165px] object-cover absolute top-2 left-2 border-2 border-black cursor-pointer focus:outline-none select-none ${smallPhotoTaken ? '' : 'hidden'}`}
                />
            </div>
            <div className="flex space-x-4 mb-4">
                {!bigPhotoTaken && !smallPhotoTaken && (
                    <>
                        {deviceType !== 'pc' && (
                            <button
                                onClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                <RefreshCcw />
                            </button>
                        )}
                        <button
                            onClick={takePhoto}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            写真を撮る
                        </button>
                    </>
                )}
                {(bigPhotoTaken || smallPhotoTaken) && (
                    <>
                        <button
                            onClick={retryPhoto}
                            className="text-white px-4 py-2 rounded-lg"
                        >
                            撮り直す
                        </button>
                        <button
                            onClick={() => {
                                setBigPhotoTaken(null);
                                setSmallPhotoTaken(null);
                                setFacingMode('user');
                                if (bigPhotoTaken && smallPhotoTaken) uploadPhoto(bigPhotoTaken, smallPhotoTaken, user_id);
                            }}
                            className="text-white px-4 py-2 rounded-lg"
                        >
                            送信
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
