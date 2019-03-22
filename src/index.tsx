import React, { Fragment } from 'react';
import { render } from 'react-dom';

// https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
// https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

async function getCamera() {
    const player: HTMLVideoElement = document.getElementById('player') as HTMLVideoElement;

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })

    player.srcObject = stream;

    const canvas = document.getElementById("player-canvas") as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const saveNewScreenShot = async () => {
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const body = new FormData();
        body.append('photo', new Blob([imageData.data]));
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body
        })
    }


    document.getElementById("analyze-button").addEventListener("click", saveNewScreenShot, false);
}

getCamera().then(() => {
    console.log('done')
})
