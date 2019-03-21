import React, { Fragment } from 'react';
import { render } from 'react-dom';

// https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
function drawCanvas(canvas, img) {
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);
}

async function run() {
    const canvas = document.getElementById("video-canvas") as HTMLCanvasElement;

    const video = document.getElementById("player")

    const mediaOptions = {
        video: true
    }
    const stream = await navigator.mediaDevices.getUserMedia(mediaOptions);
    console.log('stream: ', stream);
    const track = await stream.getVideoTracks()[0];


    while (true) {
        const capture = new ImageCapture(track);
        const blob = await capture.takePhoto();
        const imageBitmap = await createImageBitmap(blob);
        const bitmap = await capture.grabFrame();
        const ctx = canvas.getContext('2d');

        drawCanvas(canvas, imageBitmap);
        console.log('height: ', bitmap.height, ' width: ', bitmap.width);

        //ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height)
        //ctx.drawImage(bitmap, 0, 0)
    }
}

run().then(() => {
    console.log('done')
})

/* function App(props) {
 *     return (
 *         <Fragment>
 *             <button onClick={() => console.log('this is silly')}>try me!</button>
 *         </Fragment>
 *     );
 * }
 * 
 * render(<App />, document.getElementById('app')); */
