import { MonoText } from './StyledText'

type Props = {
    text: string | undefined
}

export default function ErrorLabel({text}: Props) {
  return (
    <MonoText style={{ fontSize: 12, color: '#FF7369'}}>
         {text}
    </MonoText>
  )
}

