import React, { useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "./Map.css";
import Weather from "../atoms/Weather";
import Logo from "../atoms/Logo";

const Content = () => {
  const [city, setCity] = useState("");
  const mapElement = useRef(null);

  // 컴포넌트가 마운트될때 수동으로 스크립트를 넣어줌
  // script보다 window.initMap이 먼저 선언되도록
  const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  const [currentPosition, setCurrentPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position);

        // 현재 위치의 시 정보 가져오기
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&language=en&key=${process.env.REACT_APP_MAP_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const cityObj = data.results.find((result) =>
              result.types.includes("locality")
            );
            const city = cityObj?.address_components[0].long_name;
            setCity(city);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google || !currentPosition) return;

    const map = new google.maps.Map(
      document.getElementById("map"),
      {
        center: {
          // 현재 위치로 센터 설정
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        },

        zoom: 17,
      },
      [currentPosition]
    );

    const markers = [
      // 놀이터 별로 마커 설정

      {
        playgroundIdx: 0,
        name: "Baengnyeon Children's Park",
        loc: "50, Myeongjidae-gil, Seodaemun-gu, Seoul",
        lat: 37.5823359,
        lng: 126.9241363,
        pm10: 10,
        pm2_5: 10,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 1,
        name: "Gajaeul Children's Park",
        loc: "385-2 Namgajwa-dong, Seodaemun-gu, Seoul",
        lat: 37.582365,
        lng: 126.9104757,
        pm10: 20,
        pm2_5: 10,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 2,
        name: "Yeonhui Children's Park",
        loc: "446-182, Yeonhui-dong, Seodaemun-gu, Seoul",
        lat: 37.5677003,
        lng: 126.921475,
        pm10: 100,
        pm2_5: 110,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 3,
        name: "Yeonnam Children's Park",
        loc: "326-8, Namgajwa-dong, Seodaemun-gu, Seoul",
        lat: 37.5781713,
        lng: 126.9253077,
        pm10: 40,
        pm2_5: 140,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 4,
        name: "Triangle Small Park",
        loc: "190-9 Namgajwa-dong, Seodaemun-gu, Seoul",
        lat: 37.5764431,
        lng: 126.920741,
        pm10: 50,
        pm2_5: 70,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 5,
        name: "Gajwa Children's Park",
        loc: "45, Gajaeul-ro, Seodaemun-gu, Seoul",
        lat: 37.5758104,
        lng: 126.9203916,
        pm10: 60,
        pm2_5: 50,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 6,
        name: "Eungam 4-dong Children's Park",
        loc: "742-9, Eungam-dong, Eunpyeong-gu, Seoul",
        lat: 37.5832817,
        lng: 126.9160862,
        pm10: 70,
        pm2_5: 55,
        air: 10.88,
        level: "Moderate",
      },
      {
        playgroundIdx: 7,
        name: "Magpie Village Garden",
        loc: "366-4, Bukgajwa-dong, Seodaemun-gu, Seoul",
        lat: 37.5791415,
        lng: 126.9069372,
        pm10: 80,
        pm2_5: 50,
        air: 10.88,
        level: "Good",
      },
      {
        playgroundIdx: 8,
        name: "Shinga Children's Park",
        loc: "29-51, Geobukgol-ro 22-gil, Seodaemun-gu, Seoul",
        lat: 37.5801986,
        lng: 126.9083371,
        pm10: 90,
        pm2_5: 60,
        air: 10.88,
        level: "Good",
      },
      {
        playgroundIdx: 9,
        name: "Ansan Urban Nature Park",
        loc: "Yeonhui-dong, Seodaemun-gu, Seoul",
        lat: 37.5719319,
        lng: 126.9429294,
        pm10: 110,
        pm2_5: 90,
        air: 10.88,
        level: "Good",
      },
      {
        playgroundIdx: 10,
        name: "Nami Village Children's Park",
        loc: "368, Namgajwa-dong, Seodaemun-gu, Seoul",
        lat: 37.57906,
        lng: 126.9196971,
        pm10: 110,
        pm2_5: 50,
        air: 10.88,
        level: "Unhealthy",
      },
      {
        playgroundIdx: 11,
        name: "Yeonseo Children's Park",
        loc: "519-7 Yeonhui-dong, Seodaemun-gu, Seoul",
        lat: 37.5720951,
        lng: 126.923266,
        pm10: 100,
        pm2_5: 80,
        air: 10.88,
        level: "Unhealthy",
      },
    ];

    const infoWindow = new google.maps.InfoWindow();

    markers.forEach(({ lat, lng, loc, name, pm2_5, pm10, air, level }) => {
      let labelClass;
      // let text = "Good";

      if (level === "Good") {
        labelClass = "icon-label-green";
      } else if (level === "Moderate") {
        labelClass = "icon-label-yellow";
      } else {
        labelClass = "icon-label-red";
      }

      // // 임의의 기준으로 설정해놓음
      // if (pm2_5 <= 30) {
      //   labelClass = "icon-label-yellow";
      //   // text = "Good";
      // } else if (pm2_5 <= 50) {
      //   labelClass = "icon-label-green";
      //   // text = "Moderate";
      // } else {
      //   labelClass = "icon-label-red";
      //   // text = "Unhealthy";
      // }

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        label: {
          text: level,
          className: labelClass,
        },
        icon: {
          url: "",
          size: new google.maps.Size(50, 20),
        },
        clickable: true, // 마커 및 라벨 클릭 가능하도록 설정
      });

      marker.addListener("click", () => {
        // marker 를 클릭하면 보여줄 화면
        const content = `
        <div class="map__item">
          <div class="item__title">
            ${name} (${loc})
          </div>
          <div class="item__pm10">fine dust: ${pm10}</div>
          <div class="item__pm2_5">ultrafine dust: ${pm2_5}</div>
          <div class="item__air">air: ${air}</div>
        </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    });
    map.addListener("click", () => {
      infoWindow.close();
    });
  }, [currentPosition]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&callback=initMap&language=en`
    );

    window.initMap = initMap;
  }, [initMap, loadScript]);

  return (
    <div>
      <Header>
        <Title>
          Smart Outdoor Activity Alerts of <u>{city}</u>
        </Title>
        <Logo></Logo>
      </Header>

      <Wrapper>
        <Weather city={city} currentPosition={currentPosition} />
        <MapWrapper className="map">
          <Map ref={mapElement} id="map"></Map>
        </MapWrapper>
      </Wrapper>
    </div>
  );
};

export default Content;

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;

const Title = styled.h1`
  padding: 15px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 15px;
  margin-right: 15px;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;
