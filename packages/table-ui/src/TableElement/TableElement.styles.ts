import {ClassName, RootStyleSet} from '@udecode/plate-ui-fluent'

export const getTableElementStyles = ({className}: ClassName): RootStyleSet => ({
  root: [
    {
      // Insert css properties
      margin: '10px 0',
      borderCollapse: 'collapse',
      width: '100%'
    },
    className
  ]
})
