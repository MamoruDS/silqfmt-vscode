import * as vscode from 'vscode'

export const getExtension = (): vscode.Extension<any> | undefined => {
    return vscode.extensions.getExtension('mamoruds.silqfmt-vscode')
}

export const getExtensionPath = (): string | undefined => {
    return getExtension()?.extensionPath
}
