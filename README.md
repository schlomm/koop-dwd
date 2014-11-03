# DWD-Provider for [Koop](https://github.com/Esri/koop)
-----------
This provider makes it possible to access [dwd's geoserver-WFS endpoints](http://maps.dwd.de/geoserver/web/) as either a raw geoJSONs output or an ESRI FeatureService.
Because the geoserver already serves geojsons as an output, there is not that much magic about the internal procedure.

### Installation
Perform the following steps to install the dwd-koop provider. Install [koop](https://github.com/Esri/koop) including its dependencies.  
Clone the repo  
`git clone git@github.com:Esri/koop.git`  
Enter the koop project directory  
`cd koop`  
Install koop-server and node.js dependencies  
`npm install`  
Install koop-dwd provider via  
`npm install https://github.com/schlomm/koop-dwd/tarball/master`  


### Quick Go-Through
Checking the `.js` in the models-directory, you'll notice the dwd geoserver URL.: `http://maps.dwd.de/geoserver/dwd/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+id+'&outputFormat=application/json`
By replacing the `id` with the name of a service, you can access the different dataitems. Those need the  "OpenLayers KML GML"- description as common formats.
check the geoserver layer preview to see, which servieces are available: http://maps.dwd.de/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage

koop-dwd layers are e accessed by adding the id to /dwd/:dwd_layer_id, and optionally the Feature Service metadata or query. For example:

 - Raw GeoJSON: /dwd/dwd:BASISWARNUNGEN 
 - FeatureService: /dwd/dwd:BASISWARNUNGEN/FeatureServer/0 
 - Query:  /dwd/dwd:BASISWARNUNGEN/0/query

### Outlook
A timer will be used, which checks the cached data with the requested one. If they differ, the cached data will be deleted and the updated data will be performed.
koop-dwd will be generalized later on, so all geoservers with geoJSON WFS-endpoints can be used.  Until now, only dwd's geoserver is working.

### Limitations

 - dwd's geoserver creates mixed geoJSONS, which are not supported by koop based on [ESRI's REST specification](http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/The_ArcGIS_REST_API/02r300000054000000/). Currently there is no workaround for this issue. Check the [koop-server issue](https://github.com/Esri/koop-server/issues/32) for more information.
 - Once a service is was used, this is cached in the PostGIS database. Until now, services will not be updated.
