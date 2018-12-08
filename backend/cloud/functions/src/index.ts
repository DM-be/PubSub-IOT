
export class OneSignal_PushNotification {

  constructor(){
  }

  /**** when you make a new browser app on onesignal.com, you need to link the app to the url of your website.
        Once you've done that you'll be given a app_id, replace that one with yours in this.message.app_id
   */

  public message = {
    app_id: "e890c412-341c-4b76-b5f3-6baa185e53a6",
    contents: {"en": "Please check on your child"},
    headings: {"en": "CHILD ALERT!"},
    included_segments: ["Active Users"]
  };


  /*** this sendNotification receives, this.message as parameter. Only this.message.contents should be changed to update data,
   * before calling sendNotification.

   "Authorization": "Basic YTZiMDE5MDItNTBhMy00N2RjLTg2MmMtOTJlNzMyNDdmMWM1", this needs to be replaced with your own key from
   onesignal.com, this key you get from the app you make on their website. Just replace the part after "Basic "

   */


  public  sendNotification () {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic YTZiMDE5MDItNTBhMy00N2RjLTg2MmMtOTJlNzMyNDdmMWM1"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function (res) {
      res.on('data', function (data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function (e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(this.message));
    req.end();
  };
}