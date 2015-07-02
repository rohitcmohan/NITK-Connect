// handle APNS notifications for iOS
function onNotificationAPN(e) {
    if (e.alert) {
         alert('push-notification: ' + e.alert);
         navigator.notification.alert(e.alert);
    }

    if (e.sound) {
        var snd = new Media(e.sound);
        snd.play();
    }

    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}

var regID="";
          
// handle GCM notifications for Android
function onNotificationGCM (event) {
    switch (event.event) {
      case 'registered':
        if (event.regid.length > 0) {
            //alert('REGISTERED -> REGID:' + event.regid);
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
              regID=event.regid;
              window.localStorage.setItem("reg", regID);
              $.ajax({
                type: 'POST',
                url: "http://106.186.23.15:8081",
                data: regID,
                datatype: 'json',
                success: function (data) {
                    //alert("hi");
                    var ret = jQuery.parseJSON(data);
                    $('#q').html(ret.msg);
                },
                error: function (xhr, status, error) {
                    //alert("hierror");
                }
              })
            
            //alert("regID = " + event.regid);
          return fn({
            'type': 'registration',
            'id': event.regid,
            'device': 'android'
          });
        }
        break;

      case 'message':
          // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        // if (event.foreground) {
        //     alert('INLINE NOTIFICATION');
        //   var my_media = new Media("/android_asset/www/" + event.soundname);
        //   my_media.play();
        // } else {
        //   if (event.coldstart) {
        //       alert('COLDSTART NOTIFICATION');
        //   } else {
        //       alert('BACKGROUND NOTIFICATION');
        //   }
        // }

        //     navigator.notification.alert(event.payload.message);
        //     alert('MESSAGE -> MSG: ' + event.payload.message);
        //        //Only works for GCM
        //    alert('MESSAGE -> MSGCNT: ' + event.payload.msgcnt);
        //    //Only works on Amazon Fire OS
        //    alert('MESSAGE -> TIME: ' + event.payload.timeStamp);
        //  alert("message");
        //  alert(event.msgcnt);
        //  alert(event.message, "Push Notification Received");
        break;

      case 'error':
          alert('ERROR -> MSG:' + event.msg);
        break;

      default:
          alert('EVENT -> Unknown, an event was received and we do not know what it is');
        break;
    }
  }