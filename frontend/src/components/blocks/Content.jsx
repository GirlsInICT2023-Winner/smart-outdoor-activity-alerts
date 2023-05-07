import React, { useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "./Map.css";
import Weather from "../atoms/Weather";
import Logo from "../atoms/Logo";

const Content = () => {
  const [city, setCity] = useState("");
  const mapElement = useRef(null);
  const [playgroundInfo, setPlaygroundInfo] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  // api 로 받아옴
  useEffect(() => {
    console.log("loading...");
    fetch("/api/playground")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.result);
        setPlaygroundInfo(info.result);
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&libraries=places&callback=initMap`
        );
      });
  }, []);


  

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

    // loadscript 
    
    

    const markers = [
      {
        playgroundIdx: 99,
        name: playgroundInfo.name,
        loc: playgroundInfo.loc,
        lat: playgroundInfo.lat,
        lng: playgroundInfo.lng,
        pm10: playgroundInfo.dust,
        pm2_5: playgroundInfo.ultradust,
        air: playgroundInfo.air,
        level: playgroundInfo.level,
        tem: playgroundInfo.temperature,
        hum: playgroundInfo.humidity,
      },
      // 더미
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
        tem: 14.71,
        hum: 47,
      },
      
    ];

    const infoWindow = new google.maps.InfoWindow();

    markers.forEach(
      ({
        playgroundIdx,
        lat,
        lng,
        loc,
        name,
        pm2_5,
        pm10,
        air,
        level,
        tem,
        hum,
      }) => {
        let labelClass;

        if (level === "Good") {
          labelClass = "icon-label-green";
        } else if (level === "Moderate") {
          labelClass = "icon-label-yellow";
        } else {
          labelClass = "icon-label-red";
        }

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          label: {
            text: playgroundIdx === 99 ? playgroundInfo.level : level,
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
          let content;
          if (playgroundIdx === 99) {
            content = `
            <div class="map__item">
                <div class="item__title">
                    ${playgroundInfo.name} 
                </div>
                <div class="item__loc">(${playgroundInfo.loc})</div>
                <div class="item__dust">
                    <img class="img__dust" src="https://cdn-icons-png.flaticon.com/128/7034/7034711.png"/>
                    <div class="item__pm10">fine dust: ${playgroundInfo.dust},</div>
                    <div class="item__pm2_5">ultrafine dust: ${playgroundInfo.ultradust}</div>
                </div>
                <div class="item__weather">
                    <img class="img__weather" src="https://cdn-icons-png.flaticon.com/512/128/128972.png" />
                    <div class="item__air">air: ${playgroundInfo.air},</div>
                    <div class="item__temperature">temperature: ${playgroundInfo.temperature},</div>
                    <div class="item__humidity">humidity: ${playgroundInfo.humidity}</div>
                </div>
            </div>
            
            `;
          } else {
            content = `
            <div class="map__item">
                <div class="item__title">
                    ${name} 
                </div>
                <div class="item__loc">(${loc})</div>
                <div class="item__dust">
                    <img class="img__dust" src="https://cdn-icons-png.flaticon.com/128/7034/7034711.png"/>
                    <div class="item__pm10">fine dust: ${pm10},</div>
                    <div class="item__pm2_5">ultrafine dust: ${pm2_5}</div>
                </div>
                <div class="item__weather">
                    <img class="img__weather" src="https://cdn-icons-png.flaticon.com/512/128/128972.png" />
                    <div class="item__air">air: ${air},</div>
                    <div class="item__temperature">temperature: ${tem},</div>
                    <div class="item__humidity">humidity: ${hum}</div>
                </div>
            </div>
            `;
          }

          infoWindow.setContent(content);
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
      }
    );
    map.addListener("click", () => {
      infoWindow.close();
    });
  }, [currentPosition, playgroundInfo]);

   const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    
     // 스크립트 로딩이 끝나면 initMap 함수를 호출
      newScript.onload = () => {
        window.initMap();
      };

      firstScript?.parentNode?.insertBefore(newScript, firstScript);
    }, []);

  useEffect(() => {
  
    window.initMap = initMap;
  }, [initMap]);

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