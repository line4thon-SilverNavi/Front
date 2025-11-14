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

  // 반경(km)에 따른 적절한 지도 레벨 계산
  // 반경이 화면의 약 80% 정도를 차지하도록 설정
  const calculateMapLevel = (radiusKm: number) => {
    // 카카오맵 레벨별 표시 범위 (대략적)
    // level 1: ~20m, level 2: ~30m, level 3: ~50m
    // level 4: ~100m, level 5: ~250m, level 6: ~500m
    // level 7: ~1km, level 8: ~2km, level 9: ~4km
    // level 10: ~8km, level 11: ~16km, level 12: ~32km
    
    if (radiusKm == 3) return 8;
    if (radiusKm == 4) return 8;
    if (radiusKm == 5) return 8;
    if (radiusKm == 6) return 9;
    if (radiusKm == 7) return 9;
    return 9;
  };

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
            level: calculateMapLevel(radius),
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(mapContainer.current, options);
          mapInstance.current = map;

          // 마커를 화면 상단에 위치시키기 위해 지도 중심을 아래로 이동
          // SetRange 높이(16rem ≈ 256px)를 고려하여 지도를 아래로 패닝
          setTimeout(() => {
            map.panBy(0, 80); // 80px 아래로 이동
          }, 100);

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
      
      // 마커를 화면 상단에 위치시키기 위해 지도를 아래로 패닝
      setTimeout(() => {
        mapInstance.current.panBy(0, 80);
      }, 100);

      // 반경에 따라 지도 레벨 조정
      mapInstance.current.setLevel(calculateMapLevel(radius));

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
  height: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
`;
