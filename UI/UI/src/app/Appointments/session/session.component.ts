import { Component, ElementRef, ViewChild } from '@angular/core';

//Media Soup Client
import { Device } from 'mediasoup-client';
import { Socket } from 'socket.io';

//This programming statement was adapted from GitHub:
//Link: https://github.com/helenamerk/mic-check
//Author: BrianLi101, helenamerk, Aldredcz, binod-d
//Author Profile Links: https://github.com/BrianLi101,https://github.com/helenamerk,https://github.com/Aldredcz,https://github.com/binod-dc
import {MediaPermissionsError, MediaPermissionsErrorType,requestMediaPermissions} from 'mic-check';

import { Router } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {

constructor(public ReloadSession: Router) {}

  
ngOnInit(): void { 
  //This method was adapted from GitHub:
  //Link: https://github.com/helenamerk/mic-check
  //Author: BrianLi101, helenamerk, Aldredcz, binod-d
  //Author Profile Links: https://github.com/BrianLi101,https://github.com/helenamerk,https://github.com/Aldredcz,https://github.com/binod-dc
  requestMediaPermissions()
	.then(() => {
		alert('Patient Feed has loaded succssfully!');
    //Video Feed Constraints
    //This programming statement was adapted from MDN:
    //Link: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    //Author: MDN
    const PatientVideoStreamConstraints = ({
      video: {
          facingMode: "user",
          width: {ideal: 1280, min: 720, max: 1920},
          height: {ideal: 720, min: 480, max: 1080},
          framerate: {ideal: 30, min:10, max: 60}
      },
      audio: true,
    })
    
      //Patient Feed
      //This programming statement was adapted from MDN:
      //Link: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      //Author: MDN
      let StreamOne = document.getElementById("PatientVideoFeed") as HTMLVideoElement;
      //This programming statement was adapted from MDN:
      //Link: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      //Author: MDN
      navigator.mediaDevices.getUserMedia(PatientVideoStreamConstraints).then(PatientLiveStream =>{
       
        StreamOne.srcObject = PatientLiveStream;
        StreamOne.play();
      });
     
	})
	.catch((err: MediaPermissionsError) => {
    //This programming statement was adapted from GitHub:
    //Link: https://github.com/helenamerk/mic-check
    //Author: BrianLi101, helenamerk, Aldredcz, binod-d
    //Author Profile Links: https://github.com/BrianLi101,https://github.com/helenamerk,https://github.com/Aldredcz,https://github.com/binod-dc
		const { type, name, message } = err;
    //This programming statement was adapted from GitHub:
    //Link: https://github.com/helenamerk/mic-check
    //Author: BrianLi101, helenamerk, Aldredcz, binod-d
    //Author Profile Links: https://github.com/BrianLi101,https://github.com/helenamerk,https://github.com/Aldredcz,https://github.com/binod-dc
		if (type == MediaPermissionsErrorType.SystemPermissionDenied) {
        alert('Session initialization failed: Your browser does not have camera and microphone permissions.');
        alert('Please exit the application which is using your camera and micorphone.');
        this.ReloadSession.navigate(['/ValidateSession']);
       
    }else if(type == MediaPermissionsErrorType.UserPermissionDenied){
        alert('Session initialization failed: Camera and microphone permissions were denied.');
        this.ReloadSession.navigate(['/ValidateSession']);
       
    }else if(type == MediaPermissionsErrorType.CouldNotStartVideoSource){
        alert('Session initialization failed: You camera and microphone are being used by another application.');
        alert('Please exit the application which is using your camera and micorphone.');
        this.ReloadSession.navigate(['/ValidateSession']);
    }else{

    }
		
    
})

}

ngOnDestroy(){
  //This programming statement was adapted from MDN:
  //Link: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  //Author: MDN
  let StreamOne = document.getElementById("PatientVideoFeed") as HTMLVideoElement;

  StreamOne.onended = function(){

    alert('Session has ended successfully');

  }
}

//Bug - Causing Polyfill error
//Also add code attrbution
/* async AttendSession(){

const SocketIO = require('socket.io')
// Create a device (use browser auto-detection).
const VideoCamera = new Device();

// Communicate with our server app to retrieve router RTP capabilities.
const routerRtpCapabilities = await SocketIO.request('getRouterCapabilities');

// Load the device with the router RTP capabilities.
await VideoCamera.load({ routerRtpCapabilities });

// Check whether we can produce video to the router.
if (!VideoCamera.canProduce('video'))
{
  alert('Video feed could not be loaded suceessfully');
}

// Create a transport in the server for sending our media through it.
const { id, iceParameters, iceCandidates, dtlsParameters,sctpParameters} = await SocketIO.request(
  'createTransport',
  {
    sctpCapabilities : VideoCamera.sctpCapabilities
  });

// Create the local representation of our server-side transport.
const sendTransport = VideoCamera.createSendTransport( {id, iceParameters, iceCandidates, dtlsParameters,sctpParameters });

// Set transport "connect" event handler.
sendTransport.on('connect', async ({ dtlsParameters }, callback, errback) =>
{
  // Here we must communicate our local parameters to our remote transport.
  try
  {
    await SocketIO.request(
      'transport-connect',
      {
        transportId: sendTransport.id,
        dtlsParameters
      });

    // Done in the server, tell our transport.
    callback();
  }
  catch (error)
  {
    // Something was wrong in server side.
    alert(error);
  }
});

// Set transport "produce" event handler.
sendTransport.on(
  'produce',
  async ({ kind, rtpParameters, appData }, callback, errback) =>
  {
    // Here we must communicate our local parameters to our remote transport.
    try
    {
      const { id } = await SocketIO.request(
        'produce',
        { 
          transportId : sendTransport.id,
          kind,
          rtpParameters,
          appData
        });

      // Done in the server, pass the response to our transport.
      callback({ id });
    }
    catch (error)
    {
      // Something was wrong in server side.
      alert(error);
    }
  });

// Set transport "producedata" event handler.
sendTransport.on(
  'producedata',
  async ({ sctpStreamParameters, label, protocol, appData }, callback, errback) =>
  {
    // Here we must communicate our local parameters to our remote transport.
    try
    {
      const { id } = await SocketIO.request(
        'produceData',
        { 
          transportId : sendTransport.id,
          sctpStreamParameters,
          label,
          protocol,
          appData
        });

      // Done in the server, pass the response to our transport.
      callback({ id });
    }
    catch (error)
    {
      // Something was wrong in server side.
      alert(error);
    }
  });

// Produce our webcam video.
const VideoStreamForSession = await navigator.mediaDevices.getUserMedia({ video: true });
const VideoTrack = VideoStreamForSession.getVideoTracks()[0];
const VideoProducer = await sendTransport.produce({ track: VideoTrack });

// Produce data (DataChannel).
const dataProducer =
  await sendTransport.produceData({ ordered: true, label: 'foo' });
}*/
}