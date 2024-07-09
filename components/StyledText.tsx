import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono', fontSize:16 }]} />;
}

export function ComicSans(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ComicSans' }]} />;
}

export function ComicSansBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ComicSansBold' }]} />;
}

