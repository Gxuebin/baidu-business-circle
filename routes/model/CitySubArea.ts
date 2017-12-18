export interface CitySubArea {
    /**
     * 城市区域code。
     */
    area_code: number;
    /**
     * 城市区域名称。
     */
    area_name: string;
    /**
     * 城市区域类型。仅在区的级别（area_type=3）才会有商圈。
     */
    area_type: number;
    /**
     * 城市区域中心点。
     */
    geo: Geo;
    /**
     * 下级区域列表, 里面内容同上面的那些字段
     */
    sub?: CitySubArea[];
    /**
     * 是否存在商圈，仅在区的级别（area_type=3）才会有此字段。
     */
    sup_business_area?: number;
}

interface Geo {
    lng: number;
    lat: number;
}