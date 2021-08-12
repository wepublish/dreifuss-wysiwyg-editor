// import {ClassName, RootStyleSet} from '@udecode/plate-ui-fluent'

export const getLinkElementStyles = ({className}: any): any => {
  return {
    root: [
      {
        // Insert css properties
        textDecoration: 'initial',
        color: '#0078d4',
        selectors: {
          ':hover, :visited:hover': {
            color: '#004578',
            textDecoration: 'underline'
          },
          ':visited': {
            color: '#0078d4'
          }
        }
      },
      className
    ]
  }
}
