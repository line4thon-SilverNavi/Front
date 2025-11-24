import { useEffect, useState } from "react";
import { getaddress } from "@apis/home/getaddress";

// 사용자의 현재 위도, 경도값 불러오기 (고정 좌표 사용)
export function useUserLocation(){
    const [location, setLocation] = useState<{
        latitude: number | null;
        longtitude: number | null;
    }>({ latitude: 37.6154147804327, longtitude: 127.013565764354 });

    const [error, setError] = useState<string | null>(null);

    // 고정 좌표 사용으로 실제 위치 조회 불필요
    // useEffect(()=> {
    //     if(!navigator.geolocation) {
    //         setError("위치 정보 불러오기 실패");
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition(
    //         (pos) => {
    //             setLocation({
    //                 latitude: pos.coords.latitude,
    //                 longtitude: pos.coords.longitude,
    //             });
    //         },
    //         (err) => {
    //             setError(err.message);
    //         },
    //     );
    // }, []);

    return { ...location, error};
}

// 사용자의 현재 위경도값 바탕으로 주소 변환
export function useFetchAddress(){
    const { latitude, longtitude, error: locationError } = useUserLocation();
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (latitude === null || longtitude === null){
            setAddress(null);
            return;
        }

        let isMounted = true;
        setError(null);

        getaddress(latitude, longtitude)
        .then((addr) => {
            if (isMounted) {
                setAddress(addr);
            }
        })
        .catch((err) => {
            if(isMounted) {
                console.error("Kakao 주소 변환 실패:", err);
                setError(err.message);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [latitude, longtitude]);
    
    return { address, error: error || locationError }
}