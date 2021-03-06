// const router = new VueRouter();

var app = new Vue({
  el: '#Web_1920___home',
  data: {
    message: 'Hello Vue!',
    checkedNeeds: [],
    zipcode: null,
    errors: null,
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    mapImage: null,
    navFindCustomers: function () {
      console.log(this.navFindCustomers.name + this.zipcode)
      if (!this.zipcode) {
        this.errors = "Missing zipcode";
        return
      }
      this.errors = null;

      // router.go({ path: 'path/findCustomers.html', query: { zipcode: this.zipcode } })
      if (location.pathname.indexOf("dist") != -1) {
        location.href = "/dist/pages/findCustomers.html?zipcode=" + this.zipcode;
      } else
        location.href = "/pages/findCustomers.html?zipcode=" + this.zipcode;

    },
    navResources: function () {
      console.log(this.navResources.name + this.zipcode)
    },
    request: function () {
      console.log("request")
    },
    offer: function () {
      console.log("request")
    },
    testData: "not hello",
    updateImage(base64) {
      console.log("updating image")
      // console.log(app.data.testData)
      console.log(this.testData)
      this.testData = "hello";
      // app.data.testData="hello"
      // console.log(app.data.testData)

      console.log(this.testData)
      this.mapImage = {
        encodedImage: base64
      }
      console.log("finished")
      console.log(this.mapImage)

    },
    getMapBase64(request) {
      request = { "zip_code": "22303", "lat": 38.794399, "lng": -77.078869, "city": "Alexandria", "state": "VA", "timezone": { "timezone_identifier": "America/New_York", "timezone_abbr": "EDT", "utc_offset_sec": -14400, "is_dst": "T" }, "acceptable_city_names": [{ "city": "Jefferson Manor", "state": "VA" }, { "city": "Jefferson Mnr", "state": "VA" }] }
      console.log("getting base64")
      console.log(request)
      // var data = null;

      // var xhr = new XMLHttpRequest();

      // updateImage = this.updateImage;

      console.log(this.testData)

      // xhr.withCredentials = true;
      this.$http.get("https://scrape_re-store.serveo.net/scrape?zoom=15&lat=" + request.lat + "&long=" + request.long).then((response) => {
        console.log(this.testData)
        console.log(response)
        // this.message = response.data.message;
        if (response.status == 200) {
          this.updateImage(response.data.base64Str)
        }
      });
      var test = "asdf"

      // xhr.addEventListener("readystatechange", function () {
      //   if (this.readyState === this.DONE) {
      //     console.log("image returned")
      //     console.log(this.testData)
      //     // console.log(this.responseText);
      //     try {
      //       var response = JSON.parse(this.responseText)
      //       console.log(response)
      //       console.log(this.testData)
      //       if (response.status == 200)
      //         updateImage(response.base64Str)
      //       // callback(response)
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
      // });

      // xhr.open("GET", "https://scrape_re-store.serveo.net/scrape?zoom=15&lat=" + request.lat + "&long=" + request.long);

      // xhr.send(data);
    },
    getLongLat(zipcode, callback = null) {
      console.log("retreiveing long lat for" + zipcode)

      var data = null;

      var xhr = new XMLHttpRequest();
      // xhr.withCredentials = true;

      this.$http.get("https://www.zipcodeapi.com/rest/" + window.tokens.zipcodeapiToken + "/info.json/" + zipcode + "/degrees").then((response) => {
        console.log(this.testData)
        console.log(response)

        try {
          // var response = JSON.parse(this.responseText)
          console.log(response)
          // console.log(callback)
          if (callback == "getMapBase64")
            this.getMapBase64(response.data)
        } catch (error) {
          console.log(error)
        }
      });

      // xhr.addEventListener("readystatechange", function () {
      //   if (this.readyState === this.DONE) {
      //     console.log(this.responseText);
      //     if (this.responseText) {

      //       try {
      //         var response = JSON.parse(this.responseText)
      //         console.log(response)
      //         // console.log(callback)
      //         if(callback == "getMapBase64")
      //           this.getMapBase64(response.base64Str)
      //       } catch (error) {
      //         console.log(error)
      //       }

      //     } else {
      //       console.log("empty response")
      //     }

      //   }
      // });

      xhr.open("GET", "https://www.zipcodeapi.com/rest/" + window.tokens.zipcodeapiToken + "/info.json/" + zipcode + "/degrees");

      xhr.send(data);
      //promise
    },
    toggleMenu: function () {
      var x = document.getElementById("myNavbar");
      if (x.className === "collapse navbar-collapse") {
        x.className = "navbar";
      } else {
        x.className = "collapse navbar-collapse";
      }
    }
  },
  beforeMount() {
    // if zipcode then trigger map longlat
    console.log(this.zipcode);

    var url_string = location.href; //window.location.href
    var url = new URL(url_string);
    var zipcode = this.zipcode = url.searchParams.get("zipcode");

    if (zipcode) {
      // skip this for now
      this.getLongLat(zipcode, this.getMapBase64.name)
      // this.getMapBase64()
    }

    // console.log(`this.$el doesn't exist yet, but it will soon!`)
  },
})