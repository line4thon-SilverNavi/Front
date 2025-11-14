import { useEffect, useRef } from "react";
import styled from "styled-components";

type MapProps = {
  latitude: number;
  longitude: number;
  radius: number; // km 단위
};

export default function Map({ latitude, longitude, radius }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const circleInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapContainer.current) {
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 7, // 지도 확대 레벨
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(mapContainer.current, options);
          mapInstance.current = map;

          // 현재 위치 마커 생성
          const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          markerInstance.current = marker;

          // 반경 원 그리기
          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(latitude, longitude),
            radius: radius * 1000, // km를 m로 변환
            strokeWeight: 2,
            strokeColor: "#4A90E2",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#4A90E2",
            fillOpacity: 0.2,
          });
          circle.setMap(map);
          circleInstance.current = circle;
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 위치 또는 반경 변경 시 업데이트
  useEffect(() => {
    if (mapInstance.current && window.kakao) {
      const newPosition = new window.kakao.maps.LatLng(latitude, longitude);
      
      // 지도 중심 이동
      mapInstance.current.setCenter(newPosition);

      // 마커 위치 업데이트
      if (markerInstance.current) {
        markerInstance.current.setPosition(newPosition);
      }

      // 원 위치 및 반경 업데이트
      if (circleInstance.current) {
        circleInstance.current.setPosition(newPosition);
        circleInstance.current.setRadius(radius * 1000);
      }
    }
  }, [latitude, longitude, radius]);

  return <MapContainer ref={mapContainer} />;
}

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
`;
