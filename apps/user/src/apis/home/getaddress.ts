const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JS_KEY; 

// Kakao 타입 선언
declare global {
    interface Window {
        kakao: {
            maps: {
                load: (callback: () => void) => void;
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

// SDK 로드 상태 추적
let sdkLoadPromise: Promise<void> | null = null;

// Kakao SDK 동적 로드 (참고 코드와 동일한 로직)
function loadKakaoSDK(): Promise<void> {
    if (sdkLoadPromise) return sdkLoadPromise;
    
    if (window.kakao?.maps) {
        return Promise.resolve();
    }

    sdkLoadPromise = new Promise((resolve, reject) => {
        if (!KAKAO_APP_KEY) {
            reject(new Error("Kakao JavaScript 키가 설정되지 않았습니다."));
            return;
        }

        const existing = document.getElementById("kakao-map-sdk");
        if (existing) {
            if (window.kakao?.maps) {
                resolve();
            } else {
                existing.addEventListener("load", () => {
                    window.kakao.maps.load(() => resolve());
                });
            }
            return;
        }

        const script = document.createElement("script");
        script.id = "kakao-map-sdk";
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
        script.onload = () => {
            window.kakao.maps.load(() => resolve());
        };
        script.onerror = () => reject(new Error("Kakao SDK 스크립트 로드 실패"));
        document.head.appendChild(script);
    });

    return sdkLoadPromise;
}

export async function getaddress(
    latitude: number,
    longtitude: number
): Promise<string> {
    // 1. SDK 로드 먼저 확인
    try {
        await loadKakaoSDK();
    } catch (error) {
        console.error("❌ Kakao SDK 로드 실패:", error);
        throw error;
    }

    // 2. API 호출
    return new Promise((resolve, reject) => {
        if (!window.kakao?.maps?.services) {
            reject(new Error("Kakao Maps SDK가 로드되지 않았습니다."));
            return;
        }

        console.log("🔍 주소 검색 시작:", { latitude, longtitude });
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(longtitude, latitude, (result, status) => {
            console.log("📍 API 응답:", { status, result });
            
            if (status === window.kakao.maps.services.Status.OK) {
                if (result && result.length > 0) {
                    const address = result[0].address;
                    const region_gu = address?.region_2depth_name || "";
                    const region_dong = address?.region_3depth_name || "";

                    if (region_gu || region_dong) {
                        const addressText = `${region_gu} ${region_dong}`.trim();
                        resolve(addressText);
                    } else {
                        resolve("주소 정보를 찾을 수 없습니다.");
                    }
                } else {
                    resolve("좌표에 해당하는 주소가 없습니다.");
                }
            } else {
                console.error("❌ 주소 변환 실패, status:", status);
                reject(new Error(`주소 변환 실패: ${status}`));
            }
        });
    });
}