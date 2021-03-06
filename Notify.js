//https://cdn-api.co-vin.in/api/v2/admin/location/states
// By district
//https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=512&date=31-03-2021
// By pincode
//https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=160047&date=13-05-2021
//punjab 28 haryana 12 chandigarh 6 
// district ids SAS NAGAR - 496 panchkula 187
//Calender by district
//https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=496&date=18-05-2021
var axios = require('axios');
const nodemailer = require('nodemailer');
function fetchData(){
    var config = {
        method: 'get',
        url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=496&date=21-05-2021', // Change Date here
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        }
      };
      
      axios(config)
      .then(function (response) {
        var centers =  response.data.centers;
        var allSessions = [];
        response.data.centers.forEach(center => {
          allSessions = allSessions.concat(center.sessions);
        });
        allSessions = allSessions.filter(session => {
          if(session.vaccine == "COVAXIN" && session.available_capacity > 0) return true; // Change vaccine name of your choice here
          else return false;
        })
        if(allSessions.length > 0){
          console.log(allSessions);
          var info = "";
            allSessions.forEach(session => {
                info += session.date + "\n";
            });
          sendmail('nitishkalra1999@gmail.com','Vaccine available at: \n' + info); // Id to mail to
        }
        else{
          console.log("Not Found");
        }
        } )
      .catch(function (error) {
        console.log(error);
      });
    }


let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nitishkalra1998@gmail.com',
		pass: 'EnterPasswordHere'
	}
});
sendmail = (id, text) => {
	transporter.sendMail(
		{
			from: 'nitishkalra1998@gmail.com', // Id to mail from
			to: id,
			subject: 'vaccine available',
			text: text
		},
		function(err, info) {
			if (err) console.error(err);
			else console.log('Sent Successfully to ' + id);
		}
	);
};

function fetchDataEveryMinute(){
    setInterval(fetchData,300000); // Change interval according to your choice here
}
fetchDataEveryMinute();
