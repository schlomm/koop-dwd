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

By replacing the `id` with the name of a service, you can access the different dataitems. Those need the  "OpenLayers KML GML"- description as common format.  Check [DWD's Geoserver Layer Preview](http://maps.dwd.de/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage) for available services.

If you want to access and process a DWD layer via koop and this [koop-dwd provider](https://github.com/schlomm/koop-dwd), follow this URL schema, where `id` is the LayerID of a DWD Layer.

 - Raw GeoJSON: /dwd/id
 - FeatureService: /dwd/id/FeatureServer/0 
 - Query:  /dwd/id/0/query

Example request for [DWD's Basiswarnungen](http://maps.dwd.de/geoserver/dwd/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dwd:BASISWARNUNGEN&maxFeatures=50&outputFormat=application/json):

 - Raw GeoJSON: your_server:port/dwd/dwd:BASISWARNUNGEN 
 - FeatureService: your_server:port/dwd/dwd:BASISWARNUNGEN/FeatureServer/0 
 - Query:  your_server:port/dwd/dwd:BASISWARNUNGEN/0/query

### Outlook
A timer will be needed, which checks and compares the cached and requested data. If they differ, the old cached data will be deleted and the updated data cached to the database.
koop-dwd will be generalized later on, so all geoservers with geoJSON WFS-endpoints can be used.  Until now, only dwd's geoserver is working.

### Limitations

 - dwd's geoserver creates mixed geoJSONS, which are not supported by koop based on [ESRI's REST specification](http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/The_ArcGIS_REST_API/02r300000054000000/). Currently there is no workaround for this issue. Check the [koop-server issue](https://github.com/Esri/koop-server/issues/32) for more information.
 - Once a service is was used, this is cached in the PostGIS database permanently. Until now, services will not be updated (cf. Outlook).
