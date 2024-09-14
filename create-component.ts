import contentTsx from './helper/content-tsx'
import contentIndex from './helper/content-index'
import contentStyleModule from './helper/content-style-module'
import __dirname from './__dirname'
import CreateComponentFile from './helper/create-component-file'

const folders = ['UI', 'components', 'pages']

CreateComponentFile({
    args: {
        name: 'component',
        path: {
            defult: folders[0],
            cdheked: (value) => folders.includes(value)
        },
        isStyle: 'true',
    },
    pathFolder: [__dirname, 'src', ({ path }) => path],
    files: [
        ({ name }) => name,
        {
            name: ({ name }) => `${name}.tsx`,
            content: ({ name }) => contentTsx(name),
        },
        {
            name: 'index.ts',
            content: ({ name }) => contentIndex(name),
        },
        {
            name: ({ isStyle, name }) => {
                if (isStyle !== 'true') return
                return `${name}.module.css`
            },
            content: () => contentStyleModule(),
        },
    ]
})
