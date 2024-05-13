let base=() => "http://www.dholerasmartcities.in/shop";
export default function getBase()
{
    return base() + "/ws/";
}
export function getImgBase()
{
    return base() + "/images/";
}