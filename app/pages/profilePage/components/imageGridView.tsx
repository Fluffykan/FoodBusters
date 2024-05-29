import { Image } from 'react-native';


type ImageProps = {
    source: string;
    alt: string;
}

export default function ImageGridView({source, alt}:ImageProps) {
    
    return (
        <Image source={{uri: source}} alt={alt} style={{height: '10%', width: '33%'}} />
    )
}