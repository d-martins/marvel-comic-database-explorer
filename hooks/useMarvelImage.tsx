import { MarvelImage } from "../models/marvelApi";

export enum ImageSizes {
    /** 50 x 75 */
    PortraitSmall = "portrait_small",
    /** 100 x 150 */
    PortraitMedium = "portrait_medium",
    /** 150 x 225 */
    PortraitXLarge = "portrait_xlarge",
    /** 168 x 252 */
    PortraitFantastic = "portrait_fantastic",
    /** 300 x 45 */
    PortraitUncanny = "portrait_uncanny",
    /** 216 x 324 */
    PortraitIncredible = "portrait_incredible",
    /** 65 x 45 */
    StandardSmall = "standard_small",
    /** 100 x 100 */
    StandardMedium = "standard_mediurm",
    /** 140 x 140 */
    StandardLarge = "standard_large",
    /** 200 x 200 */
    StandardXLarge = "standard_xlarge",
    /** 250 x 250 */
    StandardFantastic = "standard_fantastic",
    /** 180 x 180 */
    StandardIncredible = "standard_amazing",
    /** 120 x 90 */
    LandscapeSmall = "landscape_small",
    /** 175 x 130 */
    LandscapeMedium = "landscape_medium",
    /** 190 x 140 */
    LandscapeLarge = "landscape_large",
    /** 270 x 200 */
    LandscapeXLarge = "landscape_xlarge",
    /** 250 x 156 */
    LandscapeAmazing = "landscape_amazing",
    /** 464 x 261 */
    LandscapeIncredible = "landscape_incredible",
    /** full image size (contrained to 500 width) */
    Detail = 'detail'
}

const landscapeSizes = [
    ImageSizes.LandscapeSmall,
    ImageSizes.LandscapeMedium,
    ImageSizes.LandscapeLarge,
    ImageSizes.LandscapeXLarge,
    ImageSizes.LandscapeAmazing,
    ImageSizes.LandscapeIncredible,
]

const useMarvelImage = (image?: MarvelImage, size = ImageSizes.PortraitIncredible): string => {
    if (!image || !image.path || !image.extension) {
        if (landscapeSizes.includes(size)) {
            return '/landscape_incredible.jpg'
        }
        return '/portrait_incredible.jpg'
    }

    return `${image.path}/${size}.${image.extension}`
}

export default useMarvelImage;