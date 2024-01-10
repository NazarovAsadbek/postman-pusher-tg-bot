export const NEWMAN_CONFIG = ({collection, env}: any) => ({ // postman type не возвращает эти типы🤦‍♂️🤦‍♂️
    collection: collection.data.collection,
    globals: {
        "name": "ABC_ENVIRONMENTS",
    },
    globalVar: env.data.environment.values,
    reporters: ['htmlextra'],
    reporter: {
        htmlextra: {
            export: 'report' + '/report.html',
            // template: './template.hbs'
            // logs: true,
            // showOnlyFails: true,
            // noSyntaxHighlighting: true,
            // testPaging: true,
            browserTitle: 'My Newman report' + new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU'),
            title: 'My Newman Report' + new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU'),
            titleSize: 4,
            // omitHeaders: true,
            // skipHeaders: "Authorization",
            // omitRequestBodies: true,
            // omitResponseBodies: true,
            // hideRequestBody: ["Login"],
            // hideResponseBody: ["Auth Request"],
            showEnvironmentData: true,
            // skipEnvironmentVars: ["API_KEY"],
            // showGlobalData: true,
            // skipGlobalVars: ["API_TOKEN"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            showFolderDescription: true,
            // timezone: "US/Boston",
            // skipFolders: "folder name with space,folderWithoutSpace",
            // skipRequests: "request name with space,requestNameWithoutSpace",
            displayProgressBar: true
        }
    }
})
