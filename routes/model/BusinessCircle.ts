export interface BusinessCircle {
    /**
     * 商圈所在的坐标范围，Point数组。
     */
    coordinate: Point[];
    /**
     * 商圈所在城市名。
     */
    city: string;
    /**
     * 商圈所在的区域。
     */
    district: string;
    /**
     * 商圈的类型。
     */
    type: string;
}

interface Point {
    lng: number;
    lat: number;
}