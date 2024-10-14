import {Text} from '#/src/components/ui/text'
import {Box} from '#/src/components/ui/box'

export default function PermissionDetailItem({title, detail, icon}) {
  return (
    <Box style={{flexDirection: 'row'}} className="my-1 bg-transparent px-1">
      <Box className="mt-1 bg-transparent">{icon}</Box>
      <Box className="flex-column flex-1 justify-start bg-transparent">
        <Text style={{marginVertical: 5, fontSize: 18, fontWeight: '700'}}>
          {title}
        </Text>
        <Text className="text-md">{detail}</Text>
      </Box>
    </Box>
  )
}
