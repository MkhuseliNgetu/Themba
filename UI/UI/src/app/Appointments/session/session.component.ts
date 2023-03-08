import { Component } from '@angular/core';

//Media Soup Client
import { Device } from 'mediasoup-client';
import { Socket } from 'socket.io';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {

constructor() {}

  
ngOnInit(): void { }
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