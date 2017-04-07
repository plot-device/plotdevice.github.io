//<![CDATA[
   bind(window, 'load', function () {
    geolocationInit();
  });

  // 이벤트 할당
  function bind(elem, type, handler, capture) {
      type = typeof type === 'string' && type || '';
      handler = handler || function () { ; };

      if (elem.addEventListener) {
          elem.addEventListener(type, handler, capture);
      }
      else if (elem.attachEvent) {
          elem.attachEvent('on' + type, handler);
      }
       return elem;
  };

   function geolocationInit() {
       if (navigator.geolocation) {
          var geo = navigator.geolocation;
          geo.getCurrentPosition(function (pos) {
              // google map 연동
              mapInit(pos.coords.latitude, pos.coords.longitude);
           }, function (e) {
              msg({
                  0: '위치 정보 검색에 문제가 있습니다.(msg:' + e.message + ')',
                  1: '현재 페이지에서 사용자가 위치 정보 검색을 거부했습니다.',
                  2: '브라우저가 위치정보를 검색하지 못했습니다.(msg:' + e.message + ')',
                  3: '브라우저의 위치 정보 검색 시간이 초과됐습니다.'
              }[e.code]);
           }, {
              enableHeighAccuracy: false,
              timeout: 10000,
              maximumAge: 0
          });
      }
      else {
          alert('HTML 5 지오로케이션을 지원하지 않는 브라우저입니다.');
      }
  }

  function msg(msg) {
      alert(msg);
  }


   function mapInit(latitude, longitude) {
      var opt = {
          zoom: 15,
          center: new google.maps.LatLng("37.486580","127.111905"),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          draggable:false
      };

  var markLocation = new google.maps.LatLng("37.503311","127.026437"); // 마커가 위치할 위도와 경도(추가)
      var map = new google.maps.Map(document.getElementById('map_canvas'), opt);

  var size_x = 30; // 마커로  이미지 가로 크기
      var size_y = 30; // 마커로  이미지 세로 크기

      // 마커로 사용할 이미지 주소
      var myIcon = new google.maps.MarkerImage( "../img/marker2.png",
                   null, null, null, new google.maps.Size(43,60));
      var marker;
      marker = new google.maps.Marker({
             position: markLocation, // 마커가 위치할 위도와 경도(변수)
             map: map,
             icon: myIcon,

             title: 'plot device' // 마커에 마우스 올렸을때 타이틀 내용
      });

      var content = "<h3>plot device</h3>"; // 마커 클릭했을때 말풍선 안에 들어갈 내용

      // 마커를 클릭했을 때의 이벤트. 말풍선 보이기~
      var infowindow = new google.maps.InfoWindow({ content: content});

      google.maps.event.addListener(marker, "click", function() {
          infowindow.open(map,marker);
      });
  };
//]]>
