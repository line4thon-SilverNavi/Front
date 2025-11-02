// Kakao 타입 선언
declare global {
    interface Window {
        kakao: {
        maps: {
            services: {
            Geocoder: new () => {
            coord2Address: (
                lng: number,
                lat: number,
                callback: (result: any[], status: string) => void
                ) => void;
            };
                Status: {
                OK: string;
            };
            };
        };
        };
    }
}

export async function getaddress(
    latitude: number,
    longtitude: number
    ): Promise<string> {
    return new Promise((resolve, reject) => {
        // Kakao Maps SDK가 로드되지 않았다면 에러
        if (!window.kakao || !window.kakao.maps) {
        reject(new Error("Kakao Maps SDK가 로드되지 않았습니다."));
        return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(longtitude, latitude, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            if (result && result.length > 0) {
            const address = result[0].address;
            const region_gu = address?.region_2depth_name || "";
            const region_dong = address?.region_3depth_name || "";

            if (region_gu || region_dong) {
                resolve(`${region_gu} ${region_dong}`.trim());
            } else {
                resolve("주소 정보를 찾을 수 없습니다.");
            }
            } else {
            resolve("좌표에 해당하는 주소가 없습니다.");
            }
        } else {
            reject(new Error("주소를 불러오는 데 실패했습니다."));
        }
        });
    });
}
