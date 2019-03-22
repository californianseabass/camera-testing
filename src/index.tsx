import React, { Fragment } from 'react';
import { render } from 'react-dom';

// https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
// https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

function loop(f: () => void, timeout: number = 5000) {
    function g() {
        setTimeout(() => {
            f();
            g();
        }, timeout)
    }
    g()
}

async function getCamera() {
    const player: HTMLVideoElement = document.getElementById('player') as HTMLVideoElement;

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })

    player.srcObject = stream;

    const canvas = document.getElementById("player-canvas") as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    // let fxCanvas;
    // try {
    //     fxCanvas = fxCanvas.canvas();
    // } catch (e) {
    //     alert(e);
    //     return;
    // }

    function saveNewScreenShot(): void {
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log('image data');



        // apply your pixel magic to this bitmap
        var data = imageData.data; // data is an array of pixels in RGBA

        for (var i = 0; i < data.length; i += 4) {
            console.log('boooo');
            var average = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = average >= 128 ? 255 : 0; // red
            data[i + 1] = average >= 128 ? 255 : 0; // green
            data[i + 2] = average >= 128 ? 255 : 0; // blue
            // note: i+3 is the alpha channel, we are skipping that one
        }
    }

    loop(saveNewScreenShot, 2000);
}

getCamera().then(() => {
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
