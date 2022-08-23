export class Settings{

    ipAddress: any;
    protocol: any;
    port: any;
    api: any;
    location: any;

    

    public api_base : string ;
 
    

    constructor() {
        fetch("./assets/inputFile/settings.json")
        .then((resSta) => resSta.json())
        .then((jsonSta) => {
        var settings2 = jsonSta;       
        
        this.api_base =  settings2.protocol + "://" + settings2.ipAddress + ":" + settings2.port + "/" + settings2.api //  "http://192.168.1.239:8081/openmrs";
        //this.URL.push(this.api_base);

        console.log( "mac:::", this.api_base);
        
        });
      }


     //public static API_BASE_URL: string = settings2;
    
  }

  