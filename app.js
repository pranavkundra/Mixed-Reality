 var panoramaReality = new Argon.Reality.Panorama;
  Argon.immersiveContext.setRequiredReality(panoramaReality);

  var pano = {
    type: 'equirectangular',
    source: "./upload/"+imageFile,
    headingOffset:0,  //offset of north from the center of the image
    cartographicDegrees: [33.7758,84.3947] //lat and long for Georgia Tech; put actual values here for the pano you make
  }
  
   panoramaReality.setPanorama(pano);
